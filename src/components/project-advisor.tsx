import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProjectAdvice } from "@/lib/project-advisor.functions";
import type { ProjectAdvice } from "@/lib/project-advisor.server";

type Props = { needs: string; projectType?: string; budget?: string };

export function ProjectAdvisor({ needs, projectType, budget }: Props) {
  const fetchAdvice = useServerFn(getProjectAdvice);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<ProjectAdvice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const tooShort = needs.trim().length < 15;

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAdvice({ data: { needs, projectType, budget } });
      if (result.ok) setAdvice(result.advice);
      else setError(result.error);
    } catch {
      setError("We couldn't generate suggestions. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="col-span-2 rounded-md border border-primary/20 bg-sky-soft p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[11px] font-semibold text-navy"><Sparkles className="h-4 w-4 text-primary" />Not sure what you need? Get AI-powered service suggestions.</p>
        <Button type="button" onClick={handleClick} disabled={loading || tooShort} className="h-9 bg-navy px-4 text-[11px] font-bold text-on-dark hover:bg-navy/90">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}{loading ? "Thinking..." : "Get AI Suggestions"}
        </Button>
      </div>
      {tooShort && !advice && <p className="mt-2 text-[10px] text-muted-foreground">Write a few lines about your project in the message box first.</p>}
      {error && <p role="alert" className="mt-2 text-[11px] font-medium text-destructive">{error}</p>}
      {advice && (
        <div className="mt-3 grid gap-3 text-navy" aria-live="polite">
          <p className="text-[11.5px] leading-5">{advice.summary}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {advice.services.map((service) => (
              <div key={service.name} className="rounded-md border border-border bg-card p-2.5">
                <strong className="block text-[11.5px] font-bold text-primary">{service.name}</strong>
                <span className="mt-0.5 block text-[10.5px] leading-4 text-muted-foreground">{service.reason}</span>
              </div>
            ))}
          </div>
          <div>
            <strong className="text-[11px] font-bold">Next steps</strong>
            <ul className="mt-1.5 space-y-1">
              {advice.nextSteps.map((step) => <li key={step} className="flex gap-2 text-[10.5px] leading-4"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />{step}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
