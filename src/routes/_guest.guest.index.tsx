import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { GuestShell, LockedNotice, Panel } from "@/components/guest-shell";
import { supabase } from "@/integrations/supabase/client";
import { CREDIT_COSTS, useGuestPostCost, useGuestStatus } from "@/lib/guest";

export const Route = createFileRoute("/_guest/guest/")({
  head: () => ({ meta: [{ title: "My Guest Articles & Credits | Webgram" }, { name: "description", content: "Manage your guest articles and publishing credits." }, { property: "og:title", content: "My Guest Articles & Credits | Webgram" }, { property: "og:description", content: "Manage your guest articles and publishing credits." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

type Row = { id: string; amount: number; reason: string; created_at: string };
type MyPost = { id: string; title: string; slug: string; published_at: string | null };

function Dashboard() {
  const s = useGuestStatus();
  const postCost = useGuestPostCost();
  const [ledger, setLedger] = useState<Row[]>([]);
  const [posts, setPosts] = useState<MyPost[]>([]);
  useEffect(() => { if (!s.userId) return;
    void supabase.from("credit_ledger").select("id,amount,reason,created_at").eq("user_id", s.userId).order("created_at", { ascending: false }).limit(12).then(({ data }) => setLedger(data ?? []));
    void supabase.from("blog_posts").select("id,title,slug,published_at").eq("author_id", s.userId).order("created_at", { ascending: false }).then(({ data }) => setPosts(data ?? []));
  }, [s.userId]);
  const now = Date.now();
  return <GuestShell title="Dashboard" balance={s.balance} levels={s.levels}>
    {!s.unlocked ? <LockedNotice levels={s.levels} /> : null}
    <div className="mt-4 grid gap-4 md:grid-cols-4">{[["Blog post", postCost.cost], ["Comment", CREDIT_COSTS.comment], ["Instant indexing", CREDIT_COSTS.indexing], ["Web story", CREDIT_COSTS.story]].map(([l, c]) => <Panel key={l} className="!p-4"><p className="text-xs text-muted-foreground">{l}</p><p className="mt-1 text-xl font-extrabold text-navy">{c} credits</p></Panel>)}</div>
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <Panel><h2 className="font-extrabold text-navy">My articles</h2>{posts.length ? <ul className="mt-3 divide-y divide-border">{posts.map((p) => { const live = p.published_at && new Date(p.published_at).getTime() <= now; return <li key={p.id} className="flex items-center justify-between gap-3 py-2 text-sm"><span className="font-semibold text-navy">{p.title}</span>{live ? <Link to="/blog/$slug" params={{ slug: p.slug }} className="shrink-0 text-xs font-bold text-primary">Live · View</Link> : <span className="shrink-0 rounded bg-warning-soft px-2 py-1 text-[13px] font-bold text-warning">In review</span>}</li>; })}</ul> : <p className="mt-3 text-sm text-muted-foreground">No articles yet. <Link to="/guest/write" className="font-bold text-primary">Write one</Link></p>}</Panel>
      <Panel><h2 className="font-extrabold text-navy">Credit history</h2>{ledger.length ? <ul className="mt-3 divide-y divide-border">{ledger.map((r) => <li key={r.id} className="flex justify-between py-2 text-sm"><span>{r.reason}</span><span className={`font-bold ${r.amount > 0 ? "text-success" : "text-destructive"}`}>{r.amount > 0 ? "+" : ""}{r.amount}</span></li>)}</ul> : <p className="mt-3 text-sm text-muted-foreground">Play the game to earn your first credits.</p>}</Panel>
    </div>
    <Panel className="mt-4"><h2 className="font-extrabold text-navy">How it works</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground"><li>Game rewards: levels 1–3 give 20 credits, then rewards grow — level 7 gives 150, level 8 gives 200, and +50 for every level after.</li><li>Credits can be spent after completing 5 levels.</li><li>Articles need 400+ words and may include one external URL. They go live automatically 30 minutes after review starts.</li><li>Read a full article for 1 minute after scrolling to the end to earn 20 credits. Share an article on all 6 social platforms to earn 30 credits.</li></ul></Panel>
  </GuestShell>;
}
