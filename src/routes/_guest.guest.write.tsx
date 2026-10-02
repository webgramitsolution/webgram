import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Send } from "lucide-react";

import { GuestShell, LockedNotice, Panel } from "@/components/guest-shell";
import { RichArticleEditor } from "@/components/rich-article-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { CREDIT_COSTS, displayName, errorText, useGuestStatus } from "@/lib/guest";

export const Route = createFileRoute("/_guest/guest/write")({
  head: () => ({ meta: [{ title: "Write a Guest Article | Webgram" }, { name: "robots", content: "noindex" }] }),
  component: Write,
});

const LINK = /(https?:\/\/|www\.|<a[\s>]|\[[^\]]*\]\()/i;
const IMAGE = /!\[[^\]]*\]\(https:\/\/[^\s)]+\)/gi;

function Write() {
  const s = useGuestStatus(); const navigate = useNavigate();
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
  const canSubmit = s.unlocked && s.balance >= CREDIT_COSTS.post && words >= 800 && !hasLink && Boolean(f.category && f.subcategory && tags.length && completeFaqs && f.seoTitle.trim().length >= 10 && f.seoDescription.trim().length >= 50);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    const { error: err } = await supabase.rpc("submit_guest_post_v2", { _title: f.title, _excerpt: f.excerpt, _content: f.content, _category_id: f.category, _subcategory_id: f.subcategory, _tags: tags, _faqs: f.faqs, _image: f.image, _author_name: f.author || displayName(s.email), _seo_title: f.seoTitle, _seo_description: f.seoDescription });
    setBusy(false);
    if (err) { setError(errorText(err)); return; }
    await navigate({ to: "/guest" });
  }
  const field = "mt-2 h-11";
  return <GuestShell title="Write a guest article" balance={s.balance} levels={s.levels}>
    {!s.unlocked ? <div className="mb-4"><LockedNotice levels={s.levels} /></div> : null}
      <form onSubmit={submit} className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <Panel className="space-y-4">
        <label className="block text-xs font-bold text-navy">Title<Input required minLength={3} maxLength={180} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} className={field} /></label>
        <label className="block text-xs font-bold text-navy">Short summary<Textarea required minLength={10} maxLength={500} value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} className="mt-2 min-h-20" /></label>
        <label className="block text-xs font-bold text-navy">Article <span className="font-normal text-muted-foreground">(minimum 800 words, no external links)</span><RichArticleEditor value={f.content} onChange={(content) => setF({ ...f, content })} /></label>
        <div className="flex flex-wrap gap-4 text-xs font-bold"><span className={words >= 800 ? "text-success" : "text-warning"}>{words}/800 words</span>{hasLink ? <span className="text-destructive">Remove external links to submit</span> : null}</div>
        <div><h2 className="font-extrabold text-navy">5 required FAQs</h2>{f.faqs.map((faq, index) => <div key={index} className="mt-3 grid gap-2 rounded border border-border p-3"><Input required minLength={5} placeholder={`Question ${index + 1}`} value={faq.question} onChange={(e) => setF({ ...f, faqs: f.faqs.map((item, i) => i === index ? { ...item, question: e.target.value } : item) })} /><Textarea required minLength={5} placeholder="Answer" value={faq.answer} onChange={(e) => setF({ ...f, faqs: f.faqs.map((item, i) => i === index ? { ...item, answer: e.target.value } : item) })} /></div>)}</div>
      </Panel>
      <aside className="space-y-4"><Panel className="space-y-4">
        <label className="block text-xs font-bold text-navy">Primary category<select required value={f.category} onChange={(e) => setF({ ...f, category: e.target.value, subcategory: "" })} className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 text-sm"><option value="">Choose category</option>{roots.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label className="block text-xs font-bold text-navy">Subcategory<select required value={f.subcategory} onChange={(e) => setF({ ...f, subcategory: e.target.value })} className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 text-sm"><option value="">Choose subcategory</option>{children.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label className="block text-xs font-bold text-navy">Tags (comma separated)<Input required value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} className={field} /></label>
        <label className="block text-xs font-bold text-navy">Meta title<Input required minLength={10} maxLength={180} value={f.seoTitle} onChange={(e) => setF({ ...f, seoTitle: e.target.value })} className={field} /></label>
        <label className="block text-xs font-bold text-navy">Meta description<Textarea required minLength={50} maxLength={320} value={f.seoDescription} onChange={(e) => setF({ ...f, seoDescription: e.target.value })} className="mt-2 min-h-24" /></label>
        <label className="block text-xs font-bold text-navy">Author name<Input value={f.author} placeholder={displayName(s.email)} onChange={(e) => setF({ ...f, author: e.target.value })} className={field} /></label>
        <label className="block text-xs font-bold text-navy">Cover image URL (optional)<Input type="url" value={f.image} onChange={(e) => setF({ ...f, image: e.target.value })} className={field} /></label>
      </Panel><Panel>
        <p className="text-sm text-muted-foreground">Publishing costs <strong className="text-navy">{CREDIT_COSTS.post} credits</strong>. Your article is reviewed and goes live automatically after 30 minutes.</p>
        {error ? <p role="alert" className="mt-3 text-xs font-semibold text-destructive">{error}</p> : null}
        <Button disabled={busy || !canSubmit} className="mt-4 h-11 w-full bg-gold font-bold text-navy hover:bg-gold/90"><Send />{busy ? "Submitting..." : "Submit for review"}</Button>
        {s.unlocked && s.balance < CREDIT_COSTS.post ? <p className="mt-2 text-xs text-warning">You need {CREDIT_COSTS.post - s.balance} more credits.</p> : null}
      </Panel></aside>
    </form>
  </GuestShell>;
}
