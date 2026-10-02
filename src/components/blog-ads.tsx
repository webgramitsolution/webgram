import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "webgram-ad-consent";
type Consent = "accepted" | "rejected" | null;
const CONSENT_REGIONS = new Set(["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH"]);
const PUBLISHER_ID = "ca-pub-5971464853495085";

export const BLOG_AD_SLOTS = {
  top: "9892982015",
  category: "9892982015",
  detailLeft: "6145308694",
  detailRight: "6145308694",
  detailContent: "",
} as const;

export type BlogAdPosition = keyof typeof BLOG_AD_SLOTS;

function loadAds() {
  if (document.querySelector('script[data-webgram-ads="true"]')) return;
  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
  script.dataset["webgramAds"] = "true";
  document.head.appendChild(script);
}

export function BlogAdsConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY) as Consent;
    if (saved === "accepted") { setConsent(saved); loadAds(); }
    else if (saved === "rejected") setConsent(saved);
    else if (window.location.hostname === "localhost") setConsent(null);
    else {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 2000);
      fetch("/cdn-cgi/trace", { signal: controller.signal }).then((response) => response.ok ? response.text() : Promise.reject()).then((text) => {
        const country = text.match(/^loc=([^\r\n]+)/m)?.[1] ?? "XX";
        if (country !== "XX" && country !== "T1" && !CONSENT_REGIONS.has(country)) { setConsent("accepted"); loadAds(); }
        else setConsent(null);
      }).catch(() => setConsent(null)).finally(() => window.clearTimeout(timeout));
    }
    const open = () => setConsent(null);
    window.addEventListener("webgram:cookie-settings", open);
    return () => { window.removeEventListener("webgram:cookie-settings", open); };
  }, []);
  function choose(value: Exclude<Consent, null>) { window.localStorage.setItem(CONSENT_KEY, value); setConsent(value); window.dispatchEvent(new CustomEvent("webgram:ad-consent", { detail: value })); if (value === "accepted") loadAds(); }
  if (consent) return null;
  return <aside className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-md border border-border bg-card p-4 shadow-xl" aria-label="Advertising cookie choices"><div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><h2 className="text-base font-extrabold text-navy">Your advertising choice</h2><p className="mt-1 text-xs text-muted-foreground">Blog ads help support our journal. Allow advertising cookies for personalised delivery and measurement, or reject them and continue reading.</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => choose("rejected")}>Reject</Button><Button onClick={() => choose("accepted")}>Accept</Button></div></div></aside>;
}

export function BlogAdBand({ label = "Advertisement", position = "category", rail = false }: { label?: string; position?: BlogAdPosition; rail?: boolean }) {
  const slot = BLOG_AD_SLOTS[position];
  const adRef = useRef<HTMLModElement>(null);
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    const syncConsent = () => setAccepted(window.localStorage.getItem(CONSENT_KEY) === "accepted");
    syncConsent();
    window.addEventListener("webgram:ad-consent", syncConsent);
    return () => window.removeEventListener("webgram:ad-consent", syncConsent);
  }, []);
  useEffect(() => {
    if (!slot || !accepted || !adRef.current || adRef.current.dataset["adStatus"]) return;
    loadAds();
    try { (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle = (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle ?? []; (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle?.push({}); } catch { /* AdSense retries after its script is ready. */ }
  }, [accepted, slot]);
  return <aside className={rail ? "w-full" : "w-full py-4"} aria-label={label}><div className={`grid place-items-center border border-border bg-muted/35 ${rail ? "min-h-[600px] rounded-md" : "min-h-[110px] overflow-hidden"}`}>{slot && accepted ? <ins ref={adRef} className={`adsbygoogle block w-full ${rail ? "min-h-[600px]" : "min-h-[110px]"}`} data-ad-client={PUBLISHER_ID} data-ad-slot={slot} data-ad-format={rail ? "vertical" : "auto"} data-full-width-responsive="true" /> : <span className="px-3 text-center text-[10px] font-semibold uppercase text-muted-foreground">{label}<small className="mt-1 block normal-case">{slot ? "Accept advertising cookies to load this ad" : "Reserved ad position"}</small></span>}</div></aside>;
}

export function openCookieSettings() { if (typeof window !== "undefined") window.dispatchEvent(new Event("webgram:cookie-settings")); }