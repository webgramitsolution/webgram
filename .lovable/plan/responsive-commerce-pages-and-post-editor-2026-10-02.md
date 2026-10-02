# Responsive commerce pages and post editor

## Changes
- Rebuild the homepage composition to closely follow the supplied Webgram Digital Commerce Showcase, preserving the current content, brand, links, and shared header/footer.
- Use the supplied phone banner URL on phones and retain a desktop commerce hero treatment on tablet and desktop.
- Route Services → Website Design to a dedicated reference-led page using the supplied desktop hero URL and the supplied phone hero URL.
- Keep both admin and guest Create New Post screens visually identical on tablet, with the same editor tools, preview, panels, and responsive controls already available on desktop.

## Responsive behavior
- Desktop: match the wide reference with compact sections, four-column solution cards, business-growth features, industries, case studies, reviews, and final call-to-action.
- Tablet: preserve the desktop composition where practical, while keeping controls and text readable without horizontal overflow.
- Phone: match the supplied stacked mobile reference, use swipeable content rows without visible scrollbars, and use the supplied phone-specific imagery.

## Validation
- Verify homepage, Website Design, guest post, and admin post screens at desktop, tablet, and phone sizes.
- Confirm hero images load, menus link correctly, editor controls remain usable, and no page has horizontal overflow or runtime errors.
- Confirm the latest preview build is clean.

## Technical details
- Reuse the existing semantic design tokens, shared UI controls, menu data patterns, and dedicated page components.
- Keep existing routes working while making Services → Website Design open the dedicated design page.
- Treat uploaded screenshots only as visual references, not embedded page assets.
