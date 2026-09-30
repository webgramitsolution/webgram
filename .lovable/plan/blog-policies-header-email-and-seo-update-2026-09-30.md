# Blog, policies, header, email and SEO update

## Build
- Add Privacy Policy, Terms & Conditions, Cookie Policy, and Disclaimer pages with unique search/share metadata and footer links.
- Rework the Blog into category bands: category name on the left, divider, “View more” on the right, then that category’s articles. Insert a reserved advertising band after every two category sections.
- Load the supplied AdSense publisher script only on the blog index and blog article pages. Add an article ad position without loading ads on the home, service, solution, contact, or policy pages. Since no ad-slot IDs were supplied, Google Auto Ads will decide live placement; the reserved bands will be ready for fixed units later.
- Add an advertising consent banner with equally clear accept/reject choices, saved preferences, and a Cookie settings control. AdSense stays blocked until advertising consent is allowed where required.
- Add English/Hindi and India/USA/UK/UAE header selectors while preserving the current header design. Hindi uses automatic page translation; country choice is remembered without changing the service-page design.
- Replace decorative social marks with the supplied Facebook, Instagram, YouTube, Pinterest, LinkedIn and WhatsApp links and real icons. Keep the FAQ link working.
- Increase desktop menu text and spacing while preserving tablet and phone fit.
- Send a branded confirmation email to each contact-form submitter, in addition to the existing team notification.
- Remove the uploaded-reference mountain call-to-action section from Home, About, and Contact only; retain the distinct service-page calls to action.

## SEO and content quality
- Add legal routes to the sitemap and ensure every new route has its own title, description, Open Graph title/description, type, and Twitter card.
- Improve key public-route descriptions around Webgram IT Solution, Delhi NCR, ecommerce, B2B commerce, web development, and maintenance without keyword stuffing.
- Require meaningful blog image descriptions when a cover image is supplied, preserve existing image alt text, and keep article structured data.
- Keep the Lovable subdomain noindex behavior and the production-domain sitemap/canonical setup already requested.

## Verification
- Check the blog and article pages at desktop and phone sizes, including category sections, ad-only scope, policy links, menu fit, translation/country controls, consent choices, and no horizontal overflow.
- Submit the contact form with a safe test address only if an available test inbox/session permits it; otherwise verify the save/send path and report email delivery as unverified.
- Confirm the current build log is clean. The pasted `use-mobile.tsx` error references a file that is not present; verify it does not recur in the current build.
