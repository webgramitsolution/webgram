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
    <article className="grid gap-6 rounded-2xl border border-border bg-card p-4 shadow-card md:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
      <ScrollingFrame item={item} height={520} />
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[14px] font-semibold text-primary">{item.category}</p>
          <p className="flex items-center gap-1 text-[14px] text-muted-foreground"><MapPin className="h-4 w-4" />{item.location}</p>
        </div>
        <h2 className="mt-2 text-[26px] leading-tight text-navy md:text-[30px]">{item.name}</h2>
        <p className="mt-3 text-[16px] leading-7 text-muted-foreground">{item.summary}</p>
        <h3 className="mt-6 text-[19px] text-navy">Key Features</h3>
        <span className="mt-2 block h-0.5 w-8 bg-navy" />
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {item.delivered.map((point) => <li key={point} className="flex items-center gap-2 text-[15px] text-navy"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{point}</li>)}
        </ul>
        <div className="mt-6 lg:mt-auto lg:pt-6">
          <a href={item.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-md bg-navy px-5 py-3 text-[15px] font-semibold text-on-dark hover:opacity-90">Visit Live Website <ArrowUpRight className="h-4 w-4" /></a>
          <p className="mt-2 text-[13px] text-muted-foreground">{item.domain}</p>
        </div>
      </div>
    </article>
  );
}
