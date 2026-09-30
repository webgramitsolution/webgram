import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { BlogPage } from "@/components/blog-page";
import { getPublicBlog } from "@/lib/blog.functions";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.resources;

export const Route = createFileRoute("/resources/$slug")({
  loader: async ({ params }) => {
    const page = getSubpage("resources", params.slug);
    if (!page) throw notFound();
    if (params.slug === "blog") return { page, blog: await getPublicBlog() };
    return { page, blog: null };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.page.title ?? "Resources"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.page.description ?? "" },
      { property: "og:title", content: `${loaderData?.page.title ?? "Resources"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.page.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { page, blog } = Route.useLoaderData();
  if (blog) return <BlogPage categories={blog.categories} posts={blog.posts} />;
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
