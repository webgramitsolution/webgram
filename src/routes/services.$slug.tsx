import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { WebPortalDevelopmentPage } from "@/components/web-portal-development-page";
import { WooCommercePage } from "@/components/woocommerce-page";
import { SubpageTemplate } from "@/components/subpage";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.services;

const portalBanner = "https://ik.imagekit.io/home1/custome%20wesite%20banner.png";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    // Keep the pre-rename URL working: /services/website-development → Web Portal Development.
    if (params.slug === "website-development") throw redirect({ to: "/services/web-portal-development", replace: true });
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
      ...(params.slug === "web-portal-development"
        ? [
            { property: "og:image", content: portalBanner },
            { name: "twitter:image", content: portalBanner },
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
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
