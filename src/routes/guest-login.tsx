import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BarChart3, CalendarDays, ChevronDown, Coins, Database, Eye, EyeOff, FileText, Gift, Info, List, Lock, Mail, PenSquare, Phone, Send, ShieldCheck, User, UserSquare, Users } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { registerGuestAccount, sendGuestLoginCode } from "@/lib/auth-email.functions";

const HERO = "https://ik.imagekit.io/x3cipokny/icon/guest%20post%20banner.png";

export const Route = createFileRoute("/guest-login")({
  head: () => ({ meta: [
    { title: "Guest Author Panel – Write, Publish & Earn | Webgram IT Solution" },
    { name: "description", content: "Register as a Webgram guest author to write articles, publish on our blog and earn credits. Read the guest posting guidelines and create your account." },
    { property: "og:title", content: "Guest Author Panel – Write, Publish & Earn Credits" },
    { property: "og:description", content: "Share your expertise with business owners and technology enthusiasts on the Webgram blog." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: HERO },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex" },
    { name: "twitter:image", content: HERO },
  ] }),
  component: GuestLogin,
});

const guidelines = [
  { icon: User, title: "Account & Eligibility", bullets: ["Anyone with genuine knowledge and interest can create an account.", "You must be at least 18 years old.", "Provide accurate and complete information during registration."] },
  { icon: FileText, title: "Content Quality & Originality", bullets: ["Submit original, unpublished content only.", "Well-researched, informative and practical articles.", "Clear structure with proper headings, short paragraphs and relevant images."] },
  { icon: List, title: "Allowed Content", bullets: ["We accept articles related to: Business, Technology, AI, Digital Marketing, eCommerce, Finance, Education, Health & Wellness, Travel, Lifestyle, Career, Productivity, Industry Insights, How-to Guides, Case Studies and other relevant topics.", "We do not accept illegal drugs, gambling, adult or sexually explicit content, hate speech, violence, or misleading information."] },
  { icon: Send, title: "Submission & Review", bullets: ["Each submission is reviewed by our editorial team.", "We may suggest edits or changes for better clarity and alignment.", "Final approval and publishing are at the sole discretion of Webgram."] },
  { icon: CalendarDays, title: "Publishing Limits", bullets: ["Each user is allowed to publish 1 blog post per day.", "Minimum 800 words per article.", "External links are not allowed in guest articles."] },
  { icon: Database, title: "Credit-Based System", bullets: ["Our platform works on a credit-based system.", "You can earn credits through certain actions and use credits for publishing, editing and sharing.", "Exact credit charges may vary by action and are visible in your account dashboard."] },
];
const creditRows = [["Publish a post", "400 credits"], ["Comment on a post", "100 credits"], ["Share post through platform", "Earn 10 credits"], ["Complete a game level", "Earn 20 credits"]];
const heroFeatures = [{ icon: PenSquare, a: "Share", b: "Your Expertise" }, { icon: Users, a: "Reach a", b: "Wider Audience" }, { icon: Coins, a: "Earn", b: "Credits" }, { icon: BarChart3, a: "Build", b: "Your Profile" }];

function Field({ label, icon: Icon, children }: { label: string; icon: typeof User; children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-navy">{label} <span className="text-destructive">*</span><div className="relative mt-1.5"><Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />{children}</div></label>;
}

function GuestLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"register" | "login">("register");
  const [open, setOpen] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "", type: "" });
  const [agree, setAgree] = useState(false);
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [verify, setVerify] = useState<{ email: string; type: "signup" | "email" } | null>(null);
  const [needsVerify, setNeedsVerify] = useState(false);
  const [code, setCode] = useState("");
  const registerGuest = useServerFn(registerGuestAccount);
  const sendCode = useServerFn(sendGuestLoginCode);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  useEffect(() => { void supabase.auth.getUser().then(({ data }) => { if (data.user) void navigate({ to: "/guest", replace: true }); }); }, [navigate]);

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(""); setNotice("");
    if (mode === "register") {
      if (form.password.length < 8) return setError("Password must be at least 8 characters.");
      if (form.password !== form.confirm) return setError("Passwords do not match.");
      if (!agree) return setError("Please accept the guidelines and policies.");
    }
    setBusy(true);
    if (mode === "register") {
      try {
        await registerGuest({ data: { email: form.email.trim(), password: form.password, fullName: form.name.trim(), phone: `+91 ${form.phone.trim()}`, accountType: form.type, redirectTo: `${window.location.origin}/guest` } });
        setVerify({ email: form.email.trim(), type: "signup" });
        setNotice("A 6-digit verification code has been sent to your email.");
      } catch (e) { setError(e instanceof Error ? e.message : "Account could not be created."); }
      setBusy(false);
    } else {
      const { error: e } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password });
      setBusy(false);
      if (e) {
        if (/confirm/i.test(e.message)) { setError("Your email is not verified yet."); setNeedsVerify(true); return; }
        return setError("Email or password is incorrect.");
      }
      await navigate({ to: "/guest", replace: true });
    }
  }
  async function resend() {
    setError(""); setBusy(true);
    try { await sendCode({ data: { email: (verify?.email ?? form.email).trim(), redirectTo: `${window.location.origin}/guest` } }); setVerify({ email: (verify?.email ?? form.email).trim(), type: "email" }); setNeedsVerify(false); setNotice("A new verification code has been sent to your email."); }
    catch { setError("Code could not be sent. Please try again."); }
    setBusy(false);
  }
  async function confirmCode(event: FormEvent) {
    event.preventDefault(); if (!verify) return; setError(""); setBusy(true);
    const { error: e } = await supabase.auth.verifyOtp({ email: verify.email, token: code.trim(), type: verify.type });
    setBusy(false);
    if (e) return setError("Invalid or expired code. Please resend and try again.");
    await navigate({ to: "/guest", replace: true });
  }
  async function google() {
    const { error: e } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/guest-login` } });
    if (e) setError("Google sign-in is not available right now.");
  }

  const pw = (k: "password" | "confirm", ph: string) => <><Input type={show ? "text" : "password"} required minLength={mode === "register" ? 8 : undefined} autoComplete={mode === "register" ? "new-password" : "current-password"} value={form[k]} onChange={set(k)} placeholder={ph} className="h-11 pl-10 pr-10" /><button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{show ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</button></>;

  return <div className="min-h-screen bg-sky-soft"><SiteHeader /><main>
    <section className="relative overflow-hidden bg-sky-soft bg-cover bg-right bg-no-repeat" style={{ backgroundImage: `url(${HERO})` }} aria-label="Guest author panel">
      <div className="page-shell relative py-7 md:py-9">
        <div className="max-w-[58%] lg:max-w-[620px]"><p className="text-xs font-extrabold uppercase tracking-wide text-primary">Guest Author Panel</p><h1 className="mt-1.5 text-3xl font-extrabold leading-tight text-navy lg:text-4xl">Write, Publish & <span className="text-primary">Earn Credits</span></h1><p className="mt-2 max-w-lg text-sm text-muted-foreground">Share your knowledge, insights and experience with our growing community of business owners, professionals and technology enthusiasts.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">{heroFeatures.map(({ icon: Icon, a, b }) => <div key={b} className="flex items-center gap-2"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-card text-primary shadow-card"><Icon className="h-5 w-5" /></span><span className="text-[14px] font-semibold leading-tight text-navy">{a}<br />{b}</span></div>)}</div></div>
      </div>
    </section>
    <div className="page-shell grid items-stretch gap-5 py-6 md:grid-cols-[1.45fr_1fr]">
      <section className="hover-scroll md:h-[920px] overflow-y-auto rounded-lg border border-border bg-card p-5 shadow-card" aria-labelledby="gl-terms">
        <h2 id="gl-terms" className="text-xl font-extrabold text-navy">Guest Author Terms & Guidelines</h2><p className="mt-1 text-sm text-muted-foreground">Please read the following terms and guidelines carefully before creating an account and submitting your articles.</p>
        <div className="mt-4 space-y-3">{guidelines.map(({ icon: Icon, title, bullets }, i) => <article key={title} className="relative rounded-md border border-border bg-card p-3 pl-4">
          <span className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="grid w-full grid-cols-[48px_minmax(0,1fr)_20px] items-start gap-4 text-left" aria-expanded={open === i}>
            <span className="grid h-12 w-12 place-items-center rounded-md bg-primary-soft text-primary"><Icon className="h-6 w-6" /></span>
            <span><h3 className="text-sm font-bold text-navy">{title}</h3><ul className={`mt-1 list-disc space-y-0.5 pl-4 text-xs leading-5 text-muted-foreground ${open === i ? "" : "line-clamp-3"}`}>{bullets.map((b) => <li key={b}>{b}</li>)}</ul></span>
            <ChevronDown className={`mt-4 h-4 w-4 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button></article>)}
          <article className="relative rounded-md border border-border p-3 pl-4"><span className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">7</span>
            <div className="grid grid-cols-[48px_minmax(0,1fr)] gap-4"><span className="grid h-12 w-12 place-items-center rounded-md bg-primary-soft text-primary"><Gift className="h-6 w-6" /></span><div><h3 className="text-sm font-bold text-navy">Credit Usage & Actions</h3>
              <table className="mt-2 w-full overflow-hidden rounded-md border border-border text-xs"><thead className="bg-primary-soft text-navy"><tr><th className="p-2 text-left">Action</th><th className="p-2 text-left">Credit Details</th></tr></thead><tbody>{creditRows.map(([a, c]) => <tr key={a} className="border-t border-border"><td className="p-2 text-muted-foreground">{a}</td><td className="p-2 font-semibold text-navy">{c}</td></tr>)}</tbody></table>
              <p className="mt-2 flex gap-2 rounded-md bg-primary-soft p-2 text-[14px] text-primary"><Info className="h-4 w-4 shrink-0" />Credit charges may vary by article type, category and platform policies. Please check your account dashboard for the latest credit details.</p></div></div></article>
        </div>
      </section>
      <section className="flex flex-col rounded-lg md:h-[920px] md:overflow-y-auto hover-scroll border border-border bg-card p-5 shadow-card">
        <h2 className="text-xl font-extrabold text-navy">{mode === "register" ? "Create Your Account" : "Welcome Back"}</h2><p className="mt-1 text-sm text-muted-foreground">{mode === "register" ? "Join our community and start sharing your knowledge." : "Log in to manage your articles and credits."}</p>
        <div className="mt-4 grid grid-cols-2 rounded-md bg-primary-soft p-0">{(["register", "login"] as const).map((m) => <button key={m} type="button" onClick={() => { setMode(m); setError(""); }} className={`h-10 rounded-md text-sm font-bold ${mode === m ? "bg-primary text-primary-foreground" : "text-navy"}`}>{m === "register" ? "Register" : "Login"}</button>)}</div>
        {verify ? <form onSubmit={confirmCode} className="mt-4 space-y-3">
          <h3 className="text-sm font-bold text-navy">Verify your email</h3>
          <p className="text-xs text-muted-foreground">Enter the 6-digit code sent to <b className="text-navy">{verify.email}</b>. Check your spam folder too.</p>
          <Input required inputMode="numeric" autoComplete="one-time-code" maxLength={8} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} placeholder="Enter verification code" className="h-11 text-center text-lg tracking-[0.4em]" />
          {error && <p role="alert" className="text-xs font-semibold text-destructive">{error}</p>}
          {notice && <p className="text-xs font-semibold text-primary">{notice}</p>}
          <Button disabled={busy || code.length < 6} className="h-11 w-full bg-gold font-extrabold text-navy hover:bg-gold/90">{busy ? "Please wait..." : "Verify & Continue"}<ArrowRight /></Button>
          <div className="flex justify-between text-xs"><button type="button" onClick={resend} disabled={busy} className="font-bold text-primary">Resend code</button><button type="button" onClick={() => { setVerify(null); setCode(""); setMode("login"); setNotice(""); }} className="font-bold text-muted-foreground">Back to login</button></div>
        </form> : <form onSubmit={submit} className="mt-4 space-y-3">
          {mode === "register" && <Field label="Full Name" icon={User}><Input required maxLength={80} value={form.name} onChange={set("name")} placeholder="Enter your full name" className="h-11 pl-10" /></Field>}
          <Field label="Email Address" icon={Mail}><Input type="email" required autoComplete="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className="h-11 pl-10" /></Field>
          {mode === "register" && <label className="block text-xs font-semibold text-navy">Phone Number <span className="text-destructive">*</span><div className="mt-1.5 flex h-11 items-center rounded-md border border-input bg-background"><span className="flex items-center gap-1 border-r border-border px-3 text-sm text-navy"><Phone className="h-4 w-4 text-muted-foreground" />+91</span><input required inputMode="numeric" pattern="[0-9]{10}" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} placeholder="98765 43210" className="h-full flex-1 bg-transparent px-3 text-sm outline-none" /></div></label>}
          <Field label="Password" icon={Lock}>{pw("password", mode === "register" ? "Create a strong password" : "Enter your password")}</Field>
          {mode === "register" && <><Field label="Confirm Password" icon={Lock}>{pw("confirm", "Confirm your password")}</Field>
            <Field label="Account Type" icon={UserSquare}><select required value={form.type} onChange={set("type")} className="h-11 w-full appearance-none rounded-md border border-input bg-background pl-10 pr-8 text-sm text-navy"><option value="">Select account type</option><option value="individual">Individual Author</option><option value="business">Business / Brand</option><option value="agency">Agency</option><option value="student">Student</option></select></Field>
            <label className="flex items-start gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-primary" /><span>I agree to the Guest Post Guidelines, <Link to="/terms-and-conditions" className="text-primary underline">Terms & Conditions</Link> and <Link to="/privacy-policy" className="text-primary underline">Privacy Policy</Link>.</span></label></>}
          {error && <p role="alert" className="text-xs font-semibold text-destructive">{error}</p>}
          {notice && <p className="text-xs font-semibold text-primary">{notice}</p>}
          {needsVerify && mode === "login" && <button type="button" onClick={resend} disabled={busy} className="w-full rounded-md border border-primary p-2 text-xs font-bold text-primary">Send verification code to my email</button>}
          <Button disabled={busy} className="h-11 w-full bg-gold font-extrabold text-navy hover:bg-gold/90">{busy ? "Please wait..." : mode === "register" ? "Create Account" : "Login"}<ArrowRight /></Button>
        </form>}
        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or continue with<span className="h-px flex-1 bg-border" /></div>
        <Button type="button" variant="outline" onClick={google} className="h-11 w-full font-semibold text-navy"><span className="font-extrabold text-primary">G</span>Continue with Google</Button>
        <p className="mt-4 text-center text-xs text-muted-foreground">{mode === "register" ? "Already have an account? " : "New here? "}<button type="button" onClick={() => setMode(mode === "register" ? "login" : "register")} className="font-bold text-primary">{mode === "register" ? "Login here" : "Create an account"}</button></p>
        <p className="mt-3 flex items-center gap-2 rounded-md bg-sky-soft p-2 text-[14px] text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" />Your information is secure and will never be shared with third parties.</p>
      </section>
    </div>
  </main></div>;
}
