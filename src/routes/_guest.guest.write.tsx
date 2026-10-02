import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileText, ImagePlus, Send } from "lucide-react";

import { BlogAuthorHeader } from "@/components/blog-author-header";
import { LockedNotice } from "@/components/guest-shell";
import { RichArticleEditor } from "@/components/rich-article-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { displayName, errorText, useGuestPostCost, useGuestStatus } from "@/lib/guest";

export const Route = createFileRoute("/_guest/guest/write")({
  head: () => ({ meta: [{ title: "Write a Guest Article | Webgram" }, { name: "robots", content: "noindex" }] }),
  component: Write,
});

const LINK = /(https?:\/\/|www\.|<a[\s>]|\[[^\]]*\]\()/i;
const IMAGE = /!\[[^\]]*\]\(https:\/\/[^\s)]+\)/gi;

function Write() {
  const s = useGuestStatus(); const navigate = useNavigate();
  const postCost = useGuestPostCost();
  const [cats, setCats] = useState<{ id: string; name: string; parent_id: string | null }[]>([]);
  const [f, setF] = useState({ title: "", excerpt: "", content: "", category: "", subcategory: "", tags: "", image: "", author: "", seoTitle: "", seoDescription: "", faqs: Array.from({ length: 5 }, () => ({ question: "", answer: "" })) });
  const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  useEffect(() => { void supabase.from("blog_categories").select("id,name,parent_id").eq("is_active", true).order("display_order").then(({ data }) => setCats(data ?? [])); }, []);
  const readableContent = f.content.replace(IMAGE, " ").replace(/[:*_[\]#>-]/g, " ");
  const words = readableContent.trim() ? readableContent.trim().split(/\s+/).length : 0;
  const hasLink = LINK.test(f.content.replace(IMAGE, "")) || LINK.test(f.excerpt);
  const roots = cats.filter((cat) => !cat.parent_id); const children = cats.filter((cat) => cat.parent_id === f.category);
  const tags = f.tags.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 10);
  const completeFaqs = f.faqs.every((faq) => faq.question.trim().length >= 5 && faq.answer.trim().length >= 5);
  const canSubmit = s.unlocked && !postCost.loading && s.balance >= postCost.cost && words >= 800 && !hasLink && Boolean(f.category && f.subcategory && tags.length && completeFaqs && f.seoTitle.trim().length >= 10 && f.seoDescription.trim().length >= 50);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    const { error: err } = await supabase.rpc("submit_guest_post_v2", { _title: f.title, _excerpt: f.excerpt, _content: f.content, _category_id: f.category, _subcategory_id: f.subcategory, _tags: tags, _faqs: f.faqs, _image: f.image, _author_name: f.author || displayName(s.email), _seo_title: f.seoTitle, _seo_description: f.seoDescription });
    setBusy(false);
    if (err) { setError(errorText(err)); return; }
    await navigate({ to: "/guest" });
  }
  const field = "mt-1 h-10 bg-card";
  return <div className="min-h-screen bg-sky-soft"><BlogAuthorHeader /><main className="mx-auto w-[min(100%-1rem,1540px)] px-2 py-5">
    <div><h1 className="text-2xl font-extrabold text-navy">Create New Post</h1><p className="text-xs text-muted-foreground">Share your knowledge and ideas with our community</p></div>
    {!s.unlocked ? <div className="mt-4"><LockedNotice levels={s.levels} /></div> : null}
    <form onSubmit={submit} className="mt-4 grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-3"><section className="rounded-md border border-border bg-card p-4 shadow-card"><label className="block text-xs font-bold text-navy">Post Title <span className="text-destructive">*</span><Input required minLength={3} maxLength={180} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Enter your blog post title here..." className={field} /></label><p className="mt-1 text-right text-[10px] text-muted-foreground">{f.title.length}/180</p><label className="mt-3 block text-xs font-bold text-navy">Content <span className="text-destructive">*</span><RichArticleEditor value={f.content} onChange={(content) => setF({ ...f, content })} minHeight="min-h-[320px] sm:min-h-[380px]" /></label><div className="mt-2 flex flex-wrap justify-between gap-2 text-[10px] text-muted-foreground"><span>Minimum 800 words. External links are not allowed.</span><span className={words >= 800 ? "font-bold text-success" : "font-bold text-warning"}>Word count: {words}/800</span></div>{hasLink ? <p className="mt-2 text-xs font-bold text-destructive">Remove external links to submit.</p> : null}</section>
      <section className="rounded-md border border-border bg-card p-4 shadow-card"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">?</span><div><h2 className="text-lg font-extrabold text-navy">Frequently Asked Questions (FAQ)</h2><p className="text-xs text-muted-foreground">Five complete FAQs are required.</p></div></div><div className="mt-3 divide-y rounded-md border border-border">{f.faqs.map((faq, index) => <details key={index} open={index === 0} className="p-3"><summary className="cursor-pointer text-xs font-bold text-navy">Question {index + 1}{faq.question ? ` — ${faq.question}` : ""}</summary><div className="mt-3 grid gap-2"><Input required minLength={5} placeholder={`Question ${index + 1}`} value={faq.question} onChange={(e) => setF({ ...f, faqs: f.faqs.map((item, i) => i === index ? { ...item, question: e.target.value } : item) })} /><Textarea required minLength={5} placeholder="Answer" value={faq.answer} onChange={(e) => setF({ ...f, faqs: f.faqs.map((item, i) => i === index ? { ...item, answer: e.target.value } : item) })} /></div></details>)}</div></section></div>
      <aside className="min-w-0 space-y-3"><section className="rounded-md border border-border bg-card p-4 shadow-card"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><h2 className="font-extrabold text-navy">Publish</h2><Button disabled={busy || !canSubmit} size="sm"><Send />{busy ? "Submitting..." : "Submit for Review"}</Button></div><div className="mt-3 divide-y rounded border border-border text-[11px]"><p className="grid grid-cols-[88px_1fr] gap-2 p-2"><strong>Status</strong><span>Draft</span></p><p className="grid grid-cols-[88px_1fr] gap-2 p-2"><strong>Visibility</strong><span>Private until live</span></p><p className="grid grid-cols-[88px_1fr] gap-2 p-2"><strong>Review</strong><span>Editorial review and 30-minute publishing window</span></p><p className="grid grid-cols-[88px_1fr] gap-2 p-2"><strong>Cost</strong><span>{postCost.loading ? "Loading..." : `${postCost.cost} credits`}</span></p></div>{error ? <p role="alert" className="mt-3 text-xs font-semibold text-destructive">{error}</p> : null}{s.unlocked && !postCost.loading && s.balance < postCost.cost ? <p className="mt-2 text-xs text-warning">You need {postCost.cost - s.balance} more credits.</p> : null}</section>
      <section className="rounded-md border border-border bg-card p-4 shadow-card"><h2 className="font-extrabold text-navy">Categories</h2><div className="mt-3 grid grid-cols-2 gap-2"><label className="text-xs font-bold">Select Category<select required value={f.category} onChange={(e) => setF({ ...f, category: e.target.value, subcategory: "" })} className="mt-1 h-9 w-full rounded-md border border-input bg-card px-2 text-xs"><option value="">Choose category</option>{roots.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label className="text-xs font-bold">Sub Category<select required value={f.subcategory} onChange={(e) => setF({ ...f, subcategory: e.target.value })} className="mt-1 h-9 w-full rounded-md border border-input bg-card px-2 text-xs"><option value="">Choose subcategory</option>{children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label></div><label className="mt-3 block text-xs font-bold">Tags<Input required value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} placeholder="Add tags separated by commas" className={field} /></label></section>
      <section className="rounded-md border border-border bg-card p-4 shadow-card"><h2 className="flex items-center gap-2 font-extrabold text-navy"><ImagePlus className="h-4 w-4 text-primary" />Featured Image</h2><div className="mt-3 rounded-md border border-dashed border-primary/40 bg-sky-soft p-5 text-center"><p className="text-xs font-bold text-navy">Add featured image URL</p><p className="mt-1 text-[10px] text-muted-foreground">Recommended size: 1200 × 630 px</p></div><Input type="url" value={f.image} onChange={(e) => setF({ ...f, image: e.target.value })} placeholder="https://..." className={field} /></section>
      <section className="rounded-md border border-border bg-card p-4 shadow-card"><h2 className="font-extrabold text-navy">SEO Settings</h2><label className="mt-3 block text-xs font-bold">Meta Title<Input required minLength={10} maxLength={180} value={f.seoTitle} onChange={(e) => setF({ ...f, seoTitle: e.target.value })} placeholder="Enter SEO title..." className={field} /></label><label className="mt-3 block text-xs font-bold">Meta Description<Textarea required minLength={50} maxLength={320} value={f.seoDescription} onChange={(e) => setF({ ...f, seoDescription: e.target.value })} placeholder="Enter meta description..." className="mt-1 min-h-24" /></label><label className="mt-3 block text-xs font-bold">Author name<Input value={f.author} placeholder={displayName(s.email)} onChange={(e) => setF({ ...f, author: e.target.value })} className={field} /></label></section>
      <section className="rounded-md border border-border bg-card p-4 shadow-card"><h2 className="flex items-center gap-2 font-extrabold text-navy"><FileText className="h-4 w-4 text-primary" />Post Excerpt</h2><Textarea required minLength={10} maxLength={500} value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} placeholder="Write a short description for your post..." className="mt-3 min-h-24" /><p className="mt-1 text-right text-[10px] text-muted-foreground">{f.excerpt.length}/500</p></section></aside>
    </form>
  </main></div>;
}
