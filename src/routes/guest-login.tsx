import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { KeyRound, Mail } from "lucide-react";

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

  return <div className="min-h-screen bg-sky-soft"><SiteHeader /><main className="grid place-items-center px-4 py-14"><div className="w-full max-w-[440px] rounded-md border border-border bg-card p-7 shadow-card">
    <p className="page-eyebrow text-primary">Guest author panel</p>
    <h1 className="mt-2 text-3xl font-extrabold text-navy">{sent ? "Enter your code" : "Register or sign in"}</h1>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{sent ? `We sent a verification code to ${email}.` : "No password needed — we email you a one-time code."}</p>
    {!sent ? <form onSubmit={sendCode} className="mt-6 space-y-4"><label className="block text-xs font-bold text-navy">Email<div className="relative mt-2"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 pl-10" /></div></label>{error ? <p role="alert" className="text-xs font-semibold text-destructive">{error}</p> : null}<Button disabled={busy} className="h-11 w-full bg-gold font-bold text-navy hover:bg-gold/90">{busy ? "Sending..." : "Send code"}</Button></form>
    : <form onSubmit={verify} className="mt-6 space-y-4"><label className="block text-xs font-bold text-navy">Verification code<div className="relative mt-2"><KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input inputMode="numeric" required value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))} className="h-11 pl-10 tracking-[0.4em]" /></div></label>{error ? <p role="alert" className="text-xs font-semibold text-destructive">{error}</p> : null}<Button disabled={busy} className="h-11 w-full bg-gold font-bold text-navy hover:bg-gold/90">{busy ? "Verifying..." : "Verify & continue"}</Button><button type="button" onClick={() => { setSent(false); setCode(""); }} className="w-full text-xs font-bold text-primary">Use a different email</button></form>}
    <p className="mt-6 text-xs text-muted-foreground">Want to read first? <Link to="/resources/$slug" params={{ slug: "blog" }} className="font-bold text-primary">Visit the blog</Link></p>
  </div></main></div>;
}
