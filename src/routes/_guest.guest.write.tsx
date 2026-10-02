import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronDown, FileText, FolderOpen, ImagePlus, Search, Send } from "lucide-react";

import { BlogAuthorHeader } from "@/components/blog-author-header";
import { CardTitle, FormPageTitle, MetaRow, cardClass } from "@/components/blog-form-ui";
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
  const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [saved, setSaved] = useState<Date | null>(null);
  useEffect(() => { try { const d = localStorage.getItem("guest-draft"); if (d) setF((cur) => ({ ...cur, ...JSON.parse(d) })); } catch { /* ignore bad draft */ } }, []);
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
    localStorage.removeItem("guest-draft");
    await navigate({ to: "/guest" });
  }
  const field = "mt-2 h-10 bg-card";
  const [faqQuery, setFaqQuery] = useState("");
  return <div className="min-h-screen bg-sky-soft"><BlogAuthorHeader /><main className="mx-auto w-[min(100%-1rem,1540px)] px-2 py-5">
    <FormPageTitle title="Create New Post" />
    {!s.unlocked ? <div className="mt-4"><LockedNotice levels={s.levels} /></div> : null}
    <form onSubmit={submit} className="mt-4 grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_420px]">
      <div className="min-w-0 space-y-4">
        <section className={cardClass}>
          <label className="block text-sm font-bold text-navy">Post Title <span className="text-destructive">*</span><Input required minLength={3} maxLength={180} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Enter your blog post title here..." className={field} /></label>
          <p className="mt-1 text-right text-xs text-muted-foreground">{f.title.length}/180</p>
          <p className="text-sm font-bold text-navy">Content <span className="text-destructive">*</span></p>
          <RichArticleEditor value={f.content} onChange={(content) => setF({ ...f, content })} />
          <p className={`mt-3 text-xs font-semibold ${words >= 800 ? "text-success" : "text-warning"}`}>Minimum 800 words ({words}/800). External links are not allowed.</p>
          {hasLink ? <p className="mt-1 text-xs font-bold text-destructive">Remove external links to submit.</p> : null}
        </section>
        <section className={cardClass}>
          <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">?</span><div><h2 className="text-lg font-extrabold text-navy">Frequently Asked Questions (FAQ)</h2><p className="text-xs text-muted-foreground">Add five complete questions and answers for readers</p></div></div>
          <label className="relative w-full sm:w-56"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={faqQuery} onChange={(e) => setFaqQuery(e.target.value)} placeholder="Search questions..." className="h-9 pl-9" /></label></div>
          <div className="mt-3 divide-y divide-border rounded-md border border-border">{f.faqs.map((faq, index) => (!faqQuery || faq.question.toLowerCase().includes(faqQuery.toLowerCase())) ? <details key={index} open={index === 0} className="group px-4 py-2.5"><summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-navy">{faq.question || `Question ${index + 1}`}<ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary><div className="mt-3 grid gap-2"><Input required minLength={5} placeholder={`Question ${index + 1}`} value={faq.question} onChange={(e) => setF({ ...f, faqs: f.faqs.map((item, i) => i === index ? { ...item, question: e.target.value } : item) })} /><Textarea required minLength={5} placeholder="Answer" value={faq.answer} onChange={(e) => setF({ ...f, faqs: f.faqs.map((item, i) => i === index ? { ...item, answer: e.target.value } : item) })} /></div></details> : null)}</div>
        </section>
      </div>
      <aside className="min-w-0 space-y-4">
        <section className={cardClass}><div className="flex flex-wrap items-center justify-between gap-2"><CardTitle icon={Send}>Publish</CardTitle><div className="flex gap-2"><Button type="button" variant="outline" size="sm" onClick={() => { localStorage.setItem("guest-draft", JSON.stringify(f)); setSaved(new Date()); }}>Save Draft</Button><Button disabled={busy || !canSubmit} size="sm">{busy ? "Submitting..." : "Submit for Review"}</Button></div></div>
          <div className="mt-4 rounded border border-border"><MetaRow label="Status"><span className="rounded bg-muted px-2 py-0.5 font-semibold">Draft</span></MetaRow><MetaRow label="Visibility">Private (Only admin can see)</MetaRow><MetaRow label="Review">Post will be reviewed by our editorial team</MetaRow><MetaRow label="Cost">{postCost.loading ? "Loading..." : `${postCost.cost} credits (balance ${s.balance})`}</MetaRow><MetaRow label="Last Saved">{saved ? saved.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Not saved yet"}</MetaRow></div>
          {error ? <p role="alert" className="mt-3 text-xs font-semibold text-destructive">{error}</p> : null}{s.unlocked && !postCost.loading && s.balance < postCost.cost ? <p className="mt-2 text-xs text-warning">You need {postCost.cost - s.balance} more credits.</p> : null}</section>
        <section className={cardClass}><CardTitle icon={FolderOpen}>Categories</CardTitle><div className="mt-3 grid grid-cols-2 gap-3"><label className="text-sm font-semibold text-navy">Select Category <span className="text-destructive">*</span><select required value={f.category} onChange={(e) => setF({ ...f, category: e.target.value, subcategory: "" })} className="mt-2 h-10 w-full rounded-md border border-input bg-card px-2 text-xs"><option value="">Choose a category</option>{roots.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label className="text-sm font-semibold text-navy">Sub Category<select required value={f.subcategory} onChange={(e) => setF({ ...f, subcategory: e.target.value })} className="mt-2 h-10 w-full rounded-md border border-input bg-card px-2 text-xs"><option value="">Choose a sub category</option>{children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label></div><label className="mt-3 block text-sm font-semibold text-navy">Tags<Input required value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} placeholder="Add tags separated by commas" className={field} /></label><p className="mt-1 text-xs text-muted-foreground">Use relevant tags to get more visibility</p></section>
        <section className={cardClass}><CardTitle icon={ImagePlus}>Feature Image</CardTitle><div className="mt-3 grid place-items-center rounded-md border border-dashed border-input p-4 text-center">{/^https:\/\//i.test(f.image) ? <img src={f.image} alt="Featured preview" className="max-h-28 rounded object-contain" /> : <ImagePlus className="h-8 w-8 text-navy" />}<p className="mt-1 text-xs font-semibold text-navy">Image URL only</p><p className="text-[10px] text-muted-foreground">Paste an https:// image link · Recommended 1200 × 630 px</p></div><div className="mt-3 flex gap-2"><Input type="url" inputMode="url" pattern="https://.+" title="Only https:// image URLs are accepted" value={f.image} onChange={(e) => setF({ ...f, image: e.target.value.trim() })} placeholder="https://example.com/image.jpg" className={field} />{f.image ? <Button type="button" variant="outline" size="sm" className="h-10" onClick={() => setF({ ...f, image: "" })}>Remove</Button> : null}</div>{f.image && !/^https:\/\//i.test(f.image) ? <p className="mt-1 text-[11px] font-semibold text-destructive">Only https:// image URLs are accepted.</p> : null}</section>
        <section className={cardClass}><CardTitle icon={Search}>SEO Settings</CardTitle><div className="mt-3 grid gap-3">
          <label className="grid gap-1 text-sm font-semibold text-navy sm:grid-cols-[110px_1fr]">Meta Title<span><Input required minLength={10} maxLength={180} value={f.seoTitle} onChange={(e) => setF({ ...f, seoTitle: e.target.value })} placeholder="Enter SEO title..." className="h-9" /><span className="block text-right text-xs font-normal text-muted-foreground">{f.seoTitle.length}/60</span></span></label>
          <label className="grid gap-1 text-sm font-semibold text-navy sm:grid-cols-[110px_1fr]">Meta Description<span><Textarea required minLength={50} maxLength={320} value={f.seoDescription} onChange={(e) => setF({ ...f, seoDescription: e.target.value })} placeholder="Enter meta description..." className="min-h-20" /><span className="block text-right text-xs font-normal text-muted-foreground">{f.seoDescription.length}/160</span></span></label>
          <label className="grid gap-1 text-sm font-semibold text-navy sm:grid-cols-[110px_1fr]">Author Name<Input value={f.author} placeholder={displayName(s.email)} onChange={(e) => setF({ ...f, author: e.target.value })} className="h-9" /></label>
        </div></section>
        <section className={cardClass}><label className="grid gap-2 sm:grid-cols-[110px_1fr]"><span className="flex items-center gap-2 text-sm font-extrabold text-navy"><FileText className="h-4 w-4 text-primary" />Post Excerpt</span><span><Textarea required minLength={10} maxLength={500} value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} placeholder="Write a short description for your post..." className="min-h-20" /><span className="block text-right text-xs text-muted-foreground">{f.excerpt.length}/500</span></span></label><p className="mt-1 text-xs text-muted-foreground">This will be used in blog listing and social sharing.</p></section>
      </aside>
    </form>
  </main></div>;
}
