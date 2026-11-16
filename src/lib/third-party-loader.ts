/**
 * Third-party scripts that are not needed for the first paint load late, so the
 * page text and main picture appear before analytics/translation code competes
 * for the visitor's network and processor.
 */
const WEGLOT_KEY = "wg_872ce6808ebb668649592539a3fafafc3";

type WeglotApi = { initialize: (o: object) => void; switchTo: (code: string) => void };

let weglotPromise: Promise<WeglotApi | undefined> | undefined;

export function loadWeglot(): Promise<WeglotApi | undefined> {
  if (typeof window === "undefined") return Promise.resolve(undefined);
  const w = window as unknown as { Weglot?: WeglotApi };
  if (w.Weglot) return Promise.resolve(w.Weglot);
  if (!weglotPromise) {
    weglotPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.id = "weglot-sdk";
      script.async = true;
      script.src = "https://cdn.weglot.com/weglot.min.js";
      script.onload = () => {
        w.Weglot?.initialize({ api_key: WEGLOT_KEY });
        resolve(w.Weglot);
      };
      script.onerror = () => resolve(undefined);
      document.head.appendChild(script);
    });
  }
  return weglotPromise;
}

/** Visitors who already picked another language get translation straight away. */
function prefersTranslation(): boolean {
  try {
    const chosen = window.localStorage.getItem("webgram-language") ?? window.localStorage.getItem("wglang");
    return !!chosen && chosen !== "en";
  } catch {
    return false;
  }
}

export function scheduleWeglot() {
  if (prefersTranslation()) {
    void loadWeglot();
    return;
  }
  const start = () => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (idle) idle(() => void loadWeglot(), { timeout: 3000 });
    else window.setTimeout(() => void loadWeglot(), 1500);
  };
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}

/**
 * Google Tag Manager (analytics, pixels, heatmaps) starts on the first visitor
 * interaction or a few seconds after the page has loaded, whichever is first.
 */
export const DEFERRED_GTM_SNIPPET = `(function(w,d,id){w.dataLayer=w.dataLayer||[];var done=false,ev=['pointerdown','keydown','touchstart','scroll'];function load(){if(done)return;done=true;ev.forEach(function(e){w.removeEventListener(e,load)});w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var j=d.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+id;d.head.appendChild(j);}ev.forEach(function(e){w.addEventListener(e,load,{passive:true})});function later(){setTimeout(load,3500)}if(d.readyState==='complete')later();else w.addEventListener('load',later);})(window,document,'GTM-TWNQJB9');`;
