import { it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

it("authorizes administrators before the notification job import", () => {
  const source = readFileSync("src/lib/blog.functions.ts", "utf8");
  const endpoint = source.slice(source.indexOf("export const runDueGuestNotifications"));
  assert.match(endpoint, /middleware\(\[requireSupabaseAuth\]\)/);
  assert.ok(endpoint.indexOf("await requireAdmin(context)") < endpoint.indexOf('import("./guest-notify.server")'));
  assert.doesNotMatch(readFileSync("src/lib/guest.ts", "utf8"), /runDueGuestNotifications/);
});
it("keeps share buttons without claiming sharing credits", () => {
  const source = readFileSync("src/components/blog-engagement.tsx", "utf8");
  assert.match(source, /window\.open\(platform\.url/);
  assert.doesNotMatch(source, /claim_share_bonus|claim_share_reward|SHARE_WAIT/);
});
it("verifies moves before loading the privileged award client", () => {
  const source = readFileSync("src/lib/game.functions.ts", "utf8");
  const handler = source.slice(source.indexOf("export const completeGameAttempt"));
  assert.ok(handler.indexOf("!verifyGameSolution(") < handler.indexOf('import("@/integrations/supabase/client.server")'));
  assert.match(handler, /eq\("user_id", context.userId\)/);
  assert.doesNotMatch(readFileSync("src/routes/_guest.guest.game.tsx", "utf8"), /rpc\("complete_game_level"/);
});