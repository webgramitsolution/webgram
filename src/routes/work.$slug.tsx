import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.work;

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("work", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Work"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? "Work"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(params.slug === "case-studies" ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const page = Route.useLoaderData();
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
