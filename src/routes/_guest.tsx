import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

// Guest panel gate: any verified signed-in user (admins included). Client-only because the session lives in localStorage.
export const Route = createFileRoute("/_guest")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/guest-login" });
    return { user: data.user };
  },
  component: () => <Outlet />,
});
