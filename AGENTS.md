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
- Menu data uses `src/lib/menu-pages.ts`; generic pages use `SubpageTemplate`; dedicated pages retain custom layouts.
- Keep desktop composition on tablets; only phones compact or stack. Heroes are 348px on tablet/desktop and taller on phones; imagery uses contain.
- Manrope and semantic h1–h6/paragraph rules are global; page utilities may refine responsive presentation.
- Keep ImageKit URLs verbatim and supplied Next.js/API Integration logos.
- Email delivery uses Hostinger SMTP through a server-only helper. Guest OTP links are generated server-side and sent by SMTP.
- Blog management stays authenticated with server-side role checks; public posts require published status and elapsed publish time.
- Guest OTP routes stay under the `_guest` gate. Credit changes use security-definer RPCs and the ledger remains append-only.
- Guest posts publish after 30 minutes without cron; public access policy hides them until then.
- AdSense is blog-only and consent-gated; never load its script from the root or non-blog routes.
- Legal content lives on dedicated public routes linked from the shared footer.
