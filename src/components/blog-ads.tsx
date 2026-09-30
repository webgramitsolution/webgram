import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "webgram-ad-consent";
type Consent = "accepted" | "rejected" | null;

function loadAds() {
  if (document.querySelector('script[data-webgram-ads="true"]')) return;
  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5971464853495085";
  script.dataset["webgramAds"] = "true";
  document.head.appendChild(script);
}

export function BlogAdsConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY) as Consent;
    setConsent(saved);
    if (saved === "accepted") loadAds();
    const open = () => setConsent(null);
    window.addEventListener("webgram:cookie-settings", open);
    return () => window.removeEventListener("webgram:cookie-settings", open);
  }, []);
  function choose(value: Exclude<Consent, null>) { window.localStorage.setItem(CONSENT_KEY, value); setConsent(value); if (value === "accepted") loadAds(); }
  if (consent) return null;
  return <aside className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-md border border-border bg-card p-4 shadow-xl" aria-label="Advertising cookie choices"><div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><h2 className="text-base font-extrabold text-navy">Your advertising choice</h2><p className="mt-1 text-xs text-muted-foreground">Blog ads help support our journal. Allow advertising cookies for personalised delivery and measurement, or reject them and continue reading.</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => choose("rejected")}>Reject</Button><Button onClick={() => choose("accepted")}>Accept</Button></div></div></aside>;
}

export function BlogAdBand({ label = "Advertisement" }: { label?: string }) {
  return <aside className="page-shell py-4" aria-label={label}><div className="grid min-h-24 place-items-center border-y border-border bg-muted/40"><span className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</span></div></aside>;
}

export function openCookieSettings() { if (typeof window !== "undefined") window.dispatchEvent(new Event("webgram:cookie-settings")); }