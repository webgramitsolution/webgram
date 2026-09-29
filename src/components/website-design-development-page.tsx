import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Code2,
  FileCode2,
  Gauge,
  Headphones,
  Image,
  LayoutTemplate,
  MonitorSmartphone,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { useRef } from "react";

import industryManufacturing from "@/assets/b2b-industry-1.jpg";
import industryArchitecture from "@/assets/b2b-industry-2.jpg";
import industryRealEstate from "@/assets/b2b-industry-3.jpg";
import industryRetail from "@/assets/b2b-industry-4.jpg";
import industryEducation from "@/assets/b2b-industry-5.jpg";
import industryHealthcare from "@/assets/b2b-industry-6.jpg";
import projectCorporate from "@/assets/ecommerce-electronics-case.jpg";
import projectFurniture from "@/assets/ecommerce-furniture-case.jpg";
import projectProfessional from "@/assets/ecommerce-fashion-case.jpg";
import mysqlLogo from "@/assets/mysql.png.asset.json";
import phpLogo from "@/assets/php.svg.asset.json";
import websiteHero from "@/assets/website-design-hero.jpg";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { technologyStack } from "@/lib/site-images";

const heroBenefits = [
  [PenTool, "Modern &", "Unique Design"],
  [Target, "SEO", "Optimized"],
  [MonitorSmartphone, "Mobile", "Responsive"],
  [ShieldCheck, "Fast &", "Secure"],
] as const;

const strengths = [
  [Target, "Business-Focused Approach", "Websites designed to achieve your business goals."],
  [PenTool, "Creative & Modern Designs", "Unique, user-friendly designs that reflect your brand."],
  [ShieldCheck, "Scalable & Secure Development", "Built with clean code, security and future growth in mind."],
  [Headphones, "Ongoing Support", "Continuous maintenance, updates and technical support."],
] as const;

const solutions = [
  [industryRealEstate, Building2, "Corporate Websites", "Build a strong online presence with professional corporate websites."],
  [industryArchitecture, BriefcaseBusiness, "Business Websites", "Modern websites for growing businesses to showcase products and services."],
  [projectProfessional, Users, "Professional Websites", "Personal and professional websites for consultants, freelancers and experts."],
  [projectFurniture, LayoutTemplate, "Product & Service Websites", "Showcase your products and services with high-converting website designs."],
  [industryRetail, Image, "Portfolio Websites", "Creative portfolios for architects, designers, photographers and artists."],
] as const;

const process = [
  [Search, "01", "Discovery", "Understand your goals, brand and requirements."],
  [FileCode2, "02", "Strategy", "Plan the design, structure and technology."],
  [Palette, "03", "Design", "Create stunning and user-focused designs."],
  [Code2, "04", "Development", "Build with clean, scalable and secure code."],
  [Gauge, "05", "Testing", "Ensure performance, security and functionality."],
  [Rocket, "06", "Launch", "Go live and provide ongoing support."],
] as const;

const industries = [
  [industryManufacturing, "Manufacturing"],
  [industryArchitecture, "Architecture & Interior"],
  [industryRealEstate, "Real Estate"],
  [industryRetail, "Retail & Lifestyle"],
  [industryEducation, "Education"],
  [industryHealthcare, "Healthcare"],
  [projectCorporate, "Finance & Consulting"],
] as const;

const technologies = [
  technologyStack[3],
  { name: "PHP", src: phpLogo.url },
  { name: "Laravel", src: technologyStack[7]?.src ?? phpLogo.url },
  technologyStack[0],
  technologyStack[1],
  technologyStack[2],
  { name: "MySQL", src: mysqlLogo.url },
  technologyStack[9],
  technologyStack[10],
  { name: "HTML5", src: technologyStack[11]?.src ?? technologyStack[0]?.src ?? "" },
  { name: "CSS3", src: technologyStack[11]?.src ?? technologyStack[0]?.src ?? "" },
  { name: "JavaScript", src: technologyStack[1]?.src ?? "" },
].filter((technology): technology is { name: string; src: string } => Boolean(technology));

const projects = [
  [projectCorporate, "Corporate Website", "Manufacturing Company"],
  [projectFurniture, "Business Website", "Interior & Furniture Brand"],
  [projectProfessional, "Professional Website", "Consultant & Coach"],
  [websiteHero, "Real Estate Website", "Property Developer"],
  [industryHealthcare, "Healthcare Website", "Hospital & Clinic"],
] as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[8px] font-extrabold uppercase tracking-[0.16em] text-primary">
      <span className="h-0.5 w-8 bg-gold" /> {children}
    </p>
  );
}

function ProjectCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 290, behavior: "smooth" });

  return (
    <div className="relative mt-3">
      <div ref={track} className="ecom-scroll grid snap-x grid-flow-col auto-cols-[245px] gap-3 overflow-x-auto md:grid-cols-5 md:overflow-visible">
        {projects.map(([image, title, category]) => (
          <article key={title} className="snap-start overflow-hidden rounded-md border border-border bg-card">
            <div className="h-[120px] overflow-hidden bg-muted md:h-[110px]">
              <img src={image} alt={`${title} project`} width={640} height={360} loading="lazy" className="h-full w-full object-cover object-center" />
            </div>
            <div className="px-3 py-2">
              <h3 className="text-[10px] font-extrabold text-navy">{title}</h3>
              <p className="mt-0.5 text-[8px] text-muted-foreground">{category}</p>
            </div>
          </article>
        ))}
      </div>
      <Button type="button" variant="outline" size="icon" aria-label="Previous projects" onClick={() => move(-1)} className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-navy shadow-card md:hidden"><ArrowLeft /></Button>
      <Button type="button" variant="outline" size="icon" aria-label="Next projects" onClick={() => move(1)} className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-navy shadow-card md:hidden"><ArrowRight /></Button>
    </div>
  );
}

export function WebsiteDesignDevelopmentPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="ecom-hero relative overflow-hidden bg-navy text-on-dark">
        <img src={websiteHero} alt="Architecture website displayed on a laptop and phone" width={1920} height={760} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="ecom-hero-shade absolute inset-0" />
        <div className="ecom-shell relative flex h-full items-center py-5">
          <div className="max-w-[525px]">
            <nav className="sr-only" aria-label="Breadcrumb"><Link to="/">Home</Link> › Solutions › Website Design &amp; Development</nav>
            <p className="ecom-eyebrow">Website Design &amp; Development</p>
            <h1 className="mt-2 text-[30px] font-semibold leading-[1.05] sm:text-[34px] md:text-[37px] lg:text-[40px]">Professional Websites<br />That Bring <span className="text-gold">Real Results.</span></h1>
            <p className="mt-3 max-w-[500px] text-[11px] leading-[1.45] text-on-dark/90 md:text-[12px]">We design and develop modern, high-performing websites for businesses, corporates and professionals. From strategy and design to development and launch, we create digital experiences that build your brand, attract customers and drive growth.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="h-10 bg-gold px-6 text-[9px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Get a Free Consultation <ArrowRight /></Link></Button>
              <Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[9px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View Our Work <ArrowRight /></Link></Button>
            </div>
            <div className="mt-5 grid max-w-[460px] grid-cols-4 gap-3">
              {heroBenefits.map(([Icon, first, second]) => <div key={first} className="text-center text-[7px] font-semibold leading-[1.3]"><span className="mx-auto mb-1.5 grid h-9 w-9 place-items-center rounded-full border border-on-dark/50"><Icon className="h-4 w-4" /></span>{first}<br />{second}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-6 md:py-7">
        <div className="ecom-shell grid gap-5 md:grid-cols-[1.1fr_1.9fr] md:items-center">
          <div><Eyebrow>Why Choose Webgram</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-[1.05] text-navy md:text-[27px]">Your Trusted Website<br />Development Partner</h2><p className="mt-2 max-w-[460px] text-[11px] leading-[1.5] text-muted-foreground md:text-[12px]">We combine strategy, creative design and cutting-edge technology to build websites that not only look great but also deliver measurable business results.</p></div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {strengths.map(([Icon, title, text]) => <article key={title} className="min-h-[110px] rounded-md border border-border bg-card p-3"><Icon className="h-6 w-6 text-primary" /><h3 className="mt-2 text-[10px] font-extrabold leading-[1.15] text-navy">{title}</h3><p className="mt-1 text-[9px] leading-[1.4] text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell"><Eyebrow>What We Build</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[26px]">Website Solutions for Every Need</h2>
          <div className="ecom-scroll mt-4 grid grid-flow-col auto-cols-[220px] gap-3 overflow-x-auto md:grid-cols-5 md:overflow-visible">
            {solutions.map(([image, Icon, title, text]) => <article key={title} className="overflow-hidden rounded-md border border-border bg-card"><div className="h-[130px] overflow-hidden md:h-[125px]"><img src={image} alt={title} width={640} height={420} loading="lazy" className="h-full w-full object-cover object-center" /></div><div className="grid grid-cols-[26px_1fr] gap-2 p-3"><Icon className="h-5 w-5 text-primary" /><div><h3 className="text-[10px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[8.5px] leading-[1.4] text-muted-foreground">{text}</p></div></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-card py-6 md:py-7">
        <div className="ecom-shell"><Eyebrow>Our Development Process</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[26px]">From Idea to a Successful Website</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-3">{process.map(([Icon, number, title, text], index) => <article key={title} className="relative grid grid-cols-[48px_1fr] gap-2.5 md:block">{index < process.length - 1 && <ArrowRight className="absolute -right-2 top-5 hidden h-3 w-3 text-primary md:block" />}<span className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span><div className="md:mt-2"><strong className="text-[10px] text-navy">{number}</strong><h3 className="text-[10px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[8.5px] leading-[1.4] text-muted-foreground">{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell"><Eyebrow>Industries We Serve</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[26px]">Websites for Every Industry</h2>
          <div className="ecom-scroll mt-4 grid grid-flow-col auto-cols-[185px] gap-3 overflow-x-auto md:grid-cols-7 md:overflow-visible">{industries.map(([image, title]) => <article key={title} className="overflow-hidden rounded-md border border-border bg-card"><div className="h-[94px] overflow-hidden"><img src={image} alt={title} width={500} height={300} loading="lazy" className="h-full w-full object-cover object-center" /></div><h3 className="px-2.5 py-2 text-[9px] font-extrabold text-navy">{title}</h3></article>)}</div>
        </div>
      </section>

      <section className="bg-card py-5 md:py-6">
        <div className="ecom-shell grid gap-4 md:grid-cols-[290px_1fr] md:items-center"><div><Eyebrow>Technologies We Use</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[26px]">Modern Technology Stack</h2></div><div className="grid grid-cols-6 gap-2 md:grid-cols-12">{technologies.map(({ name, src }) => <div key={name} className="text-center"><span className="grid h-11 place-items-center rounded-md border border-border bg-card p-2"><img src={src} alt={`${name} logo`} width={48} height={48} loading="lazy" className="h-full w-full object-contain" /></span><span className="mt-1 block text-[6.5px] text-muted-foreground">{name}</span></div>)}</div></div>
      </section>

      <section className="bg-sky-soft py-6 md:py-7"><div className="ecom-shell"><div className="flex items-end justify-between gap-4"><div><Eyebrow>Our Recent Work</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[26px]">Websites We Have Delivered</h2></div><Button asChild variant="outline" className="hidden h-9 border-navy bg-card px-4 text-[8px] font-bold text-navy md:inline-flex"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View All Projects <ArrowRight /></Link></Button></div><ProjectCarousel /></div></section>

      <section className="ecom-waves relative overflow-hidden bg-navy py-7 text-on-dark"><div className="ecom-shell relative grid items-center gap-8 md:grid-cols-[.9fr_1.1fr]"><div><p className="ecom-eyebrow">Ready to Build Your Website?</p><h2 className="mt-2 text-[26px] font-bold leading-[1.08] md:text-[30px]">Let’s Bring Your Ideas to Life.</h2><p className="mt-2 max-w-[490px] text-[10px] leading-[1.45] text-on-dark/85 md:text-[11px]">Get a free consultation and let our experts design and develop a website that helps you grow your business.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[9px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/60 bg-transparent px-6 text-[9px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button></div></div><div className="grid grid-cols-2 gap-5 sm:grid-cols-4">{[[Image,"200+","Websites Delivered"],[Target,"98%","Client Satisfaction"],[BriefcaseBusiness,"12+","Years of Experience"],[Headphones,"24/7","Support & Maintenance"]].map(([Icon, value, label]) => { const StatIcon = Icon as typeof Image; return <div key={label as string} className="text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-on-dark/50"><StatIcon className="h-5 w-5" /></span><strong className="mt-2 block text-[17px] leading-none">{value as string}</strong><span className="mt-1 block text-[8px] text-on-dark/75">{label as string}</span></div>; })}</div></div></section>
    </main>
  );
}