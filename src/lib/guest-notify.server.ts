// Server-only: sends "article is live" emails for guest posts whose 30-minute review window has passed.
const SITE_URL = "https://webgramitsolution.com";

export async function notifyDueGuestPosts() {
  // Public blog reads must keep working on deployments that do not provide
  // privileged credentials. Notification delivery is skipped in that case.
  if (!process.env["SUPABASE_URL"] || !process.env["SUPABASE_SERVICE_ROLE_KEY"]) return;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    const { data: due } = await supabaseAdmin
      .from("blog_posts")
      .select("id,title,slug,author_id,author_name")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .is("live_notified_at", null)
      .not("author_id", "is", null)
      .limit(10);
    for (const post of due ?? []) {
      // Claim first so concurrent requests don't double-send.
      const { data: claimed } = await supabaseAdmin.from("blog_posts").update({ live_notified_at: new Date().toISOString() }).eq("id", post.id).is("live_notified_at", null).select("id");
      if (!claimed?.length || !post.author_id) continue;
      const { data: isAdmin } = await supabaseAdmin.rpc("has_role", { _user_id: post.author_id, _role: "admin" });
      if (isAdmin) continue;
      const { data: user } = await supabaseAdmin.auth.admin.getUserById(post.author_id);
      const email = user.user?.email;
      if (!email) continue;
      try {
        await sendTemplateEmail("post-live", email, { templateData: { title: post.title, url: `${SITE_URL}/blog/${post.slug}`, name: post.author_name }, idempotencyKey: `post-live-${post.id}` });
      } catch (error) {
        console.error("post-live email failed", error);
        await supabaseAdmin.from("blog_posts").update({ live_notified_at: null }).eq("id", post.id);
      }
    }
  } catch (error) {
    console.error("notifyDueGuestPosts failed", error);
  }
}
