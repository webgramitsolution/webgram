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
- Header menu (approved Sep 29, 2:37 PM version): Home, Solutions (6), Services (8), Industries (7), Work (3), Resources (4), About Us, Contact Us. Do not rename or reorder items.
- Subpage content lives in `src/lib/menu-pages.ts` (menuSections); routes render `src/components/subpage.tsx` (SubpageTemplate) and throw notFound() on unknown slugs. Why: one clean template instead of 25 duplicated page files.
- AI project advisor: `project-advisor.functions.ts` (server fn) → `.server.ts` (Lovable AI Gateway, Responses API, gpt-6-astra). Why: keeps the API key server-side.
- Keep the desktop/laptop composition unchanged on tablet widths; only phone widths may use a compact header and stacked content.
