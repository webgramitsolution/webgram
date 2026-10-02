import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const URL = "https://webgramitsolution.com/resources/faqs";
const title = "FAQs — Website, Ecommerce & B2B Development | Webgram IT Solution";
const description =
  "Answers to common questions about Webgram IT Solution: website and ecommerce development, timelines, pricing, WooCommerce, Shopify, B2B portals, maintenance and support.";

export const Route = createFileRoute("/resources/faqs")({
  head: () => ({
    links: [{ rel: "canonical", href: URL }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FaqsPage,
});

const groups: Array<{ title: string; items: Array<[string, string]> }> = [
  {
    title: "About Webgram",
    items: [
      ["What does Webgram IT Solution do?", "We are a Delhi-based web development company that designs and builds business websites, ecommerce stores, B2B commerce platforms, marketplaces and custom web portals, along with API integrations, maintenance and speed optimisation."],
      ["Where are you located and who do you work with?", "Our office is in Sangam Vihar, New Delhi. We work with businesses across India and abroad — our portfolio includes clients in Delhi NCR, Lucknow, Gurgaon and Ontario, Canada."],
      ["Can I see websites you have built?", "Yes. Visit our Portfolio page to see live websites such as Houskase, King Sports Management, Regal Consulting Group and Fresh & Bright Cleaners."],
    ],
  },
  {
    title: "Projects & pricing",
    items: [
      ["How much does a website cost?", "Cost depends on the number of pages, features, integrations and content. After a short discussion we share a fixed, itemised quote so there are no surprises."],
      ["How long does a project take?", "A business website usually takes 2–4 weeks. Ecommerce stores take around 4–8 weeks, and B2B portals or marketplaces depend on the workflows and integrations involved."],
      ["What do you need from me to start?", "Your logo, business details, service or product information, photos and any reference websites you like. We guide you through everything else."],
      ["Do you work on existing websites?", "Yes. We redesign, fix, speed up and extend existing WordPress, WooCommerce, Shopify and custom websites."],
    ],
  },
  {
    title: "Platforms & features",
    items: [
      ["Which platforms do you use?", "WordPress, WooCommerce, Shopify, Laravel/PHP and modern JavaScript frameworks like React and Next.js. We recommend the platform that fits your goals and budget."],
      ["Can you build a B2B or wholesale store?", "Yes. We build B2B portals with customer-specific pricing, MOQ, RFQ and quotes, bulk ordering, credit terms and ERP integration."],
      ["Will my website work well on mobile and be SEO-ready?", "Every website we build is mobile-first, fast-loading and includes clean page structure, meta tags, sitemaps and structured data."],
      ["Can you integrate payment gateways, CRMs and ERPs?", "Yes. We integrate Indian and international payment gateways, shipping and logistics, CRMs, ERPs and custom third-party APIs."],
    ],
  },
  {
    title: "Support",
    items: [
      ["Do you provide support after launch?", "Yes. We offer maintenance plans that include updates, backups, security monitoring and content changes."],
      ["Who owns the website after it is built?", "You do. After final payment, the website, content and domain are fully yours."],
      ["How do I contact you?", "Call +91 7551120242, email info@webgramitsolution.com or use the contact form — we usually reply within one business day."],
    ],
  },
];

function FaqsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="contact-hero bg-navy py-12 text-on-dark md:py-16">
        <div className="header-shell">
          <p className="page-eyebrow text-gold">Resources</p>
          <h1 className="page-title mt-2">Frequently Asked Questions</h1>
          <p className="page-lead mt-3 max-w-[680px] text-on-dark/85">Quick answers about our services, process, timelines, pricing and support.</p>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="header-shell grid max-w-[920px] gap-8">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[24px] text-navy">{group.title}</h2>
              <div className="mt-3 divide-y divide-border rounded-lg border border-border bg-card shadow-card">
                {group.items.map(([q, a]) => (
                  <details key={q} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-navy">
                      {q}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-[16px] leading-7 text-muted-foreground">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-xl bg-sky-soft p-6">
            <h2 className="text-[22px] text-navy">Still have a question?</h2>
            <p className="mt-1 text-[16px] text-muted-foreground">Send us a message and our team will get back to you.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="h-11 bg-gold px-6 text-[15px] font-semibold text-navy hover:bg-gold/90"><Link to="/contact">Contact Us <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              <Button asChild variant="outline" className="h-11 px-6 text-[15px]"><Link to="/work/portfolio">View Portfolio</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
