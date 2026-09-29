import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Eye, Facebook, Gem, Linkedin, Send, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import webgramLogo from "@/assets/webgram-logo.png.asset.json";
import { aboutImages } from "@/lib/site-images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Webgram IT Solution | Purpose, Team & Workspace" },
      { name: "description", content: "Meet Webgram IT Solution, discover our mission, vision and values, and explore the collaborative workspace behind our digital growth services." },
      { property: "og:title", content: "About Webgram IT Solution" },
      { property: "og:description", content: "Driven by purpose and focused on helping businesses grow through thoughtful digital solutions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://homepage-replica-magic.lovable.app/about" },
      { property: "og:image", content: `${aboutImages.banner}?tr=w-1200,h-630,c-at_max` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${aboutImages.banner}?tr=w-1200,h-630,c-at_max` },
    ],
    links: [{ rel: "canonical", href: "https://homepage-replica-magic.lovable.app/about" }],
  }),
  component: AboutPage,
});

const menu: Array<[string, string[]]> = [
  ["Home", []],
  ["Solutions", ["Ecommerce Development", "B2B Commerce", "Marketplace Development"]],
  ["Services", ["Website Development", "SEO", "Google Ads", "Social Media Ads"]],
  ["Industries", ["Manufacturing", "Retail", "Wholesale", "Furniture"]],
  ["Case Studies", []],
  ["Resources", ["Blog", "Guides", "FAQs", "Insights"]],
  ["Company", ["About Us", "Careers", "Contact Us"]],
];

function AboutHeader() {
  return <header className="relative z-50 border-b border-on-dark/60 bg-navy text-on-dark">
    <div className="hidden h-[31px] border-b border-on-dark/20 md:block"><div className="header-shell flex h-full items-center justify-between text-[10px] font-medium uppercase"><div className="flex h-full items-center"><span className="border-x border-on-dark/15 px-3">English⌄</span><span className="border-r border-on-dark/15 px-3">Country⌄</span><strong className="px-3 font-semibold">GSTN:- 07CUHPK2017G1ZW</strong></div><div className="flex h-full items-center"><span className="flex items-center gap-3 border-r border-on-dark/15 px-3"><Facebook className="h-3.5 w-3.5" /><span className="font-bold">X</span><span className="font-bold">p</span><Linkedin className="h-3.5 w-3.5" /><Send className="h-3.5 w-3.5" /></span>{["Newsletter", "Contact Us", "FAQs"].map((item) => <Link key={item} to="/" hash={item === "FAQs" ? "faq" : item === "Contact Us" ? "contact" : "top"} className="flex h-full items-center border-r border-on-dark/15 px-3">{item}</Link>)}</div></div></div>
    <div className="header-shell flex h-[76px] items-center justify-between gap-5"><Link to="/" className="flex shrink-0 items-center" aria-label="Webgram IT Solution home"><img src={webgramLogo.url} alt="Webgram IT Solution" width={720} height={323} className="h-[38px] w-auto object-contain sm:h-[44px]" /></Link><nav className="hidden h-full items-center gap-5 md:flex" aria-label="Primary navigation">{menu.map(([label, items]) => <div key={label} className="group relative flex h-full items-center">{label === "Home" ? <Link to="/" className="whitespace-nowrap text-[11px] font-semibold uppercase text-on-dark transition-opacity hover:opacity-75">Home</Link> : <span className="flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold uppercase text-on-dark">{label}{items.length > 0 && <ChevronDown className="h-3 w-3" />}</span>}{items.length > 0 && <ul className="invisible absolute left-0 top-full min-w-[210px] translate-y-1 rounded-b-md border border-border bg-card py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">{items.map((item) => <li key={item}>{item === "About Us" ? <Link to="/about" className="block bg-sky-soft px-4 py-2 text-[12px] font-semibold text-primary">{item}</Link> : <Link to="/" hash={item === "Contact Us" ? "contact" : item === "FAQs" ? "faq" : "top"} className="block px-4 py-2 text-[12px] font-medium text-navy hover:bg-sky-soft hover:text-primary">{item}</Link>}</li>)}</ul>}</div>)}</nav><Button asChild className="h-9 bg-gold px-4 text-[10px] font-bold text-navy hover:bg-gold/90 md:hidden"><Link to="/" hash="contact">Contact Us</Link></Button></div>
  </header>;
}

function AboutHero() {
  return <section className="relative min-h-[330px] overflow-hidden bg-navy md:aspect-[2170/725] md:min-h-0"><img src={aboutImages.banner} alt="Webgram IT Solution office reception" width={2170} height={725} className="absolute inset-0 h-full w-full object-cover object-right max-md:opacity-45" /><div className="page-shell relative z-10 flex h-full min-h-[330px] items-center md:absolute md:inset-0 md:min-h-0"><div className="max-w-[510px] py-8 text-on-dark"><p className="text-[10px] font-bold uppercase text-gold">About Webgram</p><h1 className="mt-3 text-[34px] font-extrabold leading-[1.05] sm:text-[41px] lg:text-[46px]">Ideas. Technology.<br /><span className="text-gold">Growth.</span></h1><p className="mt-4 max-w-[470px] text-[12px] leading-5 text-on-dark/85">We build thoughtful digital experiences that help ambitious businesses move forward with confidence.</p></div></div></section>;
}

function Purpose() {
  const pillars = [[Target, "Our Mission", "To create dependable digital solutions that turn business ideas into measurable growth."], [Eye, "Our Vision", "To be the trusted technology partner behind modern, scalable businesses."], [Gem, "Our Values", "Clarity, collaboration and care guide every decision we make."]] as const;
  return <section className="bg-card"><div className="grid md:grid-cols-[min(38%,560px)_1fr]"><div className="relative min-h-[250px] md:min-h-[390px]"><img src={aboutImages.mission} alt="Webgram creative office interior" width={1716} height={917} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></div><div className="flex items-center px-5 py-9 sm:px-8 md:px-10 lg:px-14"><div className="w-full"><p className="eyebrow flex items-center gap-3 text-primary"><span className="h-px w-8 bg-gold" />Our Mission, Vision &amp; Values</p><h2 className="mt-3 text-[26px] font-extrabold leading-tight text-navy lg:text-[30px]">Driven by Purpose,<br />Focused on Your Growth</h2><div className="mt-7 grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-border">{pillars.map(([Icon, title, text]) => <article key={title} className="sm:px-5 sm:first:pl-0"><span className="grid h-11 w-11 place-items-center rounded-full bg-sky-soft text-primary"><Icon className="h-5 w-5" /></span><h3 className="mt-3 text-[13px] font-extrabold text-navy">{title}</h3><p className="mt-2 text-[10px] leading-4 text-muted-foreground">{text}</p></article>)}</div></div></div></div></section>;
}

function Workspace() {
  return <section className="bg-background py-10 md:py-12"><div className="page-shell grid gap-7 md:grid-cols-[230px_1fr] lg:grid-cols-[260px_1fr]"><div><p className="eyebrow flex items-center gap-3 text-primary"><span className="h-px w-8 bg-gold" />Our Workspace</p><h2 className="mt-3 text-[24px] font-extrabold leading-tight text-navy">A Creative &amp;<br />Collaborative Environment</h2><p className="mt-3 text-[10px] leading-4 text-muted-foreground">Our workspace is designed for focused thinking, open collaboration and creating work that makes a real difference.</p><Button asChild className="mt-5 h-9 bg-gold px-5 text-[10px] font-bold text-navy hover:bg-gold/90"><Link to="/" hash="contact">Join Our Team <ArrowRight /></Link></Button></div><div className="grid gap-4 sm:grid-cols-3">{aboutImages.workspace.map((image) => <figure key={image.label} className="group relative overflow-hidden rounded-md"><img src={image.src} alt={image.label} width={1672} height={941} loading="lazy" className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-full md:min-h-[235px]" /><figcaption className="absolute bottom-3 left-3 rounded bg-navy/85 px-3 py-2 text-[9px] font-semibold text-on-dark">{image.label}</figcaption></figure>)}</div></div></section>;
}

function AboutPage() {
  return <main className="min-h-screen overflow-x-hidden bg-background font-sans"><AboutHeader /><AboutHero /><Purpose /><Workspace /><section className="bg-navy py-8 text-center text-on-dark"><div className="page-shell"><h2 className="text-[24px] font-extrabold">Let’s Build What’s Next</h2><p className="mt-2 text-[10px] text-on-dark/75">Tell us what you want to create, and we’ll help shape the way forward.</p><Button asChild className="mt-4 h-10 bg-gold px-6 text-[10px] font-bold text-navy hover:bg-gold/90"><Link to="/" hash="contact">Contact Us <ArrowRight /></Link></Button></div></section></main>;
}