import * as React from "react";
import { render } from "@react-email/render";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { MagicLinkEmail } from "@/lib/email-templates/magic-link";
import { sendSmtpMail } from "@/lib/smtp.server";

const inputSchema = z.object({
  email: z.string().trim().email().max(255),
  redirectTo: z.string().url().max(500),
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