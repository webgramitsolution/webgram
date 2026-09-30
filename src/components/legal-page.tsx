import { SiteHeader } from "@/components/site-header";

export type LegalSection = { title: string; paragraphs: string[]; bullets?: string[] };

export function LegalPage({ eyebrow, title, summary, updated, sections }: { eyebrow: string; title: string; summary: string; updated: string; sections: LegalSection[] }) {
  return <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <header className="border-b border-border bg-sky-soft py-12 md:py-16">
        <div className="page-shell max-w-4xl">
          <p className="page-eyebrow text-primary">{eyebrow}</p>
          <h1 className="mt-3 text-navy">{title}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{summary}</p>
          <p className="mt-4 text-xs font-semibold text-navy">Last updated: {updated}</p>
        </div>
      </header>
      <div className="page-shell max-w-4xl py-10 md:py-14">
        <div className="space-y-9">
          {sections.map((section) => <section key={section.title}>
            <h2 className="text-navy">{section.title}</h2>
            <div className="mt-3 space-y-3 text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {section.bullets ? <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
          </section>)}
        </div>
      </div>
    </main>
  </div>;
}