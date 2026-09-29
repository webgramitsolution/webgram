import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Building2,
  ClipboardList,
  Code2,
  FileCheck2,
  FileText,
  Gauge,
  Headphones,
  Layers3,
  PackageCheck,
  PackageSearch,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
  Workflow,
} from "lucide-react";

import ctaImage from "@/assets/b2b-cta.jpg";
import industriesImage from "@/assets/b2b-industries.jpg";
import stakeholdersImage from "@/assets/b2b-stakeholders.jpg";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const heroImage =
  "https://ik.imagekit.io/home1/About%20us%20page/B2B%20Ecommerce%20Development.png";

const heroCapabilities = [
  [Users, "Wholesale &", "Tier Pricing"],
  [ShoppingCart, "MOQ & Bulk", "Ordering"],
  [FileText, "RFQ / Quote", "Management"],
  [Building2, "Distributor &", "Dealer Portal"],
  [Users, "Customer", "Groups"],
  [FileCheck2, "GST & Invoice", "Automation"],
] as const;

const reasons = [
  [ShoppingCart, "Business-Focused Solutions", "Built around real B2B business needs"],
  [Workflow, "Scalable & Flexible", "Grow with advanced features and integrations"],
  [ShieldCheck, "User-Friendly", "Easy for buyers, dealers and admin teams"],
  [ShieldCheck, "Secure & Reliable", "Enterprise-grade security and performance"],
  [Boxes, "Custom Integrations", "Payment, ERP, CRM, accounting and more"],
  [Headphones, "Ongoing Support", "Long-term maintenance and feature upgrades"],
] as const;

const features = [
  [ShoppingCart, "Minimum Order Quantity (MOQ)", "Set product-wise or category-wise MOQ with flexible rules."],
  [Layers3, "Tiered Pricing", "Different pricing for wholesalers, retailers, dealers and customers."],
  [FileText, "Request for Quotation (RFQ)", "Allow buyers to request quotes for bulk and custom orders."],
  [Users, "Customer Groups", "Create custom user groups with unique pricing and permissions."],
  [Store, "Distributor / Dealer Portal", "Dedicated portal for distributors and dealers with special pricing."],
  [PackageCheck, "Bulk Order Management", "Easy bulk ordering with Excel upload and quick order forms."],
  [FileCheck2, "GST & Invoice Automation", "Auto GST calculation and downloadable invoices."],
  [Boxes, "Advanced Product Catalog", "Categories, specifications, variants and custom attributes."],
] as const;

const stakeholders = [
  ["Admin", "Full control over products, pricing, buyers and orders."],
  ["Distributor", "Special pricing, bulk orders and sales management."],
  ["Dealer", "Access to exclusive products and dealer pricing."],
  ["Corporate Buyer", "Simplified procurement with RFQ and approvals."],
  ["Wholesaler", "Tiered pricing and high volume ordering."],
  ["Retailer", "Special rates for retail businesses."],
] as const;

const process = [
  [Search, "01", "Discovery", "Understand your business needs and B2B workflows."],
  [ClipboardList, "02", "Strategy", "Plan solution, features and technology."],
  [Settings2, "03", "Design", "Create modern and user-friendly UI/UX."],
  [Code2, "04", "Development", "Build with scalable and secure technology."],
  [Gauge, "05", "Testing", "Ensure performance, security and functionality."],
  [Rocket, "06", "Launch", "Deployment, training and ongoing support."],
] as const;

const industries = [
  ["Manufacturing", "Industrial products and machinery"],
  ["Furniture & Interiors", "Office and home furniture"],
  ["Electronics & Electrical", "Components and equipment"],
  ["Building Materials", "Construction and supplies"],
  ["Fashion & Apparel", "Wholesale clothing and accessories"],
  ["Food & Beverages", "Bulk supply and distribution"],
] as const;

const ctaBenefits = [
  [Headphones, "Free Consultation", "Discuss your requirements"],
  [Workflow, "Tailored Solution", "As per your business needs"],
  [Gauge, "On-Time Delivery", "With best practices"],
  [Rocket, "Long-Term Support", "We grow with you"],
] as const;

function SectionIntro({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <span className="mb-2 block h-0.5 w-8 bg-gold" />
      <h2 className="text-[22px] font-extrabold leading-tight text-navy">{title}</h2>
      <p className="mt-1 text-[9px] font-medium leading-[1.45] text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function B2BCommercePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="ecom-hero relative overflow-hidden bg-navy text-on-dark">
        <img
          src={heroImage}
          alt="B2B ecommerce dashboard displayed on laptop and mobile devices"
          width={2112}
          height={745}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="ecom-hero-shade absolute inset-0" />
        <div className="ecom-shell relative flex h-full items-center py-5">
          <div className="max-w-[505px]">
            <nav className="sr-only" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <span>›</span> Solutions <span>›</span> B2B Ecommerce
              Development
            </nav>
            <p className="ecom-eyebrow">B2B Ecommerce Development</p>
            <h1 className="mt-2 text-[31px] font-extrabold leading-[1.02] sm:text-[35px] md:text-[37px] lg:text-[40px]">
              Powerful B2B
              <br />
              Ecommerce Solutions
              <br />
              for <span className="text-gold">Wholesale Growth.</span>
            </h1>
            <p className="mt-3 max-w-[490px] text-[10px] font-medium leading-[1.45] text-on-dark/90 md:text-[11px]">
              We build feature-rich B2B ecommerce platforms with MOQ, RFQ, tier pricing,
              customer groups, distributor/dealer portals and advanced business features to
              streamline your wholesale operations.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="h-10 bg-gold px-6 text-[9px] font-bold text-navy hover:bg-gold/90">
                <Link to="/contact">Get a Free Consultation <ArrowRight /></Link>
              </Button>
              <Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[9px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark">
                <Link to="/work/$slug" params={{ slug: "case-studies" }}>View Demo <ArrowRight /></Link>
              </Button>
            </div>
            <div className="mt-5 grid max-w-[510px] grid-cols-3 gap-x-3 gap-y-2 sm:grid-cols-6">
              {heroCapabilities.map(([Icon, lineOne, lineTwo]) => (
                <div key={lineOne} className="text-center text-[6.5px] font-semibold leading-[1.2]">
                  <span className="mx-auto mb-1.5 grid h-8 w-8 place-items-center rounded-full border border-on-dark/55">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="block">{lineOne}</span>
                  <span className="block">{lineTwo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-5">
        <div className="ecom-shell">
          <SectionIntro title="Why Choose Webgram for B2B Ecommerce" description="" />
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-6">
            {reasons.map(([Icon, title, text], index) => (
              <article key={title} className={`grid grid-cols-[38px_1fr] gap-2 px-1.5 py-1 ${index ? "md:border-l md:border-border" : ""}`}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-[18px] w-[18px]" /></span>
                <div><h3 className="text-[8px] font-extrabold leading-tight text-navy">{title}</h3><p className="mt-1 text-[6.5px] leading-[1.35] text-muted-foreground">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-5">
        <div className="ecom-shell">
          <div className="grid items-end gap-3 md:grid-cols-[1fr_1.1fr_auto]">
            <SectionIntro title="Key B2B Features" description="" />
            <p className="text-[8px] leading-[1.45] text-muted-foreground">Everything you need to manage wholesale sales, dealers, distributors and bulk buyers — all in one powerful B2B ecommerce platform.</p>
            <span className="text-[8px] font-bold text-primary">View All Features <ArrowRight className="inline h-3 w-3" /></span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {features.map(([Icon, title, text], index) => (
              <article key={title} className="grid min-h-[64px] grid-cols-[42px_1fr] items-center gap-2 rounded-md border border-border/70 bg-card p-2.5">
                <span className={`grid h-9 w-9 place-items-center rounded-md ${index % 2 ? "bg-warning-soft text-warning" : "bg-primary-soft text-primary"}`}><Icon className="h-5 w-5" /></span>
                <div><h3 className="text-[8px] font-extrabold leading-tight text-navy">{title}</h3><p className="mt-1 text-[6.5px] leading-[1.3] text-muted-foreground">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-5">
        <div className="ecom-shell">
          <SectionIntro title="Designed for Every B2B Stakeholder" description="A complete ecosystem for manufacturers, distributors, dealers and corporate buyers." />
          <div className="ecom-scroll mt-3 grid grid-flow-col auto-cols-[165px] gap-2 overflow-x-auto md:grid-cols-6 md:overflow-visible">
            {stakeholders.map(([title, text], index) => (
              <article key={title} className="overflow-hidden rounded-md border border-border bg-card">
                <div className="relative h-[92px] overflow-hidden">
                  <img src={stakeholdersImage} alt={title} width={1920} height={520} loading="lazy" className="absolute top-0 h-full w-[600%] max-w-none object-cover" style={{ left: `${index * -100}%` }} />
                </div>
                <div className="min-h-[58px] p-2"><h3 className="text-[8px] font-extrabold text-navy">{title}</h3><p className="mt-1 text-[6.5px] leading-[1.3] text-muted-foreground">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-5">
        <div className="ecom-shell">
          <SectionIntro title="Our Development Process" description="A structured approach to build a high-performing B2B ecommerce platform." />
          <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-6">
            {process.map(([Icon, number, title, text], index) => (
              <article key={title} className="relative grid grid-cols-[40px_1fr] gap-2 md:block">
                {index < process.length - 1 && <ArrowRight className="absolute -right-2 top-4 hidden h-3 w-3 text-primary md:block" />}
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-4 w-4" /></span>
                <div className="md:mt-1.5"><span className="text-[7px] font-extrabold text-navy">{number}</span><h3 className="text-[8px] font-extrabold text-navy">{title}</h3><p className="mt-0.5 text-[6.5px] leading-[1.3] text-muted-foreground">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-5">
        <div className="ecom-shell">
          <SectionIntro title="Industries We Serve" description="" />
          <div className="ecom-scroll mt-3 grid grid-flow-col auto-cols-[165px] gap-2 overflow-x-auto md:grid-cols-6 md:overflow-visible">
            {industries.map(([title, text], index) => (
              <article key={title} className="overflow-hidden rounded-md border border-border bg-card">
                <div className="relative h-[64px] overflow-hidden"><img src={industriesImage} alt={title} width={1920} height={512} loading="lazy" className="absolute top-0 h-full w-[600%] max-w-none object-cover" style={{ left: `${index * -100}%` }} /></div>
                <div className="min-h-[43px] p-2"><h3 className="text-[7.5px] font-extrabold text-navy">{title}</h3><p className="mt-0.5 text-[6px] leading-tight text-muted-foreground">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-7 text-on-dark">
        <img src={ctaImage} alt="Business partners discussing a B2B ecommerce project" width={1920} height={520} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-cta-overlay" />
        <div className="ecom-shell relative grid items-center gap-8 md:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-[27px] font-extrabold leading-[1.05]">Let’s Build Your B2B<br />Ecommerce Solution.</h2>
            <p className="mt-2 max-w-[390px] text-[9px] leading-[1.45] text-on-dark/85">Discuss your requirements with our experts and get a customized solution for your business.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="h-10 bg-gold px-6 text-[9px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button>
              <Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[9px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ctaBenefits.map(([Icon, title, text]) => (
              <div key={title} className="text-center"><span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-on-dark/60"><Icon className="h-4 w-4" /></span><strong className="mt-2 block text-[7px]">{title}</strong><small className="mt-1 block text-[6px] text-on-dark/70">{text}</small></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}