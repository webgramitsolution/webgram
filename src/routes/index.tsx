import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Boxes,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Globe2,
  Headphones,
  Layers3,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState, type ComponentType } from "react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/commerce-hero.jpg";
import industriesImage from "@/assets/industries-strip.jpg";
import ctaImage from "@/assets/cta-mountain.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webgram IT Solution | Digital Commerce Engineered for Growth" },
      {
        name: "description",
        content:
          "High-performance B2B, B2C, marketplace and custom commerce solutions engineered for sustainable growth.",
      },
      { property: "og:title", content: "Webgram IT Solution | Digital Commerce" },
      {
        property: "og:description",
        content: "Build, sell and scale with a full-service digital commerce technology partner.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

type Icon = ComponentType<{ className?: string }>;

const services: Array<{ icon: Icon; title: string; text: string; link: string; art: string }> = [
  {
    icon: ShoppingCart,
    title: "Ecommerce Development",
    text: "High-converting B2C ecommerce websites designed for performance and scalability.",
    link: "Explore Ecommerce",
    art: "Storefront",
  },
  {
    icon: BriefcaseBusiness,
    title: "B2B Commerce",
    text: "Wholesale pricing, MOQ, RFQ, customer groups, credit terms and bulk ordering.",
    link: "Explore B2B",
    art: "B2B Portal",
  },
  {
    icon: Store,
    title: "Marketplace Development",
    text: "Multi-vendor marketplaces with seller, buyer and admin ecosystems.",
    link: "Explore Marketplace",
    art: "Marketplace",
  },
  {
    icon: Code2,
    title: "Custom Commerce Platforms",
    text: "Custom-built commerce applications designed around your unique business model.",
    link: "Explore Custom Solutions",
    art: "Custom Code",
  },
];

const strengths: Array<{ icon: Icon; title: string; text: string; tone: string }> = [
  { icon: Blocks, title: "Business-First Development", text: "Technology aligned with your business goals.", tone: "text-warning bg-warning-soft" },
  { icon: Layers3, title: "Custom Architecture", text: "Built around your unique requirements.", tone: "text-cyan bg-cyan-soft" },
  { icon: Users, title: "B2B + B2C Expertise", text: "Retail and wholesale commerce solutions.", tone: "text-primary bg-primary-soft" },
  { icon: BarChart3, title: "Scalable Technology", text: "From startup to enterprise growth.", tone: "text-success bg-success-soft" },
  { icon: Zap, title: "Performance Focused", text: "Speed, SEO and best practices.", tone: "text-orange bg-orange-soft" },
  { icon: ShieldCheck, title: "Long-Term Partnership", text: "Development, maintenance and ongoing support.", tone: "text-violet bg-violet-soft" },
];

const industries = ["Manufacturing", "Retail", "Wholesale", "Furniture", "Fashion", "Electronics"];

const cases = [
  { tag: "B2B Marketplace", title: "From Traditional Sales to a Scalable Digital Platform", type: "Manufacturing", stats: [["3X", "Sales Growth"], ["200+", "Active Buyers"], ["50%", "Faster Orders"]] },
  { tag: "Ecommerce Website", title: "Modern Ecommerce Experience for a Lifestyle Brand", type: "Lifestyle", stats: [["2.5X", "Conversion"], ["60%", "Repeat Customers"], ["40%", "Higher AOV"]] },
  { tag: "Custom Web Application", title: "Business Management Portal for a Distribution Company", type: "Distribution", stats: [["70%", "Manual Work Reduced"], ["100+", "Team Members"], ["Real-time", "Inventory Tracking"]] },
];

const technologies: Array<{ name: string; icon: Icon }> = [
  { name: "React.js", icon: Blocks },
  { name: "Next.js", icon: Code2 },
  { name: "Node.js", icon: Boxes },
  { name: "WordPress", icon: Globe2 },
  { name: "WooCommerce", icon: ShoppingCart },
  { name: "Supabase", icon: Zap },
  { name: "PostgreSQL", icon: Database },
  { name: "Razorpay", icon: ShieldCheck },
  { name: "WhatsApp API", icon: MessageCircle },
  { name: "AWS", icon: Cloud },
  { name: "Google Cloud", icon: Cloud },
];

function Logo() {
  return (
    <a href="#top" className="flex shrink-0 items-center gap-2" aria-label="Webgram IT Solution home">
      <span className="brand-mark" aria-hidden="true">W</span>
      <span className="leading-none">
        <strong className="block text-[15px] text-ink">Webgram IT Solution</strong>
        <small className="mt-1 block text-[8px] font-semibold text-muted-foreground">Build. Sell. Scale.</small>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Solutions", "Services", "Industries", "Case Studies", "Resources", "Company"];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="page-shell grid h-[62px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:flex">
        <Logo />
        <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {links.map((link, index) => (
            <a key={link} href={index === 0 ? "#top" : `#${link.toLowerCase().replaceAll(" ", "-")}`} className="flex items-center gap-1 text-[11px] font-bold text-ink transition-colors hover:text-primary">
              {link}{[1, 2, 3, 5, 6].includes(index) && <ChevronDown className="h-3 w-3" />}
            </a>
          ))}
        </nav>
        <div className="ml-4 hidden items-center gap-4 lg:flex">
          <Search className="h-5 w-5 text-ink" />
          <div className="h-8 w-px bg-border" />
          <Phone className="h-5 w-5 text-primary" />
          <div className="text-[10px] font-bold leading-tight text-ink"><span className="block">+91 98765 43210</span><span className="text-muted-foreground">Let's Talk</span></div>
          <Button className="h-9 bg-navy px-5 text-[11px] text-on-dark hover:bg-navy/90">Start Your Project <ArrowRight /></Button>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          {links.map((link, index) => <a key={link} href={index === 0 ? "#top" : `#${link.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setOpen(false)} className="block border-b border-border/70 py-3 text-sm font-bold text-ink">{link}</a>)}
          <Button className="mt-4 w-full bg-navy text-on-dark">Start Your Project <ArrowRight /></Button>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[486px] overflow-hidden bg-navy text-on-dark md:min-h-[478px]">
      <img src={heroImage} alt="Ecommerce dashboards displayed on a laptop and mobile phone" width={1536} height={640} className="absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-center" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="page-shell relative flex min-h-[486px] items-center py-14 md:min-h-[478px]">
        <div className="max-w-[570px]">
          <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.24em] text-sky">Digital Commerce & Technology Partner</p>
          <h1 className="max-w-[560px] text-[39px] font-extrabold leading-[1.02] tracking-normal sm:text-[50px] lg:text-[55px]">Digital Commerce,<br />Engineered for <span className="text-gold">Growth.</span></h1>
          <p className="mt-5 max-w-[560px] text-[16px] font-medium leading-6 text-on-dark/90 sm:text-[18px]">We build high-performance B2B, B2C, marketplace and custom commerce platforms designed around your business.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" className="h-12 bg-gold px-7 text-xs font-extrabold text-navy hover:bg-gold/90">Start Your Project <ArrowRight /></Button>
            <Button size="lg" variant="outline" className="h-12 border-on-dark/60 bg-transparent px-7 text-xs font-extrabold text-on-dark shadow-none hover:bg-on-dark/10 hover:text-on-dark">Explore Our Solutions</Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-semibold text-on-dark/90">
            {["Ecommerce", "B2B & B2C", "Marketplace", "Custom Development"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky" />{item}</span>)}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-5 top-6 hidden w-[178px] space-y-4 xl:block">
        {["Marketplace", "Mobile Apps", "Integrations"].map((item, index) => <div key={item} className="border border-sky/40 bg-navy/65 p-4 text-[10px] font-bold backdrop-blur"><span className="text-sky">0{index + 1}</span><span className="ml-3">{item}</span></div>)}
      </div>
    </section>
  );
}

function TrustStrip() {
  const logos = ["asianpaints", "HAVELLS", "Kajaria", "Godrej", "L&T", "JSLA", "POLYCAB", "Crompton", "Supreme", "Hettich"];
  return (
    <section className="bg-background py-5">
      <div className="page-shell">
        <h2 className="text-sm font-extrabold text-navy">Trusted by Businesses Building Their Digital Future</h2>
        <div className="mt-4 grid items-center gap-5 lg:grid-cols-[1fr_auto]">
          <div className="grid grid-cols-3 items-center gap-4 sm:grid-cols-5 lg:grid-cols-10">
            {logos.map((logo, index) => <span key={logo} className={`text-center text-[11px] font-black italic ${index % 3 === 0 ? "text-danger" : index % 3 === 1 ? "text-primary" : "text-navy"}`}>{logo}</span>)}
          </div>
          <div className="grid grid-cols-4 divide-x divide-border border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            {[["100+", "Web Projects"], ["50+", "Commerce Solutions"], ["20+", "Industries Served"], ["24/7", "Technical Support"]].map(([value, label]) => <div key={label} className="min-w-[102px] px-3 text-center"><strong className="block text-xl font-extrabold text-navy">{value}</strong><span className="text-[8px] font-semibold text-muted-foreground">{label}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="solutions" className="bg-sky-soft py-6 md:py-8">
      <div className="page-shell">
        <div className="flex items-end justify-between gap-4">
          <div><h2 className="section-title">Our Digital Commerce Solutions</h2><p className="section-subtitle">End-to-end solutions to build, sell and scale your business online.</p></div>
          <a href="#services" className="hidden text-[10px] font-bold text-primary underline sm:block">View All Solutions →</a>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {services.map(({ icon: IconComponent, title, text, link, art }, index) => (
            <article key={title} className="relative min-h-[190px] overflow-hidden rounded-md border border-border bg-card p-4 pr-[42%] shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground"><IconComponent className="h-6 w-6" /></span>
              <h3 className="mt-3 text-[13px] font-extrabold leading-tight text-navy">{title}</h3>
              <p className="mt-2 text-[10px] font-medium leading-4 text-muted-foreground">{text}</p>
              <a href="#services" className="mt-3 inline-block text-[10px] font-extrabold text-primary">{link} →</a>
              <div className={`service-art service-art-${index}`}><span>{art}</span><BarChart3 /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const items: Array<{ icon: Icon; label: string; sub: string }> = [
    { icon: ShoppingCart, label: "Storefront", sub: "Website | Mobile App" },
    { icon: BriefcaseBusiness, label: "Commerce", sub: "B2B | B2C | Marketplace" },
    { icon: Database, label: "Operations", sub: "Inventory | Orders | CRM" },
    { icon: ShieldCheck, label: "Payments", sub: "Razorpay | PayU | COD" },
    { icon: BarChart3, label: "Analytics", sub: "Reports | Growth" },
    { icon: Blocks, label: "Integrations", sub: "WhatsApp | Shipping | ERP" },
  ];
  return (
    <section id="services" className="bg-background py-7">
      <div className="page-shell grid items-center gap-7 lg:grid-cols-[1fr_1.2fr_1fr]">
        <div>
          <h2 className="section-title max-w-[280px]">From Storefront to Back Office — One Technology Partner.</h2>
          <p className="section-subtitle mt-2 max-w-[360px]">We connect your entire commerce ecosystem — website, mobile app, inventory, payments, CRM and analytics.</p>
          <Button size="sm" className="mt-4 bg-primary px-5 text-primary-foreground">Learn More <ArrowRight /></Button>
        </div>
        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="absolute inset-0 m-auto hidden h-24 w-24 place-items-center rounded-full border-2 border-primary/30 bg-background text-center sm:grid"><strong className="text-primary">W</strong><span className="block text-[9px] font-bold text-navy">Webgram</span></div>
          {items.map(({ icon: IconComponent, label, sub }) => <div key={label} className="flex min-h-16 items-center gap-2 rounded-md border border-primary/15 bg-background p-2 sm:odd:mr-12 sm:even:ml-12"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"><IconComponent className="h-4 w-4" /></span><span><strong className="block text-[9px] text-navy">{label}</strong><small className="text-[7px] text-muted-foreground">{sub}</small></span></div>)}
        </div>
        <div className="grid grid-cols-3 items-end gap-3">
          {["Ecommerce Website", "B2B Portal", "Mobile App"].map((label, index) => <div key={label} className="text-center"><div className={`device-frame ${index === 2 ? "device-phone" : ""}`}><div className="device-screen"><span /><span /><span /></div></div><strong className="mt-2 block text-[8px] text-navy">{label}</strong></div>)}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="company" className="border-y border-border bg-sky-soft py-6">
      <div className="page-shell"><h2 className="section-title">Why Businesses Choose Webgram</h2><p className="section-subtitle">More than just development — we are your long-term digital commerce partner.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{strengths.map(({ icon: IconComponent, title, text, tone }) => <article key={title} className="grid grid-cols-[auto_1fr] gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${tone}`}><IconComponent className="h-5 w-5" /></span><span><h3 className="text-[10px] font-extrabold leading-tight text-navy">{title}</h3><p className="mt-1 text-[8px] leading-3 text-muted-foreground">{text}</p></span></article>)}</div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="bg-navy py-7 text-on-dark">
      <div className="page-shell grid gap-5 lg:grid-cols-[220px_1fr]">
        <div><p className="eyebrow">Industries</p><h2 className="mt-2 text-[27px] font-extrabold leading-[0.95]">Built Around<br />Your Industry</h2><p className="mt-3 text-[10px] leading-4 text-on-dark/75">We develop customized commerce solutions for diverse industries.</p><Button size="sm" className="mt-4 bg-gold px-5 text-[10px] font-bold text-navy hover:bg-gold/90">Explore Industries <ArrowRight /></Button></div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry, index) => <article key={industry} className="industry-card"><img src={industriesImage} alt="" loading="lazy" width={1536} height={512} className={`industry-image industry-image-${index}`} /><div className="industry-shade" /><strong>{industry} →</strong></article>)}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="case-studies" className="bg-background py-7">
      <div className="page-shell grid gap-5 lg:grid-cols-[220px_1fr]">
        <div><p className="eyebrow text-primary">Case Studies</p><h2 className="section-title mt-2 text-[27px] leading-[0.95]">Work That<br />Speaks for Itself</h2><p className="section-subtitle mt-3">Real businesses. Real results. Explore how we help companies grow with digital commerce.</p><Button size="sm" className="mt-4 bg-gold px-5 text-[10px] font-bold text-navy hover:bg-gold/90">View All Case Studies <ArrowRight /></Button></div>
        <div className="grid gap-3 md:grid-cols-3">{cases.map((item, index) => <article key={item.title} className="overflow-hidden rounded-md border border-border bg-card shadow-card"><div className={`case-art case-art-${index}`}><BarChart3 className="h-11 w-11" /></div><div className="p-4"><span className="text-[8px] font-bold text-warning">▣ {item.tag}</span><h3 className="mt-2 min-h-10 text-[11px] font-extrabold leading-tight text-navy">{item.title}</h3><span className="mt-2 inline-block bg-muted px-2 py-1 text-[7px] font-semibold text-muted-foreground">{item.type}</span><div className="mt-4 grid grid-cols-3 gap-2">{item.stats.map(([number, label]) => <div key={label}><strong className="block text-base font-extrabold text-primary">{number}</strong><span className="text-[7px] leading-none text-muted-foreground">{label}</span></div>)}</div></div></article>)}</div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="resources" className="border-t border-border bg-background py-6">
      <div className="page-shell grid gap-5 lg:grid-cols-[220px_1fr]"><div><h2 className="section-title">Technology That<br />Works Together</h2><p className="section-subtitle mt-2">We use modern, reliable and scalable technologies to build high-performance commerce solutions.</p></div><div className="grid grid-cols-4 gap-3 sm:grid-cols-6 xl:grid-cols-11">{technologies.map(({ name, icon: IconComponent }, index) => <div key={name} className="text-center"><span className={`mx-auto grid h-12 w-12 place-items-center rounded-md border border-border bg-card ${index % 4 === 0 ? "text-cyan" : index % 4 === 1 ? "text-ink" : index % 4 === 2 ? "text-success" : "text-primary"}`}><IconComponent className="h-6 w-6" /></span><strong className="mt-2 block text-[8px] text-navy">{name}</strong></div>)}</div></div>
    </section>
  );
}

function FinalCta() {
  const steps = [[MessageCircle, "Consultation", "Free discussion"], [Layers3, "Solution Design", "Tailored to your goals"], [Code2, "Development", "On-time delivery"], [Headphones, "Support", "Long-term partnership"]] as const;
  return (
    <section className="relative min-h-[255px] overflow-hidden bg-navy text-on-dark"><img src={ctaImage} alt="Entrepreneur looking over mountain landscape at sunrise" loading="lazy" width={1536} height={512} className="absolute inset-0 h-full w-full object-cover object-[60%_center]" /><div className="absolute inset-0 bg-cta-overlay" /><div className="page-shell relative grid min-h-[255px] items-center gap-7 py-8 lg:grid-cols-[1fr_1.2fr]"><div><h2 className="text-[30px] font-extrabold leading-none">Have a Business Idea?<br />Let’s Build It.</h2><p className="mt-3 max-w-[470px] text-[11px] leading-4 text-on-dark/85">Tell us what you're building. We'll help you turn it into a scalable digital commerce experience.</p><div className="mt-5 flex flex-wrap gap-3"><Button className="h-11 bg-gold px-6 text-[10px] font-bold text-navy hover:bg-gold/90">Start Your Project <ArrowRight /></Button><Button variant="outline" className="h-11 border-on-dark/60 bg-transparent px-6 text-[10px] font-bold text-on-dark shadow-none hover:bg-on-dark/10 hover:text-on-dark">Talk to an Expert</Button></div></div><div className="grid grid-cols-2 gap-5 sm:grid-cols-4">{steps.map(([IconComponent, title, text]) => <div key={title} className="text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-on-dark/40"><IconComponent className="h-5 w-5" /></span><strong className="mt-2 block text-[9px]">{title}</strong><small className="mt-1 block text-[7px] text-on-dark/70">{text}</small></div>)}</div></div></section>
  );
}

function HomePage() {
  return <main className="min-h-screen overflow-x-hidden bg-background font-sans"><Header /><Hero /><TrustStrip /><Services /><Ecosystem /><WhyUs /><Industries /><CaseStudies /><Technology /><FinalCta /></main>;
}