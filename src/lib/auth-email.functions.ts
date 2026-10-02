import * as React from "react";
import { render } from "@react-email/render";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { MagicLinkEmail } from "@/lib/email-templates/magic-link";
import { sendSmtpMail } from "@/lib/smtp.server";

const ALLOWED_REDIRECT_HOSTS = new Set([
  "webgramitsolution.com",
  "www.webgramitsolution.com",
  "webgram.lovable.app",
  "id-preview--934c1417-6bed-4e8f-a661-6f87b3f5baa4.lovable.app",
  "localhost",
]);

/** Only same-site redirect URLs are accepted so login emails can never send users to another site. */
const safeRedirect = z
  .string()
  .url()
  .max(500)
  .refine((value) => {
    try {
      const url = new URL(value);
      const host = url.hostname.toLowerCase();
      const okProtocol = url.protocol === "https:" || (host === "localhost" && url.protocol === "http:");
      const okHost = ALLOWED_REDIRECT_HOSTS.has(host);
      return okProtocol && okHost;
    } catch {
      return false;
    }
  }, "Redirect URL is not allowed");

const inputSchema = z.object({
  email: z.string().trim().email().max(255),
  redirectTo: safeRedirect,
});

export const sendGuestLoginCode = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: link, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: data.email,
      options: { redirectTo: data.redirectTo },
    });
    if (error || !link.properties.email_otp) {
      throw new Error("Login code could not be created.");
    }

    const element = React.createElement(MagicLinkEmail, {
      siteName: "Webgram IT Solution",
      confirmationUrl: link.properties.action_link,
      token: link.properties.email_otp,
    });
    await sendSmtpMail({
      to: data.email,
      subject: "Your Webgram login code",
      html: await render(element),
      text: await render(element, { plainText: true }),
    });
    return { sent: true };
  });
const registerSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(72),
  fullName: z.string().trim().min(1).max(80),
  phone: z.string().trim().max(20),
  accountType: z.string().trim().max(30),
  redirectTo: safeRedirect,
});

/** Creates an unconfirmed guest account and emails a 6-digit verification code via SMTP. */
export const registerGuestAccount = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => registerSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: link, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "signup",
      email: data.email,
      password: data.password,
      options: { redirectTo: data.redirectTo, data: { full_name: data.fullName, phone: data.phone, account_type: data.accountType } },
    });
    if (error) {
      if (/registered|exists/i.test(error.message)) throw new Error("This email is already registered. Please log in or verify your email.");
      throw new Error("Account could not be created. Please try again.");
    }
    if (!link.properties.email_otp) throw new Error("Verification code could not be created.");
    const element = React.createElement(MagicLinkEmail, {
      siteName: "Webgram IT Solution",
      confirmationUrl: link.properties.action_link,
      token: link.properties.email_otp,
    });
    await sendSmtpMail({
      to: data.email,
      subject: "Verify your Webgram guest account",
      html: await render(element),
      text: await render(element, { plainText: true }),
    });
    return { sent: true };
  });
