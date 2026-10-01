# Blog Ads, Journal Header, Policy Rails, and Guest Portal

## What will change
- Remove blog-list top ads and category-band ads so no ad container can create space near the footer.
- Keep blog-detail advertising only in the fixed left and right desktop rails; remove all top, bottom, and footer-area ad placements.
- Add matching fixed left and right ad rails to Privacy Policy, Terms, Cookie Policy, and Disclaimer pages only.
- Rebuild the blog header with the same navy structure, logo scale, and visual language as the main header, while keeping backend-driven category buttons and the guest-posting action.
- Rebuild Guest Login as the supplied two-column author portal: scrollable publishing guidelines on the left, email-code registration/sign-in on the right, and benefits below. Existing OTP login behavior remains unchanged.
- Restyle the administrator login to match the same portal family while preserving password authentication.

## Verification
- Check blog list, article, all policy pages, guest login, and admin login on desktop and phone.
- Confirm the page ends directly at the footer with no blank ad area or collapse arrow.
- Confirm ads exist only in the article and policy side rails and no stale `use-mobile.tsx` error exists.
- Confirm type checking, preview build, and browser console are clean.

## Technical details
- Continue using the existing consent-gated AdSense component and configured rail slot.
- Hide side rails below desktop widths so policy and article content remains readable on phones.
- Preserve existing routes, database categories, OTP delivery, and authentication logic.
