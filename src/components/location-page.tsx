import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, CheckCircle2, Clock3, KeyRound, MapPin, MessageCircle, Phone, Search, ShoppingCart, Smartphone, Wrench, type LucideIcon } from "lucide-react";

import { ScrollingFrame } from "@/components/portfolio-showcase";
import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { locations, projectsForLocation, type ServiceLocation } from "@/lib/locations";
import { portfolio } from "@/lib/portfolio";

const services: [string, string, LucideIcon, string][] = [
  ["Ecommerce Website Development", "/solutions/ecommerce-development", ShoppingCart, "Online stores with product catalogues, secure checkout, payments and shipping."],
  ["B2B Ecommerce & Wholesale Portals", "/solutions/b2b-commerce", Building2, "Trade logins, bulk ordering, quote requests and customer-specific pricing."],
  ["Business & Corporate Websites", "/solutions/website-design-development", Smartphone, "Mobile-first company websites built to explain services and win enquiries."],
  ["WooCommerce Development", "/services/woocommerce", ShoppingCart, "Custom WooCommerce stores with Razorpay, COD and Shiprocket integrations."],
  ["Custom Web Portals", "/services/web-portal-development", Wrench, "Dashboards, member areas and workflow portals for your team and customers."],
  ["Website Maintenance & SEO", "/services/website-maintenance", Search, "Updates, backups, speed fixes and on-page SEO after your website launches."],
];

const reasons: [string, string][] = [
  ["SEO-ready builds", "Clean code, fast pages, schema and local SEO setup so customers can find you on Google."],
  ["Mobile-first design", "Every page is designed for phones first, where most of your customers browse and buy."],
  ["Payments & shipping", "Razorpay, UPI, COD and shipping integrations configured for Indian customers."],
  ["Local support", "A Delhi-based team you can call, WhatsApp or meet during and after launch."],
];

const glance: [LucideIcon, string, string][] = [
  [MapPin, "Office", "Sangam Vihar, New Delhi"],
  [Clock3, "Working hours", "Mon–Sat, 10 AM – 7 PM"],
  [MessageCircle, "Reply time", "Usually within one business day"],
  [KeyRound, "Ownership", "You own the website, content and domain"],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-primary"><span className="h-0.5 w-7 bg-primary" />{children}</p>;
}

export function LocationPage({ location: l }: { location: ServiceLocation }) {
  const projects = projectsForLocation(l.slug, portfolio);
  const others = locations.filter((x) => x.slug !== l.slug);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="location-hero relative overflow-hidden bg-navy text-on-dark">
        <div className="page-shell relative grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_340px] md:items-center md:py-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[14px] text-on-dark/75">
              <Link to="/" className="hover:text-on-dark">Home</Link><span>›</span>
              <Link to="/locations" className="hover:text-on-dark">Locations</Link><span>›</span>
              <span aria-current="page" className="text-on-dark">{l.city}</span>
            </nav>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-on-dark/25 bg-on-dark/10 px-3 py-1 text-[14px] font-semibold"><MapPin className="h-4 w-4 text-gold" />Serving {l.city}</p>
            <h1 className="mt-4 max-w-[760px] text-balance text-[30px] font-medium leading-[1.15] md:text-[36px] lg:text-[42px]">{l.keyword}</h1>
            <p className="mt-4 max-w-[680px] text-[16px] leading-7 text-on-dark/85 md:text-[17px]">{l.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex h-11 items-center gap-2 rounded-md bg-gold px-6 text-[15px] font-semibold text-navy hover:opacity-90">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
              <a href="tel:+917551120242" className="inline-flex h-11 items-center gap-2 rounded-md border border-on-dark/60 px-6 text-[15px] font-semibold text-on-dark hover:bg-on-dark/10"><Phone className="h-4 w-4" />+91 75511 20242</a>
            </div>
          </div>
          <aside className="rounded-xl border border-on-dark/15 bg-on-dark/[0.06] p-5 backdrop-blur-sm md:p-6" aria-label="Webgram at a glance">
            <p className="text-[16px] font-semibold">Webgram IT Solution at a glance</p>
            <ul className="mt-4 grid gap-4">
              {glance.map(([Icon, label, value]) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Icon className="h-4 w-4" /></span>
                  <span className="min-w-0"><span className="block text-[13px] text-on-dark/70">{label}</span><span className="block text-[15px] font-semibold leading-6">{value}</span></span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-shell">
          <Eyebrow>Our services</Eyebrow>
          <h2 className="mt-2 text-[26px] leading-tight text-navy md:text-[30px]">Website services for {l.city} businesses</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([name, to, Icon, text]) => (
              <a key={to} href={to} className="group flex min-w-0 flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-[18px] leading-snug text-navy">{name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-6 text-muted-foreground">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {l.projectFocus ? (
        <section className="bg-sky-soft py-12 md:py-16">
          <div className="page-shell">
            <Eyebrow>Project planning</Eyebrow>
            <h2 className="mt-2 text-[26px] leading-tight text-navy md:text-[30px]">Planning your website in {l.city}</h2>
            <ol className="mt-7 grid gap-4 md:grid-cols-3">
              {l.projectFocus.map((focus, index) => (
                <li key={focus.title} className="min-w-0 rounded-xl border border-border bg-card p-6 shadow-card">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-[16px] font-semibold text-on-dark">{index + 1}</span>
                  <h3 className="mt-4 text-[19px] leading-snug text-navy">{focus.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{focus.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="py-12 md:py-16">
        <div className="page-shell grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-7">
            <h2 className="text-[22px] text-navy md:text-[24px]">Industries we serve in {l.city}</h2>
            <div className="mt-5 flex flex-wrap gap-2">{l.industries.map((i) => <span key={i} className="rounded-full border border-border bg-primary-soft px-3.5 py-1.5 text-[14px] font-medium text-navy">{i}</span>)}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-7">
            <h2 className="text-[22px] text-navy md:text-[24px]">Areas we cover</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">{l.areas.map((a) => <li key={a} className="flex min-w-0 items-center gap-2 text-[15px] text-navy"><MapPin className="h-4 w-4 shrink-0 text-primary" /><span className="min-w-0">{a}</span></li>)}</ul>
          </div>
        </div>
      </section>

      {projects.items.length ? (
        <section className="bg-sky-soft py-12 md:py-16">
          <div className="page-shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <Eyebrow>Our work</Eyebrow>
                <h2 className="mt-2 text-[26px] leading-tight text-navy md:text-[30px]">{projects.local ? (projects.withNcr ? `Websites we built in ${l.city} & Delhi NCR` : `Websites we built in ${l.city}`) : "Websites we built across Delhi NCR"}</h2>
              </div>
              <Link to="/work/$slug" params={{ slug: "portfolio" }} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">View full portfolio <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {projects.items.map((item) => (
                <article key={item.url} className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-card">
                  <ScrollingFrame item={item} height={220} />
                  <div className="px-1 pb-2">
                    <p className="flex items-center gap-1 text-[13px] text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{item.location}</p>
                    <h3 className="mt-1 text-[18px] text-navy">{item.name}</h3>
                    <p className="mt-1 text-[14px] font-medium text-primary">{item.category}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-12 md:py-16">
        <div className="page-shell">
          <Eyebrow>Why Webgram</Eyebrow>
          <h2 className="mt-2 text-[26px] leading-tight text-navy md:text-[30px]">Why {l.city} businesses choose Webgram IT Solution</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(([t, d]) => (
              <div key={t} className="rounded-xl border border-border bg-card p-5 shadow-card"><CheckCircle2 className="h-6 w-6 text-primary" /><h3 className="mt-3 text-[18px] text-navy">{t}</h3><p className="mt-2 text-[15px] leading-6 text-muted-foreground">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-12 text-on-dark md:py-14">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="min-w-0">
            <h2 className="text-[26px] leading-tight md:text-[30px]">Ready to discuss your {l.city} website?</h2>
            <p className="mt-3 max-w-[560px] text-[16px] leading-7 text-on-dark/85">Share your goals and we will suggest the right platform, scope and timeline, with a fixed itemised quote after discussion.</p>
            <Link to="/contact" className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-gold px-6 text-[15px] font-semibold text-navy hover:opacity-90">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <TrustFacts />
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="page-shell">
          <h2 className="text-[20px] text-navy">We also serve</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((x) => (
              <Link key={x.slug} to="/locations/$city" params={{ city: x.slug }} className="flex min-w-0 items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-[15px] font-medium text-navy shadow-card hover:border-primary hover:text-primary">
                <MapPin className="h-4 w-4 shrink-0 text-primary" /><span className="min-w-0">{x.city}</span><ArrowRight className="ml-auto h-4 w-4 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/** Hub listing every city page. */
export function LocationsHub() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="location-hero relative overflow-hidden bg-navy text-on-dark">
        <div className="page-shell relative py-12 md:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[14px] text-on-dark/75"><Link to="/" className="hover:text-on-dark">Home</Link><span>›</span><span aria-current="page" className="text-on-dark">Locations</span></nav>
          <h1 className="mt-4 max-w-[780px] text-balance text-[30px] font-medium leading-[1.15] md:text-[38px]">Website & Ecommerce Development Across Delhi NCR</h1>
          <p className="mt-4 max-w-[700px] text-[16px] leading-7 text-on-dark/85 md:text-[17px]">From our office in Sangam Vihar, New Delhi, we build websites and online stores for businesses in Delhi, Noida, Gurugram, Faridabad and across India and overseas.</p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="page-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l) => (
            <Link key={l.slug} to="/locations/$city" params={{ city: l.slug }} className="group flex min-w-0 flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary">
              <p className="flex items-center gap-2 text-[14px] font-semibold text-primary"><MapPin className="h-4 w-4" />{l.city}</p>
              <h2 className="mt-3 text-[20px] leading-snug text-navy">{l.keyword}</h2>
              <p className="mt-3 flex-1 text-[15px] leading-6 text-muted-foreground">{l.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">View {l.city} page <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
