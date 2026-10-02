# Complete the live blog workflow on Hostinger

## Build and verify
- Keep the Hostinger/GitHub deployment; do not move the domain into Lovable.
- Keep the real AdSense publisher and existing approved slot IDs, with category-band ads after every two blog categories and fixed left/right rails on article pages. Confirm `ads.txt` remains available on the live domain.
- Add indexable category pages backed by the existing category data, give each page unique metadata/canonical URLs, and include active primary categories plus published posts in the sitemap.
- Verify the admin dashboard reads real post totals and view counts, and that enquiries remain visible with saved email replies and unanswered status.
- Exercise guest submission and admin approval through the actual interfaces using an authorized test account, then confirm the article appears publicly with its share image and canonical URL.
- Link Google Search Console, select the exact verified property returned by Google, submit the live sitemap once, and inspect the published blog/category URLs Google reports.

## Technical notes
- Hostinger must run the TanStack server build with the required server environment values; a static-only deployment cannot run login, email, admin, views, or dynamic sitemap features.
- Google indexing cannot be forced. Sitemap submission and URL inspection will be completed where supported, then Google controls crawl timing.
- No service-role credential will be placed in browser code or committed files.
