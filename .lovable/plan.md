# Marketplace, legal pages, and ad-safety update

## Visibility and navigation
- Remove Marketplace Development from public menus and the sitemap.
- Keep its existing URL available but add `noindex, follow` metadata so search engines do not index it.

## Header and FAQ
- Replace the header’s generic chat symbol with the same WhatsApp image used in the footer.
- Keep the FAQ heading and supporting description deliberately wrapped into two balanced lines across phone, tablet, and desktop.

## Legal pages
- Remove the visible “Cookie settings” control from the footer while retaining the cookie-policy page and the consent choice shown where ads are used.
- Give Privacy Policy, Terms, Cookie Policy, and Disclaimer the guest-login banner background and a consistent numbered legal-card layout inspired by “Guest Author Terms & Guidelines.”
- Update legal wording for Indian privacy requirements, including the Digital Personal Data Protection Act, 2023, data-principal rights, grievance contact, consent, retention, guest content, services, advertising, and misuse protections. Keep wording protective but avoid claiming legal guarantees.

## Ad click-bombing safety
- Keep ads consent-gated and limited to approved pages/slots.
- Add conservative browser-side safeguards that stop repeat ad rendering after abnormal rapid ad interactions, without collecting personal visitor profiles or creating an admin tracking page.
- Document WordPress-side protections separately in the final note: use Ad Invalid Click Protector or equivalent, keep AdSense Auto Ads/anchor ads disabled, place ads away from navigation, and monitor AdSense invalid-traffic alerts.

## Verification
- Check noindex metadata and sitemap exclusion for Marketplace Development.
- Check legal pages, FAQ wrapping, WhatsApp icon, and footer on phone, tablet, and desktop.
- Confirm the build and relevant public pages load without overflow or runtime errors.
