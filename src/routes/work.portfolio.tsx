import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { PortfolioCard } from "@/components/portfolio-showcase";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/lib/portfolio";

const URL = "https://webgramitsolution.com/work/portfolio";
const title = "Portfolio — Websites & Ecommerce Stores We Built | Webgram IT Solution";
const description =
  "Explore live websites and ecommerce stores built by Webgram IT Solution for clients in India and Canada — D2C stores, B2B wholesale, healthcare, staffing and local service brands.";
const heroImage = "https://ik.imagekit.io/2kynz1ge7/portfolio.png";

export const Route = createFileRoute("/work/portfolio")({
  head: () => ({
    links: [{ rel: "canonical", href: URL }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "@id": "https://webgramitsolution.com/#business",
              name: "Webgram IT Solution",
              url: "https://webgramitsolution.com/",
              image: heroImage,
              telephone: "+91 7551120242",
              email: "info@webgramitsolution.com",
              priceRange: "₹15,000 - ₹5,00,000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "F3/780, Block C, Devli, Sangam Vihar",
                addressLocality: "New Delhi",
                postalCode: "110062",
                addressCountry: "IN",
              },
            },
            {
              "@type": "CollectionPage",
              "@id": URL,
              name: title,
              description,
              url: URL,
              about: { "@id": "https://webgramitsolution.com/#business" },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: portfolio.length,
                itemListElement: portfolio.map((item, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: { "@type": "WebSite", name: item.name, url: item.url, description: item.summary },
                })),
              },
            },
          ],
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden bg-navy py-12 text-on-dark md:py-16">
        <img src={heroImage} alt="Webgram IT Solution website portfolio" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/35" />
        <div className="header-shell relative">
          <h1 className="page-title max-w-[720px]">Websites Designed for Growth<br /><span className="text-gold">Built to Perform.</span></h1>
          <p className="page-lead mt-3 max-w-[680px] text-on-dark/85">
            Real, live projects for businesses in India and Canada — ecommerce stores, B2B wholesale platforms and lead-generating business websites. Each preview scrolls through the actual homepage.
          </p>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="header-shell grid gap-6 md:gap-8">
          {portfolio.map((item) => <PortfolioCard key={item.domain} item={item} />)}
        </div>
      </section>
      <section className="bg-sky-soft py-10">
        <div className="header-shell flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[26px] text-navy">Want a website like these?</h2>
            <p className="mt-1 text-[16px] text-muted-foreground">Tell us about your business and we will share a plan, timeline and quote.</p>
          </div>
          <Button asChild className="h-11 bg-gold px-6 text-[15px] font-semibold text-navy hover:bg-gold/90">
            <Link to="/contact">Start Your Project <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
