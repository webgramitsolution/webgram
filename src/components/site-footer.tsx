import { Facebook, Instagram, Linkedin, MessageCircle, Pin, Youtube, type LucideIcon } from "lucide-react";
import { openCookieSettings } from "@/components/blog-ads";

import webgramLogo from "@/assets/webgram-logo.png.asset.json";

const columns = [
  ["Solutions", [{ label: "Ecommerce", to: "/solutions/ecommerce-development" }, { label: "B2B Commerce", to: "/solutions/b2b-commerce" }, { label: "Website Design & Development", to: "/solutions/website-design-development" }]],
  ["Services", [{ label: "Web Portal Development", to: "/services/web-portal-development" }, { label: "Website Design", to: "/services/website-design" }, { label: "WooCommerce", to: "/services/woocommerce" }, { label: "API Integration", to: "/services/api-integration" }]],
  ["Resources", [{ label: "Blog", to: "/resources/blog" }, { label: "Guides", to: "/resources/guides" }, { label: "FAQs", to: "/resources/faqs" }]],
  ["Company", [{ label: "About Us", to: "/about" }, { label: "Contact", to: "/contact" }, { label: "Privacy Policy", to: "/privacy-policy" }]],
  ["Legal", [{ label: "Terms & Conditions", to: "/terms-and-conditions" }, { label: "Cookie Policy", to: "/cookie-policy" }, { label: "Disclaimer", to: "/disclaimer" }]],
] as const;

const socials: Array<[LucideIcon, string]> = [
  [Linkedin, "LinkedIn"],
  [Instagram, "Instagram"],
  [Facebook, "Facebook"],
  [MessageCircle, "WhatsApp"],
  [Youtube, "YouTube"],
  [Pin, "Pinterest"],
];
const socialUrls: Record<string, string> = { LinkedIn: "https://www.linkedin.com/company/webgramitsolution", Instagram: "https://www.instagram.com/webgramitsolution/", Facebook: "https://www.facebook.com/webgramitsolution/", WhatsApp: "https://wa.me/917551120242", YouTube: "https://www.youtube.com/@webgramitsolution", Pinterest: "https://www.pinterest.com/webgramitsolution/" };

export function SiteFooter() {
  return (
    <footer className="bg-navy text-on-dark">
      <div className="page-shell grid gap-y-7 py-9 md:grid-cols-[1.3fr_repeat(5,1fr)] md:gap-0 lg:grid-cols-[1.6fr_repeat(5,1fr)]">
        <div className="md:pr-6 lg:pr-10">
          <img src={webgramLogo.url} alt="Webgram IT Solution" width={720} height={323} loading="lazy" className="h-[52px] w-auto object-contain" />
          <p className="mt-4 max-w-[290px] text-on-dark/85">
            Custom websites and ecommerce solutions built for measurable business growth.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:contents">
          {columns.map(([title, items], index) => (
            <nav key={title} aria-label={`${title} links`} className={`${index % 2 === 1 ? "border-l" : "border-l-0"} border-on-dark/15 pl-4 sm:border-l sm:pl-5`}>
              <h3 className="text-on-dark">{title}</h3>
              <ul className="mt-3 space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.to}
                      className="inline-block text-[11px] text-on-dark/70 transition-colors hover:text-on-dark focus-visible:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="page-shell flex flex-col items-center justify-between gap-4 border-t border-on-dark/15 py-5 sm:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[12px] text-on-dark/90 sm:justify-start sm:text-left">
          <span>© 2026 Webgram IT Solution. All rights reserved.</span>
          <button type="button" onClick={openCookieSettings} className="underline underline-offset-2 transition-colors hover:text-on-dark">
            Cookie settings
          </button>
        </div>
        <div className="flex shrink-0 gap-2" aria-label="Webgram IT Solution social media">
          {socials.map(([Icon, label]) => (
            <a key={label} href={socialUrls[label]} target="_blank" rel="noopener noreferrer" aria-label={`Follow Webgram IT Solution on ${label}`} title={label} className="grid h-8 w-8 place-items-center rounded bg-on-dark/20 transition-colors hover:bg-on-dark/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}