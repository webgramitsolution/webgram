# Guest Posting Panel with Credits and Game

## OTP email note
Your own SMTP server can't be used from this site's backend. OTP codes will go through the built-in sign-in email instead: it works right away and needs no SMTP. It switches to your branded notify.webgramitsolution.com sender once DNS is verified.

## What will be built
1. **Guest register + OTP login** at `/guest/auth`. The guest enters an email and gets a 6-digit code, then enters the code to log in. Admin login stays separate. Admin sign-up stays locked, and guests get a "guest" role only.
2. **Guest dashboard** at `/guest`: credit balance, completed levels, recent activity, and links to every tool.
3. **Water-filling game** at `/guest/game`: 10 levels, 20 credits per level, 200 in total. Each level can only be rewarded once, and the server checks every reward.
4. **Credit rules** (checked on the server):
   - Guests can spend credits only after completing 5 levels.
   - Guest blog post costs 400. Comment costs 100. Instant Indexing costs 100. Web Story costs 200.
   - Sharing a published post earns 10 credits, once per day for each social platform.
5. **Guest blog writing** at `/guest/write`:
   - Posts need at least 800 words, and external links are rejected on the server.
   - A new post goes to "in review" and auto-publishes 30 minutes later.
   - The admin can edit or delete it anytime from the existing admin panel, which gets a new "Guest posts" filter.
   - When a post goes live, the author gets an email with share buttons.
6. **Comments** on `/blog/$slug`: signed-in guests can comment (100 credits). The admin can delete comments.
7. **Share rewards**: share buttons for Facebook, X, LinkedIn and WhatsApp on each article, with 10 credits per platform per day.
8. **Instant Indexing request, Web Story editor, Support tickets**: pages adapted from the package. The admin sees and manages all requests.
9. The design follows the site's current navy/gold look, with the existing header and footer.

## Technical details
- New tables: guest_wallets, credit_ledger (append-only), game_progress, blog_comments, share_rewards (unique per user + platform + day), indexing_requests, web_stories, support_tickets. Guest posts get author_id, a `pending_review` status and `auto_publish_at` added to blog_posts. All tables get grants and row-level security.
- All credit changes go through security-definer SQL functions (`spend_credits`, `award_level`, `award_share`) so the browser can't fake a balance.
- Auto-publish: a pg_cron job runs every 5 minutes and calls a protected route under `/api/public/cron/publish-guest-posts`. That route publishes posts that are due and sends the "published" email through the app email templates.
- Package code is ported from React Router and edge functions to TanStack routes and server functions.
- Email OTP uses Cloud auth `signInWithOtp`. Sign-up is re-enabled only for OTP guests, and admin roles are never granted automatically.
