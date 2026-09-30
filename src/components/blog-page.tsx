import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Search } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogAdBand, BlogAdsConsent } from "@/components/blog-ads";

type Category = { id: string; name: string; slug: string; description: string; display_order: number; parent_id: string | null };
type Post = { id: string; title: string; slug: string; excerpt: string; featured_image: string | null; featured_image_alt: string; category_id: string | null; subcategory_id: string | null; tags: string[]; author_name: string; published_at: string | null };

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value)) : "";

function PostImage({ post, className }: { post: Post; className: string }) {
  return post.featured_image ? <img src={post.featured_image} alt={post.featured_image_alt || post.title} className={className} /> : <div className={`${className} bg-primary-soft`} aria-hidden />;
}

export function BlogPage({ categories, posts }: { categories: Category[]; posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [subcategory, setSubcategory] = useState("all"); const [tag, setTag] = useState("all");
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesText = `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase());
    return matchesText && (category === "all" || post.category_id === category) && (subcategory === "all" || post.subcategory_id === subcategory) && (tag === "all" || post.tags.includes(tag));
  }), [posts, query, category, subcategory, tag]);
  const roots = categories.filter((item) => !item.parent_id); const children = categories.filter((item) => item.parent_id === category); const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const grouped = roots.map((item) => ({ category: item, posts: filtered.filter((post) => post.category_id === item.id), children: categories.filter((child) => child.parent_id === item.id) })).filter((group) => group.posts.length);

  return <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <section className="border-b border-border bg-card py-4">
        <div className="page-shell flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link to="/guest-login" className="shrink-0 text-xs font-bold text-primary">Write for us — guest posting →</Link>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Blog categories">
            <Button size="sm" variant={category === "all" ? "default" : "ghost"} onClick={() => setCategory("all")}>All</Button>
            {roots.map((item) => <Button key={item.id} size="sm" variant={category === item.id ? "default" : "ghost"} onClick={() => { setCategory(item.id); setSubcategory("all"); }}>{item.name}</Button>)}
          </div>
        </div>
      </section>

      <div className="page-shell"><BlogAdBand label="Advertisement — blog top" position="top" /></div>

      <section className="border-y border-border bg-sky-soft py-5">
        <div className="page-shell flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles..." className="h-11 bg-card pl-11" /></div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 rounded-md border border-input bg-card px-4 text-sm text-navy">
            <option value="all">All categories</option>{roots.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <select value={subcategory} onChange={(event) => setSubcategory(event.target.value)} disabled={category === "all"} className="h-11 rounded-md border border-input bg-card px-4 text-sm text-navy"><option value="all">All subcategories</option>{children.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
          <select value={tag} onChange={(event) => setTag(event.target.value)} className="h-11 rounded-md border border-input bg-card px-4 text-sm text-navy"><option value="all">All tags</option>{tags.map((item) => <option key={item} value={item}>{item}</option>)}</select>
        </div>
      </section>

      <section className="page-shell py-9">
        {grouped.length ? grouped.map((group, index) => <div key={group.category.id} id={`category-${group.category.slug}`}>
          <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"><span className="hidden h-px bg-border sm:block" /><h2 className="truncate text-center text-2xl font-extrabold text-navy">{group.category.name}</h2><div className="flex items-center justify-end gap-4"><span className="h-px min-w-5 flex-1 bg-border" /><Button type="button" variant="ghost" size="sm" onClick={() => setCategory(group.category.id)} className="shrink-0 text-primary">View more</Button></div></div>
          <div className="mb-5 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{group.children.map((child) => <button key={child.id} onClick={() => { setCategory(group.category.id); setSubcategory(child.id); }} className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-navy hover:text-primary">{child.name}</button>)}</div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {group.posts.map((post) => <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }} className="group min-w-0 overflow-hidden rounded-md border border-border bg-card shadow-card">
            <div className="aspect-[16/9] overflow-hidden"><PostImage post={post} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
            <div className="p-3"><h3 className="line-clamp-3 text-[12px] font-bold leading-[1.35] text-navy group-hover:text-primary">{post.title}</h3><span className="mt-2 flex items-center gap-1.5 text-[9px] text-muted-foreground"><CalendarDays className="h-3 w-3" />{formatDate(post.published_at)}</span></div>
          </Link>)}
          </div>{(index + 1) % 2 === 0 ? <BlogAdBand position="category" label="Advertisement — category band" /> : null}<div className="h-12" /></div>) : <div className="py-16 text-center text-sm text-muted-foreground">No articles match your search.</div>}
      </section>
      <BlogAdsConsent />
    </main>
  </div>;
}
