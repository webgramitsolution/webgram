import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { getSubpage, menuSections } from "@/lib/menu-pages";
import { portfolio } from "@/lib/portfolio";

const section = menuSections.work;

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("work", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => ({
    links: [{ rel: "canonical", href: `https://webgramitsolution.com/work/${params.slug}` }],
    meta: [
      { title: `${loaderData?.title ?? "Work"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? "Work"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: params.slug === "case-studies" ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Web Development Case Studies | Webgram IT Solution",
        url: "https://webgramitsolution.com/work/case-studies",
        mainEntity: { "@type": "ItemList", itemListElement: portfolio.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: item.url, name: item.name })) },
      }),
    }] : [],
  }),
  component: WorkPage,
});

function WorkPage() {
  const page = Route.useLoaderData();
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
