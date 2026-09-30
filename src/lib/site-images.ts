/**
 * Homepage imagery, served from the ImageKit library.
 *
 * Every picture used on the homepage lives here so a file can be swapped in one
 * place (or the URL updated when a new version is uploaded) without touching the
 * page markup.
 */
const lib = "https://ik.imagekit.io/home1/home%20page";

export const IMAGES = {
  /** Wide navy hero banner: laptop + phone storefronts, callouts on the right. */
  hero: `${lib}/home%20page%20slider%201.png`,
  /** Row of review / certification seals on white. */
  reviewBadges: `${lib}/Media-2.webp`,
  /** Hub-and-spoke commerce ecosystem diagram on white. */
  ecosystem: `${lib}/From%20Storefront%20to%20Back%20Office.png`,
  /** Storefront, admin dashboard and mobile app on three devices, transparent. */
  platforms: `${lib}/website.png`,
  /** Solution card artwork — each is a white-background photo. */
  ecommerce: `${lib}/Ecommerce%20Development.png`,
  b2b: `${lib}/B2B%20Commerce.png`,
  marketplace: `${lib}/Marketplace%20Development.png`,
  custom: `${lib}/Custom%20Commerce%20Platforms.png`,
  /** Case-study card artwork — wide device shots, one per case study. */
  caseManufacturing: `${lib}/From%20Traditional%20Sales%20to%20a%20Scalable%20Digital%20Platform.png`,
  caseLifestyle: `${lib}/Modern%20Ecommerce%20Experience%20for%20a%20Lifestyle%20Brand.png`,
  caseDistribution: `${lib}/Business%20Management%20Portal%20for%20a%20Distribution%20Company.png`,
} as const;

/** Brand logos shown under "Trusted by Businesses Building Their Digital Future". */
export const clientLogos = [
  { name: "GoKwik", src: `${lib}/1.png` },
  { name: "Hostinger", src: `${lib}/2.png` },
  { name: "Trustpilot", src: `${lib}/3.png` },
  { name: "interakt", src: `${lib}/4.png` },
  { name: "Judge.me", src: `${lib}/5.png` },
  { name: "WATI", src: `${lib}/6.png` },
  { name: "Shiprocket", src: `${lib}/7.png` },
];

/**
 * About-page content shown on the homepage (About banner hero, mission section
 * and workspace gallery), served from the ImageKit library.
 */
export const aboutImages = {
  /** Wide navy banner: Webgram reception wall photo, plain navy on the left for copy. */
  banner: `https://ik.imagekit.io/home1/About%20us%20page/About%20us%20-%20banner.png`,
  /** Office photo with the "Ideas. Technology. Growth." wall, for the mission section. */
  mission: `https://ik.imagekit.io/home1/ArchFacing.png`,
  /** Workspace gallery, in display order. */
  workspace: [
    { label: "Modern Office Space", src: `https://ik.imagekit.io/home1/About%20us%20page/A%20createive%20and%20collaborative%20Environment%20ka%20image%20ye%20abhi%20add%20karo%20(1).png` },
    { label: "Team Collaboration", src: `https://ik.imagekit.io/home1/About%20us%20page/A%20createive%20and%20collaborative%20Environment%20ka%20image%20ye%20abhi%20add%20karo%20(3).png` },
    { label: "Focused Development", src: `https://ik.imagekit.io/home1/About%20us%20page/A%20createive%20and%20collaborative%20Environment%20ka%20image%20ye%20abhi%20add%20karo%20(2).png` },
  ],
} as const;

/** Contact-page artwork supplied for the single-page contact experience. */
export const contactImages = {
  banner: `https://ik.imagekit.io/home1/About%20us%20page/cotact%20banner.png`,
  advisor: `https://ik.imagekit.io/home1/About%20us%20page/about%20us%20page%20-%20coantact%20us%20image.png?updatedAt=1790588444335`,
} as const;

/** Technology grid — transparent square logos, listed in reference order. */
export const technologyStack = [
  { name: "React.js", src: `${lib}/01_React.js.png` },
  { name: "Next.js", src: `${lib}/nextjs.svg` },
  { name: "Node.js", src: `${lib}/03_Node.js.png` },
  { name: "WordPress", src: `${lib}/04_WordPress.png` },
  { name: "WooCommerce", src: `${lib}/05_WooCommerce.png` },
  { name: "Supabase", src: `${lib}/06_Supabase.png` },
  { name: "PostgreSQL", src: `${lib}/07_PostgreSQL.png` },
  { name: "Razorpay", src: `${lib}/08_Razorpay.png` },
  { name: "WhatsApp API", src: `${lib}/09_WhatsApp_API.png` },
  { name: "AWS", src: `${lib}/10_AWS.png` },
  { name: "Google Cloud", src: `${lib}/11_Google_Cloud.png` },
  { name: "More", src: `${lib}/12_More.png` },
];

/**
 * Replacement Next.js mark supplied for the technology rows. The file name ends
 * in ".svg" but ImageKit serves a 180×180 PNG — an <img> tag renders either.
 */
export const nextjsLogo = `${lib}/nextjs.svg`;

/**
 * Industry cards — one photo per sector. The object key and the label used on
 * the card match the ImageKit file name, so the same text doubles as alt text.
 * URLs stay exactly as supplied: ImageKit serves them with a literal "&" and
 * "(2)", which 404 once percent-encoded.
 */
export const industryImages = {
  manufacturing: "https://ik.imagekit.io/home1/Manufacturing.png",
  architecture: "https://ik.imagekit.io/home1/Architecture%20&%20Interior.png",
  realEstate: "https://ik.imagekit.io/home1/Real%20Estate.png",
  retail: "https://ik.imagekit.io/home1/Retail%20&%20Lifestyle.png",
  education: "https://ik.imagekit.io/home1/Education.png",
  healthcare: "https://ik.imagekit.io/home1/Healthcare%20(2).png",
  finance: "https://ik.imagekit.io/home1/Finance%20&%20Consulting.png",
} as const;

/**
 * "Websites We Have Delivered" project cards — one delivered-site photo per card.
 * URLs stay exactly as supplied (percent-encoded spaces only).
 */
export const deliveredProjects = {
  corporate: "https://ik.imagekit.io/home1/Corporate%20Website.png",
  business: "https://ik.imagekit.io/home1/Business%20Website.png",
  professional: "https://ik.imagekit.io/home1/Professional%20Website.png",
  realEstate: "https://ik.imagekit.io/home1/Real%20Estate%20Website.png",
  healthcare: "https://ik.imagekit.io/home1/Healthcare%20Website.png",
} as const;

/** Web Portal Development service page imagery, served from the ImageKit library. */
export const portalImages = {
  /** Wide navy hero banner: dashboard, vendor portal and customer portal mockups, "Multiple Portals One Solution" script on the right. */
  hero: "https://ik.imagekit.io/home1/custome%20wesite%20banner.png",
  customer: "https://ik.imagekit.io/home1/Customer%20Portal.png",
  vendor: "https://ik.imagekit.io/home1/Verndor%20portal.png",
  employee: "https://ik.imagekit.io/home1/Employee%20portal.png",
  admin: "https://ik.imagekit.io/home1/Admin%20Portal.png",
} as const;

/** API & Third-Party Integration service page artwork supplied through ImageKit. */
export const apiIntegrationImages = {
  hero: "https://ik.imagekit.io/home1/home%20page/Api%20integration%20page.png",
} as const;

/**
 * "Tools & Technologies We Use" logos on the Website Development service page,
 * in the supplied order. URLs stay exactly as given (percent-encoded spaces
 * only); the logo file name doubles as the alt text.
 */
/**
 * "Integrations We Support" logos on the WooCommerce service page, in the
 * supplied order. URLs stay exactly as given (percent-encoded spaces only);
 * the display name doubles as the alt text.
 */
export const wooIntegrations = [
  { name: "Google Ads", src: "https://ik.imagekit.io/home1/Google%20Ads.png" },
  { name: "Meta Pixel", src: "https://ik.imagekit.io/home1/MetaPixel.png" },
  { name: "WhatsApp Business", src: "https://ik.imagekit.io/home1/WhatsApp%20Business.png" },
  { name: "Google Analytics", src: "https://ik.imagekit.io/home1/google%20anaylytics.png" },
  { name: "Delhivery", src: "https://ik.imagekit.io/home1/Delhivery.png" },
  { name: "BlueDart", src: "https://ik.imagekit.io/home1/BlueDart.png" },
  { name: "Mailchimp", src: "https://ik.imagekit.io/home1/MailChimp.png" },
  { name: "Razorpay", src: "https://ik.imagekit.io/home1/Razorpay.png" },
  { name: "Shiprocket", src: "https://ik.imagekit.io/home1/Shiprocket.png" },
  { name: "Instamojo", src: "https://ik.imagekit.io/home1/Instamojo.png" },
  { name: "PayU", src: "https://ik.imagekit.io/home1/payu.png" },
  { name: "Stripe", src: "https://ik.imagekit.io/home1/stripe.png" },
  { name: "Tally", src: "https://ik.imagekit.io/home1/Telly.png" },
] as const;

export const webDevelopmentTechnologies = [
  { name: "CloudFlare", src: "https://ik.imagekit.io/home1/CloudFlare", viewBox: "130 302 993 516" },
  { name: "JavaScript", src: "https://ik.imagekit.io/home1/JavaScript.png", viewBox: "286 205 681 723" },
  { name: "Python", src: "https://ik.imagekit.io/home1/Python.png", viewBox: "275 173 704 678" },
  { name: "MongoDB", src: "https://ik.imagekit.io/home1/MongoDB.png", viewBox: "468 253 314 585" },
  { name: "Yoast SEO", src: "https://ik.imagekit.io/home1/Yoast%20SEO.png", viewBox: "253 201 770 747" },
  { name: "RankMath", src: "https://ik.imagekit.io/home1/RankMath.png", viewBox: "176 256 908 636" },
  { name: "WP Bakery", src: "https://ik.imagekit.io/home1/WP%20Bakery.png", viewBox: "237 272 785 585" },
  { name: "Elementor", src: "https://ik.imagekit.io/home1/Elementor.png", viewBox: "253 217 747 697" },
  { name: "ACF", src: "https://ik.imagekit.io/home1/ACF%202.png", viewBox: "125 358 1017 502" },
  { name: "WooCommerce", src: "https://ik.imagekit.io/home1/WooCommerce.png", viewBox: "166 310 922 578" },
  { name: "Java", src: "https://ik.imagekit.io/home1/Java.png", viewBox: "414 144 484 535" },
  { name: "MySQL", src: "https://ik.imagekit.io/home1/MySQL.png", viewBox: "122 310 1026 701" },
  { name: "PHP", src: "https://ik.imagekit.io/home1/PHP.png", viewBox: "133 321 978 582" },
  { name: "WordPress", src: "https://ik.imagekit.io/home1/WordPress.png", viewBox: "273 187 706 695" },
] as const;
