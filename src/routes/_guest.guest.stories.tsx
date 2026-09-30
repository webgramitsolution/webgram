import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";

import { GuestShell, LockedNotice, Panel } from "@/components/guest-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { CREDIT_COSTS, errorText, useGuestStatus } from "@/lib/guest";

export const Route = createFileRoute("/_guest/guest/stories")({
  head: () => ({ meta: [{ title: "Web Stories | Webgram" }, { name: "robots", content: "noindex" }] }),
  component: Stories,
});

type Slide = { heading: string; text: string; image: string };
type Story = { id: string; title: string; slides: unknown; created_at: string };

function Stories() {
  const s = useGuestStatus();
  const [title, setTitle] = useState(""); const [slides, setSlides] = useState<Slide[]>([{ heading: "", text: "", image: "" }]);
  const [list, setList] = useState<Story[]>([]); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  async function load() { if (!s.userId) return; const { data } = await supabase.from("web_stories").select("id,title,slides,created_at").eq("user_id", s.userId).order("created_at", { ascending: false }); setList(data ?? []); }
  useEffect(() => { void load(); }, [s.userId]);
  const set = (i: number, k: keyof Slide, v: string) => setSlides(slides.map((sl, j) => j === i ? { ...sl, [k]: v } : sl));
  async function save() { setBusy(true); setMsg(""); const { error } = await supabase.rpc("create_web_story", { _title: title, _slides: slides.filter((x) => x.heading.trim()) }); setBusy(false); if (error) { setMsg(errorText(error)); return; } setTitle(""); setSlides([{ heading: "", text: "", image: "" }]); setMsg("Web story created."); await Promise.all([load(), s.refresh()]); }
  return <GuestShell title="Web Stories" balance={s.balance} levels={s.levels}>
    {!s.unlocked ? <div className="mb-4"><LockedNotice levels={s.levels} /></div> : null}
    <Panel><p className="text-sm text-muted-foreground">Build a swipeable story with up to 10 slides. Cost: <strong className="text-navy">{CREDIT_COSTS.story} credits</strong>.</p>
      <Input placeholder="Story title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-4 h-11" />
      <div className="mt-4 grid gap-3 md:grid-cols-2">{slides.map((sl, i) => <div key={i} className="space-y-2 rounded-md border border-border p-3"><div className="flex items-center justify-between text-xs font-bold text-navy">Slide {i + 1}{slides.length > 1 ? <button type="button" onClick={() => setSlides(slides.filter((_, j) => j !== i))} aria-label="Remove slide"><Trash2 className="h-4 w-4 text-destructive" /></button> : null}</div><Input placeholder="Heading" value={sl.heading} onChange={(e) => set(i, "heading", e.target.value)} /><Input placeholder="Text" value={sl.text} onChange={(e) => set(i, "text", e.target.value)} /><Input type="url" placeholder="Image URL" value={sl.image} onChange={(e) => set(i, "image", e.target.value)} /></div>)}</div>
      <div className="mt-4 flex flex-wrap gap-3">{slides.length < 10 ? <Button type="button" variant="outline" onClick={() => setSlides([...slides, { heading: "", text: "", image: "" }])}><Plus />Add slide</Button> : null}<Button disabled={busy || !s.unlocked || title.trim().length < 3 || !slides.some((x) => x.heading.trim())} onClick={save} className="bg-gold font-bold text-navy hover:bg-gold/90">Create story</Button></div>
      {msg ? <p className="mt-3 text-xs font-semibold text-navy">{msg}</p> : null}</Panel>
    <Panel className="mt-4"><h2 className="font-extrabold text-navy">My stories</h2>{list.length ? <ul className="mt-3 divide-y divide-border">{list.map((st) => <li key={st.id} className="flex justify-between py-2 text-sm"><span className="font-semibold">{st.title}</span><span className="text-xs text-muted-foreground">{Array.isArray(st.slides) ? st.slides.length : 0} slides</span></li>)}</ul> : <p className="mt-3 text-sm text-muted-foreground">No stories yet.</p>}</Panel>
  </GuestShell>;
}
