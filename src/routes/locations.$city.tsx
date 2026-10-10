import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { getLocation, locations } from "@/lib/locations";

const BASE = "https://webgramitsolution.com";

export const Route = createFileRoute("/locations/$city")({
  loader: ({ params }) => {
    const location = getLocation(params.city);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Location not found" }, { name: "robots", content: "noindex" }] };
    const url = `${BASE}/locations/${params.city}`;
    return {
      links: [{ rel: "canonical", href: url }],
      meta: [
        { title: loaderData.title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", name: loaderData.keyword, serviceType: "Website & Ecommerce Development", areaServed: { "@type": "City", name: loaderData.city }, provider: { "@id": `${BASE}/#business` }, url },
            { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` }, { "@type": "ListItem", position: 2, name: loaderData.city, item: url }] },
          ],
        }),
      }],
    };
  },
  component: LocationPage,
});

const services = [
  ["Ecommerce Website Development", "/solutions/ecommerce-development"],
  ["B2B Ecommerce & Wholesale Portals", "/solutions/b2b-commerce"],
  ["Business & Corporate Websites", "/solutions/website-design-development"],
  ["WooCommerce Development", "/services/woocommerce"],
  ["Custom Web Portals", "/services/web-portal-development"],
  ["Website Maintenance & SEO", "/services/website-maintenance"],
] as const;

function LocationPage() {
  const l = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="bg-navy py-12 text-on-dark md:py-16">
        <div className="header-shell max-w-[860px]">
          <p className="flex items-center gap-2 text-[14px] font-semibold text-gold"><MapPin className="h-4 w-4" />Serving {l.city}</p>
          <h1 className="mt-3 text-[30px] leading-tight md:text-[42px]">{l.keyword}</h1>
          <p className="mt-4 text-[17px] leading-7 text-on-dark/85">{l.intro}</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-[15px] font-semibold text-navy">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="header-shell grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-[26px] text-navy">Our services in {l.city}</h2>
            <ul className="mt-5 grid gap-3">
              {services.map(([name, to]) => <li key={to}><a href={to} className="flex items-center gap-2 text-[16px] text-navy hover:text-primary"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{name}</a></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-[26px] text-navy">Industries we serve</h2>
            <div className="mt-5 flex flex-wrap gap-2">{l.industries.map((i) => <span key={i} className="rounded-full border border-border bg-card px-3 py-1.5 text-[14px] text-navy">{i}</span>)}</div>
            <h3 className="mt-8 text-[20px] text-navy">Areas we cover</h3>
            <p className="mt-3 text-[16px] leading-7 text-muted-foreground">{l.areas.join(" · ")}</p>
          </div>
        </div>
      </section>
      <section className="bg-sky-soft py-10">
        <div className="header-shell">
          <h2 className="text-[24px] text-navy">Why {l.city} businesses choose Webgram IT Solution</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["SEO-ready builds", "Clean code, fast pages, schema and local SEO setup so you can rank on Google."], ["Mobile-first design", "Every website is designed for phones first, where most of your customers shop."], ["Payments & shipping", "Razorpay, UPI, COD and shipping integrations configured for India."], ["Local support", "A Delhi-based team you can call, WhatsApp or meet during and after launch."]].map(([t, d]) => (
              <div key={t} className="rounded-lg border border-border bg-card p-5 shadow-card"><h3 className="text-[18px] text-navy">{t}</h3><p className="mt-2 text-[15px] leading-6 text-muted-foreground">{d}</p></div>
            ))}
          </div>
          <p className="mt-8 text-[15px] text-muted-foreground">Also serving: {locations.filter((x) => x.slug !== l.slug).map((x, i) => <span key={x.slug}>{i > 0 && " · "}<Link to="/locations/$city" params={{ city: x.slug }} className="text-primary hover:underline">{x.keyword}</Link></span>)}</p>
        </div>
      </section>
    </div>
  );
}
