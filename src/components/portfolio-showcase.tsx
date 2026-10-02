import { ArrowUpRight, CheckCircle2, ExternalLink, MapPin } from "lucide-react";

import type { PortfolioItem } from "@/lib/portfolio";

export function ScrollingFrame({ item, height = 400 }: { item: PortfolioItem; height?: number }) {
  return (
    <a href={item.url} target="_blank" rel="noopener" aria-label={`Open ${item.name} live website`} className="group block overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
        <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md border border-border/70 bg-card px-2.5 py-1 text-[13px] text-navy">
          <span className="truncate">{item.url}</span><ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-primary" />
        </span>
      </div>
      <div className="portfolio-frame relative overflow-hidden bg-white" style={{ height, ["--frame-h" as string]: `${height}px` }}>
        <img src={item.image} alt={`${item.name} full live website preview, designed by Webgram IT Solution`} loading="lazy" decoding="async" width={1440} className="portfolio-scroll block h-auto w-full" />
        <span className="absolute bottom-3 right-3 rounded-full bg-navy/90 px-3 py-1.5 text-[12px] font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">Open live website</span>
      </div>
    </a>
  );
}

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="p-3 md:p-5"><ScrollingFrame item={item} height={460} /></div>
      <div className="grid gap-5 border-t border-border p-5 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] md:p-7">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-primary">{item.category}</p>
          <h2 className="mt-1 text-[26px] text-navy">{item.name}</h2>
          <p className="mt-1 flex items-center gap-1 text-[14px] text-muted-foreground"><MapPin className="h-4 w-4" />{item.location}</p>
          <a href={item.url} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-navy px-4 py-2.5 text-[14px] font-semibold text-on-dark hover:opacity-90">Visit Live Website <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div>
          <p className="text-[16px] leading-7 text-muted-foreground">{item.summary}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {item.delivered.map((point) => <li key={point} className="flex items-center gap-2 text-[15px] text-navy"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{point}</li>)}
          </ul>
        </div>
      </div>
    </article>
  );
}
