import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Beaker, ChevronLeft, ChevronRight, Coins, Film, Lock, RefreshCw, RotateCcw, Trophy, Zap } from "lucide-react";
import { toast } from "sonner";

import { GuestShell, Panel } from "@/components/guest-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { errorText, useGuestStatus } from "@/lib/guest";

export const Route = createFileRoute("/_guest/guest/game")({
  head: () => ({ meta: [{ title: "Water Sort Game | Webgram" }, { name: "description", content: "Play the Webgram guest water-sort puzzle and earn credits." }, { property: "og:title", content: "Water Sort Game | Webgram" }, { property: "og:description", content: "Play the Webgram guest water-sort puzzle and earn credits." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Game,
});

type Tube = { colors: number[] };

const LEVELS = [
  { colors: 3, name: "Level 1 (Easy)" }, { colors: 4, name: "Level 2" },
  { colors: 5, name: "Level 3" }, { colors: 6, name: "Level 4" },
  { colors: 7, name: "Level 5 (Medium)" }, { colors: 8, name: "Level 6" },
  { colors: 9, name: "Level 7" }, { colors: 10, name: "Level 8" },
  { colors: 11, name: "Level 9 (Hard)" }, { colors: 12, name: "Level 10" },
  { colors: 12, name: "Level 11 (Expert)" }, { colors: 12, name: "Level 12" },
  { colors: 12, name: "Level 13" }, { colors: 12, name: "Level 14" },
  { colors: 12, name: "Level 15 (Master)" }, { colors: 12, name: "Level 16" },
  { colors: 12, name: "Level 17" }, { colors: 12, name: "Level 18" },
  { colors: 12, name: "Level 19 (Legend)" }, { colors: 12, name: "Level 20" },
] as const;

const TUBE_CAPACITY = 4;
const LIQUID_CLASSES = [
  "bg-game-liquid-1", "bg-game-liquid-2", "bg-game-liquid-3", "bg-game-liquid-4",
  "bg-game-liquid-5", "bg-game-liquid-6", "bg-game-liquid-7", "bg-game-liquid-8",
  "bg-game-liquid-9", "bg-game-liquid-10", "bg-game-liquid-11", "bg-game-liquid-12",
] as const;

function seededShuffle<T>(items: T[], seed: number) {
  const result = [...items];
  let value = seed + 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    value = (value * 9301 + 49297) % 233280;
    const swapIndex = Math.floor((value / 233280) * (index + 1));
    const current = result[index];
    const swap = result[swapIndex];
    if (current === undefined || swap === undefined) continue;
    result[index] = swap;
    result[swapIndex] = current;
  }
  return result;
}

function makeLevel(levelIndex: number): Tube[] {
  const config = LEVELS[levelIndex] ?? LEVELS[0];
  const pool = Array.from({ length: config.colors }, (_, color) => Array(TUBE_CAPACITY).fill(color)).flat();
  const mixed = seededShuffle(pool, (levelIndex + 1) * 7919);
  const tubes = Array.from({ length: config.colors }, (_, tube) => ({ colors: mixed.slice(tube * TUBE_CAPACITY, (tube + 1) * TUBE_CAPACITY) }));
  return [...tubes, { colors: [] }, { colors: [] }];
}

function isComplete(tubes: Tube[]) {
  return tubes.every((tube) => tube.colors.length === 0 || (tube.colors.length === TUBE_CAPACITY && tube.colors.every((color) => color === tube.colors[0])));
}

function Game() {
  const s = useGuestStatus();
  const startingLevel = Math.min(s.levels, LEVELS.length - 1);
  const [currentLevel, setCurrentLevel] = useState(startingLevel);
  const [tubes, setTubes] = useState<Tube[]>(() => makeLevel(0));
  const [selectedTube, setSelectedTube] = useState<number | null>(null);
  const [history, setHistory] = useState<Tube[][]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [buying, setBuying] = useState(false);

  const resetLevel = useCallback((levelIndex: number) => {
    setTubes(makeLevel(levelIndex));
    setSelectedTube(null);
    setHistory([]);
    setMoves(0);
    setGameWon(false);
  }, []);

  useEffect(() => {
    if (!s.loading) setCurrentLevel(Math.min(s.levels, LEVELS.length - 1));
  }, [s.levels, s.loading]);

  useEffect(() => { resetLevel(currentLevel); }, [currentLevel, resetLevel]);

  const playSound = useCallback((type: "pour" | "win" | "error") => {
    if (!soundEnabled) return;
    try {
      const AudioCtor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtor) return;
      const context = new AudioCtor();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.type = type === "error" ? "sawtooth" : "sine";
      oscillator.frequency.setValueAtTime(type === "win" ? 659 : type === "pour" ? 400 : 150, context.currentTime);
      gain.gain.setValueAtTime(0.12, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
      oscillator.start(); oscillator.stop(context.currentTime + 0.2);
    } catch { /* Sound is optional. */ }
  }, [soundEnabled]);

  async function awardLevel(level: number, moveCount: number) {
    const { error } = await supabase.rpc("complete_game_level", { _level: level });
    if (error) toast.error(errorText(error));
    else toast.success(`Level Complete! +20 Credits earned!`);
    setScore((value) => value + Math.max(20, level * 100 - moveCount * 2));
    await s.refresh();
  }

  function handleTubeClick(index: number) {
    if (gameWon) return;
    const target = tubes[index];
    if (!target) return;
    if (selectedTube === null) {
      if (target.colors.length) setSelectedTube(index);
      return;
    }
    if (selectedTube === index) { setSelectedTube(null); return; }
    const source = tubes[selectedTube];
    if (!source || source.colors.length === 0) { setSelectedTube(null); return; }
    const sourceColor = source.colors[source.colors.length - 1];
    const targetColor = target.colors[target.colors.length - 1];
    if (target.colors.length >= TUBE_CAPACITY || (targetColor !== undefined && targetColor !== sourceColor)) {
      playSound("error"); toast.error(target.colors.length >= TUBE_CAPACITY ? "Tube is full!" : "Colors don't match!"); setSelectedTube(null); return;
    }
    const next = tubes.map((tube) => ({ colors: [...tube.colors] }));
    let poured = 0;
    while (next[selectedTube]?.colors.length && (next[index]?.colors.length ?? TUBE_CAPACITY) < TUBE_CAPACITY) {
      const from = next[selectedTube]; const to = next[index];
      if (!from || !to) break;
      const color = from.colors[from.colors.length - 1];
      const top = to.colors[to.colors.length - 1];
      if (color === undefined || (top !== undefined && color !== top)) break;
      from.colors.pop(); to.colors.push(color); poured += 1;
    }
    setSelectedTube(null);
    if (!poured) return;
    setHistory((entries) => [...entries, tubes.map((tube) => ({ colors: [...tube.colors] }))]);
    setTubes(next); setMoves((value) => value + 1); playSound("pour");
    if (isComplete(next)) {
      setGameWon(true); playSound("win");
      if (currentLevel < s.levels) toast.success("Level Complete! You already earned this reward.");
      else void awardLevel(currentLevel + 1, moves + 1);
    }
  }

  function undo() {
    const previous = history[history.length - 1];
    if (!previous || gameWon) return;
    setTubes(previous); setHistory((entries) => entries.slice(0, -1)); setMoves((value) => Math.max(0, value - 1)); setSelectedTube(null);
  }

  async function buyGlass() {
    if (buying || gameWon) return;
    setBuying(true);
    const { data, error } = await supabase.rpc("buy_game_glass");
    setBuying(false);
    if (error) { toast.error(errorText(error)); return; }
    setTubes((value) => [...value, { colors: [] }]);
    toast.success("Empty glass purchased! +1 tube added");
    await s.refresh();
    if (typeof data === "number") toast.message(`${data} credits remaining`);
  }

  const nextUnlocked = Math.min(s.levels, LEVELS.length - 1);
  return <GuestShell title="Play & Earn" balance={s.balance} levels={s.levels}>
    <div className="space-y-4">
      <Panel className="border-primary/20 bg-primary-soft/35 !p-4 shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-md bg-primary/15"><Trophy className="h-6 w-6 text-primary" /></span><div><h2 className="flex items-center gap-2 text-lg font-extrabold text-navy">Available: {s.balance} Credits <Coins className="h-5 w-5 text-gold" /></h2><p className="text-sm text-muted-foreground">{s.unlocked ? "Use credits for features below!" : `Play ${5 - s.levels} more level(s) to unlock features`}</p></div></div>
          <div className="flex flex-wrap gap-2"><Badge variant={s.unlocked && s.balance >= 10 ? "default" : "secondary"}><Beaker className="mr-1 h-3 w-3" />10 Credits = Glass</Badge><Badge variant={s.unlocked && s.balance >= 100 ? "default" : "secondary"}>{s.unlocked ? <Zap className="mr-1 h-3 w-3" /> : <Lock className="mr-1 h-3 w-3" />}100 Credits = Indexing</Badge><Badge variant={s.unlocked && s.balance >= 200 ? "default" : "secondary"}>{s.unlocked ? <Film className="mr-1 h-3 w-3" /> : <Lock className="mr-1 h-3 w-3" />}200 Credits = Web Story</Badge></div>
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-border pt-4 text-sm"><span className="text-muted-foreground">Earn 20 credits per level completed</span><strong className="text-navy">{s.levels} levels = {s.levels * 20} credits earned</strong></div>
      </Panel>

      <Panel className="!p-4 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-extrabold text-primary">Water Sort Puzzle</h2><div className="flex flex-wrap items-center gap-2">
          {[['Level', currentLevel + 1], ['Moves', moves], ['Score', score]].map(([label, value]) => <div key={label} className="min-w-16 rounded-md bg-muted px-3 py-1.5 text-center"><p className="text-[10px] font-bold uppercase text-muted-foreground">{label}</p><p className="text-lg font-extrabold text-navy">{value}</p></div>)}
          <div className="min-w-20 rounded-md bg-muted px-3 py-1.5 text-center"><p className="text-[10px] font-bold uppercase text-muted-foreground">Credits</p><p className="flex items-center justify-center gap-1 text-lg font-extrabold text-primary">{s.balance}<Coins className="h-4 w-4 text-gold" /></p></div>
          <TooltipProvider><Tooltip><TooltipTrigger asChild><Button type="button" variant="outline" onClick={buyGlass} disabled={buying || gameWon || !s.unlocked || s.balance < 10} className="h-[50px] flex-col gap-0 px-3"><span className="text-[9px] uppercase text-muted-foreground">Empty Glass</span><span className="flex items-center"><Beaker />10<Coins className="text-gold" /></span></Button></TooltipTrigger><TooltipContent>Buy one empty glass for this level</TooltipContent></Tooltip></TooltipProvider>
        </div></div>
      </Panel>

      <Panel className="game-board overflow-hidden !p-3 sm:!p-6">
        {gameWon ? <div className="py-12 text-center"><Trophy className="mx-auto h-14 w-14 text-gold" /><h2 className="mt-3 text-2xl font-extrabold text-primary">Level Complete!</h2><p className="mt-2 text-sm text-muted-foreground">Solved in {moves} moves · {currentLevel < s.levels ? "Reward already collected" : "+20 credits"}</p><div className="mt-5 flex justify-center gap-3"><Button variant="outline" onClick={() => resetLevel(currentLevel)}><RefreshCw />Replay</Button>{currentLevel < LEVELS.length - 1 && currentLevel < s.levels ? <Button onClick={() => setCurrentLevel((value) => value + 1)}>Next Level<ChevronRight /></Button> : null}</div></div> : <div className="flex min-h-[300px] flex-wrap content-center justify-center gap-x-3 gap-y-7 py-5 sm:gap-x-5">
          {tubes.map((tube, index) => <Button key={index} type="button" variant="ghost" aria-label={`Bottle ${index + 1}${selectedTube === index ? ", selected" : ""}`} onClick={() => handleTubeClick(index)} className={`game-tube-button h-[160px] w-[62px] p-0 hover:bg-transparent ${selectedTube === index ? "-translate-y-3 scale-105" : "hover:-translate-y-1"}`}><span className={`game-tube relative block h-[150px] w-[60px] overflow-hidden rounded-b-[30px] rounded-t-lg border-[3px] bg-background/60 ${selectedTube === index ? "border-primary shadow-lg" : "border-navy/85"}`}><span className="absolute inset-x-[2px] bottom-[2px] flex flex-col-reverse">{tube.colors.map((color, segment) => <span key={`${color}-${segment}`} className={`h-8 border-t border-background/20 ${LIQUID_CLASSES[color] ?? LIQUID_CLASSES[0]} ${segment === 0 ? "rounded-b-[25px]" : ""}`} />)}</span></span></Button>)}
        </div>}
      </Panel>

      <div className="flex flex-wrap items-center justify-center gap-2"><Button variant="outline" onClick={() => setCurrentLevel((value) => Math.max(0, value - 1))} disabled={currentLevel === 0}><ChevronLeft />Prev</Button><Select value={String(currentLevel)} onValueChange={(value) => setCurrentLevel(Number(value))}><SelectTrigger className="w-[170px]"><SelectValue /></SelectTrigger><SelectContent>{LEVELS.map((level, index) => <SelectItem key={level.name} value={String(index)} disabled={index > nextUnlocked}>{level.name}</SelectItem>)}</SelectContent></Select><Button variant="outline" onClick={() => setCurrentLevel((value) => Math.min(nextUnlocked, value + 1))} disabled={currentLevel >= nextUnlocked}>Next<ChevronRight /></Button><Button variant="outline" onClick={undo} disabled={!history.length || gameWon}><RotateCcw />Undo</Button><Button variant="outline" onClick={() => resetLevel(currentLevel)}><RefreshCw />Restart</Button><Button variant="ghost" size="icon" onClick={() => setSoundEnabled((value) => !value)} aria-label={soundEnabled ? "Mute game sounds" : "Enable game sounds"} title={soundEnabled ? "Mute game sounds" : "Enable game sounds"}>{soundEnabled ? "🔊" : "🔇"}</Button></div>
    </div>
  </GuestShell>;
}
