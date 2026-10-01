import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Facebook, Linkedin, MessageCircle, Share2 } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { BlogEngagement } from "@/components/blog-engagement";
import { BlogAdBand, BlogAdsConsent } from "@/components/blog-ads";

type Related = { id: string; title: string; slug: string; excerpt: string; featured_image: string | null; featured_image_alt: string; published_at: string | null };
type Faq = { question: string; answer: string };
type Post = { id: string; title: string; slug: string; excerpt: string; content: string; featured_image: string | null; featured_image_alt: string; author_name: string; published_at: string | null; tags: string[]; faqs: unknown; category: { name: string; slug: string } | null; subcategory: { name: string; slug: string } | null; related: Related[] };

const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)) : "";

function ArticleBody({ content }: { content: string }) {
  const blocks = content.replace(/\\n/g, "\n").split(/\n\s*\n/).filter(Boolean);
  return <div className="blog-prose">{blocks.map((block, index) => <div key={`${index}-${block.slice(0, 12)}`}>{(() => {
    if (block.startsWith("## ")) return <h2 key={index}>{block.slice(3)}</h2>;
    if (block.startsWith("### ")) return <h3 key={index}>{block.slice(4)}</h3>;
    if (block.split("\n").every((line) => line.startsWith("- "))) return <ul key={index}>{block.split("\n").map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
    return <p key={index}>{block}</p>;
  })()}</div>)}</div>;
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
    <main>
      <div className="page-shell grid gap-5 py-6 xl:grid-cols-[180px_minmax(0,1fr)_180px]">
        <aside className="hidden xl:block"><div className="sticky top-32"><BlogAdBand rail position="detailLeft" label="Advertisement — left" /></div></aside>
        <div className="min-w-0">
      <section className="overflow-hidden rounded-md border border-border bg-sky-soft">
        {post.featured_image ? <div className="aspect-[16/7] bg-muted"><img src={post.featured_image} alt={post.featured_image_alt || post.title} className="h-full w-full object-cover" /></div> : null}
        <div className="p-5 md:p-8">
          <Link to="/resources/$slug" params={{ slug: "blog" }} className="inline-flex items-center gap-2 text-xs font-bold text-primary"><ArrowLeft className="h-4 w-4" />Back to journal</Link>
          <p className="page-eyebrow mt-5 text-primary">{post.category?.name ?? "Webgram Journal"}{post.subcategory ? ` · ${post.subcategory.name}` : ""}</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-[1.08] text-navy md:text-5xl">{post.title}</h1>
          <p className="mt-5 max-w-[760px] text-base leading-7 text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-muted-foreground"><strong className="text-navy">{post.author_name}</strong><span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{date(post.published_at)}</span><span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{minutes} min read</span></div>
          <div className="mt-5 flex items-center gap-3 text-primary" aria-label="Share article"><Share2 className="h-4 w-4" /><Facebook className="h-5 w-5" /><Linkedin className="h-5 w-5" /><MessageCircle className="h-5 w-5" /></div>
          {post.tags.length ? <div className="mt-5 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-navy">#{tag}</span>)}</div> : null}
        </div>
      </section>
      <article className="mx-auto w-[min(100%,760px)] py-10 md:py-14"><ArticleBody content={post.content} /></article>
      {faqs.length ? <section className="mx-auto mb-10 w-[min(100%,760px)]"><h2 className="text-2xl font-extrabold text-navy">Frequently Asked Questions</h2><div className="mt-4 divide-y rounded-md border border-border bg-card">{faqs.map((faq, index) => <details key={`${index}-${faq.question}`} className="group p-4"><summary className="cursor-pointer font-bold text-navy">{faq.question}</summary><p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p></details>)}</div></section> : null}
      <section className="mx-auto mb-10 w-[min(100%,760px)] rounded-md border border-border bg-sky-soft p-5"><div className="flex items-center gap-4"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-xl font-extrabold text-on-dark">{post.author_name.charAt(0).toUpperCase()}</span><div><p className="text-[10px] font-bold uppercase tracking-widest text-primary">Written by</p><p className="text-lg font-extrabold text-navy">{post.author_name}</p><p className="text-xs text-muted-foreground">Published {date(post.published_at)}{post.category ? ` · ${post.category.name}` : ""}</p></div></div></section>
      <BlogEngagement postId={post.id} title={post.title} />
        </div>
        <aside className="hidden xl:block"><div className="sticky top-32"><BlogAdBand rail position="detailRight" label="Advertisement — right" /></div></aside>
      </div>
      {post.related.length ? <section className="border-t border-border bg-sky-soft py-10"><div className="page-shell"><p className="page-eyebrow text-primary">Keep reading</p><h2 className="mt-2 text-2xl font-extrabold text-navy">Related insights</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{post.related.map((item) => <Link key={item.id} to="/blog/$slug" params={{ slug: item.slug }} className="group rounded-md border border-border bg-card p-5 shadow-card"><span className="text-[10px] text-muted-foreground">{date(item.published_at)}</span><h3 className="mt-2 text-base font-extrabold leading-snug text-navy group-hover:text-primary">{item.title}</h3><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">Read article <ArrowRight className="h-3.5 w-3.5" /></span></Link>)}</div></div></section> : null}
      <BlogAdsConsent />
    </main>
  </div>;
}
