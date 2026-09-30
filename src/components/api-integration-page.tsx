import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Braces,
  ClipboardList,
  CloudCog,
  Code2,
  CreditCard,
  FileText,
  Headphones,
  Link2,
  MapPin,
  Megaphone,
  MessageCircle,
  PackageCheck,
  Rocket,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import {
  siGoogleads,
  siGoogleanalytics,
  siGooglemaps,
  siHubspot,
  siMailchimp,
  siOdoo,
  siPaypal,
  siRazorpay,
  siSap,
  siStripe,
  siWhatsapp,
  siZoho,
} from "simple-icons";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { apiIntegrationImages, deliveredProjects, wooIntegrations } from "@/lib/site-images";

const heroBenefits = [
  [Share2, "Seamless", "Integration"],
  [ShieldCheck, "Secure &", "Reliable"],
  [Workflow, "Custom", "Solutions"],
  [Rocket, "Faster", "Operations"],
  [Headphones, "Expert", "Support"],
] as const;

const strengths = [
  [Link2, "Wide Range of Integrations", "Connect with leading tools and platforms."],
  [Settings, "Custom Integration Solutions", "Tailored to your business needs."],
  [ShieldCheck, "Secure & Reliable", "Industry best practices for data security and stability."],
  [Headphones, "Ongoing Support", "Continuous monitoring, updates and technical assistance."],
] as const;

const categories = [
  [CreditCard, "Payment Gateways", "Razorpay, PayU, Stripe, PayPal, Cashfree, Instamojo", "bg-primary-soft text-primary"],
  [Truck, "Shipping & Logistics", "ShipRocket, Delhivery, BlueDart, Ecom Express, India Post", "bg-orange-soft text-orange"],
  [Megaphone, "CRM & Marketing", "Zoho CRM, HubSpot, Salesforce, Mailchimp, Meta Ads", "bg-violet-soft text-violet"],
  [MessageCircle, "Communication", "WhatsApp API, SMS Gateway, Email (SMTP), IVR & Voice APIs", "bg-primary-soft text-primary"],
  [FileText, "Accounting & ERP", "Tally, Zoho Books, SAP, Odoo, QuickBooks", "bg-warning-soft text-warning"],
  [Share2, "Social Media & Analytics", "Facebook, Instagram, LinkedIn, Google Analytics, Google Tag Manager", "bg-primary-soft text-primary"],
  [MapPin, "Maps & Location", "Google Maps, Geolocation, Address Validation, Location APIs", "bg-success-soft text-success"],
  [Braces, "Custom API Integration", "Third-party tools, custom platforms and proprietary business systems", "bg-primary-soft text-primary"],
] as const;

const process = [
  [Search, "01", "Consultation", "Understand your business goals and integration requirements."],
  [ClipboardList, "02", "Planning", "Choose the right APIs and define the workflow."],
  [Link2, "03", "Development", "Build and configure secure integrations."],
  [PackageCheck, "04", "Testing", "Ensure smooth functionality and data accuracy."],
  [Settings, "05", "Deployment", "Go live with complete support."],
  [Rocket, "06", "Ongoing Support", "Monitor, maintain and update integrations."],
] as const;

type BrandMark = { path: string };

type Platform =
  | { name: string; icon: BrandMark; image?: never }
  | { name: string; image: string; icon?: never };

const imageFor = (name: string) => wooIntegrations.find((item) => item.name === name)?.src;

const salesforceMark: BrandMark = { path: "M6.1 18.5c-3 0-5.4-2.2-5.4-5 0-2.3 1.6-4.3 3.9-4.8.7-3 3.4-5.2 6.6-5.2 2.5 0 4.8 1.4 5.9 3.5.4-.1.8-.2 1.3-.2 2.7 0 4.9 2.1 4.9 4.7 0 2.6-2.2 4.7-4.9 4.7H6.1z" };
const twilioMark: BrandMark = { path: "M12 1.5A10.5 10.5 0 1 0 12 22.5 10.5 10.5 0 0 0 12 1.5zm-3.3 14A2.2 2.2 0 1 1 8.7 11a2.2 2.2 0 0 1 0 4.5zm0-6.5a2.2 2.2 0 1 1 0-4.5A2.2 2.2 0 0 1 8.7 9zm6.6 6.5a2.2 2.2 0 1 1 0-4.5 2.2 2.2 0 0 1 0 4.5zm0-6.5a2.2 2.2 0 1 1 0-4.5 2.2 2.2 0 0 1 0 4.5z" };
const sendGridMark: BrandMark = { path: "M2 3h8v8H2V3zm12 0h8v8h-8V3zM8 13h8v8H8v-8z" };
const awsMark: BrandMark = { path: "M6.5 15.7c2.7 2 6.6 3 9.9 3 2.1 0 4.2-.4 6.1-1.2.3-.1.5.3.2.5-2.7 2-6.5 3-9.8 3-4.6 0-8.7-1.7-11.8-4.6-.3-.3 0-.7.3-.5zm14.3-.7c-.5-.7-3.1-.3-4.3-.2-.4.1-.5-.3-.1-.6 2.4-1.7 6.3-1.2 6.8-.6.5.6-.1 4.5-2.4 6.4-.4.3-.7.1-.6-.3.5-1.2 1.1-4 .6-4.7z" };

const platforms: Platform[] = [
  { name: "Razorpay", icon: siRazorpay },
  { name: "Stripe", icon: siStripe },
  { name: "PayU", image: imageFor("PayU") ?? "https://ik.imagekit.io/home1/payu.png" },
  { name: "PayPal", icon: siPaypal },
  { name: "Shiprocket", image: imageFor("Shiprocket") ?? "https://ik.imagekit.io/home1/Shiprocket.png" },
  { name: "Delhivery", image: imageFor("Delhivery") ?? "https://ik.imagekit.io/home1/Delhivery.png" },
  { name: "Tally", image: imageFor("Tally") ?? "https://ik.imagekit.io/home1/Telly.png" },
  { name: "Zoho", icon: siZoho },
  { name: "Salesforce", icon: salesforceMark },
  { name: "HubSpot", icon: siHubspot },
  { name: "Meta WhatsApp", icon: siWhatsapp },
  { name: "Twilio", icon: twilioMark },
  { name: "SendGrid", icon: sendGridMark },
  { name: "Google Maps", icon: siGooglemaps },
  { name: "Google Analytics", icon: siGoogleanalytics },
  { name: "Google Ads", icon: siGoogleads },
  { name: "Mailchimp", icon: siMailchimp },
  { name: "AWS", icon: awsMark },
  { name: "Odoo", icon: siOdoo },
  { name: "SAP", icon: siSap },
];

const projects = [
  [deliveredProjects.corporate, "Razorpay Payment Integration", "Ecommerce Store"],
  [deliveredProjects.business, "ShipRocket Shipping Integration", "B2B Marketplace"],
  [deliveredProjects.professional, "Zoho CRM Integration", "Business Portal"],
  [deliveredProjects.realEstate, "WhatsApp API Integration", "Customer Notifications"],
  [deliveredProjects.healthcare, "Tally Integration", "Accounting Automation"],
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-2 text-[8px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-0.5 w-8 bg-gold" />{children}</p>;
}

function BrandIcon({ platform }: { platform: Platform }) {
  if ("image" in platform) return <img src={platform.image} alt={`${platform.name} logo`} loading="lazy" className="max-h-[46px] max-w-[90%] object-contain" />;
  return <svg role="img" aria-label={`${platform.name} logo`} viewBox="0 0 24 24" className="h-8 w-8 text-primary" fill="currentColor"><path d={platform.icon.path} /></svg>;
}

function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  return <div className="relative mt-3"><div ref={track} className="ecom-scroll grid snap-x grid-flow-col auto-cols-[245px] gap-2 overflow-x-auto md:grid-cols-5 md:overflow-visible">{projects.map(([image, title, text]) => <article key={title} className="snap-start overflow-hidden rounded-md border border-border bg-card"><img src={image} alt={title} width={640} height={360} loading="lazy" className="h-[112px] w-full object-cover" /><div className="px-3 py-2"><h3 className="text-[11px] font-extrabold text-navy">{title}</h3><p className="mt-0.5 text-[8.5px] font-semibold text-primary">{text}</p></div></article>)}</div><Button type="button" variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous projects" className="absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowLeft /></Button><Button type="button" variant="outline" size="icon" onClick={() => move(1)} aria-label="Next projects" className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-primary"><ArrowRight /></Button></div>;
}

export function ApiIntegrationPage() {
  return <main className="min-h-screen overflow-x-hidden bg-background text-foreground"><SiteHeader />
    <section className="ecom-hero relative overflow-hidden bg-navy text-on-dark"><img src={apiIntegrationImages.hero} alt="Connected business applications and integration dashboard on laptop and phone" width={2092} height={752} className="absolute inset-0 h-full w-full object-cover object-center" /><div className="ecom-hero-shade absolute inset-0" /><div className="ecom-shell relative flex h-full items-center py-5"><div className="max-w-[530px]"><nav className="sr-only" aria-label="Breadcrumb"><Link to="/">Home</Link> › Services › API & Third-Party Integration</nav><p className="ecom-eyebrow">API & Third-Party Integration</p><h1 className="mt-2 text-[29px] font-bold leading-[1.02] sm:text-[33px] md:text-[36px] lg:text-[39px]">Connect Everything<br />For a <span className="text-gold">Smarter Business.</span></h1><p className="mt-3 max-w-[480px] text-[10px] leading-[1.45] text-on-dark/90 md:text-[11px]">We integrate powerful APIs and third-party tools to streamline your operations, automate workflows and create a seamless digital experience.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[9px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Get a Free Consultation <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[9px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="#integration-solutions">View Integration Solutions <ArrowRight /></a></Button></div><div className="mt-4 grid max-w-[500px] grid-cols-5 gap-2">{heroBenefits.map(([Icon, first, second]) => <div key={first} className="text-center text-[7px] font-semibold leading-[1.25]"><span className="mx-auto mb-1.5 grid h-9 w-9 place-items-center rounded-full border border-on-dark/50"><Icon className="h-4 w-4" /></span>{first}<br />{second}</div>)}</div></div></div></section>

    <section className="bg-card py-6 md:py-7"><div className="ecom-shell grid gap-5 md:grid-cols-[1.05fr_1.95fr] md:items-center"><div><Eyebrow>Why Choose Webgram</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-[1.05] text-navy md:text-[27px]">Your Integration Partner</h2><p className="mt-2 max-w-[470px] text-[11px] leading-[1.5] text-muted-foreground md:text-[12px]">We help businesses connect their websites, applications and software with trusted third-party services through robust and secure API integrations.</p></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{strengths.map(([Icon, title, text]) => <article key={title} className="min-h-[145px] rounded-md border border-border bg-card p-4 shadow-card"><Icon className="h-9 w-9 text-primary" /><h3 className="mt-3 text-[13px] font-extrabold leading-[1.2] text-navy">{title}</h3><p className="mt-1.5 text-[11px] leading-[1.45] text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section id="integration-solutions" className="bg-sky-soft py-6 md:py-7"><div className="ecom-shell"><Eyebrow>Popular Integration Categories</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Powerful Integrations for Your Business</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">{categories.map(([Icon, title, text, tone]) => <article key={title} className="grid min-h-[104px] grid-cols-[52px_1fr] items-start gap-3 rounded-md border border-border/60 bg-card p-3.5"><span className={`grid h-12 w-12 place-items-center rounded-md ${tone}`}><Icon className="h-7 w-7" /></span><div><h3 className="text-[13px] font-extrabold leading-[1.25] text-navy">{title}</h3><p className="mt-1 text-[11px] leading-[1.45] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-card py-6"><div className="ecom-shell"><Eyebrow>Our Integration Process</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">From Strategy to Seamless Integration</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-3">{process.map(([Icon, number, title, text], index) => <article key={title} className="relative grid grid-cols-[45px_1fr] gap-2">{index < process.length - 1 && <span aria-hidden="true" className="absolute left-[40px] right-[-14px] top-[20px] hidden h-px bg-primary/40 md:block"><ArrowRight className="absolute -right-1 -top-[6px] h-3 w-3 text-primary" /></span>}<span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span><div className="relative z-10"><strong className="text-[8px] text-navy">{number}</strong><h3 className="mt-0.5 text-[12px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[10.5px] leading-[1.4] text-muted-foreground">{text}</p></div></article>)}</div></div></section>

    <section className="bg-card pb-7"><div className="ecom-shell"><Eyebrow>Technologies & Platforms We Work With</Eyebrow><div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-10">{platforms.map((platform) => <figure key={platform.name} className="grid h-[72px] place-items-center rounded-md border border-border bg-card px-2 py-2 shadow-card"><BrandIcon platform={platform} /><figcaption className="sr-only">{platform.name}</figcaption></figure>)}</div></div></section>

    <section className="bg-sky-soft py-6"><div className="ecom-shell"><div className="flex items-end justify-between gap-4"><div><Eyebrow>Success Stories</Eyebrow><h2 className="mt-2 text-[23px] font-extrabold leading-none text-navy md:text-[27px]">Integration Projects We Have Delivered</h2></div><Button asChild variant="outline" className="hidden h-9 border-navy bg-card px-4 text-[8px] font-bold text-navy md:inline-flex"><Link to="/work/$slug" params={{ slug: "portfolio" }}>View All Projects <ArrowRight /></Link></Button></div><Projects /></div></section>

    <section className="relative overflow-hidden bg-navy py-7 text-on-dark"><img src={apiIntegrationImages.hero} alt="" width={2092} height={752} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-30" /><div className="bg-cta-overlay absolute inset-0" /><div className="ecom-shell relative grid items-center gap-7 md:grid-cols-[.9fr_1.1fr]"><div><p className="ecom-eyebrow">Ready to Connect Your Business?</p><h2 className="mt-2 text-[25px] font-bold leading-[1.08] md:text-[29px]">Let’s Integrate Your<br />Systems For Greater Growth.</h2><p className="mt-2 max-w-[500px] text-[10px] leading-[1.45] text-on-dark/85">Get a free consultation and let our experts help you integrate the right tools for a smarter, more efficient business.</p><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="h-10 bg-gold px-6 text-[9px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-10 border-on-dark/60 bg-transparent px-6 text-[9px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button></div></div><div className="grid grid-cols-2 gap-5 sm:grid-cols-4">{[[Boxes, "200+", "Integrations Delivered"], [Users, "98%", "Client Satisfaction"], [Code2, "12+", "Years of Experience"], [Headphones, "24/7", "Support & Maintenance"]].map(([Icon, value, label]) => { const StatIcon = Icon as typeof Boxes; return <div key={label as string} className="text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-on-dark/50"><StatIcon className="h-5 w-5" /></span><strong className="mt-2 block text-[17px] leading-none">{value as string}</strong><span className="mt-1 block text-[7.5px] text-on-dark/75">{label as string}</span></div>; })}</div></div></section>
  </main>;
}