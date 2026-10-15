import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/blog-detail-page";
import { getPublicBlogPost, getPublicBlog } from "@/lib/blog.functions";
import { NotFoundPage } from "@/components/not-found-page";
import { Button } from "@/components/ui/button";

const SITE = "https://webgramitsolution.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => { const [post, blog] = await Promise.all([getPublicBlogPost({ data: { slug: params.slug } }), getPublicBlog()]); if (!post) throw notFound(); return { ...post, menuCategories: blog.categories }; },
  notFoundComponent: NotFoundPage,
  errorComponent: () => <div className="page-shell py-16"><h1>Article unavailable</h1><p className="my-4">Please try again shortly.</p><Button asChild><a href="/resources/blog">Back to blog</a></Button></div>,
  head: ({ loaderData, params }) => { const faqs = Array.isArray(loaderData?.faqs) ? loaderData.faqs.filter((faq): faq is { question: string; answer: string } => Boolean(faq && typeof faq === "object" && !Array.isArray(faq) && "question" in faq && "answer" in faq)) : []; return ({ links: [{ rel: "canonical", href: `${SITE}/blog/${params.slug}` }], scripts: loaderData ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: loaderData.title, description: loaderData.seo_description ?? loaderData.excerpt, image: loaderData.featured_image ?? undefined, datePublished: loaderData.published_at, author: { "@type": "Person", name: loaderData.author_name }, publisher: { "@type": "Organization", name: "Webgram IT Solution" }, mainEntityOfPage: `${SITE}/blog/${params.slug}` }) }, ...(faqs.length ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }] : [])] : [], meta: [
    { property: "og:url", content: `${SITE}/blog/${params.slug}` },
    ...(loaderData?.published_at ? [{ property: "article:published_time", content: loaderData.published_at }, { property: "article:author", content: loaderData.author_name }] : []),
    { title: loaderData ? `${loaderData.seo_title ?? loaderData.title} | Webgram Blog` : "Article | Webgram IT Solution" },
    { name: "description", content: loaderData?.seo_description ?? loaderData?.excerpt ?? "Webgram digital commerce insight." },
    { property: "og:title", content: loaderData?.seo_title ?? loaderData?.title ?? "Article | Webgram IT Solution" },
    { property: "og:description", content: loaderData?.seo_description ?? loaderData?.excerpt ?? "Webgram digital commerce insight." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
    ...(loaderData?.noindex ? [{ name: "robots", content: "noindex,follow" }] : []),
    ...(loaderData?.featured_image ? [{ property: "og:image", content: loaderData.featured_image }, { name: "twitter:image", content: loaderData.featured_image }] : []),
  ] }); },
  component: Page,
});
function Page() { const post = Route.useLoaderData(); return <BlogDetailPage post={post} categories={post.menuCategories} />; }
