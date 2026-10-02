import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Eye, Home } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { BlogEngagement, BlogShareButtons } from "@/components/blog-engagement";
import { BlogAdBand, BlogAdsConsent } from "@/components/blog-ads";

type Related = { id: string; title: string; slug: string; excerpt: string; featured_image: string | null; featured_image_alt: string; published_at: string | null };
type Faq = { question: string; answer: string };
type Post = { id: string; title: string; slug: string; excerpt: string; content: string; featured_image: string | null; featured_image_alt: string; author_name: string; published_at: string | null; tags: string[]; faqs: unknown; view_count: number; category: { name: string; slug: string } | null; subcategory: { name: string; slug: string } | null; related: Related[] };

const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)) : "";

function InlineText({ value }: { value: string }) {
  const parts = value.split(/(\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|\*[^*]+\*)/g).filter(Boolean);
  return <>{parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("__") && part.endsWith("__")) return <u key={index}>{part.slice(2, -2)}</u>;
    if (part.startsWith("~~") && part.endsWith("~~")) return <s key={index}>{part.slice(2, -2)}</s>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    return <span key={index}>{part}</span>;
  })}</>;
}

const imagePattern = /^!\[([^\]]*)\]\((https:\/\/[^\s)]+)\)$/i;

function ArticleBody({ content }: { content: string }) {
  const lines = content.replace(/\\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";
    if (!line) { index += 1; continue; }
    if (line === ":::gallery" || line === ":::grid") {
      const mode = line.slice(3); const items: string[] = []; let current: string[] = [];
      index += 1;
      while (index < lines.length && lines[index]?.trim() !== ":::") {
        if (mode === "grid" && lines[index]?.trim() === "---") { items.push(current.join("\n").trim()); current = []; }
        else current.push(lines[index] ?? "");
        index += 1;
      }
      items.push(current.join("\n").trim());
      blocks.push(<div key={`rich-${index}`} className={mode === "gallery" ? "article-gallery" : "article-grid"}>{items.filter(Boolean).map((item, itemIndex) => { const match = item.match(imagePattern); return match ? <img key={itemIndex} src={match[2]} alt={match[1] || "Article gallery image"} loading="lazy" /> : <p key={itemIndex}><InlineText value={item} /></p>; })}</div>);
      index += 1; continue;
    }
    const image = line.match(imagePattern);
    if (image) { blocks.push(<figure key={`image-${index}`}><img src={image[2]} alt={image[1] || "Article image"} loading="lazy" /></figure>); index += 1; continue; }
    if (line.startsWith("### ")) { blocks.push(<h3 key={`h3-${index}`}><InlineText value={line.slice(4)} /></h3>); index += 1; continue; }
    if (line.startsWith("## ")) { blocks.push(<h2 key={`h2-${index}`}><InlineText value={line.slice(3)} /></h2>); index += 1; continue; }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index]?.trim().startsWith("- ")) { items.push((lines[index]?.trim() ?? "").slice(2)); index += 1; }
      blocks.push(<ul key={`list-${index}`}>{items.map((item, itemIndex) => <li key={itemIndex}><InlineText value={item} /></li>)}</ul>); continue;
    }
    const paragraph = [line]; index += 1;
    while (index < lines.length && lines[index]?.trim() && !/^(## |### |- |:::|!\[)/.test(lines[index]?.trim() ?? "")) { paragraph.push(lines[index]?.trim() ?? ""); index += 1; }
    blocks.push(<p key={`p-${index}`}><InlineText value={paragraph.join(" ")} /></p>);
  }
  return <div className="blog-prose">{blocks}</div>;
}

export function BlogDetailPage({ post }: { post: Post }) {
  const minutes = Math.max(2, Math.ceil(post.content.split(/\s+/).length / 200));
  const faqs = (Array.isArray(post.faqs) ? post.faqs : []).filter((faq): faq is Faq => Boolean(faq && typeof faq === "object" && "question" in faq && "answer" in faq));
  useEffect(() => {
    const key = `viewed:${post.slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    void supabase.rpc("increment_post_view", { _slug: post.slug });
  }, [post.slug]);
  return <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main className="bg-card">
      <div className="border-b border-border bg-background"><nav className="page-shell flex h-11 items-center gap-2 overflow-hidden text-[11px] text-muted-foreground" aria-label="Breadcrumb"><Home className="h-3.5 w-3.5 shrink-0" /><Link to="/" className="hover:text-primary">Home</Link><span>›</span><Link to="/resources/$slug" params={{ slug: "blog" }} className="hover:text-primary">Blog</Link><span>›</span>{post.category ? <><span className="text-navy">{post.category.name}</span><span>›</span></> : null}<span className="truncate">{post.title}</span></nav></div>
      <div className="mx-auto grid w-full max-w-[1160px] py-5 xl:grid-cols-[180px_minmax(0,800px)_180px] xl:justify-center">
        <aside className="hidden xl:block"><div className="sticky top-32"><BlogAdBand rail position="detailLeft" label="Advertisement — left" /></div></aside>
        <div className="min-w-0 bg-card px-3 md:px-5">
      {post.featured_image ? <figure className="aspect-[16/6.2] overflow-hidden rounded-md border border-border bg-muted shadow-card"><img src={post.featured_image} alt={post.featured_image_alt || post.title} className="h-full w-full object-cover" /></figure> : null}
      <section className="pt-4">
        <p className="inline-flex rounded-sm bg-primary px-2 py-1 text-[9px] font-extrabold uppercase text-primary-foreground">{post.category?.name ?? "Webgram Journal"}</p>
        <h1 className="mt-2 text-[1.65rem] font-extrabold leading-[1.12] text-navy md:text-[1.9rem]">{post.title}</h1>
        <div className="mt-4 grid gap-3 border-b border-border pb-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground"><span className="grid h-7 w-7 place-items-center rounded-full bg-navy font-bold text-on-dark">{post.author_name.charAt(0).toUpperCase()}</span><strong className="text-navy">By {post.author_name}</strong><span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{date(post.published_at)}</span><span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{minutes} Min Read</span><span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{post.view_count.toLocaleString("en-IN")} Views</span></div>
          <BlogShareButtons postId={post.id} title={post.title} />
        </div>
      </section>
      <article className="py-5"><p className="mb-5 text-[13px] leading-6 text-muted-foreground">{post.excerpt}</p><ArticleBody content={post.content} /></article>
      {faqs.length ? <section className="mx-auto mb-10 w-[min(100%,760px)]"><h2 className="text-2xl font-extrabold text-navy">Frequently Asked Questions</h2><div className="mt-4 divide-y rounded-md border border-border bg-card">{faqs.map((faq, index) => <details key={`${index}-${faq.question}`} className="group p-4"><summary className="cursor-pointer font-bold text-navy">{faq.question}</summary><p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p></details>)}</div></section> : null}
      {post.related.length ? <nav className="mb-4 grid overflow-hidden rounded-md border border-border bg-sky-soft md:grid-cols-2" aria-label="Previous and next articles">{post.related.slice(0, 2).map((item, index) => <Link key={item.id} to="/blog/$slug" params={{ slug: item.slug }} className={`flex min-h-16 items-center gap-3 p-3 hover:bg-primary-soft ${index === 1 ? "border-t border-border text-right md:border-l md:border-t-0 md:flex-row-reverse" : ""}`}>{item.featured_image ? <img src={item.featured_image} alt="" className="h-11 w-16 shrink-0 rounded-sm object-cover" /> : null}<span className="min-w-0"><span className="flex items-center gap-1 text-[10px] font-bold text-primary">{index === 0 ? <><ArrowLeft className="h-3 w-3" /> Previous Post</> : <>Next Post <ArrowRight className="h-3 w-3" /></>}</span><strong className="mt-1 block truncate text-[11px] text-navy">{item.title}</strong></span></Link>)}</nav> : null}
      <BlogEngagement postId={post.id} title={post.title} />
        </div>
        <aside className="hidden xl:block"><div className="sticky top-32"><BlogAdBand rail position="detailRight" label="Advertisement — right" /></div></aside>
      </div>
      <BlogAdsConsent />
    </main>
  </div>;
}
