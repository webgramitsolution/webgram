import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const CREDIT_COSTS = { post: 400, comment: 100, indexing: 100, story: 200, share: 10, level: 20 } as const;
export const UNLOCK_LEVELS = 5;

export function errorText(error: unknown) {
  if (error && typeof error === "object" && "message" in error) return String((error as { message: string }).message);
  return "Something went wrong. Please try again.";
}

export function useGuestStatus() {
  const [state, setState] = useState({ balance: 0, levels: 0, email: "", userId: "", loading: true });
  const refresh = useCallback(async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) { setState((s) => ({ ...s, loading: false, userId: "" })); return; }
    const [{ data: balance }, { count }] = await Promise.all([
      supabase.rpc("my_credit_balance"),
      supabase.from("game_progress").select("level", { count: "exact", head: true }).eq("user_id", auth.user.id),
    ]);
    setState({ balance: balance ?? 0, levels: count ?? 0, email: auth.user.email ?? "", userId: auth.user.id, loading: false });
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  return { ...state, unlocked: state.levels >= UNLOCK_LEVELS, refresh };
}

export function useGuestPostCost() {
  const [cost, setCost] = useState<number>(CREDIT_COSTS.post);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    const { data, error } = await supabase.rpc("get_guest_post_cost");
    if (!error && typeof data === "number") setCost(data);
    setLoading(false);
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  return { cost, loading, refresh };
}

export function displayName(email: string) {
  return email.split("@")[0] || "Guest";
}
