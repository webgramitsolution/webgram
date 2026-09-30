import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MessageCircle, type LucideIcon } from "lucide-react";

import webgramLogo from "@/assets/webgram-logo.png.asset.json";

const columns = [
  ["Solutions", ["Ecommerce", "B2B Commerce", "Website Design & Development", "Marketplace"]],
  ["Services", ["Web Portal Development", "Website Design", "WooCommerce", "Shopify", "API Integration"]],
  ["Work", ["Case Studies", "Portfolio", "Client Stories"]],
  ["Resources", ["Blog", "Guides", "FAQs"]],
  ["Company", ["About Us", "Our Process", "Careers", "Contact"]],
] as const;

const socials: Array<[LucideIcon, string]> = [
  [Linkedin, "LinkedIn"],
  [Instagram, "Instagram"],
  [Facebook, "Facebook"],
  [MessageCircle, "WhatsApp"],
];

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
                  <li key={item}>
                    <Link
                      to={item === "About Us" ? "/about" : /contact|career/i.test(item) ? "/contact" : item === "Blog" ? "/resources/$slug" : "/"}
                      {...(item === "Blog" ? { params: { slug: "blog" } } : {})}
                      className="inline-block text-[11px] text-on-dark/70 transition-colors hover:text-on-dark focus-visible:underline"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="page-shell flex flex-col items-center justify-between gap-3 border-t border-on-dark/15 py-5 sm:flex-row">
        <span className="text-[12px] font-bold uppercase">Connect</span>
        <div className="flex gap-2">
          {socials.map(([Icon, label]) => (
            <a key={label} href="#top" aria-label={label} className="grid h-8 w-8 place-items-center rounded bg-on-dark/20 hover:bg-on-dark/35">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="py-4 text-center text-[12px] text-on-dark/90">© 2026 Webgram IT Solution. All rights reserved.</div>
    </footer>
  );
}