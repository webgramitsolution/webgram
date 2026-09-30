# Blog, Admin, and Homepage Image Update

## What will be built

- Replace the right-side image beside “From Storefront to Back Office — One Technology Partner.” with the supplied ImageKit image, preserving its proportions on desktop, tablet, and phone.
- Replace the current generic Blog resource page with the uploaded blog front-page design, adapted to Webgram branding and the existing header/footer.
- Add public blog detail pages from the uploaded detail-page design at `/blog/$slug`.
- Add search and category filtering to the blog front page.
- Add a secure email/password admin sign-in page and protected admin panel.
- Let the administrator create, edit, preview, publish, unpublish, and delete posts; manage title, slug, excerpt, content, category, author, cover image URL, and SEO fields.
- Store admin profile data and roles separately, with server-verified admin access.
- Seed practical blog categories and initial articles so the public blog is complete immediately.

## Security and data

- Use Lovable Cloud authentication; the supplied password will only be used to provision the requested admin and will not be stored in source code or shown in the interface.
- Disable public sign-up; only the provisioned administrator can access the panel.
- Add separate `profiles` and `user_roles` tables, plus `blog_categories` and `blog_posts`.
- Public visitors can read published posts only. Drafts and all write actions require a signed-in administrator.
- Validate admin access both in the protected page and every server-side blog action.

## Routes

- `/resources/blog` — blog front page
- `/blog/$slug` — public article page
- `/auth` — administrator sign-in
- `/admin/blog` — protected blog manager
- `/admin/blog/new` — new article editor
- `/admin/blog/$id` — article editor

## Verification

- Verify login, creating a draft, publishing it, public listing, opening its detail page, editing, unpublishing, and deleting.
- Check homepage, blog, detail, login, and admin views on desktop, tablet, and phone.
- Confirm images load proportionally, no content overflows, protected pages reject signed-out visitors, and the final build is clean.
