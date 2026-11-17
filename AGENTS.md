<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

# AGENTS.md

- Routes: `/`, `/contact`, `/about`, dynamic solution/service/work/resource pages, public blog, secured admin, and secured guest panel.
- Shared public header is sticky; shared footer is mounted at root. Dashboard sidebars remain sticky while content scrolls.
- Blog lists/articles share a category header; missing pages share the not-found view with HTTP 404.
- Menu data uses `src/lib/menu-pages.ts`; generic pages use `SubpageTemplate`; dedicated pages retain custom layouts.
- Keep desktop composition on tablets; only phones compact or stack. Heroes are 348px on tablet/desktop and taller on phones; imagery uses contain.
- Subpage hero presentation is shared through the contact-hero/site-hero/ecom-hero CSS selectors, excluding homepage hero-shell, so heading line count and phone overlays stay consistent; WooCommerce/Shopify artwork uses `ecom-hero-art`.
- Arabic hero artwork is cropped into a left-side region via language-aware shared CSS, never horizontally mirrored, so printed artwork stays legible.
- Technology rows keep readable fixed-width logo items with contained horizontal overflow when one row cannot fit.
- Manrope and semantic h1–h6/paragraph rules are global; page utilities may refine responsive presentation.
- Keep ImageKit URLs verbatim and supplied Next.js/API Integration logos.
- Email delivery uses Hostinger SMTP through a server-only helper. Guest OTP links are generated server-side and sent by SMTP.
- Blog management and due guest-email triggers require server-checked admin roles; public posts require published status and elapsed publish time.
- Guest OTP routes stay under the `_guest` gate. Credit changes use security-definer RPCs and the ledger remains append-only.
- Guest posts publish after 30 minutes without cron; public access policy hides them until then.
- AdSense is consent-gated and limited to blog lists/articles, legal rails, game rail/win break and guest-writing top/side units; disclosure helpers set ad counts; no sitewide/footer ads.
- Guest writing is sidebar-free with edge ad rails that collapse before the editor; its Tiptap editor serializes safe Markdown to keep validation/rendering; admin editor is separate.
- Blog previews share a limit selector; excerpts stay in search/social data. Related links rank by category/tags/recency without duplicates.
- Article disclosure keeps full HTML on one URL; hidden ads/rewards mount only after expansion.
- Ads share one renderer, one initialization per visible unit and consent events across navigation.
- AdSense slot 9892982015 serves blog category bands and slot 6145308694 serves sticky side rails; auto/anchor ads are not part of the site layout.
- Legal content lives on dedicated public routes linked from the shared footer.
- Legal pages, including the dedicated India DPDP Policy, share one structured long-form renderer; Marketplace Development remains available only as a noindex legacy URL and is excluded from navigation and sitemap.
- Homepage reviews are public only when published; administrators manage review visibility and ordering through the secured requests area.
- Guest articles use safe Markdown; shared browser statistics and a database validator enforce submission limits across RPC overloads, with visible errors and saved drafts.
- Guest-post credit pricing is stored in protected blog settings; administrators change it and submission deducts it atomically in the database.
- Primary blog categories have indexable `/blog/category/:slug` pages and belong in the dynamic sitemap; subcategories remain filters.
- Public blog/category/sitemap URLs use the canonical apex `https://webgramitsolution.com`.
- Legacy article aliases use explicit HTTP 301 routes to confirmed equivalent canonical articles, preserving query parameters; aliases stay out of the sitemap.
- `/services/website-design` and `/services/shopify` have dedicated static routes so their custom pages, metadata and visible-FAQ schema cannot fall through the generic service renderer.
- Service CTA bands share `TrustFacts` and FAQ answers come from one approved content module (pickFaqs throws on unknown questions), so no page shows invented counts or placeholder answers.
- Game rewards need authenticated server replay of owned attempts and an atomic service award; level-only claims stay disabled.
- Reading rewards remain timed and once-per-post; both sharing award RPCs stay disabled to prevent unverified credits.
- Public enquiry submission uses the validated `submit_enquiry` security-definer RPC via the publishable key, so it works on Hostinger without the private key.
- Self-hosted builds use the Nitro `node-server` preset (`npm run build` → `npm start`) because Hostinger runs Node.js, not Cloudflare Workers; Lovable builds override the preset.
- Search engine pings: admin-only server fn calls Google Indexing API (service-account secret) and IndexNow (public key file in public/); RSS at /feed.xml.
- Share the supplied testimonial strip above the public footer; never duplicate it in pages.
- Portfolio/website previews use bundled assets for self-hosting; PortfolioCard has a compact grid variant to preserve readable details.
- `/ae` and `/kw` share `RegionalLanding`; leads save via `submit_regional_lead`, then the server forwards to `MAKE_WEBHOOK_URL` (never exposed to browser).
- Public structured data uses the shared site identity and linked page IDs; include only evidenced facts and visible answers, not unsupported rating, price, founder or search-action claims, to keep machine-readable business information consistent.
- FAQ JSON-LD is generated from the same grouped answers shown on the FAQ page and shares its page identity, preventing hidden or inconsistent answers; homepage head changes belong in the index route rather than a standalone HTML file.
- Agent readiness: start.ts serves llms.txt as Markdown/Link header on `/`; WebMCP tools stay read-only.
- `/locations` pages share `location-page.tsx`; `projectsForLocation` shows only genuine city/NCR portfolio items.
- Blog FAQs use `normalizeBlogFaqs` for both the visible section and FAQPage schema, so they always match.
- Speed: GTM/Weglot start late via `third-party-loader`, Manrope is self-hosted, the sign-in client is imported on demand (root, gates, lazy auth attacher) and ImageKit images request sized copies via `ikResize`, keeping the first download small.
