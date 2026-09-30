import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import { SiteHeader } from "@/components/site-header";

type Related = { id: string; title: string; slug: string; excerpt: string; featured_image: string | null; featured_image_alt: string; published_at: string | null };
type Post = { title: string; slug: string; excerpt: string; content: string; featured_image: string | null; featured_image_alt: string; author_name: string; published_at: string | null; category: { name: string; slug: string } | null; related: Related[] };

const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)) : "";

function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).filter(Boolean);
  return <div className="blog-prose">{blocks.map((block, index) => {
    if (block.startsWith("## ")) return <h2 key={index}>{block.slice(3)}</h2>;
    if (block.startsWith("### ")) return <h3 key={index}>{block.slice(4)}</h3>;
    if (block.split("\n").every((line) => line.startsWith("- "))) return <ul key={index}>{block.split("\n").map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
    return <p key={index}>{block}</p>;
  })}</div>;
}

export function BlogDetailPage({ post }: { post: Post }) {
  const minutes = Math.max(2, Math.ceil(post.content.split(/\s+/).length / 200));
  return <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <section className="border-b border-border bg-sky-soft py-10 md:py-14">
        <div className="mx-auto w-[min(100%-2rem,900px)]">
          <Link to="/resources/$slug" params={{ slug: "blog" }} className="inline-flex items-center gap-2 text-xs font-bold text-primary"><ArrowLeft className="h-4 w-4" />Back to journal</Link>
          <p className="page-eyebrow mt-7 text-primary">{post.category?.name ?? "Webgram Journal"}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] text-navy md:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-[760px] text-base leading-7 text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-muted-foreground"><strong className="text-navy">{post.author_name}</strong><span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{date(post.published_at)}</span><span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{minutes} min read</span></div>
        </div>
      </section>
      {post.featured_image ? <div className="mx-auto mt-8 aspect-[16/7] w-[min(100%-2rem,1100px)] overflow-hidden rounded-md bg-muted"><img src={post.featured_image} alt={post.featured_image_alt || post.title} className="h-full w-full object-cover" /></div> : null}
      <article className="mx-auto w-[min(100%-2rem,760px)] py-10 md:py-14"><ArticleBody content={post.content} /></article>
      {post.related.length ? <section className="border-t border-border bg-sky-soft py-10"><div className="page-shell"><p className="page-eyebrow text-primary">Keep reading</p><h2 className="mt-2 text-2xl font-extrabold text-navy">Related insights</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{post.related.map((item) => <Link key={item.id} to="/blog/$slug" params={{ slug: item.slug }} className="group rounded-md border border-border bg-card p-5 shadow-card"><span className="text-[10px] text-muted-foreground">{date(item.published_at)}</span><h3 className="mt-2 text-base font-extrabold leading-snug text-navy group-hover:text-primary">{item.title}</h3><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">Read article <ArrowRight className="h-3.5 w-3.5" /></span></Link>)}</div></div></section> : null}
    </main>
  </div>;
}
