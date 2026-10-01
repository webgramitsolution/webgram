import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Coins, Gamepad2, LifeBuoy, LogOut, PenLine, Search, Sparkles, LayoutDashboard, Lock, Home } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { UNLOCK_LEVELS } from "@/lib/guest";

const nav = [
  { to: "/", label: "Home Page", icon: Home },
  { to: "/guest", label: "Dashboard", icon: LayoutDashboard },
  { to: "/guest/game", label: "Play & Earn", icon: Gamepad2 },
  { to: "/guest/write", label: "Write Article", icon: PenLine },
  { to: "/guest/indexing", label: "Instant Indexing", icon: Search },
  { to: "/guest/stories", label: "Web Stories", icon: Sparkles },
  { to: "/guest/support", label: "Support", icon: LifeBuoy },
] as const;

export function GuestShell({ title, balance, levels, children }: { title: string; balance: number; levels: number; children: React.ReactNode }) {
  const navigate = useNavigate(); const qc = useQueryClient();
  async function signOut() { await qc.cancelQueries(); qc.clear(); await supabase.auth.signOut(); await navigate({ to: "/guest-login", replace: true }); }
  return <div className="min-h-screen bg-sky-soft"><SiteHeader />
    <div className="page-shell grid gap-6 py-8 lg:grid-cols-[230px_1fr]">
      <aside className="h-max rounded-md border border-border bg-card p-3 shadow-card lg:sticky lg:top-[124px] lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto">
        <div className="rounded-md bg-navy p-4 text-on-dark"><p className="text-[10px] font-bold uppercase tracking-widest text-on-dark/70">Your credits</p><p className="mt-1 flex items-center gap-2 text-3xl font-extrabold"><Coins className="h-6 w-6 text-gold" />{balance}</p><p className="mt-2 text-[11px] text-on-dark/70">{levels}/10 levels complete</p></div>
        <nav className="mt-3 flex gap-1 overflow-x-auto lg:flex-col">{nav.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} activeProps={{ className: "bg-sky-soft text-primary" }} className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-sky-soft"><item.icon className="h-4 w-4" />{item.label}</Link>)}</nav>
        <Button variant="ghost" size="sm" onClick={signOut} className="mt-2 w-full justify-start text-muted-foreground"><LogOut />Sign out</Button>
      </aside>
      <main className="min-w-0"><h1 className="text-3xl font-extrabold text-navy">{title}</h1><div className="mt-5">{children}</div></main>
    </div>
  </div>;
}

export function LockedNotice({ levels }: { levels: number }) {
  return <div className="flex items-start gap-3 rounded-md border border-warning/40 bg-warning-soft p-4 text-sm text-navy"><Lock className="mt-0.5 h-4 w-4 shrink-0 text-warning" /><p>Credits unlock after {UNLOCK_LEVELS} game levels. You have completed {levels}. <Link to="/guest/game" className="font-bold text-primary">Play now →</Link></p></div>;
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-md border border-border bg-card p-6 shadow-card ${className}`}>{children}</section>;
}
