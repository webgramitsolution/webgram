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
import industry1 from "@/assets/b2b-industry-1.jpg";
import industry2 from "@/assets/b2b-industry-2.jpg";
import industry3 from "@/assets/b2b-industry-3.jpg";
import industry4 from "@/assets/b2b-industry-4.jpg";
import industry5 from "@/assets/b2b-industry-5.jpg";
import industry6 from "@/assets/b2b-industry-6.jpg";
import stakeholder1 from "@/assets/b2b-stakeholder-1.jpg";
import stakeholder2 from "@/assets/b2b-stakeholder-2.jpg";
import stakeholder3 from "@/assets/b2b-stakeholder-3.jpg";
import stakeholder4 from "@/assets/b2b-stakeholder-4.jpg";
import stakeholder5 from "@/assets/b2b-stakeholder-5.jpg";
import stakeholder6 from "@/assets/b2b-stakeholder-6.jpg";
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
  [stakeholder1, "Admin", "Full control over products, pricing, buyers and orders."],
  [stakeholder2, "Distributor", "Special pricing, bulk orders and sales management."],
  [stakeholder3, "Dealer", "Access to exclusive products and dealer pricing."],
  [stakeholder4, "Corporate Buyer", "Simplified procurement with RFQ and approvals."],
  [stakeholder5, "Wholesaler", "Tiered pricing and high-volume ordering."],
  [stakeholder6, "Retailer", "Special rates for retail businesses."],
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
  [industry1, "Manufacturing", "Industrial products and machinery"],
  [industry2, "Furniture & Interiors", "Office and home furniture"],
  [industry3, "Electronics & Electrical", "Components and equipment"],
  [industry4, "Building Materials", "Construction and supplies"],
  [industry5, "Fashion & Apparel", "Wholesale clothing and accessories"],
  [industry6, "Food & Beverages", "Bulk supply and distribution"],
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
      <h2 className="text-[23px] font-bold leading-tight text-navy md:text-[25px]">{title}</h2>
      <p className="mt-1 text-[12px] font-medium leading-[1.5] text-muted-foreground md:text-[13px]">
        {description}
      </p>
    </div>
  );
}

export function B2BCommercePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
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
          <div className="max-w-[520px]">
            <nav className="sr-only" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <span>›</span> Solutions <span>›</span> B2B Ecommerce
              Development
            </nav>
            <p className="ecom-eyebrow">B2B Ecommerce Development</p>
            <h1 className="mt-2 text-[29px] font-semibold leading-[1.08] sm:text-[32px] md:text-[34px] lg:text-[36px]">
              Powerful B2B
              <br />
              Ecommerce Solutions
              <br />
              for <span className="text-gold">Wholesale Growth.</span>
            </h1>
            <p className="mt-3 max-w-[505px] text-[11px] font-medium leading-[1.5] text-on-dark/90 md:text-[12px]">
              We build secure B2B commerce platforms for manufacturers, wholesalers and
              distributors, combining contract pricing, bulk ordering, RFQ workflows, dealer
              portals, GST invoicing and ERP-ready integrations in one system.
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

      <section className="bg-card py-6 md:py-7">
        <div className="ecom-shell">
          <SectionIntro title="Why Choose Webgram for B2B Ecommerce" description="" />
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-6">
            {reasons.map(([Icon, title, text], index) => (
              <article key={title} className={`grid grid-cols-[38px_1fr] gap-2 px-1.5 py-1 ${index ? "md:border-l md:border-border" : ""}`}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-[18px] w-[18px]" /></span>
                <div><h3 className="text-[9px] font-extrabold leading-tight text-navy md:text-[10px]">{title}</h3><p className="mt-1 text-[9.5px] leading-[1.4] text-muted-foreground md:text-[10px]">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell">
          <div className="grid items-end gap-3 md:grid-cols-[1fr_1.1fr_auto]">
            <SectionIntro title="Key B2B Features" description="" />
            <p className="text-[11px] leading-[1.5] text-muted-foreground md:text-[12px]">Everything needed to manage wholesale sales, dealers, distributors and bulk buyers — from pricing and approvals to orders and invoicing.</p>
            <span className="text-[9px] font-bold text-primary md:text-[10px]">View All Features <ArrowRight className="inline h-3 w-3" /></span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {features.map(([Icon, title, text], index) => (
              <article key={title} className="grid min-h-[78px] grid-cols-[46px_1fr] items-center gap-2.5 rounded-md border border-border/70 bg-card p-3">
                <span className={`grid h-10 w-10 place-items-center rounded-md ${index % 2 ? "bg-warning-soft text-warning" : "bg-primary-soft text-primary"}`}><Icon className="h-[22px] w-[22px]" /></span>
                <div><h3 className="text-[10px] font-extrabold leading-[1.25] text-navy md:text-[11px]">{title}</h3><p className="mt-1 text-[10px] leading-[1.4] text-muted-foreground md:text-[10.5px]">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-7 md:py-9">
        <div className="ecom-shell">
          <div className="text-center">
            <h2 className="text-[20px] font-extrabold leading-[1.15] tracking-tight text-navy md:text-[26px]">Designed for Every B2B Stakeholder</h2>
            <p className="mt-1.5 text-[11px] text-muted-foreground md:text-[12.5px]">A complete ecosystem for manufacturers, distributors, dealers and corporate buyers.</p>
          </div>
          <div className="ecom-scroll mt-5 grid grid-flow-col auto-cols-[200px] gap-3 overflow-x-auto md:grid-cols-6 md:overflow-visible">
            {stakeholders.map(([image, title, text]) => (
              <article key={title} className="overflow-hidden rounded-lg bg-card shadow-[0_2px_10px_-2px_color-mix(in_oklab,var(--navy)_12%,transparent)]">
                <div className="relative aspect-[1/0.92] overflow-hidden">
                  <img src={image} alt={`${title} using the B2B commerce platform`} width={320} height={640} loading="lazy" className="h-full w-full object-cover object-top" />
                </div>
                <div className="min-h-[78px] px-3 py-2.5"><h3 className="text-[12px] font-bold text-navy md:text-[12.5px]">{title}</h3><p className="mt-1 text-[10px] leading-[1.45] text-muted-foreground md:text-[10.5px]">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell">
          <SectionIntro title="Our Development Process" description="A structured approach to build a high-performing B2B ecommerce platform." />
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-2">
            {process.map(([Icon, number, title, text], index) => (
              <article key={title} className="grid min-w-0 grid-cols-[46px_1fr] gap-2.5">
                <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-extrabold text-navy">{number}</span>
                    {index < process.length - 1 && (
                      <span className="relative hidden h-px flex-1 bg-primary md:block"><span className="absolute -right-0.5 -top-[3px] h-0 w-0 border-y-[3.5px] border-l-[6px] border-y-transparent border-l-primary" /></span>
                    )}
                  </div>
                  <h3 className="mt-1.5 text-[12px] font-extrabold text-navy">{title}</h3>
                  <p className="mt-0.5 text-[10px] leading-[1.45] text-muted-foreground md:text-[10.5px]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-6 md:py-7">
        <div className="ecom-shell">
          <SectionIntro title="Industries We Serve" description="" />
          <div className="ecom-scroll mt-4 grid grid-flow-col auto-cols-[200px] gap-3 overflow-x-auto md:grid-cols-6 md:overflow-visible">
            {industries.map(([image, title, text]) => (
              <article key={title} className="overflow-hidden rounded-md border border-border bg-card">
                <div className="relative h-[96px] overflow-hidden md:h-[104px]"><img src={image} alt={title} width={320} height={640} loading="lazy" className="h-full w-full object-cover object-center" /></div>
                <div className="min-h-[66px] px-3 py-2.5"><h3 className="text-[11px] font-extrabold text-navy md:text-[12px]">{title}</h3><p className="mt-1 text-[10px] leading-[1.4] text-muted-foreground md:text-[10.5px]">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[230px] overflow-hidden bg-navy py-8 text-on-dark">
        <img src={ctaImage} alt="Business partners discussing a B2B ecommerce project" width={1920} height={520} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-cta-overlay" />
        <div className="ecom-shell relative grid items-center gap-8 md:min-h-[166px] md:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-[25px] font-bold leading-[1.08] md:text-[27px]">Let’s Build Your B2B<br />Ecommerce Solution.</h2>
            <p className="mt-3 max-w-[420px] text-[11px] leading-[1.55] text-on-dark/85 md:text-[12px]">Discuss your requirements with our experts and get a customized<br className="hidden md:block" /> solution for your business.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="h-10 bg-gold px-6 text-[9px] font-bold text-navy hover:bg-gold/90"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button>
              <Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-6 text-[9px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="tel:+917551120242">Talk to an Expert</a></Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ctaBenefits.map(([Icon, title, text]) => (
              <div key={title} className="text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-on-dark/60"><Icon className="h-[18px] w-[18px]" /></span><strong className="mt-2 block text-[9px]">{title}</strong><small className="mt-1 block text-[9.5px] text-on-dark/70">{text}</small></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}