import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MessageSquare, Pin, Share2, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { CREDIT_COSTS, displayName, errorText } from "@/lib/guest";

type Comment = { id: string; author_name: string; body: string; created_at: string };
const platforms = [
  { id: "facebook", label: "Facebook", url: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { id: "instagram", label: "Instagram", url: () => `https://www.instagram.com/` },
  { id: "linkedin", label: "LinkedIn", url: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { id: "pinterest", label: "Pinterest", url: (u: string, t: string) => `https://pinterest.com/pin/create/button/?url=${u}&description=${t}` },
  { id: "tumblr", label: "Tumblr", url: (u: string, t: string) => `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${u}&title=${t}` },
  { id: "x", label: "X", url: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
] as const;
const SHARE_WAIT = 27;

export function BlogShareButtons({ postId, title }: { postId: string; title: string }) {
  const [signedIn, setSignedIn] = useState(false);
  const [clicked, setClicked] = useState<Set<string>>(new Set());
  const [left, setLeft] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => { void supabase.auth.getUser().then(async ({ data }) => {
    if (!data.user) return; setSignedIn(true);
    const [{ data: rows }, { data: done }] = await Promise.all([
      supabase.from("share_clicks").select("platform").eq("post_id", postId),
      supabase.from("engagement_rewards").select("rewarded_at").eq("post_id", postId).eq("kind", "share").maybeSingle(),
    ]);
    setClicked(new Set((rows ?? []).map((r) => r.platform)));
    if (done?.rewarded_at) setMessage(`Share reward already earned (+${CREDIT_COSTS.share})`);
  }); }, [postId]);
  useEffect(() => {
    if (left === null) return;
    if (left <= 0) { setLeft(null); void supabase.rpc("claim_share_bonus", { _post_id: postId }).then(({ data, error }) => setMessage(error ? errorText(error) : data ? `+${CREDIT_COSTS.share} credits added!` : "Share reward already earned")); return; }
    const t = window.setTimeout(() => setLeft((v) => (v ?? 1) - 1), 1000); return () => window.clearTimeout(t);
  }, [left, postId]);
  async function share(platform: (typeof platforms)[number]) {
    const url = encodeURIComponent(window.location.href); const encodedTitle = encodeURIComponent(title);
    if (platform.id === "instagram") void navigator.clipboard?.writeText(window.location.href);
    window.open(platform.url(url, encodedTitle), "_blank", "noopener,noreferrer");
    if (!signedIn) return;
    const { data, error } = await supabase.rpc("record_share_click", { _post_id: postId, _platform: platform.id });
    if (error) { setMessage(errorText(error)); return; }
    const next = new Set(clicked); next.add(platform.id); setClicked(next);
    if ((data ?? next.size) >= platforms.length && !message.includes("earned")) { setLeft(SHARE_WAIT); setMessage(""); }
    else if (platform.id === "instagram") setMessage("Link copied — paste it in Instagram.");
  }
  const icons: Record<string, typeof Facebook> = { facebook: Facebook, instagram: Instagram, linkedin: Linkedin, pinterest: Pin, tumblr: Share2, x: Twitter };
  return <div className="flex flex-wrap items-center justify-end gap-2" aria-label="Share article">
    <span className="mr-1 text-[10px] font-semibold text-muted-foreground">Share:</span>
    {platforms.map((platform) => { const Icon = icons[platform.id] ?? Share2; const done = clicked.has(platform.id); return <Button key={platform.id} type="button" variant="ghost" size="icon" onClick={() => void share(platform)} title={`Share on ${platform.label}`} aria-label={`Share on ${platform.label}`} className={`h-7 w-7 rounded-full text-primary-foreground hover:text-primary-foreground ${done ? "bg-success hover:bg-success/90" : "bg-primary hover:bg-primary/90"}`}><Icon className="h-3.5 w-3.5" /></Button>; })}
    {signedIn ? <span className="w-full text-right text-[10px] font-semibold text-success">{left !== null ? `Credits in ${left}s…` : message || `Share on all 6 (${clicked.size}/6) to earn ${CREDIT_COSTS.share} credits`}</span> : null}
  </div>;
}

export function BlogReadReward({ postId }: { postId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  useEffect(() => { void supabase.auth.getUser().then(async ({ data }) => {
    if (!data.user) return; setSignedIn(true);
    const { data: row } = await supabase.from("engagement_rewards").select("rewarded_at").eq("post_id", postId).eq("kind", "read").maybeSingle();
    if (row?.rewarded_at) setMsg(`Reading reward earned (+${CREDIT_COSTS.read})`);
  }); }, [postId]);
  useEffect(() => {
    if (!signedIn || msg || left !== null || !ref.current) return;
    const obs = new IntersectionObserver((entries) => { if (entries[0]?.isIntersecting) { obs.disconnect(); void supabase.rpc("start_blog_read", { _post_id: postId }).then(() => setLeft(60)); } });
    obs.observe(ref.current); return () => obs.disconnect();
  }, [signedIn, msg, left, postId]);
  useEffect(() => {
    if (left === null) return;
    if (left <= 0) { void supabase.rpc("claim_read_reward", { _post_id: postId }).then(({ data, error }) => { setLeft(null); setMsg(error ? errorText(error) : data ? `+${CREDIT_COSTS.read} credits for reading!` : "Reading reward already earned"); }); return; }
    const t = window.setTimeout(() => setLeft((v) => (v ?? 1) - 1), 1000); return () => window.clearTimeout(t);
  }, [left, postId]);
  if (!signedIn) return <div ref={ref} />;
  return <div ref={ref} className="mb-4 rounded-md border border-border bg-sky-soft p-3 text-center text-xs font-semibold text-navy">{msg || (left !== null ? `Keep reading — ${CREDIT_COSTS.read} credits in ${left}s` : `Scroll to the end and stay 1 minute to earn ${CREDIT_COSTS.read} credits`)}</div>;
}

export function BlogEngagement({ postId }: { postId: string; title: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [body, setBody] = useState(""); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  async function load() { const { data } = await supabase.from("blog_comments").select("id,author_name,body,created_at").eq("post_id", postId).order("created_at"); setComments(data ?? []); }
  useEffect(() => { void load(); void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null)); }, [postId]);

  async function comment(e: FormEvent) { e.preventDefault(); setBusy(true); setMsg(""); const { error } = await supabase.rpc("add_blog_comment", { _post_id: postId, _body: body, _author_name: displayName(email ?? "") }); setBusy(false); if (error) { setMsg(errorText(error)); return; } setBody(""); setMsg(`Comment posted (−${CREDIT_COSTS.comment} credits).`); await load(); }
  return <section className="mx-auto w-full pb-14"><BlogReadReward postId={postId} />
    <div className="rounded-md border border-border bg-card p-4 md:p-5"><h2 className="flex items-center gap-2 text-base font-extrabold text-navy"><MessageSquare className="h-4 w-4" />Leave a Comment <span className="text-xs font-medium text-muted-foreground">({comments.length})</span></h2>
      <ul className="mt-4 space-y-3">{comments.map((c) => <li key={c.id} className="rounded-md border border-border bg-card p-4"><p className="text-xs font-bold text-navy">{c.author_name} <span className="font-normal text-muted-foreground">· {new Date(c.created_at).toLocaleDateString("en-IN")}</span></p><p className="mt-1 whitespace-pre-line text-sm leading-6">{c.body}</p></li>)}</ul>
      {email ? <form onSubmit={comment} className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]"><Textarea required minLength={2} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your comment here..." className="min-h-20 md:col-span-2" /><p className="self-center text-xs text-muted-foreground">Posting uses <strong className="text-navy">{CREDIT_COSTS.comment} credits</strong>.</p><Button disabled={busy} className="bg-navy font-bold text-on-dark hover:bg-navy/90">{busy ? "Posting..." : "Post Comment"}</Button></form>
      : <p className="mt-4 text-sm text-muted-foreground"><Link to="/guest-login" className="font-bold text-primary">Sign in as a guest</Link> to comment and earn credits for sharing.</p>}
      {msg ? <p className="mt-3 text-xs font-semibold text-navy">{msg}</p> : null}
    </div>
  </section>;
}
