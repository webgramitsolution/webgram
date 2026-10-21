import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { verifyGameSolution } from "./water-sort";

export const startGameAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ level: z.number().int().min(1).max(20) }).parse(input))
  .handler(async ({ context, data }) => {
    const { data: attempt, error } = await context.supabase.rpc("start_game_attempt", { _level: data.level });
    if (error) throw new Error("Could not start this level. Please try again.");
    return attempt!;
  });

export const completeGameAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({
    attemptId: z.string().uuid(),
    actions: z.array(z.union([
      z.object({ from: z.number().int().min(0).max(100), to: z.number().int().min(0).max(100) }).strict(),
      z.object({ glass: z.literal(true) }).strict(),
    ])).min(1).max(5000),
  }).parse(input))
  .handler(async ({ context, data }) => {
    const { data: attempt, error } = await context.supabase.from("game_attempts")
      .select("id,level,started_at,completed_at").eq("id", data.attemptId).eq("user_id", context.userId).maybeSingle();
    if (error || !attempt || attempt.completed_at) throw new Error("Start a new attempt before claiming this reward.");
    const { count, error: purchaseError } = await context.supabase.from("credit_ledger")
      .select("id", { count: "exact", head: true }).eq("user_id", context.userId)
      .eq("reason", "Extra game glass").eq("amount", -10).gte("created_at", attempt.started_at);
    if (purchaseError || !verifyGameSolution(attempt.level, data.actions, count ?? 0)) {
      throw new Error("Puzzle solution could not be verified. Please complete the level and try again.");
    }
    // Only verified moves reach the privileged, atomic award operation.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: result, error: awardError } = await supabaseAdmin.rpc("award_verified_game_attempt", {
      _attempt_id: attempt.id, _user_id: context.userId,
    });
    if (awardError) throw new Error("Reward could not be saved. Please refresh your progress.");
    return result;
  });