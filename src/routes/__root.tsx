import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";
import { SiteFooter } from "@/components/site-footer";
import { TestimonialStrip } from "@/components/testimonial-strip";
import { Toaster } from "@/components/ui/sonner";
import { NotFoundPage } from "@/components/not-found-page";
import { SiteWebMCPTools } from "@/components/site-webmcp-tools";
import { businessIdentity, BUSINESS_ID, WEBSITE_ID } from "@/lib/site-identity";

function NotFoundComponent() {
  return <NotFoundPage />;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "google-site-verification", content: "ZT7ALIlXMzk-9XGJCx9XMUHIIQhWXlrYJe7GmvOXD9Y" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Webgram IT Solution" },
      { name: "description", content: "Digital commerce solutions built to sell and scale." },
      { name: "author", content: "Webgram IT Solution" },
      { property: "og:title", content: "Webgram IT Solution" },
      { property: "og:description", content: "Digital commerce solutions built to sell and scale." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png?v=20261022", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(businessIdentity),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          name: "Webgram IT Solution",
          url: "https://webgramitsolution.com/",
          description: "Custom ecommerce websites, B2B platforms and WooCommerce development in Delhi NCR.",
          inLanguage: "en-IN",
          publisher: { "@id": BUSINESS_ID },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Main pages",
          itemListElement: [
            ["Website Design & Development", "/solutions/website-design-development"],
            ["Ecommerce Development", "/solutions/ecommerce-development"],
            ["B2B Commerce", "/solutions/b2b-commerce"],
            ["Website Design", "/services/website-design"],
            ["Blog", "/resources/blog"],
            ["About Us", "/about"],
            ["Contact", "/contact"],
          ].map(([name, path], i) => ({ "@type": "SiteNavigationElement", position: i + 1, name, url: `https://webgramitsolution.com${path}` })),
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TWNQJB9');`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TWNQJB9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  // Weglot loads after hydration so React does not remove its language switcher.
  useEffect(() => {
    const w = window as unknown as { Weglot?: { initialize: (o: object) => void } };
    if (w.Weglot || document.getElementById("weglot-sdk")) return;
    const script = document.createElement("script");
    script.id = "weglot-sdk";
    script.src = "https://cdn.weglot.com/weglot.min.js";
    script.onload = () => w.Weglot?.initialize({ api_key: "wg_872ce6808ebb668649592539a3fafafc3" });
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void router.invalidate();
      if (session) void queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [queryClient, router]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SiteWebMCPTools />
      <Toaster richColors position="top-center" />
      <TestimonialStrip />
      <SiteFooter />
    </QueryClientProvider>
  );
}
