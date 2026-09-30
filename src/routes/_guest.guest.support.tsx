import { FormEvent, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { GuestShell, Panel } from "@/components/guest-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { errorText, useGuestStatus } from "@/lib/guest";

export const Route = createFileRoute("/_guest/guest/support")({
  head: () => ({ meta: [{ title: "Support | Webgram Guest Panel" }, { name: "robots", content: "noindex" }] }),
  component: Support,
});

type Ticket = { id: string; subject: string; status: string; created_at: string };

function Support() {
  const s = useGuestStatus();
  const [subject, setSubject] = useState(""); const [message, setMessage] = useState(""); const [rows, setRows] = useState<Ticket[]>([]); const [msg, setMsg] = useState("");
  async function load() { if (!s.userId) return; const { data } = await supabase.from("support_tickets").select("id,subject,status,created_at").eq("user_id", s.userId).order("created_at", { ascending: false }); setRows(data ?? []); }
  useEffect(() => { void load(); }, [s.userId]);
  async function submit(e: FormEvent) { e.preventDefault(); setMsg(""); const { error } = await supabase.from("support_tickets").insert({ user_id: s.userId, subject, message }); if (error) { setMsg(errorText(error)); return; } setSubject(""); setMessage(""); setMsg("Ticket submitted — our team will reply by email."); await load(); }
  return <GuestShell title="Support" balance={s.balance} levels={s.levels}>
    <Panel><form onSubmit={submit} className="space-y-3"><Input required minLength={3} maxLength={150} placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="h-11" /><Textarea required minLength={5} maxLength={3000} placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-32" /><Button className="bg-gold font-bold text-navy hover:bg-gold/90">Send ticket</Button>{msg ? <p className="text-xs font-semibold text-navy">{msg}</p> : null}</form></Panel>
    <Panel className="mt-4"><h2 className="font-extrabold text-navy">My tickets</h2>{rows.length ? <ul className="mt-3 divide-y divide-border">{rows.map((r) => <li key={r.id} className="flex justify-between py-2 text-sm"><span>{r.subject}</span><span className="text-xs font-bold uppercase text-primary">{r.status}</span></li>)}</ul> : <p className="mt-3 text-sm text-muted-foreground">No tickets yet.</p>}</Panel>
  </GuestShell>;
}
