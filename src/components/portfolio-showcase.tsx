import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";

import type { PortfolioItem } from "@/lib/portfolio";

export function ScrollingFrame({ item, height = 340 }: { item: PortfolioItem; height?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
        <span className="ml-2 truncate rounded bg-card px-2 py-0.5 text-[12px] text-muted-foreground">{item.domain}</span>
      </div>
      <div className="portfolio-frame relative overflow-hidden" style={{ height, ["--frame-h" as string]: `${height}px` }}>
        <img src={item.image} alt={`${item.name} website designed by Webgram IT Solution`} loading="lazy" decoding="async" width={640} className="portfolio-scroll block w-full" />
      </div>
    </div>
  );
}

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="grid gap-5 rounded-xl border border-border bg-card p-4 shadow-card md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:p-6">
      <ScrollingFrame item={item} />
      <div className="flex flex-col">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-primary">{item.category}</p>
        <h2 className="mt-1 text-[24px] text-navy">{item.name}</h2>
        <p className="mt-1 flex items-center gap-1 text-[14px] text-muted-foreground"><MapPin className="h-4 w-4" />{item.location}</p>
        <p className="mt-3 text-[16px] leading-7 text-muted-foreground">{item.summary}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {item.delivered.map((point) => (
            <li key={point} className="flex items-center gap-2 text-[15px] text-navy"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{point}</li>
          ))}
        </ul>
        <a href={item.url} target="_blank" rel="noopener" className="mt-5 inline-flex w-fit items-center gap-1 rounded-md bg-navy px-4 py-2.5 text-[14px] font-semibold text-on-dark hover:opacity-90">
          Visit Live Website <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
