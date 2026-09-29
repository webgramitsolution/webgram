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

- Keep the single-page experience contact-focused, following the supplied contact reference section order and density.
- Keep the desktop/laptop composition unchanged on tablet widths; only phone widths may use a compact header and stacked content.

- Pages: home at `/`, contact at `/contact`, about at `/about`, sharing `src/components/site-header.tsx` with TanStack `Link`s. Why: logo must always return to the real home page.
- AI project advisor: `project-advisor.functions.ts` (server fn) → `.server.ts` (Lovable AI Gateway, Responses API, gpt-6-astra). Why: keeps the API key server-side.
