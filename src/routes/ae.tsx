import { createFileRoute } from "@tanstack/react-router";
import { RegionalLanding, regionalHead, type RegionContent } from "@/components/regional-landing";

const c: RegionContent = {
  code: "ae", country: "UAE", dialCode: "+971", currency: "AED",
  eyebrow: "United Arab Emirates · Dubai · Abu Dhabi · Sharjah",
  title: "Ecommerce & B2B Web Engineering for Ambitious UAE Brands",
  intro: "Webgram partners with UAE digital agencies and enterprises to deliver high-converting commerce platforms — with native Middle-Eastern payments, pixel-perfect Arabic RTL interfaces and edge-optimised performance across the GCC.",
  capabilities: [
    { title: "Tabby & Tamara BNPL", text: "Certified-flow integration of Buy Now, Pay Later checkouts with promo widgets, webhook-driven order states and refund reconciliation." },
    { title: "Apple Pay & PayTabs", text: "One-tap Apple Pay and PayTabs hosted or embedded payment pages, 3-D Secure, multi-currency AED settlement and tokenised repeat payments." },
    { title: "Arabic RTL Engineering", text: "Pixel-perfect bilingual English/Arabic layouts with logical CSS properties, mirrored iconography and Arabic typography tuned for readability." },
    { title: "Cloudflare Middle-East CDN", text: "Deployment on Cloudflare's edge with Dubai and regional points of presence, caching rules, WAF and Core Web Vitals monitoring." },
    { title: "White-label Agency Delivery", text: "Discreet build partner for UAE agencies — your brand, our engineers, NDA-backed delivery and transparent sprint reporting." },
    { title: "B2B Portals & ERP Sync", text: "Wholesale pricing tiers, quotation workflows and integrations with ERP, CRM and logistics providers used across the Emirates." },
  ],
  stack: ["Tabby", "Tamara", "Apple Pay", "PayTabs", "Arabic RTL", "Cloudflare", "Shopify", "WooCommerce", "Laravel", "React", "Node.js"],
  packages: [
    { name: "Launch", price: "AED 9,500", note: "Corporate or brochure website", items: ["Up to 10 bilingual pages", "Arabic RTL layout", "Cloudflare CDN setup", "On-page SEO for Google UAE"] },
    { name: "Commerce", price: "AED 24,000", note: "Full ecommerce store", items: ["Tabby / Tamara BNPL", "Apple Pay & PayTabs", "Product, order & stock management", "30 days post-launch support"] },
    { name: "Enterprise B2B", price: "AED 55,000+", note: "Custom portal or marketplace", items: ["Custom B2B workflows", "ERP / CRM integrations", "Dedicated project manager", "SLA-backed maintenance"] },
  ],
};

export const Route = createFileRoute("/ae")({
  head: () => regionalHead("ae", "Ecommerce Development Company in UAE | Tabby, Tamara & PayTabs | Webgram", "UAE ecommerce and B2B web development partner for Dubai & Abu Dhabi agencies. Tabby, Tamara, Apple Pay and PayTabs integration, Arabic RTL and Cloudflare CDN. Packages in AED.", "en_AE"),
  component: () => <RegionalLanding c={c} />,
});
