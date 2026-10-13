import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Keep Lovable-hosted copies (*.lovable.app etc.) out of search engines; only the real domain gets indexed.
function withNoindexOnPreviewHosts(request: Request, response: Response): Response {
  const host = new URL(request.url).hostname;
  if (!/(\.lovable\.app|\.lovableproject\.com|\.lovable\.dev)$/.test(host)) return response;
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// Permanent redirects for retired URLs so old links keep their value.
const REDIRECTS: Record<string, string> = {
  "/blog/category/personal-finance-and-investing": "/resources/blog",
  "/blog/category/health-healthcare-and-wellness": "/resources/blog",
  "/blog/category/agriculture-farming-and-rural-development": "/resources/blog",
  "/blog/category/relationships-family-and-social-life": "/resources/blog",
  "/blog": "/resources/blog",
  "/write-for-us": "/guest-login",
  "/ae/index.html": "/ae/",
  "/kw/index.html": "/kw/",
};
function redirectFor(request: Request): Response | null {
  const url = new URL(request.url);
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
  const target = REDIRECTS[path] ?? REDIRECTS[url.pathname];
  if (!target || target === url.pathname) return null;
  return new Response(null, { status: 301, headers: { Location: target + url.search } });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirect = redirectFor(request);
    if (redirect) return redirect;
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withNoindexOnPreviewHosts(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
