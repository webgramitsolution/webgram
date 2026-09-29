import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.services;

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("services", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Services"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? "Services"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const page = Route.useLoaderData();
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
