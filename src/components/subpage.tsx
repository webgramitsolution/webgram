import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import type { Subpage } from "@/lib/menu-pages";

export function SubpageTemplate({ sectionLabel, page }: { sectionLabel: string; page: Subpage }) {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="contact-hero bg-navy py-12 text-on-dark md:py-16">
        <div className="header-shell">
          <p className="page-eyebrow text-gold">{sectionLabel}</p>
          <h1 className="page-title mt-2">{page.title}</h1>
          <p className="page-lead mt-2 max-w-[560px] text-on-dark/80">{page.tagline}</p>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="header-shell grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <h2 className="content-title text-navy">Overview</h2>
            <p className="content-body mt-3 text-muted-foreground">{page.description}</p>
            <Button asChild className="mt-6 h-11 bg-gold px-6 text-[12px] font-bold text-navy hover:bg-gold/90">
              <Link to="/contact">
                Start Your Project <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ul className="rounded-lg border border-border bg-card p-5 shadow-card">
            {page.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 border-b border-border py-2.5 text-[12.5px] font-medium text-navy last:border-0">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
