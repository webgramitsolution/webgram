import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, streamText } from "ai";

export type ProjectAdvice = {
  summary: string;
  services: Array<{ name: string; reason: string }>;
  nextSteps: string[];
};

export type AdvisorResult = { ok: true; advice: ProjectAdvice } | { ok: false; error: string };

const SYSTEM = `You are the project advisor for Webgram IT Solution, a Delhi NCR web and digital commerce agency.
Services offered: Ecommerce Development, B2B Commerce Portals, Marketplace Development, Custom Commerce Platforms, Website Development, WordPress/WooCommerce, Shopify, API Integration, Website Maintenance, Speed Optimization, SEO, Google Ads, Google My Business Listing, Social Media Ads.
Recommend only from this list. Reply with JSON only, no markdown, shaped as:
{"summary": string (1 sentence), "services": [{"name": string, "reason": string (max 20 words)}] (2-4 items), "nextSteps": [string] (3 short steps)}`;

export async function recommendServices(input: {
  needs: string;
  projectType?: string | undefined;
  budget?: string | undefined;
}): Promise<AdvisorResult> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return { ok: false, error: "AI suggestions are not configured yet." };

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: SYSTEM,
      prompt: `Project type: ${input.projectType || "not specified"}\nBudget: ${input.budget || "not specified"}\nNeeds: ${input.needs}`,
      maxRetries: 0,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    const text = await result.text;
    const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const advice = JSON.parse(json) as ProjectAdvice;
    if (!Array.isArray(advice.services) || !Array.isArray(advice.nextSteps))
      throw new Error("Bad shape");
    return { ok: true, advice };
  } catch (error) {
    console.error("Project advisor failed", error);
    if (APICallError.isInstance(error)) {
      if (error.statusCode === 429)
        return { ok: false, error: "Too many requests right now. Please try again in a minute." };
      if (error.statusCode === 402)
        return { ok: false, error: "AI suggestions are temporarily unavailable." };
    }
    return {
      ok: false,
      error: "We couldn't generate suggestions. Please send your message and our team will reply.",
    };
  }
}
