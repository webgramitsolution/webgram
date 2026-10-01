import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

export const replyToEnquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid(), message: z.string().trim().min(5).max(5000) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Administrator access required.");
    const { data: enquiry, error } = await context.supabase.from("enquiries").select("id,name,email,service").eq("id", data.id).single();
    if (error || !enquiry) throw new Error("Enquiry not found.");
    const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
    const { sendSmtpMail } = await import("./smtp.server");
    await sendSmtpMail({
      to: enquiry.email,
      subject: `Re: Your Webgram enquiry — ${enquiry.service || "Project"}`,
      text: `Hi ${enquiry.name},\n\n${data.message}\n\nWebgram IT Solution\ninfo@webgramitsolution.com`,
      html: `<p>Hi ${esc(enquiry.name)},</p><p style="white-space:pre-line">${esc(data.message)}</p><p>Webgram IT Solution<br/>info@webgramitsolution.com</p>`,
      replyTo: "info@webgramitsolution.com",
    });
    const { error: upErr } = await context.supabase.from("enquiries").update({ reply_message: data.message, replied_at: new Date().toISOString(), status: "contacted" }).eq("id", data.id);
    if (upErr) throw new Error("Reply sent, but could not be saved.");
    return { ok: true };
  });
