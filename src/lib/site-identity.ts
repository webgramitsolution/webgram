/** Public facts already displayed on the site's Contact and service pages. */
export const SITE_URL = "https://webgramitsolution.com";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const businessIdentity = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": BUSINESS_ID,
  name: "Webgram IT Solution",
  url: `${SITE_URL}/`,
  description: "Delhi NCR web development company building B2B and B2C ecommerce websites, WooCommerce and Shopify stores, web portals and API integrations.",
  telephone: "+91 7551120242",
  email: "info@webgramitsolution.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "F3/780, Block C, Devli, Sangam Vihar",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110062",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
};

export function publicPageSchema(path: string, name: string, description: string, type = "WebPage") {
  const url = `${SITE_URL}${path}`;
  return [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": type,
      "@id": `${url}#webpage`,
      url, name, description,
      about: { "@id": BUSINESS_ID },
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
    }),
  }];
}