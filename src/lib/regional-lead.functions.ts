import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  region: z.enum(["ae", "kw"]),
  fullName: z.string().trim().min(2).max(100),
  companyEmail: z.string().trim().email().max(255),
  whatsapp: z.string().trim().regex(/^\+[0-9][0-9 ]{6,18}$/, "WhatsApp number must start with a country code, e.g. +971."),
  projectScope: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional(), // honeypot
});

export const submitRegionalLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"] ?? import.meta.env["VITE_SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
    const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: id, error } = await client.rpc("submit_regional_lead", {
      _region: data.region, _name: data.fullName, _email: data.companyEmail, _whatsapp: data.whatsapp, _scope: data.projectScope,
    });
    if (error || !id) throw new Error(error?.message && error.message.length < 120 ? error.message : "Request could not be saved.");

    // Forward a clean JSON payload to the external automation (Make.com) webhook, server-side only.
    const hook = process.env["MAKE_WEBHOOK_URL"];
    let status = "not_configured";
    if (hook && /^https:\/\//.test(hook)) {
      try {
        const res = await fetch(hook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "live_ai_remote_demo_request",
            lead_id: id,
            region: data.region === "ae" ? "United Arab Emirates" : "Kuwait",
            region_code: data.region.toUpperCase(),
            full_name: data.fullName,
            company_email: data.companyEmail,
            whatsapp: data.whatsapp,
            project_scope: data.projectScope,
            source_url: `https://webgramitsolution.com/${data.region}/`,
            submitted_at: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(8000),
        });
        status = res.ok ? "sent" : "failed";
      } catch (e) {
        console.error("regional lead webhook failed", e);
        status = "failed";
      }
    }
    await client.rpc("mark_regional_lead_webhook", { _id: id as string, _status: status });
    return { ok: true };
  });
