import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Building2,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Headphones,
  Linkedin,
  Layers3,
  MessageCircle,
  Send,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { IMAGES, clientLogos, technologyStack } from "@/lib/site-images";
import industriesImage from "@/assets/industries-strip.jpg";
import ctaImage from "@/assets/cta-mountain.jpg";
import webgramLogo from "@/assets/webgram-logo.png.asset.json";

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
      { property: "og:image", content: IMAGES.hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMAGES.hero },
    ],
  }),
  component: HomePage,
});

type Icon = ComponentType<{ className?: string }>;

const services: Array<{
  icon: Icon;
  title: string;
  text: string;
  link: string;
  image: string;
  alt: string;
}> = [
  {
    icon: ShoppingCart,
    title: "Ecommerce Development",
    text: "High-converting B2C ecommerce websites designed for performance and scalability.",
    link: "Explore Ecommerce",
    image: IMAGES.ecommerce,
    alt: "Laptop and phone showing a fashion ecommerce storefront",
  },
  {
    icon: BriefcaseBusiness,
    title: "B2B Commerce",
    text: "Wholesale pricing, MOQ, RFQ, customer groups, credit terms and bulk ordering.",
    link: "Explore B2B",
    image: IMAGES.b2b,
    alt: "Stacked cardboard shipping boxes for wholesale orders",
  },
  {
    icon: Store,
    title: "Marketplace Development",
    text: "Multi-vendor marketplaces with seller, buyer and admin ecosystems.",
    link: "Explore Marketplace",
    image: IMAGES.marketplace,
    alt: "Laptop and phone showing a furniture marketplace beside shipping boxes",
  },
  {
    icon: Code2,
    title: "Custom Commerce Platforms",
    text: "Custom-built commerce applications designed around your unique business model.",
    link: "Explore Custom Solutions",
    image: IMAGES.custom,
    alt: "Laptop showing custom commerce application source code",
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
  { tag: "B2B Marketplace", tagIcon: BriefcaseBusiness, title: "From Traditional Sales to a Scalable Digital Platform", chips: ["Manufacturing", "B2B Commerce"], image: IMAGES.caseManufacturing, alt: "Laptop showing a B2B marketplace dashboard inside a warehouse", stats: [["3X", "Sales Growth"], ["200+", "Active Buyers"], ["50%", "Faster Orders"]] },
  { tag: "Ecommerce Website", tagIcon: ShoppingCart, title: "Modern Ecommerce Experience for a Lifestyle Brand", chips: ["Lifestyle", "B2C Ecommerce"], image: IMAGES.caseLifestyle, alt: "Laptop showing a furniture and home decor ecommerce catalog beside a plant", stats: [["2.5X", "Conversion"], ["60%", "Repeat Customers"], ["40%", "Higher AOV"]] },
  { tag: "Custom Web Application", tagIcon: Code2, title: "Business Management Portal for a Distribution Company", chips: ["Distribution", "Custom Development"], image: IMAGES.caseDistribution, alt: "Laptop showing a business management dashboard with floating charts and servers", stats: [["70%", "Manual Work Reduced"], ["100+", "Team Members"], ["Real-time", "Inventory Tracking"]] },
];

function Logo() {
  return (
    <a href="#top" className="flex shrink-0 items-center" aria-label="Webgram IT Solution home">
      <img src={webgramLogo.url} alt="Webgram IT Solution" width={720} height={323} className="h-[38px] w-auto object-contain sm:h-[44px]" />
    </a>
  );
}

function Header() {
  const links = ["Website Development", "Google Ads", "GMB Listing", "SMO", "SEO", "Facebook Ads", "Our Portfolio", "Blog"];

  return (
    <header className="relative z-50 border-b border-on-dark/60 bg-navy text-on-dark">
      <div className="hidden h-[31px] border-b border-on-dark/20 md:block">
        <div className="header-shell flex h-full items-center justify-between text-[10px] font-medium uppercase">
          <div className="flex h-full items-center">
            <span className="border-x border-on-dark/15 px-3">English⌄</span>
            <span className="border-r border-on-dark/15 px-3">Country⌄</span>
            <strong className="px-3 font-semibold">GSTN:- 07CUHPK2017G1ZW</strong>
          </div>
          <div className="flex h-full items-center">
            <span className="flex items-center gap-3 border-r border-on-dark/15 px-3" aria-label="Social channels">
              <Facebook className="h-3.5 w-3.5" /><span className="font-bold">X</span><span className="font-bold">p</span><Linkedin className="h-3.5 w-3.5" /><Send className="h-3.5 w-3.5" />
            </span>
            {['Newsletter', 'Contact Us', 'FAQs'].map((item) => <span key={item} className="flex h-full items-center border-r border-on-dark/15 px-3">{item}</span>)}
          </div>
        </div>
      </div>
      <div className="header-shell flex h-[76px] items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link} href="#top" className="whitespace-nowrap text-[11px] font-semibold uppercase text-on-dark transition-opacity hover:opacity-75">
              {link}
            </a>
          ))}
        </nav>
        <div className="md:hidden text-[10px] font-medium uppercase">Webgram IT Solution</div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-shell">
      <div className="hero-media">
        <img src={IMAGES.hero} alt="Webgram ecommerce dashboards on a laptop and a mobile phone" width={2170} height={725} />
      </div>
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="page-shell hero-copy">
        <div className="max-w-[510px]">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">Digital Commerce & Technology Partner</p>
          <h1 className="max-w-[500px] text-[35px] font-bold leading-[1.04] tracking-normal sm:text-[42px] lg:text-[46px]">Digital Commerce,<br />Engineered for <span className="text-gold">Growth.</span></h1>
          <p className="mt-4 max-w-[500px] text-[14px] font-normal leading-5 text-on-dark/90 sm:text-[15px]">We build high-performance B2B, B2C, marketplace and custom commerce platforms designed around your business.</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button size="lg" className="h-10 bg-gold px-5 text-[11px] font-semibold text-navy hover:bg-gold/90">Start Your Project <ArrowRight /></Button>
            <Button size="lg" variant="outline" className="h-10 border-on-dark/60 bg-transparent px-5 text-[11px] font-semibold text-on-dark shadow-none hover:bg-on-dark/10 hover:text-on-dark">Explore Our Solutions</Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-medium text-on-dark/90">
            {["Ecommerce", "B2B & B2C", "Marketplace", "Custom Development"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky" />{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="bg-background py-5">
      <div className="page-shell">
        <h2 className="text-sm font-extrabold text-navy">Trusted by Businesses Building Their Digital Future</h2>
        <div className="logo-scroll mt-4 grid grid-flow-col auto-cols-[150px] items-center gap-3 overflow-x-auto pb-2 md:grid-flow-row md:auto-cols-auto md:grid-cols-7 md:overflow-visible md:pb-0" aria-label="Trusted business logos">
          {clientLogos.map((logo) => (
            <div key={logo.name} className="flex h-14 items-center justify-center rounded-md border border-border/70 bg-card px-3 shadow-card">
              <img src={logo.src} alt={`${logo.name} logo`} width={2475} height={875} loading="lazy" className="max-h-8 w-full object-contain" />
            </div>
          ))}
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
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {services.map(({ icon: IconComponent, title, text, link, image, alt }) => (
            <article key={title} className="relative min-h-[210px] overflow-hidden rounded-md border border-border bg-card p-4 pr-[46%] shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground"><IconComponent className="h-6 w-6" /></span>
              <h3 className="mt-3 text-[13px] font-extrabold leading-tight text-navy">{title}</h3>
              <p className="mt-2 text-[10px] font-medium leading-4 text-muted-foreground">{text}</p>
              <a href="#services" className="mt-3 inline-block text-[10px] font-extrabold text-primary">{link} →</a>
              <div className="service-visual">
                <img src={image} alt={alt} width={1536} height={1024} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="services" className="border-b border-border/60 bg-card py-5 md:py-3">
      <div className="page-shell grid items-center gap-5 md:min-h-[180px] md:grid-cols-[1.08fr_1.45fr_1.4fr] md:gap-3 lg:grid-cols-[1.05fr_1.5fr_1.35fr]">
        <div className="md:pr-2">
          <h2 className="max-w-[360px] text-[20px] font-bold leading-[1.08] text-navy md:text-[17px] lg:text-[20px]">From Storefront to Back Office —<br className="hidden lg:block" /> One Technology Partner.</h2>
          <p className="mt-2 max-w-[390px] text-[10px] font-normal leading-[1.55] text-muted-foreground md:text-[8px] lg:text-[10px]">We connect your entire commerce ecosystem — website, mobile app, inventory, payments, CRM and analytics.</p>
          <Button size="sm" className="mt-3 h-9 bg-primary px-5 text-[10px] font-medium text-primary-foreground md:h-8 md:px-4 md:text-[9px] lg:h-9 lg:px-5 lg:text-[10px]">Learn More <ArrowRight /></Button>
        </div>
        <div className="min-w-0">
          <img src={IMAGES.ecosystem} alt="Webgram commerce ecosystem linking storefront, commerce, operations, payments, analytics and integrations" width={6075} height={2528} loading="lazy" className="h-auto w-full object-contain" />
        </div>
        <div className="min-w-0">
          <img src={IMAGES.platforms} alt="Webgram ecommerce website, B2B portal and mobile app" width={1944} height={809} loading="lazy" className="h-auto w-full object-contain" />
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="company" className="border-y border-border bg-sky-soft py-6">
      <div className="page-shell"><h2 className="section-title">Why Businesses Choose Webgram</h2><p className="section-subtitle">More than just development — we are your long-term digital commerce partner.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6">{strengths.map(({ icon: IconComponent, title, text, tone }) => <article key={title} className="grid grid-cols-[auto_1fr] gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${tone}`}><IconComponent className="h-5 w-5" /></span><span><h3 className="text-[10px] font-extrabold leading-tight text-navy">{title}</h3><p className="mt-1 text-[8px] leading-3 text-muted-foreground">{text}</p></span></article>)}</div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="bg-navy py-7 text-on-dark">
      <div className="page-shell grid gap-5 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
        <div><p className="eyebrow">Industries</p><h2 className="mt-2 text-[27px] font-extrabold leading-[0.95]">Built Around<br />Your Industry</h2><p className="mt-3 text-[10px] leading-4 text-on-dark/75">We develop customized commerce solutions for diverse industries.</p><Button size="sm" className="mt-4 bg-gold px-5 text-[10px] font-bold text-navy hover:bg-gold/90">Explore Industries <ArrowRight /></Button></div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {industries.map((industry, index) => <article key={industry} className="industry-card"><img src={industriesImage} alt="" loading="lazy" width={1536} height={512} className={`industry-image industry-image-${index}`} /><div className="industry-shade" /><strong>{industry} →</strong></article>)}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="case-studies" className="bg-sky-soft py-4">
      <div className="page-shell grid gap-4 md:grid-cols-[188px_minmax(0,1fr)] lg:grid-cols-[205px_minmax(0,1fr)]">
        <div className="self-center"><p className="eyebrow text-primary">Case Studies</p><h2 className="section-title mt-2 text-[25px] leading-[1.02]">Work That<br />Speaks for Itself</h2><p className="section-subtitle mt-2 max-w-[190px]">Real businesses. Real results. Explore how we help companies grow with digital commerce.</p><Button asChild size="sm" className="mt-3 h-9 bg-gold px-4 text-[9px] font-bold text-navy shadow-card transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-gold/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><a href="#case-studies">View All Case Studies <ArrowRight /></a></Button></div>
        <div className="case-scroll grid grid-flow-col auto-cols-[278px] gap-3 overflow-x-auto pb-2 md:auto-cols-auto md:grid-flow-row md:grid-cols-3 md:overflow-visible md:pb-0" aria-label="Case studies">
          {cases.map((item) => {
            const TagIcon = item.tagIcon;
            return (
              <article key={item.title} tabIndex={0} aria-label={`${item.title} case study`} className="group relative flex h-[155px] flex-col overflow-hidden rounded-md border border-border bg-card shadow-card outline-none transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sky-soft">
                <div className="case-visual">
                  <img src={item.image} alt={item.alt} width={1934} height={813} loading="lazy" />
                </div>
                <div className="relative z-10 min-h-0 flex-1 p-3 pr-[45%]">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded border border-warning/20 bg-warning-soft px-2 py-1 text-[7px] font-extrabold text-navy"><TagIcon className="h-2.5 w-2.5 shrink-0 text-warning" />{item.tag}</span>
                  <h3 className="mt-2 text-[9px] font-extrabold leading-[1.3] text-navy">{item.title}</h3>
                  <div className="mt-2 flex flex-nowrap gap-1">
                    {item.chips.map((chip) => <span key={chip} className="whitespace-nowrap rounded bg-sky-soft px-2 py-1 text-[7px] font-semibold leading-none text-navy">{chip}</span>)}
                  </div>
                </div>
                <div className="relative z-10 grid h-[44px] shrink-0 grid-cols-3 border-t border-border/60 bg-card">
                  {item.stats.map(([number, label], index) => (
                    <div key={label} className={`min-w-0 px-2.5 py-2 ${index > 0 ? "border-l border-border/60" : ""}`}>
                      <strong className="block truncate text-[13px] font-extrabold leading-none text-navy">{number}</strong>
                      <span className="mt-1 block truncate text-[6px] leading-none text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="resources" className="bg-background py-6">
      <div className="page-shell grid gap-4 md:grid-cols-[178px_1fr] md:items-center lg:grid-cols-[205px_1fr]">
        <div>
          <h2 className="text-[19px] font-bold leading-[1.15] text-navy lg:text-[21px]">Technology That<br />Works Together</h2>
          <p className="mt-2 max-w-[178px] text-[10px] font-medium leading-[1.5] text-muted-foreground lg:max-w-[205px] lg:text-[11px]">We use modern, reliable and scalable technologies to build high-performance commerce solutions.</p>
        </div>
        <div className="md:border-l md:border-border md:pl-5 lg:pl-7">
          <div className="grid grid-cols-4 gap-x-3 gap-y-4 sm:grid-cols-6 md:grid-cols-12">
            {technologyStack.map(({ name, src }) => (
              <div key={name} className="flex flex-col items-center">
                <span className="grid h-14 w-14 place-items-center rounded-xl border border-border/80 bg-card p-3 shadow-card lg:h-16 lg:w-16">
                  <img src={src} alt={`${name} logo`} width={1200} height={1200} loading="lazy" className="h-full w-full object-contain" />
                </span>
                <span className="mt-2 block text-center text-[9px] leading-none text-muted-foreground lg:text-[10px]">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const steps = [[MessageCircle, "Consultation", "Free discussion"], [Layers3, "Solution Design", "Tailored to your goals"], [Code2, "Development", "On-time delivery"], [Headphones, "Support", "Long-term partnership"]] as const;
  return (
    <section className="relative min-h-[255px] overflow-hidden bg-navy text-on-dark"><img src={ctaImage} alt="Entrepreneur looking over mountain landscape at sunrise" loading="lazy" width={1536} height={512} className="absolute inset-0 h-full w-full object-cover object-[60%_center]" /><div className="absolute inset-0 bg-cta-overlay" /><div className="page-shell relative grid min-h-[255px] items-center gap-7 py-8 md:grid-cols-[1fr_1.2fr]"><div><h2 className="text-[30px] font-extrabold leading-none">Have a Business Idea?<br />Let’s Build It.</h2><p className="mt-3 max-w-[470px] text-[11px] leading-4 text-on-dark/85">Tell us what you're building. We'll help you turn it into a scalable digital commerce experience.</p><div className="mt-5 flex flex-wrap gap-3"><Button className="h-11 bg-gold px-6 text-[10px] font-bold text-navy hover:bg-gold/90">Start Your Project <ArrowRight /></Button><Button variant="outline" className="h-11 border-on-dark/60 bg-transparent px-6 text-[10px] font-bold text-on-dark shadow-none hover:bg-on-dark/10 hover:text-on-dark">Talk to an Expert</Button></div></div><div className="grid grid-cols-2 gap-5 sm:grid-cols-4">{steps.map(([IconComponent, title, text]) => <div key={title} className="text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-on-dark/40"><IconComponent className="h-5 w-5" /></span><strong className="mt-2 block text-[9px]">{title}</strong><small className="mt-1 block text-[7px] text-on-dark/70">{text}</small></div>)}</div></div></section>
  );
}

const footerColumns: Array<[string, string[]]> = [
  ["Solutions", ["Ecommerce", "B2B Commerce", "B2C Ecommerce", "Marketplace", "Custom Commerce"]],
  ["Services", ["Website Development", "Website Design", "WordPress", "WooCommerce", "Website Maintenance"]],
  ["Industries", ["Manufacturing", "Retail", "Wholesale", "Fashion", "Building Materials"]],
  ["Work", ["Case Studies", "Portfolio", "Client Stories", "FAQ"]],
  ["Resources", ["Blog", "Guides", "FAQs", "Insights"]],
  ["Company", ["About Us", "Our Process", "Careers", "Contact"]],
];

function Footer() {
  const socials: Array<[Icon, string]> = [[Linkedin, "LinkedIn"], [Instagram, "Instagram"], [Facebook, "Facebook"], [MessageCircle, "WhatsApp"]];
  return (
    <footer className="bg-navy text-on-dark">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.5fr_repeat(6,1fr)] md:gap-5">
        <div>
          <img src={webgramLogo.url} alt="Webgram IT Solution" width={720} height={323} loading="lazy" className="h-[52px] w-auto object-contain" />
          <p className="mt-4 max-w-[290px] text-[12px] leading-5 text-on-dark/90"><strong className="font-semibold text-on-dark">Webgram IT Solution</strong> excels in eCommerce website design, offering custom, user-friendly solutions to enhance online business success.</p>
          <ul className="mt-4 space-y-2 text-[11px] text-on-dark/90">
            <li className="flex gap-2"><Building2 className="h-4 w-4 shrink-0" />F3/780, Block C, Devli, Sangam Vihar, New Delhi, Delhi 110062</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0" /><a href="tel:+917551120242">+91 7551120242</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0" /><a href="mailto:info@webgramitsolution.com">info@webgramitsolution.com</a></li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:contents">
          {footerColumns.map(([title, items]) => (
            <div key={title}>
              <h3 className="text-[12px] font-bold uppercase">{title}</h3>
              <ul className="mt-3 space-y-2.5">
                {items.map((item) => <li key={item}><a href="#top" className="text-[11px] text-on-dark/70 transition-colors hover:text-on-dark">{item}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="page-shell flex flex-col items-center justify-between gap-3 pb-6 sm:flex-row">
        <span className="text-[12px] font-bold uppercase">Connect</span>
        <div className="flex gap-2">
          {socials.map(([IconComponent, label]) => <a key={label} href="#top" aria-label={label} className="grid h-8 w-8 place-items-center rounded bg-on-dark/20 transition-colors hover:bg-on-dark/35"><IconComponent className="h-4 w-4" /></a>)}
        </div>
      </div>
      <div className="border-t border-on-dark/15 py-5 text-center text-[12px] text-on-dark/90">© 2024 Webgram It Solution. All rights reserved</div>
    </footer>
  );
}

function HomePage() {
  return <main className="min-h-screen overflow-x-hidden bg-background font-sans"><Header /><Hero /><TrustStrip /><Services /><Ecosystem /><WhyUs /><Industries /><CaseStudies /><Technology /><FinalCta /><Footer /></main>;
}
