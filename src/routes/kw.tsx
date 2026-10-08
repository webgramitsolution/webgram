import { createFileRoute } from "@tanstack/react-router";
import { RegionalLanding, regionalHead, type RegionContent } from "@/components/regional-landing";

const c: RegionContent = {
  code: "kw", country: "Kuwait", dialCode: "+965", currency: "KWD",
  eyebrow: "Kuwait · Kuwait City · Hawalli · Salmiya",
  title: "KNET-Ready Ecommerce & White-Label B2B Engineering for Kuwait",
  intro: "Webgram helps Kuwaiti enterprises and digital agencies launch secure, high-performance commerce platforms — with native KNET and MyFatoorah payments and agile remote engineering teams that scale with your pipeline.",
  capabilities: [
    { title: "KNET Payment Gateway", text: "Direct KNET integration with secure redirect flows, transaction verification, reconciliation reports and failure-recovery handling." },
    { title: "MyFatoorah Setup", text: "End-to-end MyFatoorah configuration — invoices, payment links, KNET, cards and Apple Pay through one dashboard, with webhook order sync." },
    { title: "White-label Team Extension", text: "Dedicated developers, designers and QA working under your agency brand, aligned to Kuwait business hours with NDA-backed delivery." },
    { title: "Agile Remote Delivery", text: "Two-week sprints, shared boards, daily async updates and demo calls so your clients always see measurable progress." },
    { title: "B2B Commerce Portals", text: "Wholesale catalogues, customer-specific pricing, credit terms and quotation workflows for Kuwaiti distributors and traders." },
    { title: "Bilingual & SEO Ready", text: "English/Arabic RTL interfaces and technical SEO engineered to rank on Google Kuwait (google.com.kw)." },
  ],
  stack: ["KNET", "MyFatoorah", "Apple Pay", "Arabic RTL", "Shopify", "WooCommerce", "Laravel", "React", "Node.js", "Cloudflare"],
  packages: [
    { name: "Launch", price: "KWD 800", note: "Corporate or brochure website", items: ["Up to 10 bilingual pages", "Arabic RTL layout", "Contact & lead forms", "On-page SEO for Google Kuwait"] },
    { name: "Commerce", price: "KWD 2,000", note: "Full ecommerce store", items: ["KNET gateway integration", "MyFatoorah setup", "Order & inventory management", "30 days post-launch support"] },
    { name: "Team Extension", price: "KWD 1,200 / month", note: "Dedicated white-label developer", items: ["Full-time remote engineer", "Agile sprint reporting", "Your brand, your clients", "Scale up or down monthly"] },
  ],
};

export const Route = createFileRoute("/kw")({
  head: () => regionalHead("kw", "Ecommerce & KNET Integration Company in Kuwait | Webgram", "Kuwait ecommerce and B2B development partner: KNET payment gateway, MyFatoorah setup and white-label remote team extension for agencies. Packages in KWD.", "en_KW"),
  component: () => <RegionalLanding c={c} />,
});
