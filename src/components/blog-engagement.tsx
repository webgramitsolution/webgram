import { FormEvent, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, MessageSquare, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { CREDIT_COSTS, displayName, errorText } from "@/lib/guest";

type Comment = { id: string; author_name: string; body: string; created_at: string };
const platforms = [
  { id: "facebook", label: "Facebook", url: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { id: "x", label: "X", url: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  { id: "linkedin", label: "LinkedIn", url: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { id: "whatsapp", label: "WhatsApp", url: (u: string, t: string) => `https://wa.me/?text=${t}%20${u}` },
] as const;

export function BlogShareButtons({ postId, title }: { postId: string; title: string }) {
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => { void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null)); }, []);
  async function share(platform: (typeof platforms)[number]) {
    const url = encodeURIComponent(window.location.href); const encodedTitle = encodeURIComponent(title);
    window.open(platform.url(url, encodedTitle), "_blank", "noopener,noreferrer");
    if (!email) return;
    const { data, error } = await supabase.rpc("claim_share_reward", { _post_id: postId, _platform: platform.id });
    setMessage(error ? errorText(error) : data ? `+${CREDIT_COSTS.share} credits` : "Already rewarded today");
  }
  const icons = { facebook: Facebook, x: Share2, linkedin: Linkedin, whatsapp: MessageSquare };
  return <div className="flex flex-wrap items-center justify-end gap-2" aria-label="Share article">
    <span className="mr-1 text-[10px] font-semibold text-muted-foreground">Share:</span>
    {platforms.map((platform) => { const Icon = icons[platform.id]; return <Button key={platform.id} type="button" variant="ghost" size="icon" onClick={() => void share(platform)} title={`Share on ${platform.label}`} aria-label={`Share on ${platform.label}`} className="h-7 w-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"><Icon className="h-3.5 w-3.5" /></Button>; })}
    {message ? <span className="w-full text-right text-[10px] font-semibold text-success">{message}</span> : null}
  </div>;
}

export function BlogEngagement({ postId }: { postId: string; title: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [body, setBody] = useState(""); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  async function load() { const { data } = await supabase.from("blog_comments").select("id,author_name,body,created_at").eq("post_id", postId).order("created_at"); setComments(data ?? []); }
  useEffect(() => { void load(); void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null)); }, [postId]);

  async function comment(e: FormEvent) { e.preventDefault(); setBusy(true); setMsg(""); const { error } = await supabase.rpc("add_blog_comment", { _post_id: postId, _body: body, _author_name: displayName(email ?? "") }); setBusy(false); if (error) { setMsg(errorText(error)); return; } setBody(""); setMsg(`Comment posted (−${CREDIT_COSTS.comment} credits).`); await load(); }
  return <section className="mx-auto w-full pb-14">
    <div className="rounded-md border border-border bg-card p-4 md:p-5"><h2 className="flex items-center gap-2 text-base font-extrabold text-navy"><MessageSquare className="h-4 w-4" />Leave a Comment <span className="text-xs font-medium text-muted-foreground">({comments.length})</span></h2>
      <ul className="mt-4 space-y-3">{comments.map((c) => <li key={c.id} className="rounded-md border border-border bg-card p-4"><p className="text-xs font-bold text-navy">{c.author_name} <span className="font-normal text-muted-foreground">· {new Date(c.created_at).toLocaleDateString("en-IN")}</span></p><p className="mt-1 whitespace-pre-line text-sm leading-6">{c.body}</p></li>)}</ul>
      {email ? <form onSubmit={comment} className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]"><Textarea required minLength={2} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your comment here..." className="min-h-20 md:col-span-2" /><p className="self-center text-xs text-muted-foreground">Posting uses <strong className="text-navy">{CREDIT_COSTS.comment} credits</strong>.</p><Button disabled={busy} className="bg-navy font-bold text-on-dark hover:bg-navy/90">{busy ? "Posting..." : "Post Comment"}</Button></form>
      : <p className="mt-4 text-sm text-muted-foreground"><Link to="/guest-login" className="font-bold text-primary">Sign in as a guest</Link> to comment and earn credits for sharing.</p>}
      {msg ? <p className="mt-3 text-xs font-semibold text-navy">{msg}</p> : null}
    </div>
  </section>;
}
