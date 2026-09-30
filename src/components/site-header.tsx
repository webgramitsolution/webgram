import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Facebook, Instagram, Linkedin, Menu, MessageCircle, Phone, Pin, X, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import webgramLogo from "@/assets/webgram-logo.png.asset.json";

type Target =
  | { to: "/" }
  | { to: "/about" }
  | { to: "/contact" }
  | { to: "/solutions/$slug"; params: { slug: string } }
  | { to: "/services/$slug"; params: { slug: string } }
  | { to: "/industries/$slug"; params: { slug: string } }
  | { to: "/work/$slug"; params: { slug: string } }
  | { to: "/resources/$slug"; params: { slug: string } };

const slugify = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const subpage = (
  section: "solutions" | "services" | "industries" | "work" | "resources",
  label: string,
): Target => ({ to: `/${section}/$slug`, params: { slug: slugify(label) } }) as Target;

// Exact menu from the approved version (Sep 29, 2:37 PM)
const menu: Array<{ label: string; target?: Target; items?: Array<[string, Target]> }> = [
  { label: "Home", target: { to: "/" } },
  {
    label: "Solutions",
    items: [
      "Ecommerce Development",
      "B2B Commerce",
      "Website Design & Development",
      "Marketplace Development",
    ].map((label) => [label, subpage("solutions", label)]),
  },
  {
    label: "Services",
    items: [
      "Web Portal Development",
      "Website Design",
      "WooCommerce",
      "Shopify",
      "API Integration",
      "Website Maintenance",
    ].map((label) => [label, subpage("services", label)]),
  },
  {
    label: "Work",
    items: ["Case Studies", "Portfolio", "Client Stories"].map((label) => [
      label,
      subpage("work", label),
    ]),
  },
  {
    label: "Resources",
    items: ["Blog", "Guides", "FAQs"].map((label) => [label, subpage("resources", label)]),
  },
  { label: "Blog", target: { to: "/resources/$slug", params: { slug: "blog" } } },
  { label: "About Us", target: { to: "/about" } },
  { label: "Contact Us", target: { to: "/contact" } },
];

const topLinks: Array<[string, Target]> = [
  ["Newsletter", { to: "/contact" }],
  ["Contact Us", { to: "/contact" }],
  ["FAQs", { to: "/resources/$slug", params: { slug: "faqs" } }],
];

export function SiteHeader() {
  const [country, setCountry] = useState("in");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { setCountry(window.localStorage.getItem("webgram-country") ?? "in"); }, []);
  function changeLanguage(value: string) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("webgram-language", value);
    if (value === "hi") {
      const path = `${window.location.pathname}${window.location.search}`;
      window.location.href = `https://www-webgramitsolution-com.translate.goog${path}?_x_tr_sl=en&_x_tr_tl=hi&_x_tr_hl=hi`;
    } else {
      window.location.href = `https://www.webgramitsolution.com${window.location.pathname}${window.location.search}`;
    }
  }
  function changeCountry(value: string) {
    setCountry(value);
    if (typeof window !== "undefined") window.localStorage.setItem("webgram-country", value);
  }
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card text-navy shadow-card md:border-on-dark/60 md:bg-navy md:text-on-dark">
      <div className="hidden h-[31px] border-b border-on-dark/20 md:block">
        <div className="header-shell flex h-full items-center justify-between text-[10px] font-medium uppercase">
          <div className="flex h-full items-center">
            <label className="sr-only" htmlFor="site-language">Language</label>
            <select id="site-language" defaultValue="en" onChange={(event) => changeLanguage(event.target.value)} className="h-full border-x border-on-dark/15 bg-navy px-3 text-[10px] uppercase text-on-dark outline-none"><option value="en">English</option><option value="hi">हिन्दी</option></select>
            <label className="sr-only" htmlFor="site-country">Country</label>
            <select id="site-country" value={country} onChange={(event) => changeCountry(event.target.value)} className="h-full border-r border-on-dark/15 bg-navy px-3 text-[10px] uppercase text-on-dark outline-none"><option value="in">India</option><option value="us">USA</option><option value="gb">UK</option><option value="ae">UAE</option></select>
            <strong className="px-3 font-semibold">GSTN:- 07CUHPK2017G1ZW</strong>
          </div>
          <div className="flex h-full items-center">
            <span
              className="flex items-center gap-3 border-r border-on-dark/15 px-3"
              aria-label="Social channels"
            >
              <a href="https://www.facebook.com/webgramitsolution/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook className="h-3.5 w-3.5" /></a>
              <a href="https://www.instagram.com/webgramitsolution/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="h-3.5 w-3.5" /></a>
              <a href="https://www.youtube.com/@webgramitsolution" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube className="h-3.5 w-3.5" /></a>
              <a href="https://mx.pinterest.com/webgramitsolution/" target="_blank" rel="noreferrer" aria-label="Pinterest"><Pin className="h-3.5 w-3.5" /></a>
              <a href="https://www.linkedin.com/company/webgramitsolution" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-3.5 w-3.5" /></a>
              <a href="https://wa.me/917551120242" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle className="h-3.5 w-3.5" /></a>
            </span>
            {topLinks.map(([label, target]) => (
              <Link
                key={label}
                {...target}
                className="flex h-full items-center border-r border-on-dark/15 px-3 hover:opacity-75"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="header-shell flex h-[76px] items-center justify-between gap-5">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Webgram IT Solution home">
          <img
            src={webgramLogo.url}
            alt="Webgram IT Solution"
            width={720}
            height={323}
            className="h-[38px] w-auto object-contain brightness-0 md:h-[34px] md:brightness-100 lg:h-[44px]"
          />
        </Link>
        <nav className="hidden h-full items-center gap-3 lg:gap-6 md:flex" aria-label="Primary navigation">
          {menu.map(({ label, target, items }) => (
            <div key={label} className="group relative flex h-full items-center">
              {target ? (
                <Link
                  {...target}
                  className="whitespace-nowrap text-[10px] font-semibold uppercase text-on-dark transition-opacity hover:opacity-75 focus-visible:opacity-75 lg:text-[12px]"
                >
                  {label}
                </Link>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-1 whitespace-nowrap text-[10px] font-semibold uppercase text-on-dark transition-opacity hover:opacity-75 focus-visible:opacity-75 lg:text-[12px]"
                >
                  {label}
                  <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
              )}
              {items && (
                <ul
                  className={`invisible absolute top-full min-w-[210px] translate-y-1 rounded-b-md border border-border bg-card py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${label === "Resources" ? "right-0" : "left-0"}`}
                >
                  {items.map(([item, itemTarget]) => (
                    <li key={item}>
                      <Link
                        {...itemTarget}
                        className="block px-4 py-2 text-[12px] font-medium text-navy transition-colors hover:bg-sky-soft hover:text-primary focus-visible:bg-sky-soft focus-visible:outline-none"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:hidden"><Button asChild size="icon" className="rounded-full bg-primary text-primary-foreground" aria-label="Call Webgram"><a href="tel:+917551120242"><Phone /></a></Button><Button type="button" size="icon" variant="ghost" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>{mobileOpen ? <X /> : <Menu />}</Button></div>
      </div>
      {mobileOpen ? <nav className="border-t border-border bg-card px-4 py-3 md:hidden" aria-label="Mobile navigation"><div className="grid grid-cols-2 gap-1">{menu.filter((item) => item.target).map(({ label, target }) => target ? <Link key={label} {...target} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-bold text-navy hover:bg-sky-soft">{label}</Link> : null)}</div><Button asChild className="mt-3 w-full bg-gold font-bold text-navy"><Link to="/contact" onClick={() => setMobileOpen(false)}>Get Free Quote</Link></Button></nav> : null}
    </header>
  );
}
