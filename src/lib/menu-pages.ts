export type Subpage = {
  title: string;
  tagline: string;
  description: string;
  points: string[];
};

export type MenuSection = {
  label: string;
  base: string;
  pages: Record<string, Subpage>;
};

export type SectionKey = "solutions" | "services" | "industries" | "work" | "resources";

export const menuSections: Record<SectionKey, MenuSection> = {
  solutions: {
    label: "Solutions",
    base: "/solutions",
    pages: {
      "ecommerce-development": {
        title: "Ecommerce Development",
        tagline: "High-converting online stores",
        description:
          "We build high-performance B2C ecommerce websites designed for speed, conversions and scalability — from catalog to checkout.",
        points: ["Custom storefront design", "Secure payment integration", "Mobile-first shopping experience", "SEO-ready architecture"],
      },
      "b2b-commerce": {
        title: "B2B Commerce",
        tagline: "Wholesale selling, simplified",
        description:
          "Wholesale pricing, MOQ, RFQ, customer groups, credit terms and bulk ordering — everything your B2B buyers expect, in one platform.",
        points: ["Customer-specific pricing", "Bulk & repeat ordering", "RFQ and quote management", "Credit terms and approvals"],
      },
      "b2c-ecommerce": {
        title: "B2C Ecommerce",
        tagline: "Retail experiences that convert",
        description:
          "Beautiful, fast retail storefronts with smooth checkout, offers, reviews and loyalty features that keep customers coming back.",
        points: ["Conversion-focused design", "Offers, coupons & loyalty", "Reviews and ratings", "One-page checkout"],
      },
      "marketplace-development": {
        title: "Marketplace Development",
        tagline: "Multi-vendor platforms",
        description:
          "Launch a multi-vendor marketplace with seller onboarding, commissions, payouts and admin controls built in from day one.",
        points: ["Seller & buyer ecosystems", "Commission management", "Vendor dashboards", "Admin moderation tools"],
      },
      "custom-commerce": {
        title: "Custom Commerce",
        tagline: "Built around your business model",
        description:
          "When off-the-shelf platforms fall short, we engineer custom commerce applications around your exact workflows and goals.",
        points: ["Tailored business logic", "Third-party integrations", "Scalable architecture", "Ongoing support"],
      },
      "mobile-commerce": {
        title: "Mobile Commerce",
        tagline: "Sell on every screen",
        description:
          "Progressive web apps and mobile-first storefronts that load fast and convert on any device your customers use.",
        points: ["PWA storefronts", "App-like experience", "Push notifications", "Offline-ready browsing"],
      },
    },
  },
  services: {
    label: "Services",
    base: "/services",
    pages: {
      "website-development": {
        title: "Website Development",
        tagline: "Fast, secure, scalable websites",
        description:
          "Business websites and web applications built with modern technology, clean code and performance best practices.",
        points: ["Custom development", "CMS integration", "Performance optimization", "Security hardening"],
      },
      "website-design": {
        title: "Website Design",
        tagline: "Designs that build trust",
        description:
          "User-focused website designs that reflect your brand and guide visitors toward enquiry, purchase or signup.",
        points: ["UI/UX design", "Brand-aligned visuals", "Responsive layouts", "Conversion-focused flows"],
      },
      wordpress: {
        title: "WordPress",
        tagline: "Flexible & easy to manage",
        description:
          "Custom WordPress websites with tailored themes and plugins — easy for your team to update every day.",
        points: ["Custom themes", "Plugin development", "Easy content management", "SEO-friendly setup"],
      },
      woocommerce: {
        title: "WooCommerce",
        tagline: "WordPress-powered stores",
        description:
          "Full-featured online stores on WooCommerce with custom product types, payments and shipping rules.",
        points: ["Store setup & design", "Payment gateways", "Shipping & tax rules", "Extension customization"],
      },
      shopify: {
        title: "Shopify",
        tagline: "Launch & grow on Shopify",
        description:
          "Shopify store setup, theme customization and app integration for brands that want to sell quickly and scale smoothly.",
        points: ["Store setup", "Theme customization", "App integrations", "Migration support"],
      },
      "api-integration": {
        title: "API Integration",
        tagline: "Connect your systems",
        description:
          "We connect your website with ERPs, CRMs, payment gateways, logistics and any third-party service your business relies on.",
        points: ["ERP & CRM sync", "Payment gateways", "Logistics integration", "Custom APIs"],
      },
      "website-maintenance": {
        title: "Website Maintenance",
        tagline: "Always updated, always secure",
        description:
          "Ongoing updates, backups, security monitoring and content changes so your website stays healthy around the clock.",
        points: ["Regular updates", "Daily backups", "Security monitoring", "Content updates"],
      },
      "speed-optimization": {
        title: "Speed Optimization",
        tagline: "Faster pages, better rankings",
        description:
          "We audit and optimize your website for Core Web Vitals — faster load times, better SEO and higher conversions.",
        points: ["Core Web Vitals", "Image & code optimization", "Caching & CDN setup", "Performance audits"],
      },
    },
  },
  industries: {
    label: "Industries",
    base: "/industries",
    pages: {
      manufacturing: {
        title: "Manufacturing",
        tagline: "Digital commerce for manufacturers",
        description:
          "B2B portals and digital catalogs that help manufacturers reach distributors and buyers directly.",
        points: ["Digital product catalogs", "Dealer & distributor portals", "Bulk order management", "Quote requests"],
      },
      retail: {
        title: "Retail",
        tagline: "Modern retail experiences",
        description: "Omnichannel retail websites that connect your physical stores with online shoppers.",
        points: ["Omnichannel selling", "Inventory sync", "Click & collect", "Loyalty programs"],
      },
      wholesale: {
        title: "Wholesale",
        tagline: "Wholesale ordering made easy",
        description: "Self-serve wholesale portals with tiered pricing, credit terms and quick reordering.",
        points: ["Tiered pricing", "Quick reorder", "Credit management", "Sales rep tools"],
      },
      furniture: {
        title: "Furniture",
        tagline: "Showrooms that sell online",
        description: "Visual-first furniture stores with room views, customization options and delivery scheduling.",
        points: ["Visual catalogs", "Product customization", "Delivery scheduling", "Room planners"],
      },
      fashion: {
        title: "Fashion",
        tagline: "Style meets technology",
        description: "Fashion ecommerce with lookbooks, size guides, easy returns and seasonal collections.",
        points: ["Lookbooks & collections", "Size & fit guides", "Easy returns", "Seasonal campaigns"],
      },
      electronics: {
        title: "Electronics",
        tagline: "Spec-driven selling",
        description: "Electronics stores with detailed specs, comparisons, warranties and EMI options.",
        points: ["Spec comparisons", "Warranty management", "EMI options", "Accessory bundling"],
      },
      "building-materials": {
        title: "Building Materials",
        tagline: "Heavy commerce, handled",
        description: "B2B platforms for building material suppliers with bulk pricing and logistics coordination.",
        points: ["Bulk pricing", "Project-based ordering", "Logistics coordination", "Dealer networks"],
      },
    },
  },
  work: {
    label: "Work",
    base: "/work",
    pages: {
      "case-studies": {
        title: "Case Studies",
        tagline: "Work that speaks for itself",
        description:
          "Real projects, real results — see how we helped businesses grow sales, reduce manual work and scale online.",
        points: ["3X sales growth stories", "B2B marketplace launches", "Custom platform builds", "Measurable outcomes"],
      },
      portfolio: {
        title: "Portfolio",
        tagline: "Our recent work",
        description: "A selection of websites, stores and platforms we have designed and developed for our clients.",
        points: ["Ecommerce stores", "Business websites", "Web applications", "Brand experiences"],
      },
      "client-stories": {
        title: "Client Stories",
        tagline: "In their words",
        description: "Hear directly from the businesses we partner with about their growth journey with Webgram.",
        points: ["Client testimonials", "Success stories", "Long-term partnerships", "Growth journeys"],
      },
    },
  },
  resources: {
    label: "Resources",
    base: "/resources",
    pages: {
      blog: {
        title: "Blog",
        tagline: "Ideas & updates",
        description: "Articles on ecommerce, technology and digital growth from the Webgram team.",
        points: ["Ecommerce tips", "Technology trends", "Growth strategies", "Product updates"],
      },
      guides: {
        title: "Guides",
        tagline: "Step-by-step playbooks",
        description: "Practical guides to help you plan, launch and grow your digital commerce business.",
        points: ["Launch checklists", "Platform comparisons", "SEO playbooks", "Growth frameworks"],
      },
      faqs: {
        title: "FAQs",
        tagline: "Quick answers",
        description: "Answers to the most common questions about our services, process and pricing.",
        points: ["Project timelines", "Pricing questions", "Support details", "Process overview"],
      },
      insights: {
        title: "Insights",
        tagline: "Data-driven perspectives",
        description: "Research and insights on digital commerce trends, consumer behavior and technology shifts.",
        points: ["Industry reports", "Trend analysis", "Consumer insights", "Market data"],
      },
    },
  },
};

export function getSubpage(section: string, slug: string): Subpage | undefined {
  return menuSections[section]?.pages[slug];
}
