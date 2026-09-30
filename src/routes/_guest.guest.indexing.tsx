import { FormEvent, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { GuestShell, LockedNotice, Panel } from "@/components/guest-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { CREDIT_COSTS, errorText, useGuestStatus } from "@/lib/guest";

export const Route = createFileRoute("/_guest/guest/indexing")({
  head: () => ({ meta: [{ title: "Instant Indexing | Webgram" }, { name: "robots", content: "noindex" }] }),
  component: Indexing,
});

type Req = { id: string; url: string; status: string; created_at: string };

function Indexing() {
  const s = useGuestStatus();
  const [url, setUrl] = useState(""); const [rows, setRows] = useState<Req[]>([]); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  async function load() { if (!s.userId) return; const { data } = await supabase.from("indexing_requests").select("id,url,status,created_at").eq("user_id", s.userId).order("created_at", { ascending: false }); setRows(data ?? []); }
  useEffect(() => { void load(); }, [s.userId]);
  async function submit(e: FormEvent) { e.preventDefault(); setBusy(true); setMsg(""); const { error } = await supabase.rpc("request_instant_indexing", { _url: url }); setBusy(false); if (error) { setMsg(errorText(error)); return; } setUrl(""); setMsg("Request submitted."); await Promise.all([load(), s.refresh()]); }
  return <GuestShell title="Instant Indexing" balance={s.balance} levels={s.levels}>
    {!s.unlocked ? <div className="mb-4"><LockedNotice levels={s.levels} /></div> : null}
    <Panel><p className="text-sm text-muted-foreground">Submit a page URL for priority search indexing. Cost: <strong className="text-navy">{CREDIT_COSTS.indexing} credits</strong>.</p>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row"><Input type="url" required placeholder="https://example.com/page" value={url} onChange={(e) => setUrl(e.target.value)} className="h-11" /><Button disabled={busy || !s.unlocked} className="h-11 bg-gold font-bold text-navy hover:bg-gold/90">Submit</Button></form>
      {msg ? <p className="mt-3 text-xs font-semibold text-navy">{msg}</p> : null}</Panel>
    <Panel className="mt-4"><h2 className="font-extrabold text-navy">My requests</h2>{rows.length ? <ul className="mt-3 divide-y divide-border">{rows.map((r) => <li key={r.id} className="flex justify-between gap-3 py-2 text-sm"><span className="truncate">{r.url}</span><span className="shrink-0 text-xs font-bold uppercase text-primary">{r.status}</span></li>)}</ul> : <p className="mt-3 text-sm text-muted-foreground">No requests yet.</p>}</Panel>
  </GuestShell>;
}
