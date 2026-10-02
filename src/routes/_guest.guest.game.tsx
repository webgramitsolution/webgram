import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Beaker, ChevronLeft, ChevronRight, Coins, RefreshCw, RotateCcw, Trophy, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

import { BlogAdBand, BlogAdsConsent } from "@/components/blog-ads";
import { GuestShell } from "@/components/guest-shell";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { errorText, gameCreditsEarned, gameLevelReward, useGuestStatus } from "@/lib/guest";

export const Route = createFileRoute("/_guest/guest/game")({
  head: () => ({ meta: [{ title: "Water Sort Game | Webgram" }, { name: "description", content: "Play the Webgram guest water-sort puzzle and earn credits." }, { property: "og:title", content: "Water Sort Game | Webgram" }, { property: "og:description", content: "Play the Webgram guest water-sort puzzle and earn credits." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: Game,
});

type Tube = { colors: number[] };
const LEVELS = [
  { colors: 3, name: "Level 1 (Easy)" }, { colors: 3, name: "Level 2" }, { colors: 4, name: "Level 3" },
  { colors: 4, name: "Level 4" }, { colors: 5, name: "Level 5" }, { colors: 5, name: "Level 6" },
  { colors: 6, name: "Level 7" }, { colors: 6, name: "Level 8" }, { colors: 7, name: "Level 9" },
  { colors: 7, name: "Level 10" }, { colors: 8, name: "Level 11" }, { colors: 8, name: "Level 12" },
  { colors: 9, name: "Level 13" }, { colors: 9, name: "Level 14" }, { colors: 10, name: "Level 15" },
  { colors: 10, name: "Level 16" }, { colors: 11, name: "Level 17" }, { colors: 11, name: "Level 18" },
  { colors: 12, name: "Level 19" }, { colors: 12, name: "Level 20 (Master)" },
] as const;
const TUBE_CAPACITY = 4;
const LIQUID_CLASSES = ["bg-game-liquid-1", "bg-game-liquid-2", "bg-game-liquid-3", "bg-game-liquid-4", "bg-game-liquid-5", "bg-game-liquid-6", "bg-game-liquid-7", "bg-game-liquid-8", "bg-game-liquid-9", "bg-game-liquid-10", "bg-game-liquid-11", "bg-game-liquid-12"] as const;

function randomSequence(seed: number) {
  let value = seed + 1;
  return () => { value = (value * 9301 + 49297) % 233280; return value / 233280; };
}

// Every scramble step records a legal move in reverse, guaranteeing a path back to the solved board.
function makeLevel(levelIndex: number): Tube[] {
  const config = LEVELS[levelIndex] ?? LEVELS[0];
  const tubes: Tube[] = Array.from({ length: config.colors }, (_, color) => ({ colors: Array(TUBE_CAPACITY).fill(color) }));
  tubes.push({ colors: [] }, { colors: [] });
  const random = randomSequence((levelIndex + 1) * 7919);
  let previousSource = -1;
  let previousTarget = -1;
  for (let step = 0; step < 34 + levelIndex * 3; step += 1) {
    const candidates: Array<[number, number]> = [];
    for (let source = 0; source < tubes.length; source += 1) {
      const from = tubes[source];
      if (!from?.colors.length) continue;
      const color = from.colors[from.colors.length - 1];
      const remainingTop = from.colors[from.colors.length - 2];
      if (remainingTop !== undefined && remainingTop !== color) continue;
      for (let target = 0; target < tubes.length; target += 1) {
        const to = tubes[target];
        if (!to || source === target || to.colors.length >= TUBE_CAPACITY) continue;
        if (source === previousTarget && target === previousSource) continue;
        candidates.push([source, target]);
      }
    }
    const choice = candidates[Math.floor(random() * candidates.length)];
    if (!choice) break;
    const [source, target] = choice;
    const color = tubes[source]?.colors.pop();
    if (color === undefined) continue;
    tubes[target]?.colors.push(color);
    previousSource = source;
    previousTarget = target;
  }
  return tubes.map((tube) => ({ colors: [...tube.colors] }));
}

function isComplete(tubes: Tube[]) {
  return tubes.every((tube) => tube.colors.length === 0 || (tube.colors.length === TUBE_CAPACITY && tube.colors.every((color) => color === tube.colors[0])));
}

function Game() {
  const status = useGuestStatus();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [tubes, setTubes] = useState<Tube[]>(() => makeLevel(0));
  const [selectedTube, setSelectedTube] = useState<number | null>(null);
  const [history, setHistory] = useState<Tube[][]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [winAdDismissed, setWinAdDismissed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [buying, setBuying] = useState(false);

  const resetLevel = useCallback((levelIndex: number) => {
    setTubes(makeLevel(levelIndex)); setSelectedTube(null); setHistory([]); setMoves(0); setGameWon(false); setWinAdDismissed(false);
  }, []);

  useEffect(() => { if (!status.loading) setCurrentLevel(Math.min(status.levels, LEVELS.length - 1)); }, [status.levels, status.loading]);
  useEffect(() => { resetLevel(currentLevel); }, [currentLevel, resetLevel]);

  const playSound = useCallback((type: "pour" | "win" | "error") => {
    if (!soundEnabled) return;
    try {
      const AudioCtor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtor) return;
      const context = new AudioCtor(); const oscillator = context.createOscillator(); const gain = context.createGain();
      oscillator.connect(gain); gain.connect(context.destination); oscillator.type = type === "error" ? "sawtooth" : "sine";
      oscillator.frequency.setValueAtTime(type === "win" ? 659 : type === "pour" ? 400 : 150, context.currentTime);
      gain.gain.setValueAtTime(0.1, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
      oscillator.start(); oscillator.stop(context.currentTime + 0.2);
    } catch { /* Sound is optional. */ }
  }, [soundEnabled]);

  async function awardLevel(level: number) {
    const reward = gameLevelReward(level);
    const { error } = await supabase.rpc("complete_game_level", { _level: level });
    if (error) toast.error(errorText(error)); else toast.success(`Level complete! +${reward} credits`);
    await status.refresh();
  }

  function handleTubeClick(index: number) {
    if (gameWon) return;
    const target = tubes[index];
    if (!target) return;
    if (selectedTube === null) { if (target.colors.length) setSelectedTube(index); return; }
    if (selectedTube === index) { setSelectedTube(null); return; }
    const source = tubes[selectedTube];
    if (!source?.colors.length) { setSelectedTube(null); return; }
    const sourceColor = source.colors[source.colors.length - 1]; const targetColor = target.colors[target.colors.length - 1];
    if (target.colors.length >= TUBE_CAPACITY || (targetColor !== undefined && targetColor !== sourceColor)) {
      playSound("error"); toast.error(target.colors.length >= TUBE_CAPACITY ? "Bottle is full" : "Colors must match"); setSelectedTube(null); return;
    }
    const next = tubes.map((tube) => ({ colors: [...tube.colors] })); let poured = 0;
    while (next[selectedTube]?.colors.length && (next[index]?.colors.length ?? TUBE_CAPACITY) < TUBE_CAPACITY) {
      const from = next[selectedTube]; const to = next[index]; if (!from || !to) break;
      const color = from.colors[from.colors.length - 1]; const top = to.colors[to.colors.length - 1];
      if (color === undefined || (top !== undefined && color !== top)) break;
      from.colors.pop(); to.colors.push(color); poured += 1;
    }
    setSelectedTube(null); if (!poured) return;
    setHistory((entries) => [...entries, tubes.map((tube) => ({ colors: [...tube.colors] }))]); setTubes(next); setMoves((value) => value + 1); playSound("pour");
    if (isComplete(next)) { setGameWon(true); playSound("win"); if (currentLevel < status.levels) toast.success("Level complete — reward already collected"); else void awardLevel(currentLevel + 1); }
  }

  function undo() {
    const previous = history[history.length - 1]; if (!previous || gameWon) return;
    setTubes(previous); setHistory((entries) => entries.slice(0, -1)); setMoves((value) => Math.max(0, value - 1)); setSelectedTube(null);
  }

  async function buyGlass() {
    if (buying || gameWon) return; setBuying(true);
    const { data, error } = await supabase.rpc("buy_game_glass"); setBuying(false);
    if (error) { toast.error(errorText(error)); return; }
    setTubes((value) => [...value, { colors: [] }]); toast.success("Empty glass added"); await status.refresh();
    if (typeof data === "number") toast.message(`${data} credits remaining`);
  }

  const nextUnlocked = Math.min(status.levels, LEVELS.length - 1);
  const reward = gameLevelReward(currentLevel + 1);
  const rightRail = <div><p className="pb-3 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Advertisement</p><BlogAdBand rail position="detailRight" label="Game advertisement" /></div>;

  return <><GuestShell title="Water Sort Puzzle" balance={status.balance} levels={status.levels} rightRail={rightRail}>
    <div className="overflow-hidden rounded-md border border-border bg-card shadow-card">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-3 sm:p-5">
        <div className="min-w-0"><h2 className="truncate text-xl font-extrabold text-primary sm:text-3xl">Water Sort Puzzle</h2><p className="mt-1 text-xs text-muted-foreground">Level reward: {reward} credits</p></div>
        <div className="flex shrink-0 gap-1.5 sm:gap-2">{[["Level", currentLevel + 1], ["Moves", moves], ["Credits", status.balance]].map(([label, value]) => <div key={label} className="min-w-14 rounded-md bg-sky-soft px-2 py-1.5 text-center sm:min-w-20 sm:px-3"><p className="text-[8px] font-bold uppercase text-muted-foreground sm:text-[10px]">{label}</p><p className="flex items-center justify-center gap-1 text-base font-extrabold text-navy sm:text-lg">{value}{label === "Credits" ? <Coins className="h-3.5 w-3.5 text-gold" /> : null}</p></div>)}</div>
      </header>

      <section className={`game-board game-scene-${currentLevel + 1} min-h-[420px] overflow-hidden p-3 sm:p-5`}>
        {!gameWon ? <div className="game-stage flex min-h-[380px] flex-wrap content-center justify-center gap-x-2 gap-y-7 pb-14 pt-6 sm:gap-x-4">
          {tubes.map((tube, index) => <Button key={index} type="button" variant="ghost" aria-label={`Bottle ${index + 1}${selectedTube === index ? ", selected" : ""}`} onClick={() => handleTubeClick(index)} className={`game-tube-button h-[150px] w-[54px] p-0 hover:bg-transparent sm:h-[170px] sm:w-[62px] ${selectedTube === index ? "-translate-y-3 scale-105" : "hover:-translate-y-1"}`}><span className={`game-tube relative block h-[142px] w-[50px] overflow-hidden rounded-b-[25px] rounded-t-md border-[3px] sm:h-[160px] sm:w-[58px] sm:rounded-b-[29px] ${selectedTube === index ? "border-primary shadow-lg" : ""}`}><span className="absolute inset-x-[2px] bottom-[2px] flex flex-col-reverse">{tube.colors.map((color, segment) => <span key={`${color}-${segment}`} className={`game-liquid-segment h-[31px] border-t border-background/20 sm:h-[36px] ${LIQUID_CLASSES[color] ?? LIQUID_CLASSES[0]} ${segment === 0 ? "rounded-b-[22px] sm:rounded-b-[26px]" : ""}`} />)}</span></span></Button>)}
        </div> : !winAdDismissed ? <div className="game-stage mx-auto grid min-h-[380px] max-w-lg content-center text-center"><div className="rounded-md border border-border bg-card/95 p-4 shadow-xl"><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Advertisement</p><div className="mt-2"><BlogAdBand position="category" label="Game break" /></div><Button className="mt-3 w-full" onClick={() => setWinAdDismissed(true)}>Skip / Continue<ChevronRight /></Button><p className="mt-2 text-[10px] text-muted-foreground">Your reward never depends on viewing or clicking an ad.</p></div></div> : <div className="game-stage grid min-h-[380px] place-items-center text-center"><div className="rounded-md border border-border bg-card/95 p-6 shadow-xl"><Trophy className="mx-auto h-14 w-14 text-gold" /><h2 className="mt-3 text-2xl font-extrabold text-primary">Level Complete!</h2><p className="mt-2 text-sm text-muted-foreground">Solved in {moves} moves · {currentLevel < status.levels ? "Reward already collected" : `+${reward} credits`}</p><div className="mt-5 flex justify-center gap-3"><Button variant="outline" onClick={() => resetLevel(currentLevel)}><RefreshCw />Replay</Button>{currentLevel < LEVELS.length - 1 && currentLevel < status.levels ? <Button onClick={() => setCurrentLevel((value) => value + 1)}>Next Level<ChevronRight /></Button> : null}</div></div></div>}
      </section>

      <footer className="flex flex-wrap items-center justify-center gap-2 border-t border-border p-3 sm:p-4"><Button variant="outline" onClick={() => setCurrentLevel((value) => Math.max(0, value - 1))} disabled={currentLevel === 0}><ChevronLeft />Prev</Button><Select value={String(currentLevel)} onValueChange={(value) => setCurrentLevel(Number(value))}><SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger><SelectContent>{LEVELS.map((level, index) => <SelectItem key={level.name} value={String(index)} disabled={index > nextUnlocked}>{level.name}</SelectItem>)}</SelectContent></Select><Button variant="outline" onClick={() => setCurrentLevel((value) => Math.min(nextUnlocked, value + 1))} disabled={currentLevel >= nextUnlocked}>Next<ChevronRight /></Button><Button variant="outline" onClick={undo} disabled={!history.length || gameWon}><RotateCcw />Undo</Button><Button variant="outline" onClick={() => resetLevel(currentLevel)}><RefreshCw />Restart</Button><TooltipProvider><Tooltip><TooltipTrigger asChild><Button type="button" variant="outline" size="icon" onClick={buyGlass} disabled={buying || gameWon || !status.unlocked || status.balance < 10} aria-label="Buy an empty glass for 10 credits"><Beaker /></Button></TooltipTrigger><TooltipContent>Empty glass · 10 credits</TooltipContent></Tooltip></TooltipProvider><Button variant="ghost" size="icon" onClick={() => setSoundEnabled((value) => !value)} aria-label={soundEnabled ? "Mute game sounds" : "Enable game sounds"}>{soundEnabled ? <Volume2 /> : <VolumeX />}</Button></footer>
    </div>
    <p className="mt-3 text-center text-xs text-muted-foreground">Completed {status.levels}/20 · {gameCreditsEarned(status.levels)} credits earned from levels</p>
  </GuestShell><BlogAdsConsent context="game" /></>;
}