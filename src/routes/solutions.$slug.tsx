import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { EcommerceDevelopmentPage } from "@/components/ecommerce-development-page";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.solutions;

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("solutions", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Solutions"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.description ?? "" },
      {
        property: "og:title",
        content: `${loaderData?.title ?? "Solutions"} | Webgram IT Solution`,
      },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const page = Route.useLoaderData();
  const { slug } = Route.useParams();
  if (slug === "ecommerce-development") return <EcommerceDevelopmentPage />;
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
