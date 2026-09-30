import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).default(""),
  service: z.string().trim().max(80).default(""),
  message: z.string().trim().min(5).max(3000),
  website: z.string().max(0).optional(), // honeypot
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin.from("enquiries").select("id", { count: "exact", head: true }).eq("email", data.email).gte("created_at", since);
    if ((count ?? 0) >= 3) throw new Error("Too many enquiries. Please try again in a few minutes.");
    const { data: row, error } = await supabaseAdmin
      .from("enquiries")
      .insert({ name: data.name, email: data.email, phone: data.phone, service: data.service, message: data.message })
      .select("id")
      .single();
    if (error) throw new Error("Enquiry could not be saved.");
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    try {
      await sendTemplateEmail("new-enquiry", "info@webgramitsolution.com", {
        templateData: { name: data.name, email: data.email, phone: data.phone, service: data.service, message: data.message },
        idempotencyKey: `new-enquiry-${row.id}`,
        replyTo: data.email,
      });
    } catch (e) {
      // The enquiry remains saved even if the team notification cannot be delivered.
      console.error("enquiry team email failed", e);
    }
    try {
      await sendTemplateEmail("enquiry-acknowledgement", data.email, {
        templateData: { name: data.name, service: data.service },
        idempotencyKey: `enquiry-acknowledgement-${row.id}`,
        replyTo: "info@webgramitsolution.com",
      });
    } catch (e) {
      console.error("enquiry acknowledgement email failed", e);
    }
    return { ok: true };
  });
