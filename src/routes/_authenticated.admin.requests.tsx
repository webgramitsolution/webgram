import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin-blog";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/requests")({
  head: () => ({ meta: [{ title: "Requests & Enquiries | Webgram Admin" }, { name: "robots", content: "noindex" }] }),
  component: RequestsPage,
});

type Tab = "enquiries" | "indexing" | "tickets";
type Enquiry = { id: string; name: string; email: string; phone: string; service: string; message: string; status: string; created_at: string };
type Indexing = { id: string; url: string; status: string; created_at: string; user_id: string };
type Ticket = { id: string; subject: string; message: string; status: string; created_at: string; user_id: string };

const when = (v: string) => new Date(v).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
const statusSets: Record<Tab, string[]> = { enquiries: ["new", "contacted", "closed"], indexing: ["pending", "done", "rejected"], tickets: ["open", "closed"] };
const table = { enquiries: "enquiries", indexing: "indexing_requests", tickets: "support_tickets" } as const;

function RequestsPage() {
  const [tab, setTab] = useState<Tab>("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [indexing, setIndexing] = useState<Indexing[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState("");
  async function load() {
    const [a, b, c] = await Promise.all([
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("indexing_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("support_tickets").select("*").order("created_at", { ascending: false }),
    ]);
    setEnquiries(a.data ?? []); setIndexing(b.data ?? []); setTickets(c.data ?? []);
  }
  useEffect(() => { void load(); }, []);
  async function setStatus(t: Tab, id: string, status: string) {
    setError("");
    const { error: e } = await supabase.from(table[t]).update({ status } as never).eq("id", id);
    if (e) setError(e.message); else await load();
  }
  const counts = { enquiries: enquiries.filter((x) => x.status === "new").length, indexing: indexing.filter((x) => x.status === "pending").length, tickets: tickets.filter((x) => x.status === "open").length };
  const Status = ({ t, id, value }: { t: Tab; id: string; value: string }) => <select aria-label="Status" value={value} onChange={(e) => void setStatus(t, id, e.target.value)} className="h-9 rounded-md border border-input bg-card px-2 text-xs font-bold uppercase text-navy">{statusSets[t].map((s) => <option key={s} value={s}>{s}</option>)}</select>;
  return <AdminShell><main className="page-shell py-8">
    <p className="page-eyebrow text-primary">Review queue</p><h1 className="mt-2 text-3xl font-extrabold text-navy">Requests &amp; Enquiries</h1>
    <div className="mt-5 flex gap-2 overflow-x-auto">{([["enquiries", "Website enquiries"], ["indexing", "Indexing requests"], ["tickets", "Support tickets"]] as const).map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold ${tab === k ? "bg-navy text-on-dark" : "bg-card text-navy"}`}>{l}{counts[k] ? <span className="ml-2 rounded bg-gold px-1.5 text-[10px] text-navy">{counts[k]}</span> : null}</button>)}</div>
    {error ? <p className="mt-3 text-xs font-semibold text-destructive">{error}</p> : null}
    <div className="mt-4 overflow-hidden rounded-md border border-border bg-card shadow-card">
      {tab === "enquiries" && (enquiries.length ? enquiries.map((r) => <div key={r.id} className="grid gap-3 border-b border-border p-4 last:border-0 md:grid-cols-[1fr_auto]"><div className="min-w-0"><p className="font-bold text-navy">{r.name} <span className="font-normal text-muted-foreground">· {r.service || "General"}</span></p><p className="text-xs text-muted-foreground"><a href={`mailto:${r.email}`} className="text-primary">{r.email}</a>{r.phone ? ` · ${r.phone}` : ""} · {when(r.created_at)}</p><p className="mt-2 whitespace-pre-line text-sm">{r.message}</p></div><Status t="enquiries" id={r.id} value={r.status} /></div>) : <Empty />)}
      {tab === "indexing" && (indexing.length ? indexing.map((r) => <div key={r.id} className="grid gap-3 border-b border-border p-4 last:border-0 md:grid-cols-[1fr_auto] md:items-center"><div className="min-w-0"><a href={r.url} target="_blank" rel="noreferrer" className="block truncate font-bold text-primary">{r.url}</a><p className="text-xs text-muted-foreground">{when(r.created_at)} · user {r.user_id.slice(0, 8)}</p></div><Status t="indexing" id={r.id} value={r.status} /></div>) : <Empty />)}
      {tab === "tickets" && (tickets.length ? tickets.map((r) => <div key={r.id} className="grid gap-3 border-b border-border p-4 last:border-0 md:grid-cols-[1fr_auto]"><div className="min-w-0"><p className="font-bold text-navy">{r.subject}</p><p className="text-xs text-muted-foreground">{when(r.created_at)} · user {r.user_id.slice(0, 8)}</p><p className="mt-2 whitespace-pre-line text-sm">{r.message}</p></div><Status t="tickets" id={r.id} value={r.status} /></div>) : <Empty />)}
    </div>
  </main></AdminShell>;
}

function Empty() { return <p className="p-8 text-center text-sm text-muted-foreground">Nothing here yet.</p>; }
