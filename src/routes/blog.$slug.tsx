import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/blog-detail-page";
import { getPublicBlogPost } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => { const post = await getPublicBlogPost({ data: { slug: params.slug } }); if (!post) throw notFound(); return post; },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData?.seo_title ?? loaderData?.title ?? "Article | Webgram IT Solution" },
    { name: "description", content: loaderData?.seo_description ?? loaderData?.excerpt ?? "Webgram digital commerce insight." },
    { property: "og:title", content: loaderData?.seo_title ?? loaderData?.title ?? "Article | Webgram IT Solution" },
    { property: "og:description", content: loaderData?.seo_description ?? loaderData?.excerpt ?? "Webgram digital commerce insight." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
    ...(loaderData?.featured_image ? [{ property: "og:image", content: loaderData.featured_image }, { name: "twitter:image", content: loaderData.featured_image }] : []),
  ] }),
  component: Page,
});
function Page() { return <BlogDetailPage post={Route.useLoaderData()} />; }
