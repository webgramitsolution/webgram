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
- Header menu: Home, Solutions (Ecommerce Development, B2B Commerce, Website Design & Development, Marketplace Development), Services (8), Industries (7), Work (3), Resources (4), About Us, Contact Us. Do not rename or reorder items.
- Subpage content lives in `src/lib/menu-pages.ts` (menuSections); routes render `src/components/subpage.tsx` (SubpageTemplate) and throw notFound() on unknown slugs. Why: one clean template instead of 25 duplicated page files.
- Approved dedicated pages: three solution pages above and `/services/website-development`; other slugs use the shared template. Why: these pages have unique full-page layouts.
- AI project advisor: `project-advisor.functions.ts` (server fn) → `.server.ts` (Lovable AI Gateway, Responses API, gpt-6-astra). Why: keeps the API key server-side.
- Keep the desktop/laptop composition unchanged on tablet widths; only phone widths may use a compact header and stacked content.
- Hero sizing: every current and future page uses a 348px hero from tablet through desktop; phone heroes may be taller for stacked copy. Why: all non-phone devices must keep equal visual proportions.
- Typography: Manrope is global; reusable menu subpages use the shared `page-*`/`content-*` scale, while Home/About/Contact retain their approved reference-specific sizes. Why: future pages stay consistent without changing approved visual replicas.
- Shared ImageKit URLs live in `src/lib/site-images.ts`; use them verbatim — a literal `&` or `(2)` 404s once percent-encoded.
