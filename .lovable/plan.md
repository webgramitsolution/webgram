# Water Sort Game and Dashboard Shell Rebuild

## What will change
1. Rebuild the guest desktop/tablet shell to match the reference: the left sidebar starts directly beneath and touches the header, has no outer page gap, remains fixed while content scrolls, and never shows its own scrollbar.
2. Apply the same desktop/tablet shell language to administrator screens: flush fixed sidebar, bright workspace, compact header area, consistent spacing, and content-only scrolling. Phone layouts remain compact and usable without forcing the desktop sidebar onscreen.
3. Give `/guest/game` a three-column desktop/tablet composition: fixed left navigation, central Water Sort board, and a fixed right advertisement rail. The game center will use the available width without unnecessary outer padding.
4. Match the reference game header with only Level, Moves, and Credits. Remove Score and all score calculations/copy.
5. Refine the bottles into clearer glass tubes with proper rim, transparency, layered liquid, depth, selection lift, and lightweight pour feedback.
6. Add 20 lightweight animated level environments. Each level gets a distinct background variation, using CSS motion and reusable decorative layers rather than heavy video or large images; reduced-motion devices receive a static version.
7. Keep all 20 levels sequential, with Prev, level selector, Next, Undo, Restart, sound, and extra-glass purchase controls.
8. Change first-completion rewards to the selected progression: levels 1–3 earn 20 credits, 4–6 earn 30, 7–9 earn 40, 10–12 earn 50, 13–15 earn 60, 16–18 earn 70, and 19–20 earn 80. Replays earn nothing.
9. After a win, show a skippable advertisement/continue panel before the next level begins. Closing or skipping it reveals/starts Next Level; clicking an ad is never required. The permanent right rail uses the existing approved, consent-gated ad slot.
10. Update guest credit summaries and help text so they describe increasing rewards rather than a flat 20-credit rate.

## Technical details
- Update the shared guest and admin shells so tablet and desktop use the same reference-led structure; preserve existing routes, permissions, navigation, and forms.
- Keep mobile navigation accessible and prevent horizontal overflow; do not add a sidebar scrollbar on any size.
- Update the protected level-completion database function so reward calculation and ledger writes remain atomic, sequential, and replay-safe.
- Replace randomly shuffled boards with deterministic, verified-solvable level layouts or reverse-legal scrambles before treating all 20 levels as playable.
- Use semantic design tokens and existing controls; the uploaded screenshot is visual reference only and will not be embedded.
- Verify authenticated guest gameplay, Undo/Restart, the win-to-ad-to-next flow, reward tiers, and desktop/tablet/phone rendering. Verify admin and guest dashboards visually and confirm no build/runtime errors.

## Safety and ad behavior
- The win panel may show an ad only when consent and ad delivery permit it; otherwise it shows a reserved sponsorship panel with the same Skip/Continue flow.
- Credit rewards depend only on solving the level, never on viewing or clicking an advertisement.
