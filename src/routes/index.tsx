import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Layers3,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
  Zap,
  Star,
  ClipboardCheck,
  Headphones,
  MapPin,
  PackageCheck,
  ReceiptText,
  Warehouse,
} from "lucide-react";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { IMAGES, aboutImages, clientLogos, technologyStack } from "@/lib/site-images";
import industriesImage from "@/assets/industries-strip.jpg";
import { SiteHeader } from "@/components/site-header";
import { ScrollingFrame } from "@/components/portfolio-showcase";
import { portfolio } from "@/lib/portfolio";
import { getPublishedHomepageReviews } from "@/lib/reviews.functions";

const PHONE_HERO = "https://ik.imagekit.io/archfacingb2b/phone%20device%20banner.png";

export const Route = createFileRoute("/")({
  loader: () => getPublishedHomepageReviews(),
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
      { property: "og:image", content: "https://ik.imagekit.io/2kynz1ge7/Webgram%20It%20Solution.jfif" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ik.imagekit.io/2kynz1ge7/Webgram%20It%20Solution.jfif" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Webgram IT Solution",
          url: "https://webgramitsolution.com/",
          image: "https://ik.imagekit.io/2kynz1ge7/Webgram%20It%20Solution.jfif",
          telephone: "+91 7551120242",
          email: "info@webgramitsolution.com",
          priceRange: "₹15,000 - ₹5,00,000",
          address: {
            "@type": "PostalAddress",
            streetAddress: "F3/780, Block C, Devli, Sangam Vihar",
            addressLocality: "New Delhi",
            postalCode: "110062",
            addressCountry: "IN",
          },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "32", bestRating: "5" },
          makesOffer: [
            { "@type": "Offer", name: "Website Design & Development", priceCurrency: "INR", price: "15000" },
            { "@type": "Offer", name: "Ecommerce Development", priceCurrency: "INR", price: "35000" },
          ],
        }),
      },
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
  {
    icon: Blocks,
    title: "Business-First Development",
    text: "Technology aligned with your business goals.",
    tone: "text-warning bg-warning-soft",
  },
  {
    icon: Layers3,
    title: "Custom Architecture",
    text: "Built around your unique requirements.",
    tone: "text-cyan bg-cyan-soft",
  },
  {
    icon: Users,
    title: "B2B + B2C Expertise",
    text: "Retail and wholesale commerce solutions.",
    tone: "text-primary bg-primary-soft",
  },
  {
    icon: BarChart3,
    title: "Scalable Technology",
    text: "From startup to enterprise growth.",
    tone: "text-success bg-success-soft",
  },
  {
    icon: Zap,
    title: "Performance Focused",
    text: "Speed, SEO and best practices.",
    tone: "text-orange bg-orange-soft",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Partnership",
    text: "Development, maintenance and ongoing support.",
    tone: "text-violet bg-violet-soft",
  },
];

const industries = ["Manufacturing", "Retail", "Wholesale", "Furniture", "Fashion", "Electronics"];

const proof = [
  [ClipboardCheck, "100+", "Web Projects"],
  [ShoppingCart, "50+", "Ecommerce Solutions"],
  [Users, "20+", "Industries Served"],
  [Headphones, "24/7", "Technical Support"],
] as const;

const b2bFeatures = [
  [ReceiptText, "Customer-specific pricing"], [BriefcaseBusiness, "Wholesale pricing"],
  [ShieldCheck, "MOQ controls"], [BarChart3, "RFQ / Request for Quotation"],
  [PackageCheck, "Bulk ordering"], [Layers3, "Tier pricing"],
  [Users, "Dealer / Distributor login"], [Zap, "Credit purchase"],
  [ClipboardCheck, "GST invoice"], [Users, "Customer groups"],
  [BriefcaseBusiness, "Sales representative"], [ShieldCheck, "Approval workflows"],
  [MapPin, "Location-based pricing"], [Warehouse, "Multi-warehouse"],
  [Store, "Inventory management"],
] as const;

const cases = [
  {
    tag: "B2B Marketplace",
    tagIcon: BriefcaseBusiness,
    title: "From Traditional Sales to a Scalable Digital Platform",
    chips: ["Manufacturing", "B2B Commerce"],
    image: IMAGES.caseManufacturing,
    alt: "Laptop showing a B2B marketplace dashboard inside a warehouse",
    stats: [
      ["3X", "Sales Growth"],
      ["200+", "Active Buyers"],
      ["50%", "Faster Orders"],
    ],
  },
  {
    tag: "Ecommerce Website",
    tagIcon: ShoppingCart,
    title: "Modern Ecommerce Experience for a Lifestyle Brand",
    chips: ["Lifestyle", "B2C Ecommerce"],
    image: IMAGES.caseLifestyle,
    alt: "Laptop showing a furniture and home decor ecommerce catalog beside a plant",
    stats: [
      ["2.5X", "Conversion"],
      ["60%", "Repeat Customers"],
      ["40%", "Higher AOV"],
    ],
  },
  {
    tag: "Custom Web Application",
    tagIcon: Code2,
    title: "Business Management Portal for a Distribution Company",
    chips: ["Distribution", "Custom Development"],
    image: IMAGES.caseDistribution,
    alt: "Laptop showing a business management dashboard with floating charts and servers",
    stats: [
      ["70%", "Manual Work Reduced"],
      ["100+", "Team Members"],
      ["Real-time", "Inventory Tracking"],
    ],
  },
];

function Hero() {
  return (
    <section id="top" className="hero-shell">
      <div className="hero-media">
        <picture>
          <source media="(max-width: 767px)" srcSet={PHONE_HERO} />
          <img
          src={IMAGES.hero}
          alt="Webgram IT Solution digital commerce storefront displayed across laptop and mobile screens"
          width={2170}
          height={725}
          />
        </picture>
      </div>
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="page-shell hero-copy">
        <div className="max-w-[510px]">
          <h1 className="max-w-[500px] text-[35px] font-bold leading-[1.04] tracking-normal sm:text-[42px] lg:text-[46px]">
            Digital Commerce,
            <br />
            Engineered for <span className="text-gold">Growth.</span>
          </h1>
          <p className="mt-4 max-w-[500px] text-[14px] font-normal leading-5 text-on-dark/90 sm:text-[15px]">
            We build high-performance B2B, B2C, marketplace and custom commerce platforms designed
            around your business.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button
              size="lg"
              className="h-10 bg-gold px-5 text-[14px] font-semibold text-navy hover:bg-gold/90"
            >
              Start Your Project <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-10 border-on-dark/60 bg-transparent px-5 text-[14px] font-semibold text-on-dark shadow-none hover:bg-on-dark/10 hover:text-on-dark"
            >
              Explore Our Solutions
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-on-dark/90">
            {["Ecommerce", "B2B & B2C", "Marketplace", "Custom Development"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-sky" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mobile-hero-services" aria-label="Commerce capabilities">
        {[[ShoppingCart, "Ecommerce"], [Users, "B2B & B2C"], [Store, "Marketplace"], [Code2, "Custom Development"]].map(([ItemIcon, label]) => {
          const CapabilityIcon = ItemIcon as Icon;
          return <div key={label as string}><span><CapabilityIcon /></span><strong>{label as string}</strong></div>;
        })}
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="bg-background py-5">
      <div className="page-shell">
        <h2 className="text-sm font-extrabold text-navy">
          Trusted by Businesses Building Their Digital Future
        </h2>
        <div
          className="logo-scroll mt-4 grid grid-flow-col auto-cols-[150px] items-center gap-3 overflow-x-auto pb-2 md:grid-flow-row md:auto-cols-auto md:grid-cols-7 md:overflow-visible md:pb-0"
          aria-label="Trusted business logos"
        >
          {clientLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-14 items-center justify-center rounded-md border border-border/70 bg-card px-3 shadow-card"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                width={2475}
                height={875}
                loading="lazy"
                className="max-h-8 w-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 border-y border-border md:grid-cols-4">
          {proof.map(([IconComponent, value, label], index) => <div key={label} className={`flex items-center justify-center gap-3 px-3 py-4 ${index % 2 ? "border-l border-border" : ""} md:border-l md:first:border-l-0`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"><IconComponent className="h-5 w-5" /></span><span><strong className="block text-lg font-extrabold leading-none text-navy">{value}</strong><small className="mt-1 block text-[13px] text-muted-foreground">{label}</small></span></div>)}
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
          <div>
            <h2 className="section-title">Our Digital Commerce Solutions</h2>
            <p className="section-subtitle">
              End-to-end solutions to build, sell and scale your business online.
            </p>
          </div>
          <a
            href="#services"
            className="hidden text-[13px] font-bold text-primary underline sm:block"
          >
            View All Solutions →
          </a>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {services.map(({ icon: IconComponent, title, text, link, image, alt }) => (
            <article
              key={title}
              className="relative min-h-[210px] overflow-hidden rounded-md border border-border bg-card p-4 pr-[46%] shadow-card"
            >
              <span className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground">
                <IconComponent className="h-6 w-6" />
              </span>
              <h3 className="mt-3 text-[13px] font-extrabold leading-tight text-navy">{title}</h3>
              <p className="mt-2 text-[13px] font-medium leading-4 text-muted-foreground">{text}</p>
              <a
                href="#services"
                className="mt-3 inline-block text-[13px] font-extrabold text-primary"
              >
                {link} →
              </a>
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
          <h2 className="max-w-[360px] text-[20px] font-bold leading-[1.08] text-navy md:text-[17px] lg:text-[20px]">
            From Storefront to Back Office —<br className="hidden lg:block" /> One Technology
            Partner.
          </h2>
          <p className="mt-2 max-w-[390px] text-[13px] font-normal leading-[1.55] text-muted-foreground md:text-[12px] lg:text-[13px]">
            We connect your entire commerce ecosystem — website, mobile app, inventory, payments,
            CRM and analytics.
          </p>
          <Button
            size="sm"
            className="mt-3 h-9 bg-primary px-5 text-[13px] font-medium text-primary-foreground md:h-8 md:px-4 md:text-[13px] lg:h-9 lg:px-5 lg:text-[13px]"
          >
            Learn More <ArrowRight />
          </Button>
        </div>
        <div className="min-w-0">
          <img
            src={IMAGES.ecosystem}
            alt="Webgram commerce ecosystem linking storefront, commerce, operations, payments, analytics and integrations"
            width={6075}
            height={2528}
            loading="lazy"
            className="h-auto w-full object-contain"
          />
        </div>
        <div className="hidden min-w-0 md:block">
          <img
            src={IMAGES.platforms}
            alt="Webgram ecommerce website, B2B portal and mobile app"
            width={1944}
            height={809}
            loading="lazy"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="company" className="border-y border-border bg-sky-soft py-6">
      <div className="page-shell">
        <h2 className="section-title">Why Businesses Choose Webgram</h2>
        <p className="section-subtitle">
          More than just development — we are your long-term digital commerce partner.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-6">
          {strengths.map(({ icon: IconComponent, title, text, tone }) => (
            <article key={title} className="grid grid-cols-[auto_1fr] gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${tone}`}>
                <IconComponent className="h-5 w-5" />
              </span>
              <span>
                <h3 className="text-[13px] font-extrabold leading-tight text-navy">{title}</h3>
                <p className="mt-1 text-[12px] leading-3 text-muted-foreground">{text}</p>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="bg-navy py-7 text-on-dark">
      <div className="page-shell grid gap-5 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
        <div>
          <p className="eyebrow">Industries</p>
          <h2 className="mt-2 text-[27px] font-extrabold leading-[0.95]">
            Built Around
            <br />
            Your Industry
          </h2>
          <p className="mt-3 text-[13px] leading-4 text-on-dark/75">
            We develop customized commerce solutions for diverse industries.
          </p>
          <Button asChild size="sm" className="mt-4 bg-primary px-5 text-[13px] font-bold text-primary-foreground hover:bg-primary/90 md:bg-gold md:text-navy md:hover:bg-gold/90">
            <Link to="/work/$slug" params={{ slug: "portfolio" }}>View Our Work <ArrowRight /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {industries.map((industry, index) => (
            <article key={industry} className="industry-card">
              <img
                src={industriesImage}
                alt=""
                loading="lazy"
                width={1536}
                height={512}
                className={`industry-image industry-image-${index}`}
              />
              <div className="industry-shade" />
              <strong>{industry} →</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function B2BFeatures() {
  return <section className="bg-background py-7 md:py-8">
    <div className="page-shell">
      <p className="eyebrow text-primary">B2B Commerce</p>
      <h2 className="section-title mt-2">Powering Modern B2B Commerce</h2>
      <p className="section-subtitle max-w-xl">Advanced B2B features that digitize wholesale and distribution businesses.</p>
      <div className="b2b-feature-grid mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {b2bFeatures.map(([IconComponent, label]) => <div key={label} className="grid min-h-16 grid-cols-[32px_1fr] items-center gap-2 rounded-md border border-border bg-card p-2.5 shadow-card"><span className="grid h-8 w-8 place-items-center rounded bg-primary-soft text-primary"><IconComponent className="h-4 w-4" /></span><strong className="text-[13px] leading-tight text-navy">{label}</strong></div>)}
      </div>
      <Button asChild className="mt-4 h-10 w-full font-bold"><Link to="/solutions/$slug" params={{ slug: "b2b-commerce" }}>Build Your B2B Platform <ArrowRight /></Link></Button>
    </div>
  </section>;
}

function MobileCommerceExperience() {
  return <section className="bg-sky-soft py-7 md:hidden">
    <div className="page-shell">
      <h2 className="section-title">Ecommerce Experiences That Convert</h2>
      <p className="section-subtitle">We create high-converting commerce experiences for every business model.</p>
      <div className="mt-4 flex gap-2" aria-label="Commerce experience types">
        <Button size="sm" className="h-8 flex-1 text-[13px]">B2C Ecommerce</Button>
        <Button size="sm" variant="outline" className="h-8 flex-1 text-[13px]">B2B Ecommerce</Button>
        <Button size="sm" variant="outline" className="h-8 flex-1 text-[13px]">Marketplace</Button>
      </div>
      <article className="mt-3 grid grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-3 rounded-md border border-border bg-card p-3 shadow-card">
        <img src={IMAGES.caseLifestyle} alt="Modern ecommerce experience for furniture and lifestyle products" width={1934} height={813} loading="lazy" className="h-full min-h-36 w-full rounded object-cover" />
        <div className="flex flex-col justify-center">
          {['Fashion', 'Beauty', 'Electronics', 'Furniture', 'D2C', 'Lifestyle'].map((item) => <span key={item} className="flex items-center gap-1.5 py-1 text-[13px] font-semibold text-navy"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />{item}</span>)}
          <Link to="/solutions/$slug" params={{ slug: "ecommerce-development" }} className="mt-2 text-[13px] font-extrabold text-primary">Explore B2C Solutions →</Link>
        </div>
      </article>
    </div>
  </section>;
}

function CaseStudies() {
  return (
    <section id="case-studies" className="bg-sky-soft py-4">
      <div className="page-shell grid gap-4 md:grid-cols-[188px_minmax(0,1fr)] lg:grid-cols-[205px_minmax(0,1fr)]">
        <div className="self-center">
          <p className="eyebrow text-primary">Case Studies</p>
          <h2 className="section-title mt-1 text-[25px] leading-[1.08]">
            Work That
            <br />
            Speaks for Itself
          </h2>
          <p className="section-subtitle mt-1.5 max-w-[190px]">
            Real businesses. Real results. Explore how we help companies grow with digital commerce.
          </p>
          <Button
            asChild
            size="sm"
            className="mt-3 h-9 bg-gold px-4 text-[13px] font-bold text-navy shadow-card transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-gold/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Link to="/work/$slug" params={{ slug: "portfolio" }}>
              View Our Portfolio <ArrowRight />
            </Link>
          </Button>
        </div>
        <div
          className="case-scroll grid grid-flow-col auto-cols-[278px] gap-3 overflow-x-auto pb-2 md:auto-cols-auto md:grid-flow-row md:grid-cols-3 md:overflow-visible md:pb-0"
          aria-label="Case studies"
        >
          {cases.map((item) => {
            const TagIcon = item.tagIcon;
            return (
              <article
                key={item.title}
                tabIndex={0}
                aria-label={`${item.title} case study`}
                className="group relative flex h-[155px] flex-col overflow-hidden rounded-md border border-border bg-card shadow-card outline-none transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sky-soft"
              >
                <div className="case-visual">
                  <img src={item.image} alt={item.alt} width={1934} height={813} loading="lazy" />
                </div>
                <div className="relative z-10 min-h-0 flex-1 p-3 pr-[45%]">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded border border-warning/20 bg-warning-soft px-2 py-1 text-[12px] font-extrabold text-navy">
                    <TagIcon className="h-2.5 w-2.5 shrink-0 text-warning" />
                    {item.tag}
                  </span>
                  <h3 className="mt-2 text-[13px] font-extrabold leading-[1.3] text-navy">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex flex-nowrap gap-1">
                    {item.chips.map((chip) => (
                      <span
                        key={chip}
                        className="whitespace-nowrap rounded bg-sky-soft px-2 py-1 text-[12px] font-semibold leading-none text-navy"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 grid h-[44px] shrink-0 grid-cols-3 border-t border-border/60 bg-card">
                  {item.stats.map(([number, label], index) => (
                    <div
                      key={label}
                      className={`min-w-0 px-2.5 py-2 ${index > 0 ? "border-l border-border/60" : ""}`}
                    >
                      <strong className="block truncate text-[13px] font-extrabold leading-none text-navy">
                        {number}
                      </strong>
                      <span className="mt-1 block truncate text-[12px] leading-none text-muted-foreground">
                        {label}
                      </span>
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
    <section id="resources" className="bg-card py-6">
      <div className="page-shell grid gap-4 md:grid-cols-[178px_1fr] md:items-center lg:grid-cols-[205px_1fr]">
        <div>
          <h2 className="text-[19px] font-bold leading-[1.15] text-navy lg:text-[21px]">
            Technology That
            <br />
            Works Together
          </h2>
          <p className="mt-2 max-w-[178px] text-[13px] font-medium leading-[1.5] text-muted-foreground lg:max-w-[205px] lg:text-[14px]">
            We use modern, reliable and scalable technologies to build high-performance commerce
            solutions.
          </p>
        </div>
        <div className="md:border-l md:border-border md:pl-5 lg:pl-7">
          <div className="grid grid-cols-4 gap-x-3 gap-y-4 sm:grid-cols-6 xl:grid-cols-12">
            {technologyStack.map(({ name, src }) => (
              <div key={name} className="flex flex-col items-center">
                <span className="grid h-14 w-14 place-items-center rounded-xl border border-border/80 bg-card p-3 shadow-card lg:h-16 lg:w-16">
                  <img
                    src={src}
                    alt={`${name} logo`}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="mt-2 block text-center text-[13px] leading-none text-muted-foreground lg:text-[13px]">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileServices() {
  return <section className="bg-sky-soft px-4 py-6 md:hidden">
    <div className="mx-auto max-w-md">
      <p className="page-eyebrow text-primary">Our Services</p>
      <h2 className="mt-2 text-[22px] font-extrabold text-navy">Everything your digital business needs.</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {services.map(({ icon: IconComponent, title }, index) => <Link key={title} to="/solutions/$slug" params={{ slug: ["ecommerce-development", "b2b-commerce", "marketplace-development", "website-design-development"][index] ?? "ecommerce-development" }} className="flex min-h-24 flex-col justify-between rounded-md border border-border bg-card p-4 shadow-card">
          <IconComponent className="h-6 w-6 text-primary" />
          <strong className="mt-3 text-[14px] leading-4 text-navy">{title}</strong>
        </Link>)}
      </div>
    </div>
  </section>;
}

type Review = Awaited<ReturnType<typeof getPublishedHomepageReviews>>[number];

function MobileReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  return <section className="bg-background py-7 md:hidden" aria-labelledby="home-reviews-title">
    <div className="page-shell">
      <p className="page-eyebrow text-primary">Client reviews</p>
      <h2 id="home-reviews-title" className="mt-2 text-[23px] font-extrabold text-navy">Trusted by growing businesses.</h2>
      <div className="case-scroll -mx-4 mt-4 grid snap-x snap-mandatory grid-flow-col auto-cols-[88%] gap-3 overflow-x-auto px-4 pb-2">
        {reviews.map((review) => <article key={review.id} className="snap-start rounded-md border border-border bg-card p-5 shadow-card">
          <div className="flex gap-1 text-gold" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
          <p className="mt-4 text-[13px] leading-6 text-foreground">“{review.review_text}”</p>
          <div className="mt-5 border-t border-border pt-4"><strong className="block text-sm text-navy">{review.customer_name}</strong><span className="text-[14px] text-muted-foreground">{[review.customer_role, review.company_name].filter(Boolean).join(" · ")}</span></div>
        </article>)}
      </div>
    </div>
  </section>;
}

function HomePage() {
  const reviews = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background font-sans">
      <SiteHeader />
      <Hero />
      <TrustStrip />
      <Services />
      <Ecosystem />
      <WhyUs />
      <div className="hidden md:block"><Industries /></div>
      <B2BFeatures />
      <MobileCommerceExperience />
      <div className="hidden md:block"><CaseStudies /></div>
      <HomePortfolio />
      <Technology />
      <div className="hidden md:block"><MobileReviews reviews={reviews} /></div>
    </main>
  );
}

function HomePortfolio() {
  return (
    <section id="portfolio" className="bg-background py-10">
      <div className="page-shell">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div>
            <p className="eyebrow text-primary">Portfolio</p>
            <h2 className="section-title mt-1 text-[26px] leading-[1.08]">Websites We Have<br />Built</h2>
            <p className="mt-1.5 max-w-[560px] text-[16px] leading-6 text-muted-foreground">Live projects for brands in India and Canada — every preview scrolls through the real website.</p>
          </div>
          <Button asChild className="hidden h-10 w-fit bg-gold px-5 text-[14px] font-semibold text-navy hover:bg-gold/90 sm:inline-flex">
            <Link to="/work/$slug" params={{ slug: "portfolio" }}>View Full Portfolio <ArrowRight /></Link>
          </Button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {portfolio.slice(0, 4).map((item) => (
            <div key={item.domain}>
              <ScrollingFrame item={item} height={300} eager />
              <h3 className="mt-3 text-[17px] text-navy">{item.name}</h3>
              <p className="text-[14px] text-muted-foreground">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
