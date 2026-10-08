import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BookOpen, BriefcaseBusiness, Building2, CalendarDays, ChevronDown, ChevronRight,
  Facebook, Grid2X2, Headphones, Home, Instagram, Linkedin, Menu, MessageCircle,
  Newspaper, Phone, Send, Settings, ShoppingCart, Users, X, Youtube,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const LOGO_URL = "https://ik.imagekit.io/x3cipokny/webgram%20it%20solution?updatedAt=1790815003792";

type Target =
  | { to: "/" }
  | { to: "/about" }
  | { to: "/contact" }
  | { to: "/auth" }
  | { to: "/guest-login" }
  | { to: "/solutions/$slug"; params: { slug: string } }
  | { to: "/services/$slug"; params: { slug: string } }
  | { to: "/industries/$slug"; params: { slug: string } }
  | { to: "/work/$slug"; params: { slug: string } }
  | { to: "/resources/$slug"; params: { slug: string } };

const slugify = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const subpage = (section: "solutions" | "services" | "industries" | "work" | "resources", label: string): Target => ({ to: `/${section}/$slug`, params: { slug: slugify(label) } }) as Target;

const menu: Array<{ label: string; target?: Target; items?: Array<[string, Target]> }> = [
  { label: "Home", target: { to: "/" } },
  { label: "Solutions", items: ["Ecommerce Development", "B2B Commerce", "Website Design & Development"].map((label) => [label, subpage("solutions", label)]) },
  { label: "Services", items: ["Web Portal Development", "Website Design", "WooCommerce", "Shopify", "API Integration", "Website Maintenance"].map((label) => [label, subpage("services", label)]) },
  { label: "Work", items: ["Portfolio", "Case Studies", "Client Stories"].map((label) => [label, subpage("work", label)]) },
  { label: "Resources", items: ["Blog", "Guides", "FAQs"].map((label) => [label, subpage("resources", label)]) },
  { label: "Blog", target: { to: "/resources/$slug", params: { slug: "blog" } } },
  { label: "About Us", target: { to: "/about" } },
  { label: "Contact Us", target: { to: "/contact" } },
];
const topLinks: Array<[string, Target]> = [["Newsletter", { to: "/contact" }], ["Contact Us", { to: "/contact" }], ["FAQs", { to: "/resources/$slug", params: { slug: "faqs" } }]];
const mobileItems: Array<{ label: string; icon: typeof Home; target: Target }> = [
  { label: "Home", icon: Home, target: { to: "/" } },
  { label: "Solutions", icon: Grid2X2, target: subpage("solutions", "ecommerce-development") },
  { label: "Ecommerce", icon: ShoppingCart, target: subpage("solutions", "ecommerce-development") },
  { label: "B2B Commerce", icon: BriefcaseBusiness, target: subpage("solutions", "b2b-commerce") },
  { label: "Services", icon: Settings, target: subpage("services", "web-portal-development") },
  { label: "Portfolio", icon: Building2, target: { to: "/work/$slug", params: { slug: "portfolio" } } },
  { label: "Blog", icon: Newspaper, target: subpage("resources", "blog") },
  { label: "Resources", icon: BookOpen, target: subpage("resources", "guides") },
  { label: "Company", icon: Users, target: { to: "/about" } },
];

export function SiteHeader() {
  const pathname = useLocation({ select: (l) => l.pathname });
  const navigate = useNavigate();
  const regional = /^\/(ae|kw)(\/|$)/.test(pathname);
  const country = pathname.startsWith("/ae") ? "ae" : pathname.startsWith("/kw") ? "kw" : "in";
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [mobileOpen]);
  function changeLanguage(value: string) {
    window.localStorage.setItem("webgram-language", value);
    if (value === "hi") {
      const path = `${window.location.pathname}${window.location.search}`;
      window.location.href = `https://www-webgramitsolution-com.translate.goog${path}?_x_tr_sl=en&_x_tr_tl=hi&_x_tr_hl=hi`;
    } else window.location.href = `https://webgramitsolution.com${window.location.pathname}${window.location.search}`;
  }
  function changeCountry(value: string) {
    window.localStorage.setItem("webgram-country", value);
    if (value === "ae") void navigate({ to: "/ae" }); else if (value === "kw") void navigate({ to: "/kw" }); else void navigate({ to: "/" });
  }
  const closeMenu = () => setMobileOpen(false);
  return <>
    <header className="sticky top-0 z-50 border-b border-border bg-card text-navy shadow-card md:border-on-dark/60 md:bg-navy md:text-on-dark">
      <div className="hidden h-[31px] border-b border-on-dark/20 md:block"><div className="header-shell flex h-full items-center justify-between whitespace-nowrap text-[11px] font-medium uppercase lg:text-[13px]">
        <div className="flex h-full items-center">{regional ? null : <><label className="sr-only" htmlFor="site-language">Language</label><select id="site-language" defaultValue="en" onChange={(event) => changeLanguage(event.target.value)} className="h-full border-x border-on-dark/15 bg-navy px-2 text-[11px] uppercase text-on-dark outline-none lg:px-3 lg:text-[13px]"><option value="en">English</option><option value="hi">हिन्दी</option></select></>}<label className="sr-only" htmlFor="site-country">Country</label><select id="site-country" value={country} onChange={(event) => changeCountry(event.target.value)} className="h-full border-r border-on-dark/15 bg-navy px-2 text-[11px] uppercase text-on-dark outline-none lg:px-3 lg:text-[13px]"><option value="in">India</option><option value="ae">UAE</option><option value="kw">Kuwait</option></select><strong className="px-3 font-semibold">GSTN:- 07CUHPK2017G1ZW</strong></div>
        <div className="flex h-full items-center"><span className="flex items-center gap-3 border-r border-on-dark/15 px-3" aria-label="Social channels"><a href="https://www.facebook.com/webgramitsolution/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook className="h-3.5 w-3.5" /></a><a href="https://www.instagram.com/webgramitsolution/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="h-3.5 w-3.5" /></a><a href="https://www.youtube.com/@webgramitsolution" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube className="h-3.5 w-3.5" /></a><a href="https://www.linkedin.com/company/webgramitsolution" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-3.5 w-3.5" /></a><a href="https://wa.me/webgramitsolution" target="_blank" rel="noreferrer" aria-label="WhatsApp"><img src="https://ik.imagekit.io/x3cipokny/icon/whatsapp.png" alt="" className="h-3.5 w-3.5 object-contain invert md:invert-0" /></a></span>{topLinks.map(([label, target]) => <Link key={label} {...target} className="flex h-full items-center border-r border-on-dark/15 px-3 hover:opacity-75">{label}</Link>)}</div>
      </div></div>
      <div className="header-shell flex h-[72px] items-center justify-between gap-5"><Link to="/" className="flex shrink-0 items-center" aria-label="Webgram IT Solution home"><img src={LOGO_URL} alt="Webgram IT Solution" width={720} height={177} className="h-[34px] w-auto object-contain brightness-0 md:h-[30px] md:invert lg:h-[36px]" /></Link>
        <nav className="hidden h-full items-center gap-3 md:flex lg:gap-7" aria-label="Primary navigation">{menu.map(({ label, target, items }) => <div key={label} className="group relative flex h-full items-center">{target ? <Link {...target} className="whitespace-nowrap text-[12px] font-semibold uppercase text-on-dark transition-opacity hover:opacity-75 lg:text-[14px]">{label}</Link> : <Button type="button" variant="ghost" className="h-auto gap-1 p-0 text-[12px] font-semibold uppercase text-on-dark shadow-none hover:bg-transparent hover:text-on-dark/75 lg:text-[14px]">{label}<ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" /></Button>}{items ? <ul className={`invisible absolute top-full min-w-[220px] translate-y-1 rounded-b-md border border-border bg-card py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${label === "Resources" ? "right-0" : "left-0"}`}>{items.map(([item, itemTarget]) => <li key={item}><Link {...itemTarget} className="block px-4 py-2 text-[14px] font-medium text-navy hover:bg-sky-soft hover:text-primary">{item}</Link></li>)}</ul> : null}</div>)}</nav>
        <div className="flex items-center gap-2 md:hidden"><Button asChild size="icon" className="rounded-full bg-primary text-primary-foreground" aria-label="Call Webgram"><a href="tel:+917551120242"><Phone /></a></Button><Button type="button" size="icon" variant="ghost" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></Button></div>
      </div>
    </header>
    {mobileOpen ? <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation"><button type="button" aria-label="Close navigation backdrop" onClick={closeMenu} className="absolute inset-0 bg-navy/70" /><aside className="absolute inset-y-0 left-0 flex w-[86%] max-w-[350px] flex-col overflow-y-auto bg-card shadow-2xl">
      <div className="bg-navy px-5 py-6"><div className="flex items-center justify-between"><img src={LOGO_URL} alt="Webgram IT Solution" width={720} height={177} className="h-10 w-auto brightness-0 invert" /><Button type="button" size="icon" variant="ghost" onClick={closeMenu} aria-label="Close navigation" className="text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><X /></Button></div></div>
      <nav className="flex-1 px-4 py-3" aria-label="Mobile navigation links"><div className="divide-y divide-border">{mobileItems.map(({ label, icon: Icon, target }, index) => <Link key={label} {...target} onClick={closeMenu} className={`flex min-h-12 items-center gap-4 rounded-md px-3 text-[15px] font-bold text-navy ${index === 0 ? "bg-primary-soft text-primary" : ""}`}><Icon className="h-5 w-5" /><span className="flex-1">{label}</span><ChevronRight className="h-4 w-4" /></Link>)}</div>
      <div className="mt-4 border-t border-border pt-4"><a href="tel:+917551120242" className="flex items-center gap-3 rounded-md bg-primary-soft p-3 text-navy"><span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><Phone className="h-5 w-5" /></span><span><strong className="block text-sm">Let’s Talk</strong><small className="text-muted-foreground">Get a free consultation</small></span><ChevronRight className="ml-auto h-4 w-4" /></a><Button asChild className="mt-3 h-11 w-full font-bold"><Link to="/contact" onClick={closeMenu}><Send />Get Free Quote<ChevronRight className="ml-auto" /></Link></Button><Button asChild variant="outline" className="mt-2 h-11 w-full justify-start font-bold"><a href="tel:+917551120242"><CalendarDays />Schedule a Call<ChevronRight className="ml-auto" /></a></Button><Button asChild variant="outline" className="mt-2 h-11 w-full justify-start font-bold"><a href="https://wa.me/webgramitsolution" target="_blank" rel="noreferrer"><Headphones />Live Chat<ChevronRight className="ml-auto" /></a></Button></div>
      <div className="mt-5"><p className="text-xs font-bold text-navy">Follow Us</p><div className="mt-2 flex gap-2"><a href="https://www.linkedin.com/company/webgramitsolution" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded bg-linkedin text-on-dark"><Linkedin /></a><a href="https://www.facebook.com/webgramitsolution/" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded bg-facebook text-on-dark"><Facebook /></a><a href="https://www.instagram.com/webgramitsolution/" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded bg-instagram text-on-dark"><Instagram /></a><a href="https://www.youtube.com/@webgramitsolution" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded bg-youtube text-on-dark"><Youtube /></a></div></div></nav>
      <div className="grid grid-cols-2 border-t border-border p-4"><Link to="/auth" onClick={closeMenu} className="flex items-center gap-2 text-sm font-bold text-navy"><Users className="h-5 w-5" />Login</Link><Link to="/guest-login" onClick={closeMenu} className="flex items-center justify-end gap-2 border-l border-border text-sm font-bold text-navy"><Users className="h-5 w-5" />Create Account</Link></div>
    </aside></div> : null}
  </>;
}
