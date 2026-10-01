import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, BarChart3, CalendarDays, Coins, Eye, FileText, Heart, KeyRound, Layers3, Link2, Mail, Share2, Users } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { sendGuestLoginCode } from "@/lib/auth-email.functions";

export const Route = createFileRoute("/guest-login")({
  head: () => ({ meta: [
    { title: "Guest Author Login | Webgram IT Solution" },
    { name: "description", content: "Register or sign in with an email code to write guest articles, play and earn credits." },
    { property: "og:title", content: "Guest Author Login | Webgram IT Solution" },
    { property: "og:description", content: "Join the Webgram guest posting panel with a one-time email code." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: GuestLogin,
});

function GuestLogin() {
  const navigate = useNavigate();
  const requestLoginCode = useServerFn(sendGuestLoginCode);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"create" | "signin">("create");
  useEffect(() => { void supabase.auth.getUser().then(({ data }) => { if (data.user) void navigate({ to: "/guest", replace: true }); }); }, [navigate]);

  async function sendCode(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      await requestLoginCode({ data: { email, redirectTo: `${window.location.origin}/guest-login` } });
      setSent(true);
    } catch {
      setError("Code could not be sent. Please check the email address and try again.");
    } finally {
      setBusy(false);
    }
  }
  async function verify(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    let { error: e } = await supabase.auth.verifyOtp({ email, token: code.trim(), type: "email" });
    if (e) ({ error: e } = await supabase.auth.verifyOtp({ email, token: code.trim(), type: "signup" }));
    setBusy(false);
    if (e) { setError("Code is invalid or expired."); return; }
    await navigate({ to: "/guest", replace: true });
  }

  const guidelines = [
    { icon: FileText, title: "Content Guidelines", bullets: ["Original, unpublished content only.", "Well-researched, informative and practical articles.", "Clear structure with headings and relevant images.", "Minimum 800 words in clear, easy-to-read language."] },
    { icon: Layers3, title: "Topics We Accept", bullets: ["Technology & Web Development", "Website Design & UI/UX", "eCommerce & B2B", "Digital Marketing & SEO", "AI, automation and business growth"] },
    { icon: Link2, title: "Link Policy", bullets: ["No promotional or unrelated external links.", "Links must be natural, useful and relevant.", "Additional links remain subject to editorial review."] },
    { icon: CalendarDays, title: "Posting Rules", bullets: ["Each author may submit one article per day.", "Every post is reviewed for quality and originality.", "Spam or low-value content will be rejected."] },
    { icon: Coins, title: "Credit System", bullets: ["Credits are required for publishing actions.", "Earn credits through approved activities.", "Credit charges vary by action and article type."] },
  ];
  const benefits = [{ icon: BarChart3, title: "Build Your Brand", text: "Reach a relevant audience." }, { icon: Users, title: "Get Quality Traffic", text: "Increase visibility." }, { icon: Coins, title: "Earn More Credits", text: "Read, write and share." }, { icon: Heart, title: "Join the Community", text: "Connect with experts." }];
  return <div className="min-h-screen bg-sky-soft"><SiteHeader /><main className="relative overflow-hidden px-4 py-4 md:px-6"><div className="mx-auto grid w-full max-w-[1424px] gap-5 lg:grid-cols-[1.08fr_.92fr]">
    <section className="max-h-[690px] overflow-y-auto rounded-md border border-border bg-card p-5 shadow-card md:p-6" aria-labelledby="guest-guidelines-title">
      <p className="page-eyebrow text-primary">Guest author guidelines</p><h1 id="guest-guidelines-title" className="mt-2 text-3xl font-extrabold text-navy">Contribute to Webgram Blog</h1><p className="mt-1 max-w-2xl text-sm text-muted-foreground">Share your knowledge, insights and real experiences with our growing community of business owners, developers, marketers and technology enthusiasts.</p>
      <div className="mt-3 divide-y divide-border border-t border-border">{guidelines.map(({ icon: Icon, title, bullets }) => <article key={title} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 py-3"><span className="grid h-11 w-11 place-items-center rounded-md bg-primary-soft text-primary"><Icon className="h-6 w-6" /></span><div><h2 className="text-base font-extrabold text-navy">{title}</h2><ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs leading-5 text-muted-foreground">{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div>
      <div className="mt-2 rounded-md border border-border bg-sky-soft p-3"><div className="flex items-center justify-between"><strong className="text-xs text-navy">Credit Usage & Actions</strong><Link to="/guest-login" className="text-[10px] font-bold text-primary">View credit plans →</Link></div><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[FileText,"Publish Post","-10 Credits"],[KeyRound,"Edit Post","After Publish"],[Share2,"Share Post","Through Platform"],[Eye,"Read Blog Post","+1 Credits"]].map(([Icon,title,value]) => { const CreditIcon = Icon as typeof FileText; return <div key={String(title)} className="rounded-md border border-border bg-card p-2"><CreditIcon className="h-4 w-4 text-primary" /><strong className="mt-1 block text-[10px] text-navy">{String(title)}</strong><span className="text-[9px] text-muted-foreground">{String(value)}</span></div>; })}</div></div>
    </section>
    <div className="space-y-3"><section className="rounded-md border border-border bg-card p-5 shadow-card md:p-6"><p className="page-eyebrow text-primary">Guest author panel</p><h2 className="mt-2 text-3xl font-extrabold text-navy">{sent ? "Enter Your Verification Code" : "Create an Account or Sign In"}</h2><p className="mt-1 text-sm text-muted-foreground">Join Webgram Blog to submit, manage and grow your articles.</p>
      {!sent ? <><div className="mt-5 grid grid-cols-2 rounded-md border border-border bg-sky-soft p-1"><Button type="button" variant={mode === "create" ? "default" : "ghost"} className="h-10" onClick={() => setMode("create")}><Users />Create Account</Button><Button type="button" variant={mode === "signin" ? "default" : "ghost"} className="h-10" onClick={() => setMode("signin")}><KeyRound />Sign In</Button></div><form onSubmit={sendCode} className="mt-5 space-y-4"><label className="block text-xs font-bold text-navy">Email Address <span className="text-destructive">*</span><div className="relative mt-2"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-11 pl-10" /></div></label><p className="text-xs leading-5 text-muted-foreground">We use a secure one-time email code. No password is required.</p>{error ? <p role="alert" className="text-xs font-semibold text-destructive">{error}</p> : null}<Button disabled={busy} className="h-11 w-full bg-gold font-extrabold text-navy hover:bg-gold/90">{busy ? "Sending..." : mode === "create" ? "Create Account" : "Sign In"}<ArrowRight /></Button></form></>
      : <form onSubmit={verify} className="mt-6 space-y-4"><label className="block text-xs font-bold text-navy">Verification code<div className="relative mt-2"><KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input inputMode="numeric" required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 8))} className="h-11 pl-10 tracking-[0.4em]" /></div></label><p className="text-xs text-muted-foreground">We sent a verification code to {email}.</p>{error ? <p role="alert" className="text-xs font-semibold text-destructive">{error}</p> : null}<Button disabled={busy} className="h-11 w-full bg-gold font-bold text-navy hover:bg-gold/90">{busy ? "Verifying..." : "Verify & continue"}</Button><Button type="button" variant="ghost" onClick={() => { setSent(false); setCode(""); }} className="w-full text-xs font-bold text-primary">Use a different email</Button></form>}
      <p className="mt-5 text-center text-xs text-muted-foreground">By continuing, you agree to our <Link to="/terms-and-conditions" className="font-bold text-primary">Terms</Link> and <Link to="/privacy-policy" className="font-bold text-primary">Privacy Policy</Link>.</p></section>
      <section className="rounded-md border border-border bg-card p-4"><h2 className="text-xl font-extrabold text-navy">Why Write for Webgram?</h2><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-md border border-border p-3"><Icon className="h-5 w-5 text-primary" /><strong className="mt-2 block text-[10px] text-navy">{title}</strong><span className="mt-1 block text-[9px] leading-4 text-muted-foreground">{text}</span></div>)}</div></section>
    </div>
  </div></main></div>;
}
