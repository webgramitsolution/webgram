import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Trophy } from "lucide-react";

import { GuestShell, Panel } from "@/components/guest-shell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { errorText, useGuestStatus } from "@/lib/guest";

export const Route = createFileRoute("/_guest/guest/game")({
  head: () => ({ meta: [{ title: "Water Fill Game | Webgram" }, { name: "robots", content: "noindex" }] }),
  component: Game,
});

// Level config: target line and tolerance band shrink, pour speed grows.
function levelConfig(level: number) {
  const targets = [55, 70, 40, 80, 62, 35, 75, 50, 85, 66];
  return { target: targets[level - 1] ?? 60, band: Math.max(3, 12 - level), speed: 18 + level * 5 };
}

function Game() {
  const s = useGuestStatus();
  const level = Math.min(s.levels + 1, 10);
  const done = s.levels >= 10;
  const cfg = levelConfig(level);
  const [fill, setFill] = useState(0);
  const [pouring, setPouring] = useState(false);
  const [result, setResult] = useState<"" | "win" | "lose">("");
  const [msg, setMsg] = useState("");
  const raf = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => {
    if (!pouring) return;
    const step = (t: number) => {
      const dt = last.current ? (t - last.current) / 1000 : 0; last.current = t;
      setFill((f) => { const n = Math.min(100, f + cfg.speed * dt); if (n >= 100) setPouring(false); return n; });
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); last.current = 0; };
  }, [pouring, cfg.speed]);

  async function stop() {
    if (!pouring) return; setPouring(false);
    const ok = Math.abs(fill - cfg.target) <= cfg.band;
    setResult(ok ? "win" : "lose");
    if (ok) { const { error } = await supabase.rpc("complete_game_level", { _level: level }); setMsg(error ? errorText(error) : "+20 credits added!"); await s.refresh(); }
  }
  function reset() { setFill(0); setResult(""); setMsg(""); }

  return <GuestShell title="Play & Earn" balance={s.balance} levels={s.levels}>
    <Panel>
      {done ? <div className="py-10 text-center"><Trophy className="mx-auto h-12 w-12 text-gold" /><h2 className="mt-3 text-2xl font-extrabold text-navy">All 10 levels complete!</h2><p className="mt-2 text-sm text-muted-foreground">You earned the full 200 game credits.</p></div> : <div className="grid items-center gap-8 md:grid-cols-[1fr_260px]">
        <div><p className="page-eyebrow text-primary">Level {level} of 10</p><h2 className="mt-2 text-2xl font-extrabold text-navy">Fill the glass to the gold line</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Press and hold <strong>Pour</strong>, release when the water reaches the gold band. Each level is faster with a thinner band. Win = 20 credits.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {result ? <Button onClick={reset} className="h-12 bg-gold px-8 font-bold text-navy hover:bg-gold/90">{result === "win" ? "Next level" : "Try again"}</Button>
            : <Button onPointerDown={() => { if (fill === 0) setPouring(true); }} onPointerUp={stop} onPointerLeave={stop} className="h-12 select-none px-8 font-bold"><Droplets />Hold to pour</Button>}
          </div>
          {result ? <p className={`mt-4 text-sm font-bold ${result === "win" ? "text-success" : "text-destructive"}`}>{result === "win" ? `Perfect! ${msg}` : `Missed — you filled ${Math.round(fill)}%, target was ${cfg.target}%.`}</p> : null}
          <div className="mt-6 flex gap-1.5">{Array.from({ length: 10 }, (_, i) => <span key={i} className={`h-2 flex-1 rounded ${i < s.levels ? "bg-success" : i === s.levels ? "bg-gold" : "bg-muted"}`} />)}</div>
        </div>
        <div className="relative mx-auto h-[300px] w-[180px] overflow-hidden rounded-b-[40px] rounded-t-md border-4 border-navy/80 bg-card">
          <div className="absolute inset-x-0 bottom-0 bg-primary/70 transition-[height] duration-75" style={{ height: `${fill}%` }} />
          <div className="absolute inset-x-0 border-y-2 border-gold bg-gold/25" style={{ bottom: `${cfg.target - cfg.band}%`, height: `${cfg.band * 2}%` }} />
          <span className="absolute right-2 top-2 text-xs font-bold text-navy">{Math.round(fill)}%</span>
        </div>
      </div>}
    </Panel>
  </GuestShell>;
}
