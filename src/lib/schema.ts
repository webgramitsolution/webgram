const SITE = "https://webgramitsolution.com";

/** Service + Breadcrumb + FAQ structured data for a section page (Google rich results). */
export function servicePageSchema(
  section: string,
  sectionLabel: string,
  slug: string,
  page: { title: string; description: string; points: string[] } | undefined,
) {
  if (!page) return [];
  const url = `${SITE}/${section}/${slug}`;
  return [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.title,
        description: page.description,
        url,
        serviceType: page.title,
        areaServed: { "@type": "Country", name: "India" },
        provider: { "@id": `${SITE}/#business` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: page.title,
          itemListElement: page.points.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p } })),
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: sectionLabel, item: `${SITE}/${section}/${slug}` },
          { "@type": "ListItem", position: 3, name: page.title, item: url },
        ],
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { q: `What is included in ${page.title}?`, a: `${page.description} Key features: ${page.points.join(", ")}.` },
          { q: `How much does ${page.title} cost at Webgram IT Solution?`, a: "Projects start from ₹15,000 depending on scope. Contact us at +91 7551120242 for a free quote." },
          { q: `Where is Webgram IT Solution located?`, a: "F3/780, Block C, Devli, Sangam Vihar, New Delhi 110062. We serve clients across India." },
        ].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    },
  ];
}
