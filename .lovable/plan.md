# Restore typography and verify page wiring

## Goal
Restore the homepage typography to the previously approved version, keep one consistent typography system across current and future pages, and ensure every approved menu item opens its correct standalone page.

## Changes
- Compare the current homepage against the approved pre-change snapshot and restore only changed font sizes, weights, and line heights.
- Define shared heading, body, label, and button typography tokens/classes so new page designs use the same font scale by default.
- Apply the shared typography to the reusable subpage template without changing the established Home, About, or Contact visual layouts beyond accidental font regressions.
- Audit the exact approved menu order and all dropdown destinations: Home, Solutions, Services, Industries, Work, Resources, About Us, Contact Us.
- Keep every dropdown item on its own route and retain the logo link back to the homepage.
- Confirm the reported mobile-hook TypeScript error is absent.

## Verification
- Run the project type check and inspect the latest build diagnostics.
- Open the homepage and every menu destination through the interface.
- Check desktop, tablet, and phone widths for consistent typography, working navigation, and no horizontal overflow.
