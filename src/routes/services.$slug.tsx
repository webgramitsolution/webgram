import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { WebsiteDevelopmentPage } from "@/components/website-development-page";
import { WooCommercePage } from "@/components/woocommerce-page";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.services;

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
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
      ...(params.slug === "website-development"
        ? [
            { property: "og:image", content: "https://ik.imagekit.io/home1/Website%20Development?updatedAt=1790703469216" },
            { name: "twitter:image", content: "https://ik.imagekit.io/home1/Website%20Development?updatedAt=1790703469216" },
          ]
        : params.slug === "woocommerce"
          ? [
              { property: "og:image", content: "https://homepage-replica-magic.lovable.app" },
            ].filter(() => false)
          : []),
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const page = Route.useLoaderData();
  const { slug } = Route.useParams();
  if (slug === "website-development") return <WebsiteDevelopmentPage />;
  if (slug === "woocommerce") return <WooCommercePage />;
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
