import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { ApiIntegrationPage } from "@/components/api-integration-page";
import { WebPortalDevelopmentPage } from "@/components/web-portal-development-page";
import { WebsiteMaintenancePage } from "@/components/website-maintenance-page";
import { WooCommercePage } from "@/components/woocommerce-page";
import { SubpageTemplate } from "@/components/subpage";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.services;

const portalBanner = "https://ik.imagekit.io/home1/custome%20wesite%20banner.png";
const apiIntegrationBanner = "https://ik.imagekit.io/home1/home%20page/Api%20integration%20page.png";
const maintenanceBanner = "https://ik.imagekit.io/x3cipokny/maintence%20banner.png";

const dedicatedBanners: Record<string, string> = {
  "web-portal-development": portalBanner,
  "api-integration": apiIntegrationBanner,
  "website-maintenance": maintenanceBanner,
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    // Keep the pre-rename URL working: /services/website-development → Web Portal Development.
    if (params.slug === "website-development") throw redirect({ href: "/services/web-portal-development", replace: true });
    const page = getSubpage("services", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Services"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? "Services"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(params.slug === "web-portal-development" || params.slug === "api-integration"
        ? [
            { property: "og:image", content: params.slug === "api-integration" ? apiIntegrationBanner : portalBanner },
            { name: "twitter:image", content: params.slug === "api-integration" ? apiIntegrationBanner : portalBanner },
          ]
        : []),
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const page = Route.useLoaderData();
  const { slug } = Route.useParams();
  if (slug === "web-portal-development") return <WebPortalDevelopmentPage />;
  if (slug === "woocommerce") return <WooCommercePage />;
  if (slug === "api-integration") return <ApiIntegrationPage />;
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
