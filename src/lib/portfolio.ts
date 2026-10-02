import kingsports from "@/assets/portfolio-kingsportsmgt.jpg";
import houskase from "@/assets/portfolio-houskase.jpg";
import regal from "@/assets/portfolio-regalconsultinggroup.jpg";
import freshandbright from "@/assets/portfolio-freshandbright.jpg";
import naval from "@/assets/portfolio-navalmedical.jpg";
import party from "@/assets/portfolio-mypartysuppliers.jpg";
import chaatewala from "@/assets/portfolio-chaatewala.jpg";
import mukesh from "@/assets/portfolio-mukeshmurtikar.jpg";

export type PortfolioItem = {
  name: string;
  url: string;
  domain: string;
  category: string;
  location: string;
  image: string;
  summary: string;
  delivered: string[];
};

export const portfolio: PortfolioItem[] = [
  {
    name: "King Sports Management",
    url: "https://kingsportsmgt.com/",
    domain: "kingsportsmgt.com",
    category: "Sports & Athlete Management",
    location: "India",
    image: kingsports,
    summary:
      "A premium corporate website for an Indian sports management company covering athlete management, brand partnerships, digital media and sports infrastructure across football, cricket and tennis.",
    delivered: ["Custom corporate design", "Service & athlete sections", "SEO-ready page structure", "Enquiry-focused layout"],
  },
  {
    name: "Houskase",
    url: "https://houskase.com/",
    domain: "houskase.com",
    category: "D2C Ecommerce Store",
    location: "India",
    image: houskase,
    summary:
      "A full ecommerce store for everyday household, cleaning, office and stationery products with trending and combo collections, product reels, offers and marketplace badges.",
    delivered: ["WooCommerce storefront", "Combo & offer collections", "Mobile-first shopping", "Payment & shipping setup"],
  },
  {
    name: "Regal Consulting Group",
    url: "https://regalconsultinggroup.ca/",
    domain: "regalconsultinggroup.ca",
    category: "Staffing & Recruitment",
    location: "Ontario, Canada",
    image: regal,
    summary:
      "A professional website for an Ontario workforce solutions firm offering temporary staffing, permanent recruitment, executive search and payroll support for manufacturing and warehousing.",
    delivered: ["Employer & job-seeker journeys", "Industry pages", "Registration forms", "Clean corporate branding"],
  },
  {
    name: "Fresh & Bright Cleaners",
    url: "https://freshandbright.ca/",
    domain: "freshandbright.ca",
    category: "Local Service Business",
    location: "Mississauga, Canada",
    image: freshandbright,
    summary:
      "A conversion-focused website for a dry cleaning and laundry business with service listings, free pickup & delivery scheduling and a lead form that books customers directly.",
    delivered: ["Pickup booking form", "Service catalogue", "Local SEO setup", "Responsive design"],
  },
  {
    name: "Naval Medical",
    url: "https://navalmedical.com/",
    domain: "navalmedical.com",
    category: "Healthcare & Pharma Distribution",
    location: "Lucknow, India",
    image: naval,
    summary:
      "A trustworthy website for a Lucknow-based pharmaceutical distributor serving government and private hospitals, covering pharma distribution, surgical equipment and GeM services.",
    delivered: ["Product & service pages", "Institutional sales focus", "Trust-building content", "Contact & enquiry flow"],
  },
  {
    name: "My Party Suppliers",
    url: "https://mypartysuppliers.com/",
    domain: "mypartysuppliers.com",
    category: "B2B Wholesale Ecommerce",
    location: "Gurgaon, India",
    image: party,
    summary:
      "A wholesale ecommerce website for party decorations and balloons, built for bulk buyers and resellers with category browsing and SEO-friendly product pages.",
    delivered: ["Wholesale catalogue", "Bulk enquiry flow", "Category structure", "Search-optimised pages"],
  },
  {
    name: "Chaatewala",
    url: "https://chaatewala.com/",
    domain: "chaatewala.com",
    category: "Importer & Wholesale Supplier",
    location: "Delhi, India",
    image: chaatewala,
    summary:
      "A B2B website for a Delhi umbrella importer and wholesale supplier, helping gift, bulk and resale buyers explore products and request factory-price orders.",
    delivered: ["Bulk order focus", "Product showcase", "Local SEO for Delhi", "WhatsApp & call leads"],
  },
  {
    name: "Mukesh Murtikar",
    url: "https://mukeshmurtikar.com/",
    domain: "mukeshmurtikar.com",
    category: "Handicraft Ecommerce",
    location: "India",
    image: mukesh,
    summary:
      "An elegant online store for sculptures, statues, idols and wall décor with rich category navigation, offers and a heritage-inspired visual identity.",
    delivered: ["Ecommerce store design", "Category navigation", "Offers & coupons", "Customer accounts"],
  },
];
