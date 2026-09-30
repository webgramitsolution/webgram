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

- Pages: home `/`, contact `/contact`, about `/about`, plus data-driven subpages `/solutions/$slug`, `/services/$slug`, `/industries/$slug`, `/work/$slug`, `/resources/$slug`. All share `src/components/site-header.tsx` with TanStack `Link`s. Why: logo must always return to the real home page and every menu item must open its own page.
- Header menu: Home, Solutions (4), Services (Portal, Design, WooCommerce, Shopify, API, Maintenance), Work (3), Resources (Blog, Guides, FAQs), About, Contact. Industries is removed.
- Subpage content lives in `src/lib/menu-pages.ts` (menuSections); routes render `src/components/subpage.tsx` (SubpageTemplate) and throw notFound() on unknown slugs. Why: one clean template instead of 25 duplicated page files.
- Dedicated pages use unique layouts; remaining menu slugs use the shared template.
- AI project advisor: `project-advisor.functions.ts` (server fn) → `.server.ts` (Lovable AI Gateway, Responses API, gpt-6-astra). Why: keeps the API key server-side.
- Keep the desktop/laptop composition unchanged on tablet widths; only phone widths may use a compact header and stacked content.
- Heroes: use shared hero classes; 348px on tablet/desktop, taller on phone. Desktop images use proportional contain, never stretch/crop. Why: preserve supplied banners on all current/future pages.
- Typography: Manrope is global; reusable menu subpages use the shared `page-*`/`content-*` scale, while Home/About/Contact retain their approved reference-specific sizes. Why: future pages stay consistent without changing approved visual replicas.
- ImageKit URLs stay verbatim; use the supplied Next.js and API Integration logo files.
- Blog: public `/resources/blog` and `/blog/$slug`; management stays under `/_authenticated/admin/blog*`, with role checks on every write. Why: drafts and publishing remain server-secured.
- Guest panel: OTP login `/guest-login`, gated pathless `_guest` layout (`ssr:false`, any signed-in user) for `/guest/*`. All credit spends/awards go through security-definer SQL RPCs (credit_ledger is append-only). Why: browser can't forge balances.
- Guest posts auto-publish by inserting status=published with published_at = now()+30min; the public RLS policy hides them until then. Why: no cron needed.
