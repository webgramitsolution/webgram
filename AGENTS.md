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
- AdSense is consent-gated: blog listing shows one responsive band after every two category sections, while article and legal pages use fixed desktop side rails; never render top, bottom, or footer ads.
- AdSense slot 9892982015 serves blog category bands and slot 6145308694 serves sticky side rails; auto/anchor ads are not part of the site layout.
- Legal content lives on dedicated public routes linked from the shared footer.
- Homepage reviews are public only when published; administrators manage review visibility and ordering through the secured requests area.
- Guest article formatting is stored as restricted Markdown-style text and rendered without raw HTML so pasted rich content cannot execute scripts.
- Guest-post credit pricing is stored in protected blog settings; administrators change it and submission deducts it atomically in the database.
- Primary blog categories have indexable `/blog/category/:slug` pages and belong in the dynamic sitemap; subcategories remain filters.
- Public blog, category, and sitemap URLs use the apex `https://webgramitsolution.com` canonical origin to match the live Hostinger site.
- `/services/website-design` has a dedicated static route so its reference-matched page and metadata cannot fall through the generic service renderer.
- Guest game has 20 sequential water-sort levels; first-completion rewards start at 20 credits and rise by 10 every three levels through a protected database function. Extra glasses cost 10 credits after level five, and advertising never determines rewards.
