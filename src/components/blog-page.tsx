import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Search } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = { id: string; name: string; slug: string; description: string; display_order: number };
type Post = { id: string; title: string; slug: string; excerpt: string; featured_image: string | null; featured_image_alt: string; category_id: string | null; author_name: string; published_at: string | null };

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value)) : "";

function PostImage({ post, className }: { post: Post; className: string }) {
  return post.featured_image ? <img src={post.featured_image} alt={post.featured_image_alt || post.title} className={className} /> : <div className={`${className} bg-primary-soft`} aria-hidden />;
}

export function BlogPage({ categories, posts }: { categories: Category[]; posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesText = `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase());
    return matchesText && (category === "all" || post.category_id === category);
  }), [posts, query, category]);
  const [featured, second, third, ...rest] = filtered;

  return <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <section className="border-b border-border bg-card py-5">
        <div className="page-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="page-eyebrow text-primary">Webgram Journal</p>
            <h1 className="mt-1 text-3xl font-extrabold text-navy">Ideas for digital growth</h1>
            <Link to="/guest-login" className="mt-1 inline-block text-xs font-bold text-primary">Write for us — guest posting →</Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Blog categories">
            <Button size="sm" variant={category === "all" ? "default" : "ghost"} onClick={() => setCategory("all")}>All</Button>
            {categories.map((item) => <Button key={item.id} size="sm" variant={category === item.id ? "default" : "ghost"} onClick={() => setCategory(item.id)}>{item.name}</Button>)}
          </div>
        </div>
      </section>

      {featured ? <section className="page-shell py-7">
        <div className="grid min-h-[380px] gap-3 md:grid-cols-[1.55fr_1fr]">
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group relative min-h-[320px] overflow-hidden rounded-md bg-navy md:min-h-0">
            <PostImage post={featured} className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-blog-image-shade" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-on-dark md:p-8">
              <span className="text-[10px] font-bold uppercase text-gold">Latest insight</span>
              <h2 className="mt-2 max-w-[680px] text-2xl font-extrabold leading-tight md:text-4xl">{featured.title}</h2>
              <p className="mt-3 max-w-[620px] text-sm leading-6 text-on-dark/85">{featured.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold">Read article <ArrowRight className="h-4 w-4" /></span>
            </div>
          </Link>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {[second, third].filter((post): post is Post => Boolean(post)).map((post) => <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} className="group grid min-h-[180px] grid-cols-[42%_1fr] overflow-hidden rounded-md border border-border bg-card shadow-card">
              <PostImage post={post} className="h-full min-h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="flex flex-col justify-center p-4">
                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{formatDate(post.published_at)}</span>
                <h3 className="mt-2 text-base font-extrabold leading-snug text-navy group-hover:text-primary">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>)}
          </div>
        </div>
      </section> : null}

      <section className="border-y border-border bg-sky-soft py-5">
        <div className="page-shell flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles..." className="h-11 bg-card pl-11" /></div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 rounded-md border border-input bg-card px-4 text-sm text-navy">
            <option value="all">All categories</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>
      </section>

      <section className="page-shell py-9">
        <div className="mb-6 flex items-end justify-between border-b border-border pb-3"><div><p className="page-eyebrow text-primary">More from Webgram</p><h2 className="mt-1 text-2xl font-extrabold text-navy">Latest articles</h2></div><span className="text-xs text-muted-foreground">{filtered.length} articles</span></div>
        {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(rest.length ? rest : filtered).map((post) => <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} className="group overflow-hidden rounded-md border border-border bg-card shadow-card">
            <div className="aspect-[16/9] overflow-hidden"><PostImage post={post} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
            <div className="p-5"><span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{formatDate(post.published_at)}</span><h3 className="mt-2 text-lg font-extrabold leading-snug text-navy group-hover:text-primary">{post.title}</h3><p className="mt-2 line-clamp-3 text-xs leading-5 text-muted-foreground">{post.excerpt}</p><span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary">Read more <ArrowRight className="h-3.5 w-3.5" /></span></div>
          </Link>)}
        </div> : <div className="py-16 text-center text-sm text-muted-foreground">No articles match your search.</div>}
      </section>
    </main>
  </div>;
}
