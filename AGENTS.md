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
- Blog listings and article pages use one category header so navigation remains identical; missing URLs and articles use the shared not-found view while preserving HTTP 404 responses.
- Menu data uses `src/lib/menu-pages.ts`; generic pages use `SubpageTemplate`; dedicated pages retain custom layouts.
- Keep desktop composition on tablets; only phones compact or stack. Heroes are 348px on tablet/desktop and taller on phones; imagery uses contain.
- Arabic hero artwork is cropped into a left-side region via language-aware shared CSS, never horizontally mirrored, so printed artwork stays legible.
- Technology rows keep readable fixed-width logo items with contained horizontal overflow when one row cannot fit.
- Manrope and semantic h1–h6/paragraph rules are global; page utilities may refine responsive presentation.
- Keep ImageKit URLs verbatim and supplied Next.js/API Integration logos.
- Email delivery uses Hostinger SMTP through a server-only helper. Guest OTP links are generated server-side and sent by SMTP.
- Blog management stays authenticated with server-side role checks; public posts require published status and elapsed publish time.
- Guest OTP routes stay under the `_guest` gate. Credit changes use security-definer RPCs and the ledger remains append-only.
- Guest posts publish after 30 minutes without cron; public access policy hides them until then.
- AdSense is consent-gated: blog listing uses category bands; public articles use four block-boundary inline units and a fifth below comments without side rails; legal pages use desktop rails; the game alone uses a responsive right rail and explicit-dismissal post-win break. Never render sitewide top, bottom, footer, or guest-posting ads.
- Blog cards expose a short excerpt and Read More link; article recommendations use published listing data ranked by category, shared tags and recency, excluding existing body links and duplicate destinations so automatic links never repeat.
- All ad formats use the shared ad renderer with one initialization per visible element and shared consent events, so route changes and automatic consent do not leave placements unloaded.
- AdSense slot 9892982015 serves blog category bands and slot 6145308694 serves sticky side rails; auto/anchor ads are not part of the site layout.
- Legal content lives on dedicated public routes linked from the shared footer.
- Legal pages, including the dedicated India DPDP Policy, share one structured long-form renderer; Marketplace Development remains available only as a noindex legacy URL and is excluded from navigation and sitemap.
- Homepage reviews are public only when published; administrators manage review visibility and ordering through the secured requests area.
- Guest article formatting is stored as restricted Markdown-style text and rendered without raw HTML so pasted rich content cannot execute scripts.
- Guest-post credit pricing is stored in protected blog settings; administrators change it and submission deducts it atomically in the database.
- Primary blog categories have indexable `/blog/category/:slug` pages and belong in the dynamic sitemap; subcategories remain filters.
- Public blog, category, and sitemap URLs use the apex `https://webgramitsolution.com` canonical origin to match the live Hostinger site.
- `/services/website-design` has a dedicated static route so its reference-matched page and metadata cannot fall through the generic service renderer.
- Guest game has 20 sequential water-sort levels; first-completion rewards follow the protected `game_level_reward` database function. Extra glasses cost 10 credits after level five, and advertising never determines rewards.
- Reading (scroll-to-end + 60s) and 6-platform share rewards are timed and granted once per post by security-definer RPCs; the browser only starts/claims.
- Public enquiry submission uses the validated `submit_enquiry` security-definer RPC via the publishable key, so it works on Hostinger without the private key.
- Self-hosted builds use the Nitro `node-server` preset (`npm run build` → `npm start`) because Hostinger runs Node.js, not Cloudflare Workers; Lovable builds override the preset.
- Search engine pings: admin-only server fn calls Google Indexing API (service-account secret) and IndexNow (public key file in public/); RSS at /feed.xml.
- The supplied client-testimonial image strip is shared above the public footer so page components do not duplicate it.
- Public portfolio and website-type preview images are bundled project assets so they also render on self-hosted live deployments.
- Regional landing pages `/ae` and `/kw` share `RegionalLanding`; demo leads save through the `submit_regional_lead` RPC, then the server forwards JSON to the `MAKE_WEBHOOK_URL` env var so the webhook URL never reaches the browser.
