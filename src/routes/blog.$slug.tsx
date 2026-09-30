import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/blog-detail-page";
import { getPublicBlogPost } from "@/lib/blog.functions";

const SITE = "https://homepage-replica-magic.lovable.app";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => { const post = await getPublicBlogPost({ data: { slug: params.slug } }); if (!post) throw notFound(); return post; },
  head: ({ loaderData, params }) => ({ links: [{ rel: "canonical", href: `${SITE}/blog/${params.slug}` }], scripts: loaderData ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: loaderData.title, description: loaderData.seo_description ?? loaderData.excerpt, image: loaderData.featured_image ?? undefined, datePublished: loaderData.published_at, author: { "@type": "Person", name: loaderData.author_name }, publisher: { "@type": "Organization", name: "Webgram IT Solution" }, mainEntityOfPage: `${SITE}/blog/${params.slug}` }) }] : [], meta: [
    { property: "og:url", content: `${SITE}/blog/${params.slug}` },
    ...(loaderData?.published_at ? [{ property: "article:published_time", content: loaderData.published_at }, { property: "article:author", content: loaderData.author_name }] : []),
    { title: loaderData ? `${loaderData.seo_title ?? loaderData.title} | Webgram Blog` : "Article | Webgram IT Solution" },
    { name: "description", content: loaderData?.seo_description ?? loaderData?.excerpt ?? "Webgram digital commerce insight." },
    { property: "og:title", content: loaderData?.seo_title ?? loaderData?.title ?? "Article | Webgram IT Solution" },
    { property: "og:description", content: loaderData?.seo_description ?? loaderData?.excerpt ?? "Webgram digital commerce insight." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
    ...(loaderData?.featured_image ? [{ property: "og:image", content: loaderData.featured_image }, { name: "twitter:image", content: loaderData.featured_image }] : []),
  ] }),
  component: Page,
});
function Page() { return <BlogDetailPage post={Route.useLoaderData()} />; }
