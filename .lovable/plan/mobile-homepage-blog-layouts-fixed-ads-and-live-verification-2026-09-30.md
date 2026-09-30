# Mobile homepage, blog layouts, fixed ads and live verification

## Build
- Rework only the phone homepage presentation to closely match the supplied two-phone reference while preserving the existing desktop/tablet composition and real site content.
- Rebuild the blog index around the supplied editorial reference: featured lead grid, search/category controls, compact real-data article grids, category heading/divider/View more rows, and a responsive reserved ad after every two categories.
- Rebuild blog detail around the supplied reference with a focused center article, sticky left/right desktop ad rails, responsive in-content/mobile ads, author/date/share content, and the existing real post data.
- Configure five fixed AdSense positions (blog top, category band, detail left, detail right, detail in-content) using the existing publisher account. Keep each position visibly reserved but inactive until the five slot IDs are supplied; keep consent gating and blog-only script scope.
- Keep the shared header sticky on every page.
- Extend the secured admin enquiries view into an inbox-style list with a clear reply action, status control, and full enquiry details. Replies open through the admin's email app; no new mailbox provider is introduced.

## Search and live checks
- Preserve unique title, description, canonical URL, Open Graph image/type and Twitter card metadata on blog and legal/contact/FAQ pages using the real production domain.
- Publish the finished version, then check the real domain connection and Google Search Console evidence available for this project.
- Report domain, indexing, and AdSense activation honestly: Google indexing cannot be forced or guaranteed, and fixed ads cannot serve before slot IDs are added and AdSense approves/returns an ad.

## Verification
- Test homepage, blog index, and a real blog detail page at phone and desktop sizes for fit, sticky behavior, live data, consent, and horizontal overflow.
- Verify the ad script appears only on blog routes after consent, and does not appear on home, legal, FAQ, or contact pages.
- Verify the admin enquiry inbox using an authenticated session when available.
- Confirm the current build is clean and that no stale `use-mobile.tsx` error remains.
