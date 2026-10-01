# Webgram mobile homepage, blog header, reviews, and shared branding

## What will change

- Replace the shared header and footer logo with the supplied ImageKit logo on every public page.
- Rebuild the phone header and slide-out navigation to closely match the supplied reference: branded navy panel, search, complete menu groups, consultation actions, social links, and login/account links.
- Use the supplied phone banner as the homepage phone hero while preserving the current tablet and desktop presentation.
- Add an “Our Services” phone section below “Technology That Works Together.”
- Remove “Tell us about your project” from the homepage. On phones, use that position for published customer reviews managed from the admin area.
- Give the blog page a dedicated header with the guest-posting action on the right and backend-driven primary categories on the left; remove the “All Tags” filter while retaining search, category, and subcategory filtering.
- Replace the footer WhatsApp icon treatment and use `https://wa.me/webgramitsolution` in the header, mobile menu, and footer.
- Verify the Hostinger SMTP configuration without exposing credentials, and verify the acknowledgement/admin notification code path.
- Diagnose why AdSense is not rendering. Keep blog-only consent and reserved locations; real fixed ads require valid AdSense slot IDs.

## Admin-managed reviews

- Add a secure reviews table with explicit authenticated/admin grants and row-level access rules.
- Allow admins to create, edit, publish/unpublish, order, and delete reviews.
- Show only published reviews publicly, in a swipeable phone carousel.
- Include representative review rows in the migration so the first phone view is not empty; admins can replace them.

## Verification

- Check the homepage and mobile menu against both supplied references at phone width.
- Check desktop behavior to ensure the existing composition is preserved.
- Check blog category data, guest-posting link placement, ad placeholders/script loading rules, footer links, and review administration.
- Confirm the latest build and browser console are clean.

## Technical details

- Reference screenshots remain visual specifications and will not be embedded.
- The new review structure will be introduced through one Lovable Cloud migration with table grants before RLS policies.
- Shared branding remains centralized so header, mobile navigation, and footer stay consistent.
- The repeated `use-mobile.tsx` TS2686 message is stale: the current file is `use-mobile.ts`, and the latest project build is already successful.
