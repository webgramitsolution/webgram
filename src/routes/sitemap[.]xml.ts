import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const BASE = "https://webgramitsolution.com";
const STATIC_PATHS = ["/","/about","/contact","/solutions/ecommerce-development","/solutions/b2b-commerce","/solutions/website-design-development","/services/web-portal-development","/services/website-design","/services/wordpress","/services/woocommerce","/services/shopify","/services/api-integration","/services/website-maintenance","/services/speed-optimization","/work/portfolio","/work/case-studies","/work/client-stories","/resources/blog","/resources/guides","/resources/faqs","/guest-login","/ae/","/kw/","/locations/delhi","/locations/noida","/locations/faridabad","/locations/gurugram","/locations/delhi-ncr","/locations/south-delhi"];
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const client = createClient<Database>(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!, { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } });
        const posts: { slug: string; published_at: string | null }[] = [];
        for (let from = 0; ; from += 1000) {
          const { data, error } = await client.from("blog_posts").select("slug,published_at").eq("status", "published").eq("noindex", false).lte("published_at", new Date().toISOString()).order("published_at", { ascending: false }).range(from, from + 999);
          if (error) return new Response("Sitemap unavailable", { status: 500 });
          posts.push(...(data ?? []));
          if (!data || data.length < 1000) break;
        }
        const { data: categories, error: categoryError } = await client.from("blog_categories").select("slug").eq("is_active", true).is("parent_id", null).order("display_order");
        if (categoryError) return new Response("Sitemap unavailable", { status: 500 });
        const urls = [
          ...STATIC_PATHS.map((p) => `<url><loc>${BASE}${p === "/" ? "/" : p}</loc></url>`),
          ...(categories ?? []).map((category) => `<url><loc>${BASE}/blog/category/${esc(encodeURIComponent(category.slug))}</loc></url>`),
          ...posts.map((p) => `<url><loc>${BASE}/blog/${esc(encodeURIComponent(p.slug))}</loc>${p.published_at ? `<lastmod>${p.published_at.slice(0, 10)}</lastmod>` : ""}</url>`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
