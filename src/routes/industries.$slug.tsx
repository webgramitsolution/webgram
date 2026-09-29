import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.industries;

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("industries", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Industries"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? "Industries"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const page = Route.useLoaderData();
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
