import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

// Guest panel gate: any verified signed-in user (admins included). Client-only because the session lives in localStorage.
export const Route = createFileRoute("/_guest")({
  ssr: false,
  beforeLoad: async () => {
    // Loaded on demand so public pages do not download the sign-in client up front.
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/guest-login" });
    return { user: data.user };
  },
  component: () => <Outlet />,
});
