import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.resources;

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("resources", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Resources"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? "Resources"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const page = Route.useLoaderData();
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
