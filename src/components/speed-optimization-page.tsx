import { Link } from "@tanstack/react-router";
import { Activity, Code2, Gauge, Image, Server, ShoppingCart } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { Button } from "@/components/ui/button";
import { pickFaqs } from "@/lib/faq-content";

const services = [
  [Gauge, "Performance audit", "We test representative pages on mobile and desktop and prioritize the bottlenecks that affect visitors most."],
  [Activity, "Core Web Vitals", "We investigate slow main content (LCP), sluggish interactions (INP) and unexpected layout shifts (CLS)."],
  [Image, "Images and fonts", "We resize and compress media, reserve space for images and optimize how key images and fonts load."],
  [Code2, "Scripts and third-party apps", "We review heavy JavaScript, themes, plugins and tracking scripts to reduce the work each page does."],
  [Server, "Caching and server response", "We review CDN delivery, browser caching and server response times, with separate rules for personalized pages."],
  [ShoppingCart, "Ecommerce journey checks", "We retest key product, cart and checkout flows after changes, including relevant payment and tracking integrations."],
] as const;

const steps = [
  ["Benchmark key pages", "Choose the pages that matter to your business and capture a baseline under consistent conditions."],
  ["Prioritize and implement fixes", "Agree on the changes, then apply and test them on staging when available."],
  ["Retest and share results", "Compare before-and-after measurements and share the changes made and any remaining dependencies."],
] as const;

const faqs = pickFaqs([
  "Which platforms do you optimize?",
  "What results can I expect from speed optimization?",
  "How much does speed optimization cost?",
]);

const whatsappUrl = "https://wa.me/917551120242?text=Hi%20Webgram%2C%20I%27d%20like%20a%20website%20speed%20audit.%20My%20website%20URL%20is%3A%20";

export function SpeedOptimizationPage() {
  return (
    <div id="top" className="bg-background text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden bg-navy text-on-dark">
        <div className="ecom-waves pointer-events-none absolute inset-0" />
        <div className="ecom-shell relative grid min-h-[430px] items-center gap-8 py-8 md:min-h-[348px] md:grid-cols-[1.25fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-3 text-sm text-on-dark/80">
              <Link to="/" className="hover:underline">Home</Link> / Services / Speed Optimization
            </nav>
            <h1 className="page-title leading-tight">
              Website Speed Optimization
              <span className="block text-gold">Faster pages on mobile</span>
            </h1>
            <p className="page-lead mt-3 max-w-xl text-on-dark/85">
              Webgram IT Solution helps businesses in Delhi NCR and across India improve website load times and make browsing, shopping and checkout smoother.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="h-11 bg-gold px-5 font-bold text-navy hover:bg-gold/90">
                <Link to="/contact">Request a speed audit</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 border-on-dark/60 bg-transparent px-5 text-on-dark hover:bg-on-dark/10 hover:text-on-dark">
                <a href={whatsappUrl}>WhatsApp us</a>
              </Button>
            </div>
          </div>
          <div className="hidden rounded-2xl border border-on-dark/20 bg-on-dark/5 p-5 md:block">
            <p className="flex items-center gap-2 font-bold text-gold"><Gauge aria-hidden="true" className="size-5" /> Core Web Vitals</p>
            <dl className="mt-3 divide-y divide-on-dark/15 text-sm">
              <div className="flex justify-between gap-4 py-2.5"><dt className="font-bold">LCP</dt><dd>Main content loading</dd></div>
              <div className="flex justify-between gap-4 py-2.5"><dt className="font-bold">INP</dt><dd>Interaction responsiveness</dd></div>
              <div className="flex justify-between gap-4 py-2.5"><dt className="font-bold">CLS</dt><dd>Visual stability</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="ecom-shell">
          <h2 className="content-title text-navy">What we optimize</h2>
          <p className="content-body mt-2 max-w-2xl text-muted-foreground">
            As an ecommerce website specialist, we work on Shopify stores, WooCommerce and WordPress sites, and custom websites built with React or Next.js.
          </p>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([Icon, title, description]) => (
              <li key={title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <Icon aria-hidden="true" className="size-6 text-primary" />
                <h3 className="mt-3 text-lg font-bold text-navy">{title}</h3>
                <p className="content-body mt-2 text-muted-foreground">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 py-12">
        <div className="ecom-shell">
          <h2 className="content-title text-navy">How the optimization works</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {steps.map(([title, description]) => (
              <li key={title} className="border-l-2 border-gold pl-4">
                <h3 className="text-lg font-bold text-navy">{title}</h3>
                <p className="content-body mt-2 text-muted-foreground">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12">
        <div className="ecom-shell grid gap-6 md:grid-cols-[1fr_2fr]">
          <h2 className="content-title text-navy">Frequently asked questions</h2>
          <div className="divide-y divide-border rounded-xl border border-border px-5">
            {faqs.map(([question, answer]) => (
              <details key={question} className="py-4">
                <summary className="cursor-pointer font-bold text-navy">{question}</summary>
                <p className="content-body mt-3 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-9 text-on-dark">
        <div className="ecom-shell grid items-center gap-7 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Where is your website slowing down?</h2>
            <p className="mt-2 text-on-dark/85">Share your website URL and the pages or checkout steps that feel slow so we can scope your audit.</p>
            <Button asChild className="mt-4 h-11 bg-gold px-5 font-bold text-navy hover:bg-gold/90">
              <Link to="/contact">Discuss your website</Link>
            </Button>
          </div>
          <TrustFacts />
        </div>
      </section>
    </div>
  );
}
