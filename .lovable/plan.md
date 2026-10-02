# Blog authoring, flexible credits, ads, and search deployment

## What will change
- Rebuild both the admin and guest post-writing screens to closely match the supplied dashboard reference: navy author navigation, wide title/content workspace, full formatting toolbar, media actions, FAQ area, and right-side publish, category, featured-image, SEO, and excerpt panels.
- Keep guest-only rules visible and enforced: 800-word minimum, primary/subcategory selection, five required FAQs, safe formatted paste, and review submission. Admin editing keeps draft/publish approval controls.
- Add an administrator-controlled guest-post credit price. The current 400-credit value remains the default, the admin can change it from the blog dashboard, and guest balance checks plus the server-side deduction always use the saved value.
- Tighten blog and category desktop layouts so the left ad column, center content, and right ad column sit directly beside one another without the current outer gaps. Both rails remain fixed while reading; phone layouts hide the rails and keep the editor fully visible without horizontal overflow or blank white content.
- Keep every public blog post and primary category on the apex `https://webgramitsolution.com` origin, with unique title, description, canonical, Open Graph title/description, and the visible featured image where available.
- Keep the dynamic sitemap on the apex domain with public blog posts and active primary categories, preserving page-specific post update dates only.

## Backend and security
- Add a small protected blog setting for the guest-post price, readable by signed-in guests and editable only by administrators.
- Update the guest submission database function so the saved price is checked and deducted atomically; the browser cannot bypass or alter the cost.
- Preserve existing role checks, review/approval flow, safe article format, and append-only credit ledger.

## Verification and release
- Test the admin editor and authenticated guest editor at desktop, tablet, and phone widths, including toolbar actions, five FAQs, and the current saved credit cost.
- Verify blog detail and category pages at desktop and phone widths, including fixed rail dimensions, zero column gap, no horizontal overflow, and no blank editor state.
- Confirm generated metadata and sitemap URLs use the apex domain and include current posts/categories.
- Confirm the app build is clean, then verify the Hostinger live URLs after the GitHub deployment reaches the domain.
- List the exact verified Search Console property, resubmit the live apex sitemap once after deployment, and report Google's accepted status. Google controls crawl/index timing, so submission can be confirmed but immediate search appearance cannot be guaranteed.
