import { Link } from "@tanstack/react-router";
import { ChevronDown, Facebook, Linkedin, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import webgramLogo from "@/assets/webgram-logo.png.asset.json";

type Target =
  | { to: "/" }
  | { to: "/about" }
  | { to: "/contact" }
  | { to: "/solutions/$slug"; params: { slug: string } }
  | { to: "/services/$slug"; params: { slug: string } }
  | { to: "/industries/$slug"; params: { slug: string } }
  | { to: "/work/$slug"; params: { slug: string } }
  | { to: "/resources/$slug"; params: { slug: string } };

const slugify = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const subpage = (
  section: "solutions" | "services" | "industries" | "work" | "resources",
  label: string,
): Target => ({ to: `/${section}/$slug`, params: { slug: slugify(label) } }) as Target;

// Exact menu from the approved version (Sep 29, 2:37 PM)
const menu: Array<{ label: string; target?: Target; items?: Array<[string, Target]> }> = [
  { label: "Home", target: { to: "/" } },
  {
    label: "Solutions",
    items: [
      "Ecommerce Development",
      "B2B Commerce",
      "Website Design & Development",
      "Marketplace Development",
      "Custom Commerce",
      "Mobile Commerce",
    ].map((label) => [label, subpage("solutions", label)]),
  },
  {
    label: "Services",
    items: [
      "Website Development",
      "Website Design",
      "WordPress",
      "WooCommerce",
      "Shopify",
      "API Integration",
      "Website Maintenance",
      "Speed Optimization",
    ].map((label) => [label, subpage("services", label)]),
  },
  {
    label: "Industries",
    items: [
      "Manufacturing",
      "Retail",
      "Wholesale",
      "Furniture",
      "Fashion",
      "Electronics",
      "Building Materials",
    ].map((label) => [label, subpage("industries", label)]),
  },
  {
    label: "Work",
    items: ["Case Studies", "Portfolio", "Client Stories"].map((label) => [
      label,
      subpage("work", label),
    ]),
  },
  {
    label: "Resources",
    items: ["Blog", "Guides", "FAQs", "Insights"].map((label) => [label, subpage("resources", label)]),
  },
  { label: "About Us", target: { to: "/about" } },
  { label: "Contact Us", target: { to: "/contact" } },
];

const topLinks: Array<[string, Target]> = [
  ["Newsletter", { to: "/contact" }],
  ["Contact Us", { to: "/contact" }],
  ["FAQs", { to: "/resources/$slug", params: { slug: "faqs" } }],
];

export function SiteHeader() {
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
            <span
              className="flex items-center gap-3 border-r border-on-dark/15 px-3"
              aria-label="Social channels"
            >
              <Facebook className="h-3.5 w-3.5" />
              <span className="font-bold">X</span>
              <span className="font-bold">p</span>
              <Linkedin className="h-3.5 w-3.5" />
              <Send className="h-3.5 w-3.5" />
            </span>
            {topLinks.map(([label, target]) => (
              <Link
                key={label}
                {...target}
                className="flex h-full items-center border-r border-on-dark/15 px-3 hover:opacity-75"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="header-shell flex h-[76px] items-center justify-between gap-5">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Webgram IT Solution home">
          <img
            src={webgramLogo.url}
            alt="Webgram IT Solution"
            width={720}
            height={323}
            className="h-[38px] w-auto object-contain md:h-[34px] lg:h-[44px]"
          />
        </Link>
        <nav className="hidden h-full items-center gap-2.5 lg:gap-5 md:flex" aria-label="Primary navigation">
          {menu.map(({ label, target, items }) => (
            <div key={label} className="group relative flex h-full items-center">
              {target ? (
                <Link
                  {...target}
                  className="whitespace-nowrap text-[9px] font-semibold uppercase text-on-dark transition-opacity hover:opacity-75 focus-visible:opacity-75 lg:text-[11px]"
                >
                  {label}
                </Link>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-1 whitespace-nowrap text-[9px] font-semibold uppercase text-on-dark transition-opacity hover:opacity-75 focus-visible:opacity-75 lg:text-[11px]"
                >
                  {label}
                  <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
              )}
              {items && (
                <ul
                  className={`invisible absolute top-full min-w-[210px] translate-y-1 rounded-b-md border border-border bg-card py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${label === "Resources" ? "right-0" : "left-0"}`}
                >
                  {items.map(([item, itemTarget]) => (
                    <li key={item}>
                      <Link
                        {...itemTarget}
                        className="block px-4 py-2 text-[12px] font-medium text-navy transition-colors hover:bg-sky-soft hover:text-primary focus-visible:bg-sky-soft focus-visible:outline-none"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <Button
          asChild
          className="h-9 bg-gold px-4 text-[10px] font-bold text-navy hover:bg-gold/90 md:hidden"
        >
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </header>
  );
}
