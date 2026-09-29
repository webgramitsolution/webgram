# B2B Ecommerce reference page

## Changes
- Build a dedicated `/solutions/b2b-commerce` page matching the supplied reference from top to bottom.
- Use the supplied ImageKit B2B banner as the hero background, preserving the shared header and the 348px tablet/desktop hero standard.
- Recreate the six hero capability items, six reasons, eight B2B features, six stakeholder cards, six-step process, six industry cards, and the final navy call-to-action.
- Keep the existing Solutions dropdown and route; switch only the `b2b-commerce` slug to the dedicated page.
- Keep the breadcrumb visually hidden and retain route-specific social metadata.
- Preserve the resolved mobile hook import so the reported TS2686 error does not return.

## Visual assets
- Use the provided hero image directly.
- Create tightly matched supporting business/industry imagery only where the screenshot shows imagery but no separate source file was provided.

## Validation
- Compare the page against the reference at desktop, laptop, tablet, and phone widths.
- Confirm tablet retains the desktop composition, phone stacks cleanly, links work, images load, and there is no horizontal overflow.
- Confirm the latest preview build and browser console are clean.

## Technical details
- Add a focused B2B page component and supporting semantic styles without altering the approved homepage, header menu, or other solution pages.
- Update the existing solution route branch and record the dedicated-page architecture rule.
