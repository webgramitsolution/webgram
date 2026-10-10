export type ServiceLocation = {
  slug: string;
  city: string;
  keyword: string;
  title: string;
  description: string;
  intro: string;
  areas: string[];
  industries: string[];
};

export const locations: ServiceLocation[] = [
  {
    slug: "delhi",
    city: "Delhi",
    keyword: "Ecommerce Website Development Company in Delhi",
    title: "Ecommerce Website Development Company in Delhi | Webgram IT Solution",
    description: "Webgram IT Solution is an ecommerce website development company in Delhi building fast, SEO-ready online stores, WooCommerce shops and custom ecommerce platforms.",
    intro: "From our office in Sangam Vihar, New Delhi, we design and develop ecommerce websites for Delhi retailers, wholesalers and D2C brands — online stores that load fast, rank on Google and convert visitors into orders.",
    areas: ["Connaught Place", "Karol Bagh", "Chandni Chowk", "Lajpat Nagar", "Dwarka", "Rohini", "Janakpuri", "Laxmi Nagar"],
    industries: ["Fashion & apparel", "Electronics", "Wholesale traders", "Home décor", "Healthcare supplies", "Handicrafts"],
  },
  {
    slug: "noida",
    city: "Noida",
    keyword: "Website Development Company in Noida",
    title: "Website Development Company in Noida | Webgram IT Solution",
    description: "Looking for a website development company in Noida? We build business websites, ecommerce stores and custom web portals for Noida and Greater Noida companies.",
    intro: "We help Noida startups, IT firms, manufacturers and service businesses launch professional websites and ecommerce stores that generate enquiries and sales, with SEO built in from day one.",
    areas: ["Sector 18", "Sector 62", "Sector 63", "Noida Extension", "Greater Noida", "Sector 135"],
    industries: ["IT & SaaS", "Manufacturing", "Education", "Real estate", "Startups", "Professional services"],
  },
  {
    slug: "faridabad",
    city: "Faridabad",
    keyword: "Ecommerce Website Developer in Faridabad",
    title: "Ecommerce Website Developer in Faridabad | Webgram IT Solution",
    description: "Hire an experienced ecommerce website developer in Faridabad for WooCommerce stores, B2B catalogues and industrial product websites that rank and convert.",
    intro: "Faridabad's manufacturers and traders trust us to build product catalogues, B2B ordering websites and online stores — including industrial projects like Adlite Electricals.",
    areas: ["NIT Faridabad", "Sector 15", "Ballabgarh", "Old Faridabad", "Greater Faridabad", "Sector 37"],
    industries: ["Industrial & electrical", "Auto parts", "Manufacturing", "Wholesale", "Retail", "Engineering"],
  },
  {
    slug: "gurugram",
    city: "Gurugram",
    keyword: "Website Designing Company in Gurgaon",
    title: "Website Designing Company in Gurgaon (Gurugram) | Webgram IT Solution",
    description: "Premium website designing company in Gurgaon creating corporate websites, ecommerce stores and conversion-focused landing pages for Gurugram businesses.",
    intro: "We design modern, mobile-first corporate and ecommerce websites for Gurugram companies — including wholesale ecommerce for My Party Suppliers — focused on brand trust and lead generation.",
    areas: ["Cyber City", "Golf Course Road", "Sohna Road", "Udyog Vihar", "MG Road", "Sector 29"],
    industries: ["Corporate & consulting", "B2B wholesale", "Real estate", "Hospitality", "Startups", "Healthcare"],
  },
  {
    slug: "delhi-ncr",
    city: "Delhi NCR",
    keyword: "B2B Ecommerce Website Development Company in Delhi NCR",
    title: "B2B Ecommerce Website Development Company in Delhi NCR | Webgram",
    description: "B2B ecommerce website development company in Delhi NCR building wholesale portals, dealer–distributor ordering, bulk pricing and ERP-ready B2B stores.",
    intro: "We build B2B ecommerce platforms for Delhi NCR manufacturers, distributors and wholesalers — with tiered pricing, bulk orders, quote requests, credit terms and dealer logins.",
    areas: ["Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad", "Greater Noida"],
    industries: ["Distributors", "Manufacturers", "Importers", "Wholesale suppliers", "Pharma distribution", "FMCG"],
  },
  {
    slug: "south-delhi",
    city: "South Delhi",
    keyword: "Website Designing Company in South Delhi",
    title: "Website Designing Company in South Delhi | Webgram IT Solution",
    description: "Local website designing company in South Delhi (Sangam Vihar) building business websites, online stores and SEO-ready pages for South Delhi brands.",
    intro: "Based in Sangam Vihar, we are a South Delhi website designing company you can meet in person — building business websites and ecommerce stores for local shops, clinics and brands.",
    areas: ["Saket", "Hauz Khas", "Greater Kailash", "Malviya Nagar", "Sangam Vihar", "Kalkaji", "Nehru Place", "Vasant Kunj"],
    industries: ["Local retail", "Clinics & healthcare", "Restaurants", "Boutiques", "Coaching institutes", "Professional services"],
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
