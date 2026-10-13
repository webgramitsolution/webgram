import { useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const models = [
  { id: "b2b", label: "B2B Marketplace", min: 150000, max: 350000, note: "Wholesale pricing, quotes, multi-vendor" },
  { id: "d2c", label: "D2C Store", min: 60000, max: 150000, note: "Branded online store with checkout" },
  { id: "enterprise", label: "Enterprise Custom Platform", min: 300000, max: 500000, note: "Custom workflows, ERP & API integrations" },
] as const;
const integrations = [
  { id: "knet", label: "KNET (Kuwait)" },
  { id: "tabby", label: "Tabby (UAE)" },
  { id: "gst", label: "GST Invoices (India)" },
] as const;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30),
});

export function CostEstimator() {
  const [model, setModel] = useState<(typeof models)[number]["id"]>("d2c");
  const [picked, setPicked] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const range = useMemo(() => {
    const m = models.find((x) => x.id === model)!;
    return { min: m.min + picked.length * 15000, max: m.max + picked.length * 25000 };
  }, [model, picked]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    setState("sending");
    const { error: rpcError } = await supabase.rpc("submit_cost_estimate", {
      _name: parsed.data.name, _email: parsed.data.email, _phone: parsed.data.phone,
      _model: model, _integrations: picked, _source: window.location.pathname,
    });
    if (rpcError) { setState("idle"); return setError(rpcError.message || "Could not send. Please try again."); }
    setState("done");
  }

  return (
    <section aria-label="AI cost estimator" className="bg-sky-soft py-10">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-[13px] font-semibold uppercase text-primary">AI Cost Estimator Tool</p>
        <h2 className="mt-2 text-[24px] font-medium leading-tight text-navy md:text-[28px]">Get an instant project estimate</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="rounded-md border border-border bg-card p-5 shadow-card">
            <p className="text-[15px] font-medium text-navy">1. Choose your business model</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {models.map((m) => (
                <button key={m.id} type="button" onClick={() => setModel(m.id)} aria-pressed={model === m.id}
                  className={`rounded-md border p-3 text-left transition-colors ${model === m.id ? "border-primary bg-primary-soft" : "border-border bg-card hover:border-primary/50"}`}>
                  <span className="block text-[15px] font-medium text-navy">{m.label}</span>
                  <span className="mt-1 block text-[13px] leading-5 text-muted-foreground">{m.note}</span>
                </button>
              ))}
            </div>
            <p className="mt-5 text-[15px] font-medium text-navy">2. Regional integrations</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {integrations.map((i) => {
                const on = picked.includes(i.id);
                return (
                  <button key={i.id} type="button" aria-pressed={on}
                    onClick={() => setPicked((p) => (on ? p.filter((x) => x !== i.id) : [...p, i.id]))}
                    className={`rounded-full border px-4 py-2 text-[14px] ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-navy"}`}>
                    {i.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 rounded-md bg-navy p-4 text-primary-foreground">
              <p className="text-[14px] opacity-80">Estimated investment</p>
              <p className="mt-1 text-[26px] font-semibold">{inr(range.min)} – {inr(range.max)}</p>
              <p className="mt-1 text-[13px] opacity-80">Indicative range. Final quote depends on scope after a free consultation.</p>
            </div>
          </div>
          <form onSubmit={submit} className="rounded-md border border-border bg-card p-5 shadow-card">
            {state === "done" ? (
              <div className="py-8 text-center">
                <p className="text-[18px] font-medium text-navy">Thank you! Your estimate request is saved.</p>
                <p className="mt-2 text-[15px] text-muted-foreground">Our team will contact you with a detailed quote.</p>
              </div>
            ) : (
              <>
                <p className="text-[15px] font-medium text-navy">3. Get your detailed quote</p>
                {(["name", "email", "phone"] as const).map((f) => (
                  <label key={f} className="mt-3 block text-[14px] text-navy">
                    {f === "name" ? "Full name" : f === "email" ? "Work email" : "Phone / WhatsApp (optional)"}
                    <input type={f === "email" ? "email" : f === "phone" ? "tel" : "text"} value={form[f]} maxLength={f === "phone" ? 30 : 255}
                      onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-[15px]" />
                  </label>
                ))}
                {error && <p className="mt-3 text-[14px] text-destructive">{error}</p>}
                <button disabled={state === "sending"} className="mt-4 w-full rounded-md bg-primary px-4 py-3 text-[15px] font-medium text-primary-foreground disabled:opacity-60">
                  {state === "sending" ? "Sending…" : "Get My Custom Quote"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
