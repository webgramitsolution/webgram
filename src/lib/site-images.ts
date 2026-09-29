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
  { name: "Next.js", src: `${lib}/02_Next.js.png` },
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
