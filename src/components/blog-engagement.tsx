import { FormEvent, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageSquare, Share2 } from "lucide-react";

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

export function BlogEngagement({ postId, title }: { postId: string; title: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [body, setBody] = useState(""); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  async function load() { const { data } = await supabase.from("blog_comments").select("id,author_name,body,created_at").eq("post_id", postId).order("created_at"); setComments(data ?? []); }
  useEffect(() => { void load(); void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null)); }, [postId]);

  async function comment(e: FormEvent) { e.preventDefault(); setBusy(true); setMsg(""); const { error } = await supabase.rpc("add_blog_comment", { _post_id: postId, _body: body, _author_name: displayName(email ?? "") }); setBusy(false); if (error) { setMsg(errorText(error)); return; } setBody(""); setMsg(`Comment posted (−${CREDIT_COSTS.comment} credits).`); await load(); }
  async function share(p: (typeof platforms)[number]) {
    const u = encodeURIComponent(window.location.href); const t = encodeURIComponent(title);
    window.open(p.url(u, t), "_blank", "noopener,noreferrer");
    if (!email) return;
    const { data, error } = await supabase.rpc("claim_share_reward", { _post_id: postId, _platform: p.id });
    setMsg(error ? errorText(error) : data ? `+${CREDIT_COSTS.share} credits for sharing on ${p.label}!` : `Already rewarded for ${p.label} today.`);
  }

  return <section className="mx-auto w-[min(100%-2rem,760px)] space-y-8 pb-14">
    <div className="rounded-md border border-border bg-sky-soft p-5"><h2 className="flex items-center gap-2 font-extrabold text-navy"><Share2 className="h-4 w-4" />Share this article</h2><p className="mt-1 text-xs text-muted-foreground">Signed-in guests earn {CREDIT_COSTS.share} credits per platform, once a day.</p><div className="mt-3 flex flex-wrap gap-2">{platforms.map((p) => <Button key={p.id} variant="outline" size="sm" onClick={() => void share(p)}>{p.label}</Button>)}</div></div>
    <div><h2 className="flex items-center gap-2 text-xl font-extrabold text-navy"><MessageSquare className="h-5 w-5" />Comments ({comments.length})</h2>
      <ul className="mt-4 space-y-3">{comments.map((c) => <li key={c.id} className="rounded-md border border-border bg-card p-4"><p className="text-xs font-bold text-navy">{c.author_name} <span className="font-normal text-muted-foreground">· {new Date(c.created_at).toLocaleDateString("en-IN")}</span></p><p className="mt-1 whitespace-pre-line text-sm leading-6">{c.body}</p></li>)}</ul>
      {email ? <form onSubmit={comment} className="mt-4 space-y-3"><Textarea required minLength={2} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write a comment (no links)" className="min-h-24" /><Button disabled={busy} className="bg-gold font-bold text-navy hover:bg-gold/90">Post comment · {CREDIT_COSTS.comment} credits</Button></form>
      : <p className="mt-4 text-sm text-muted-foreground"><Link to="/guest-login" className="font-bold text-primary">Sign in as a guest</Link> to comment and earn credits for sharing.</p>}
      {msg ? <p className="mt-3 text-xs font-semibold text-navy">{msg}</p> : null}
    </div>
  </section>;
}
