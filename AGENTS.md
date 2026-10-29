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
- Arabic hero artwork is cropped into a left-side region via language-aware shared CSS, never horizontally mirrored, so printed artwork stays legible.
- Technology rows keep readable fixed-width logo items with contained horizontal overflow when one row cannot fit.
- Manrope and semantic h1–h6/paragraph rules are global; page utilities may refine responsive presentation.
- Keep ImageKit URLs verbatim and supplied Next.js/API Integration logos.
- Email delivery uses Hostinger SMTP through a server-only helper. Guest OTP links are generated server-side and sent by SMTP.
- Blog management and due guest-email triggers require server-checked admin roles; public posts require published status and elapsed publish time.
- Guest OTP routes stay under the `_guest` gate. Credit changes use security-definer RPCs and the ledger remains append-only.
- Guest posts publish after 30 minutes without cron; public access policy hides them until then.
- AdSense is consent-gated: lists use category bands; articles use cover-top, desktop rails, boundary inline, below-comments and collapsed-preview multiplex units. Disclosure helpers control preview/device ad counts without stacking. Legal pages use desktop rails; game uses a right rail and dismissible win break. Guest writing alone also uses top/desktop side placements; no sitewide/footer/other guest-panel ads.
- Guest writing uses a compact author header and an unframed, sidebar-free workspace; edge-aligned desktop ad rails sit outside the form and collapse before squeezing the editor. Its visual Tiptap editor serializes safe Markdown to preserve existing submission validation and public rendering; the admin editor remains separate.
- Blog previews share a limit selector; excerpts stay in search/social data. Related links rank by category/tags/recency without duplicates.
- Article disclosure preserves full HTML on one URL; hidden ads/rewards mount after expansion to prevent hidden impressions and premature claims.
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
- `/services/website-design` has a dedicated static route so its reference-matched page and metadata cannot fall through the generic service renderer.
- Game rewards require authenticated server replay of shared water-sort rules and owned attempts, then a service-only atomic award; level-only claims stay disabled. Preserve reward amounts, paid glasses and ad independence.
- Reading rewards remain timed and once-per-post; both sharing award RPCs stay disabled to prevent unverified credits.
- Public enquiry submission uses the validated `submit_enquiry` security-definer RPC via the publishable key, so it works on Hostinger without the private key.
- Self-hosted builds use the Nitro `node-server` preset (`npm run build` → `npm start`) because Hostinger runs Node.js, not Cloudflare Workers; Lovable builds override the preset.
- Search engine pings: admin-only server fn calls Google Indexing API (service-account secret) and IndexNow (public key file in public/); RSS at /feed.xml.
- Share the supplied testimonial strip above the public footer; never duplicate it in pages.
- Portfolio/website previews use bundled assets for self-hosting; PortfolioCard has a compact grid variant to preserve readable details.
- Regional landing pages `/ae` and `/kw` share `RegionalLanding`; demo leads save through the `submit_regional_lead` RPC, then the server forwards JSON to the `MAKE_WEBHOOK_URL` env var so the webhook URL never reaches the browser.
- Public structured data uses the shared site identity and linked page IDs; include only evidenced facts and visible answers, not unsupported rating, price, founder or search-action claims, to keep machine-readable business information consistent.
