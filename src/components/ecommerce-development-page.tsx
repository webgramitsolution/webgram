import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  BarChart3,
  Boxes,
  Brush,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleUserRound,
  Cloud,
  Code2,
  CreditCard,
  Globe2,
  Headphones,
  Languages,
  LayoutDashboard,
  MonitorSmartphone,
  PackageSearch,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
  TestTubeDiagonal,
  Wrench,
} from "lucide-react";
import { useRef } from "react";

import industriesStrip from "@/assets/ecommerce-industries.jpg";
import mysqlLogo from "@/assets/mysql.png.asset.json";
import phpLogo from "@/assets/php.svg.asset.json";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { IMAGES, technologyStack } from "@/lib/site-images";

const heroImage = "https://ik.imagekit.io/home1/About%20us%20page/ecommer.png";

const benefits = [
  [Store, "24/7", "Sales Channel"],
  [BarChart3, "Higher", "Brand Visibility"],
  [ChartNoAxesCombined, "Increased", "Revenue"],
  [CircleUserRound, "Better", "Customer Experience"],
] as const;

const features = [
  [Brush, "Custom Design", "Unique, brand-focused designs", "bg-warning-soft text-warning"],
  [
    ShoppingBag,
    "Product Management",
    "Easy product & inventory management",
    "bg-primary-soft text-primary",
  ],
  [ShieldCheck, "Secure Checkout", "Multiple payment gateways", "bg-violet-soft text-violet"],
  [
    MonitorSmartphone,
    "Mobile Responsive",
    "Perfect on all devices",
    "bg-success-soft text-success",
  ],
  [Search, "SEO Friendly", "Built for higher visibility", "bg-cyan-soft text-cyan"],
  [Languages, "Multi-Currency & Multi-Language", "Sell globally", "bg-cyan-soft text-cyan"],
  [BadgePercent, "Coupons & Offers", "Drive more sales", "bg-orange-soft text-orange"],
  [
    CircleUserRound,
    "Customer Accounts",
    "Wishlist, orders, reviews",
    "bg-primary-soft text-primary",
  ],
  [
    Boxes,
    "Third-Party Integrations",
    "Shipping, CRM, WhatsApp etc.",
    "bg-warning-soft text-warning",
  ],
  [BarChart3, "Analytics & Reports", "Track performance", "bg-success-soft text-success"],
] as const;

const industries = [
  "Fashion & Apparel",
  "Beauty & Cosmetics",
  "Electronics & Gadgets",
  "Furniture & Home Decor",
  "Food & Grocery",
] as const;

const process = [
  [PackageSearch, "01", "Discovery", "Understand your business goals and requirements"],
  [Wrench, "02", "Strategy", "Plan the right solution and technology"],
  [Brush, "03", "Design", "Create stunning and user-friendly UI/UX"],
  [Code2, "04", "Development", "Build with modern and scalable technology"],
  [TestTubeDiagonal, "05", "Testing", "Ensure performance, security and functionality"],
  [Rocket, "06", "Launch", "Deployment and ongoing support"],
] as const;

const technologies = [
  technologyStack[3],
  technologyStack[4],
  technologyStack[0],
  technologyStack[1],
  technologyStack[2],
  { name: "PHP", src: phpLogo.url },
  { name: "MySQL", src: mysqlLogo.url },
  technologyStack[7],
  technologyStack[9],
  technologyStack[10],
];

const projects = [
  {
    title: "Fashion Ecommerce",
    description: "From a local store to a national brand",
    image: IMAGES.caseLifestyle,
    tags: ["Design", "Development", "Marketing"],
    metrics: [
      ["3x", "Sales Growth"],
      ["200+", "Daily Orders"],
      ["50%", "Higher Conversion"],
    ],
  },
  {
    title: "Furniture Store",
    description: "Modern ecommerce experience",
    image: IMAGES.caseManufacturing,
    tags: ["WooCommerce", "Custom Design"],
    metrics: [
      ["2.5x", "Revenue Growth"],
      ["60%", "Repeat Customers"],
      ["40%", "Higher AOV"],
    ],
  },
  {
    title: "Electronics Store",
    description: "Multi-category ecommerce platform",
    image: IMAGES.caseDistribution,
    tags: ["Custom Development", "API Integration"],
    metrics: [
      ["70%", "Faster Orders"],
      ["100+", "Product Categories"],
      ["3x", "Customer Base"],
    ],
  },
] as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="ecom-eyebrow">{children}</p>;
}

function IndustryCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) =>
    track.current?.scrollBy({ left: direction * 260, behavior: "smooth" });

  return (
    <div className="relative min-w-0">
      <div
        ref={track}
        className="ecom-scroll flex snap-x gap-2 overflow-x-auto scroll-smooth"
        aria-label="Ecommerce industries"
      >
        {industries.map((industry, index) => (
          <article
            key={industry}
            className="relative h-[150px] min-w-[190px] flex-1 snap-start overflow-hidden rounded-md md:min-w-0"
          >
            <img
              src={industriesStrip}
              alt={industry}
              width={1920}
              height={512}
              loading="lazy"
              className="absolute top-0 h-full w-[500%] max-w-none object-cover"
              style={{ left: `${index * -100}%` }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-navy/90 px-3 py-2 text-[9px] font-bold text-on-dark">
              {industry} <ArrowRight className="ml-1 inline h-3 w-3" />
            </div>
          </article>
        ))}
      </div>
      <Button
        aria-label="Previous industries"
        variant="outline"
        size="icon"
        onClick={() => move(-1)}
        className="absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-navy shadow-card"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        aria-label="Next industries"
        variant="outline"
        size="icon"
        onClick={() => move(1)}
        className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card text-navy shadow-card"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function EcommerceDevelopmentPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="ecom-hero relative overflow-hidden bg-navy text-on-dark">
        <img
          src={heroImage}
          alt="Laptop and phone displaying a responsive furniture ecommerce store"
          width={2112}
          height={745}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="ecom-hero-shade absolute inset-0" />
        <div className="ecom-shell relative flex h-full items-center py-6">
          <div className="max-w-[520px]">
            <nav className="mb-4 text-[9px] font-medium text-on-dark/75" aria-label="Breadcrumb">
              <Link to="/">Home</Link> <span className="px-1.5">›</span> Solutions{" "}
              <span className="px-1.5">›</span> Ecommerce Development
            </nav>
            <Eyebrow>Ecommerce Development</Eyebrow>
            <h1 className="mt-2 text-[34px] font-extrabold leading-[1.03] sm:text-[40px] md:text-[42px] lg:text-[46px]">
              High-Converting
              <br />
              Ecommerce Websites
              <br />
              for <span className="text-gold">Growing Businesses.</span>
            </h1>
            <p className="mt-3 max-w-[500px] text-[11px] leading-[1.5] text-on-dark/90 sm:text-[12px]">
              We design and develop powerful, scalable and conversion-focused ecommerce websites
              that help you attract customers, increase sales and build a strong online brand.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-10 bg-gold px-6 text-[10px] font-bold text-navy hover:bg-gold/90"
              >
                <Link to="/contact">
                  Get a Free Consultation <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-10 border-on-dark/70 bg-transparent px-6 text-[10px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"
              >
                <Link to="/work/$slug" params={{ slug: "case-studies" }}>
                  View Our Work <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="mt-6 grid max-w-[500px] grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [ShoppingBag, "Custom Store Design"],
                [ShieldCheck, "Secure & Scalable"],
                [BarChart3, "Conversion Focused"],
                [Headphones, "Ongoing Support"],
              ].map(([Icon, title]) => {
                const FeatureIcon = Icon as typeof ShoppingBag;
                return (
                  <div
                    key={title as string}
                    className="flex items-center gap-2 text-[8px] font-semibold leading-3"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-on-dark/60">
                      <FeatureIcon className="h-4 w-4" />
                    </span>
                    {title as string}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-6">
        <div className="ecom-shell grid items-center gap-5 md:grid-cols-[1.05fr_1.55fr]">
          <div>
            <Eyebrow>Why Invest in Ecommerce</Eyebrow>
            <h2 className="ecom-title mt-2">
              Take Your Business Online
              <br />
              with a Powerful Ecommerce Store
            </h2>
            <p className="ecom-copy mt-2 max-w-[470px]">
              A professional ecommerce website helps you reach more customers, sell 24/7, automate
              your business and create a stronger brand presence in the digital world.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {benefits.map(([Icon, stat, label]) => (
              <article
                key={label}
                className="grid min-h-[110px] place-items-center rounded-md border border-border bg-card p-3 text-center"
              >
                <Icon className="h-7 w-7 text-primary" />
                <div>
                  <strong className="block text-[13px] text-navy">{stat}</strong>
                  <span className="text-[9px] text-muted-foreground">{label}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-6">
        <div className="ecom-shell">
          <div className="grid items-end gap-3 md:grid-cols-[1fr_1.1fr_auto]">
            <div>
              <Eyebrow>Key Features</Eyebrow>
              <h2 className="ecom-title mt-2">
                Everything You Need for a Successful
                <br className="hidden md:block" /> Ecommerce Business
              </h2>
            </div>
            <p className="ecom-copy">
              From product showcase to secure checkout, we build ecommerce websites with all the
              essential features to help you sell smarter and scale faster.
            </p>
            <a href="#features" className="text-[9px] font-bold text-primary underline">
              View All Features <ArrowRight className="inline h-3 w-3" />
            </a>
          </div>
          <div id="features" className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">
            {features.map(([Icon, title, text, tone]) => (
              <article
                key={title}
                className="grid min-h-[68px] grid-cols-[38px_1fr] items-center gap-2 rounded-md border border-border/70 bg-card p-2.5"
              >
                <span className={`grid h-9 w-9 place-items-center rounded-md ${tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[9px] font-extrabold leading-tight text-navy">{title}</h3>
                  <p className="mt-1 text-[7.5px] leading-[1.25] text-muted-foreground">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-6">
        <div className="ecom-shell grid items-center gap-6 md:grid-cols-[285px_minmax(0,1fr)]">
          <div>
            <Eyebrow>Industries We Serve</Eyebrow>
            <h2 className="ecom-title mt-2">
              Ecommerce for
              <br />
              Every Industry
            </h2>
            <p className="ecom-copy mt-2">
              We build ecommerce solutions for businesses across multiple industries, tailored to
              their unique requirements.
            </p>
            <Button
              asChild
              className="mt-4 h-9 bg-gold px-5 text-[9px] font-bold text-navy hover:bg-gold/90"
            >
              <Link to="/contact">
                Discuss Your Industry <ArrowRight />
              </Link>
            </Button>
          </div>
          <IndustryCarousel />
        </div>
      </section>

      <section className="bg-sky-soft py-6">
        <div className="ecom-shell">
          <div className="grid items-end gap-3 md:grid-cols-[1fr_1.1fr_auto]">
            <div>
              <Eyebrow>Our Development Process</Eyebrow>
              <h2 className="ecom-title mt-2">
                From Idea to Launch
                <br />A Clear & Proven Process
              </h2>
            </div>
            <p className="ecom-copy">
              We follow a structured development process to ensure your ecommerce website is
              delivered on time, with the right features and the best performance.
            </p>
            <span className="text-[9px] font-bold text-primary">
              Learn More <ArrowRight className="inline h-3 w-3" />
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-6">
            {process.map(([Icon, number, title, text], index) => (
              <article key={title} className="relative grid grid-cols-[42px_1fr] gap-2 md:block">
                {index < process.length - 1 && (
                  <ArrowRight className="absolute -right-2 top-4 hidden h-3 w-3 text-primary md:block" />
                )}
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full ${index % 2 ? "bg-warning-soft text-warning" : "bg-primary-soft text-primary"}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="md:mt-2">
                  <span className="text-[8px] font-bold text-navy">{number}</span>
                  <h3 className="text-[9px] font-extrabold text-navy">{title}</h3>
                  <p className="mt-1 text-[7.5px] leading-[1.25] text-muted-foreground">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-6">
        <div className="ecom-shell grid items-center gap-5 md:grid-cols-[280px_1fr]">
          <div>
            <Eyebrow>Technology We Use</Eyebrow>
            <h2 className="ecom-title mt-2">
              Modern Technology
              <br />
              for Better Performance
            </h2>
            <p className="ecom-copy mt-2">
              We use industry-leading technologies to build fast, secure and scalable ecommerce
              websites.
            </p>
          </div>
          <div className="ecom-scroll grid grid-flow-col auto-cols-[82px] gap-2 overflow-x-auto md:grid-cols-10 md:overflow-visible">
            {technologies.map(
              (tech) =>
                tech && (
                  <article key={tech.name} className="text-center">
                    <span className="grid h-[68px] place-items-center rounded-md border border-border bg-card p-3">
                      <img
                        src={tech.src}
                        alt={`${tech.name} logo`}
                        width={80}
                        height={80}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <span className="mt-2 block text-[7.5px] text-muted-foreground">
                      {tech.name}
                    </span>
                  </article>
                ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-6">
        <div className="ecom-shell grid gap-4 md:grid-cols-[280px_1fr]">
          <div className="self-center">
            <Eyebrow>Success Stories</Eyebrow>
            <h2 className="ecom-title mt-2">
              Ecommerce Projects
              <br />
              We Have Delivered
            </h2>
            <p className="ecom-copy mt-2">
              Explore some of our recent ecommerce projects and see how we helped businesses grow
              online.
            </p>
            <Button
              asChild
              className="mt-4 h-9 bg-gold px-5 text-[9px] font-bold text-navy hover:bg-gold/90"
            >
              <Link to="/work/$slug" params={{ slug: "case-studies" }}>
                View All Case Studies <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="ecom-scroll grid grid-flow-col auto-cols-[270px] gap-3 overflow-x-auto md:grid-cols-3 md:overflow-visible">
            {projects.map((project) => (
              <article
                key={project.title}
                className="overflow-hidden rounded-md border border-border bg-card"
              >
                <div className="grid h-[92px] grid-cols-[1fr_45%]">
                  <div className="p-3">
                    <h3 className="text-[10px] font-extrabold text-navy">{project.title}</h3>
                    <p className="mt-1 text-[7px] text-muted-foreground">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-primary-soft px-1.5 py-1 text-[6px] font-semibold text-navy"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <img
                    src={project.image}
                    alt={`${project.title} project`}
                    width={1934}
                    height={813}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 border-t border-border">
                  {project.metrics.map(([value, label], index) => (
                    <div key={label} className={`p-2 ${index ? "border-l border-border" : ""}`}>
                      <strong className="block text-[12px] font-extrabold text-navy">
                        {value}
                      </strong>
                      <span className="text-[6px] text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ecom-final relative overflow-hidden bg-navy py-7 text-on-dark">
        <div className="ecom-waves absolute inset-0" />
        <div className="ecom-shell relative grid items-center gap-8 md:grid-cols-[1fr_1.15fr]">
          <div>
            <Eyebrow>Ready to Build Your Ecommerce Store?</Eyebrow>
            <h2 className="mt-2 text-[29px] font-extrabold leading-[1.02] sm:text-[34px]">
              Let’s Turn Your Ecommerce
              <br />
              Idea into Reality.
            </h2>
            <p className="mt-3 max-w-[510px] text-[10px] leading-4 text-on-dark/85">
              Get a free consultation and let our experts help you build a high-performing ecommerce
              website for your business.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-10 bg-gold px-6 text-[10px] font-bold text-navy hover:bg-gold/90"
              >
                <Link to="/contact">
                  Start Your Project <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-10 border-on-dark/60 bg-transparent px-6 text-[10px] font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark"
              >
                <a href="tel:+917551120242">Talk to an Expert</a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[
              [Headphones, "Free Consultation", "Discuss your idea"],
              [Brush, "Custom Solution", "Tailored to your needs"],
              [TestTubeDiagonal, "On-Time Delivery", "With best practices"],
              [Rocket, "Long-Term Support", "We grow with you"],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof Headphones;
              return (
                <div key={title as string} className="text-center">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-on-dark/60">
                    <ItemIcon className="h-5 w-5" />
                  </span>
                  <strong className="mt-2 block text-[8px]">{title as string}</strong>
                  <small className="mt-1 block text-[7px] text-on-dark/70">{text as string}</small>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
