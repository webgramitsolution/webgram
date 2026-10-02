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

export function GuestShell({ title, balance, levels, children, rightRail }: { title: string; balance: number; levels: number; children: React.ReactNode; rightRail?: React.ReactNode }) {
  const navigate = useNavigate(); const qc = useQueryClient();
  async function signOut() { await qc.cancelQueries(); qc.clear(); await supabase.auth.signOut(); await navigate({ to: "/guest-login", replace: true }); }
  return <div className="min-h-screen bg-sky-soft"><SiteHeader />
    <div className={`grid min-w-0 ${rightRail ? "grid-cols-[minmax(0,1fr)_96px] md:grid-cols-[190px_minmax(0,1fr)_180px] lg:grid-cols-[230px_minmax(0,1fr)_220px] xl:grid-cols-[230px_minmax(0,1fr)_250px]" : "md:grid-cols-[230px_minmax(0,1fr)]"}`}>
      <aside className={`min-w-0 max-w-full border-r ${rightRail ? "col-span-2 md:col-span-1" : ""}`.trim() + "  border-border bg-card p-3 shadow-card md:sticky md:top-[103px] md:h-[calc(100vh-103px)] md:self-start md:overflow-hidden"}>
        <div className="rounded-md bg-navy p-4 text-on-dark"><p className="text-[13px] font-bold uppercase tracking-widest text-on-dark/70">Your credits</p><p className="mt-1 flex items-center gap-2 text-3xl font-extrabold"><Coins className="h-6 w-6 text-gold" />{balance}</p><p className="mt-2 text-[14px] text-on-dark/70">{levels}/20 levels complete</p></div>
        <nav className="guest-nav mt-3 flex max-w-full gap-1 overflow-x-auto md:flex-col md:overflow-visible">{nav.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} activeProps={{ className: "bg-sky-soft text-primary" }} className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-sky-soft"><item.icon className="h-4 w-4 shrink-0" />{item.label}</Link>)}</nav>
        <Button variant="ghost" size="sm" onClick={signOut} className="mt-2 w-full justify-start text-muted-foreground"><LogOut />Sign out</Button>
      </aside>
      <main className="min-w-0 bg-background p-3 sm:p-5"><h1 className="sr-only">{title}</h1>{children}</main>
      {rightRail ? <aside className="border-l border-border bg-card p-1 md:p-3"><div className="sticky top-[84px] md:top-[118px]">{rightRail}</div></aside> : null}
    </div>
  </div>;
}

export function LockedNotice({ levels }: { levels: number }) {
  return <div className="flex items-start gap-3 rounded-md border border-warning/40 bg-warning-soft p-4 text-sm text-navy"><Lock className="mt-0.5 h-4 w-4 shrink-0 text-warning" /><p>Credits unlock after {UNLOCK_LEVELS} game levels. You have completed {levels}. <Link to="/guest/game" className="font-bold text-primary">Play now →</Link></p></div>;
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-md border border-border bg-card p-6 shadow-card ${className}`}>{children}</section>;
}
