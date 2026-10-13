import { FormEvent, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Globe2, Send, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitRegionalLead } from "@/lib/regional-lead.functions";

export const SITE = "https://webgramitsolution.com";
export const hreflangLinks = [
  { rel: "alternate", hrefLang: "en-in", href: `${SITE}/` },
  { rel: "alternate", hrefLang: "en-ae", href: `${SITE}/ae/` },
  { rel: "alternate", hrefLang: "en-kw", href: `${SITE}/kw/` },
  { rel: "alternate", hrefLang: "x-default", href: `${SITE}/` },
];

type Capability = { title: string; text: string };
type Pack = { name: string; price: string; note: string; items: string[] };
export type RegionContent = {
  code: "ae" | "kw";
  country: string;
  eyebrow: string;
  title: string;
  intro: string;
  capabilities: Capability[];
  stack: string[];
  currency: string;
  packages: Pack[];
  dialCode: string;
};

export function RegionalLanding({ c }: { c: RegionContent }) {
  return <>
    <SiteHeader />
    <main>
      <section className="bg-navy text-on-dark">
        <div className="page-shell grid gap-8 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-16">
          <div>
            <p className="page-eyebrow text-gold">{c.eyebrow}</p>
            <h1 className="mt-3 text-[30px] font-medium leading-tight md:text-[42px]">{c.title}</h1>
            <p className="mt-4 max-w-[560px] text-[16px] leading-7 text-on-dark/85">{c.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="h-11 bg-gold font-bold text-navy hover:bg-gold/90"><a href="#demo">Book a Live AI Remote Demo</a></Button>
              <Button asChild variant="outline" className="h-11 border-on-dark/40 bg-transparent font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View Portfolio</Link></Button>
            </div>
          </div>
          <ul className="grid gap-3 text-[15px]">
            {[[ShieldCheck, "Enterprise-grade, PCI-aware payment engineering"], [Globe2, `Delivery aligned to ${c.country} business hours`], [Zap, "Performance-first builds with edge CDN delivery"], [Sparkles, "AI-assisted QA, content and automation workflows"]].map(([Icon, t]) => {
              const I = Icon as typeof ShieldCheck;
              return <li key={t as string} className="flex items-center gap-3 rounded-md border border-on-dark/15 bg-on-dark/5 p-4"><I className="h-5 w-5 shrink-0 text-gold" />{t as string}</li>;
            })}
          </ul>
        </div>
      </section>

      <section className="page-shell py-12">
        <h2 className="text-[26px] font-medium text-navy md:text-[32px]">Core capabilities for {c.country} businesses</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.capabilities.map((x) => <article key={x.title} className="rounded-md border border-border bg-card p-5 shadow-card"><h3 className="text-[18px] font-medium text-navy">{x.title}</h3><p className="mt-2 text-[15px] leading-6 text-muted-foreground">{x.text}</p></article>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">{c.stack.map((s) => <span key={s} className="rounded-full border border-border bg-sky-soft px-3 py-1.5 text-[14px] font-semibold text-navy">{s}</span>)}</div>
      </section>

      <section className="bg-sky-soft py-12">
        <div className="page-shell">
          <h2 className="text-[26px] font-medium text-navy md:text-[32px]">Engagement packages ({c.currency})</h2>
          <p className="mt-2 text-[15px] text-muted-foreground">Indicative starting prices. Final quotation depends on scope, integrations and timelines.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {c.packages.map((p, i) => <article key={p.name} className={`flex flex-col rounded-md border bg-card p-6 shadow-card ${i === 1 ? "border-primary" : "border-border"}`}>
              <h3 className="text-[18px] font-medium text-navy">{p.name}</h3>
              <p className="mt-3 text-[28px] font-bold text-navy">{p.price}</p>
              <p className="text-[14px] text-muted-foreground">{p.note}</p>
              <ul className="mt-4 grid gap-2 text-[15px] text-navy">{p.items.map((it) => <li key={it} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{it}</li>)}</ul>
            </article>)}
          </div>
        </div>
      </section>

      <DemoForm region={c.code} dialCode={c.dialCode} />
    </main>
  </>;
}

function DemoForm({ region, dialCode }: { region: "ae" | "kw"; dialCode: string }) {
  const send = useServerFn(submitRegionalLead);
  const [f, setF] = useState({ fullName: "", companyEmail: "", whatsapp: dialCode + " ", projectScope: "", website: "" });
  const [busy, setBusy] = useState(false); const [done, setDone] = useState(false); const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try { await send({ data: { ...f, region } }); setDone(true); }
    catch (err) { setError(err instanceof Error && err.message.length < 140 ? err.message : "Please check your details and try again."); }
    finally { setBusy(false); }
  }
  return <section id="demo" className="page-shell grid gap-8 py-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
    <div>
      <p className="page-eyebrow text-primary">B2B partnership</p>
      <h2 className="mt-2 text-[26px] font-medium text-navy md:text-[32px]">Book a Live AI Remote Demo</h2>
      <p className="mt-3 max-w-[440px] text-[15px] leading-7 text-muted-foreground">See our delivery workflow, AI-assisted tooling and recent builds in a 30-minute remote session with a senior solutions consultant.</p>
    </div>
    <div className="rounded-md border border-border bg-card p-5 shadow-card">
      {done ? <div className="py-8 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-success" /><h3 className="mt-3 text-[18px] font-medium text-navy">Request received</h3><p className="mt-1 text-[15px] text-muted-foreground">Our team will contact you on WhatsApp to confirm a demo slot.</p></div> :
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <Input required minLength={2} maxLength={100} placeholder="Full Name *" aria-label="Full Name" value={f.fullName} onChange={(e) => setF({ ...f, fullName: e.target.value })} className="h-11" />
        <Input required type="email" maxLength={255} placeholder="Company Email *" aria-label="Company Email" value={f.companyEmail} onChange={(e) => setF({ ...f, companyEmail: e.target.value })} className="h-11" />
        <Input required type="tel" pattern="\+[0-9][0-9 ]{6,18}" maxLength={22} placeholder={`WhatsApp Number (e.g. ${dialCode} 5X XXX XXXX) *`} aria-label="WhatsApp Number with Country Code" value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} className="h-11 sm:col-span-2" />
        <Textarea required minLength={10} maxLength={3000} placeholder="Project Scope *" aria-label="Project Scope" value={f.projectScope} onChange={(e) => setF({ ...f, projectScope: e.target.value })} className="min-h-28 sm:col-span-2" />
        <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} className="hidden" />
        {error ? <p role="alert" className="text-[14px] font-semibold text-destructive sm:col-span-2">{error}</p> : null}
        <Button disabled={busy} className="h-11 bg-gold font-bold text-navy hover:bg-gold/90 sm:col-span-2"><Send />{busy ? "Sending..." : "Book My Demo"}</Button>
      </form>}
    </div>
  </section>;
}

export function regionalHead(path: "ae" | "kw", title: string, description: string, locale: string) {
  const url = `${SITE}/${path}/`;
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: url }, { property: "og:locale", content: locale },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }, ...hreflangLinks],
  };
}
