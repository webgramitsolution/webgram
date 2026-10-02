# Exact WaterSortGame Integration

## What will change
1. Replace the current hold-to-fill game at `/guest/game` with the supplied 20-level bottle sorting game.
2. Preserve the supplied visual design: credit summary, level/score/credit controls, glass bottles, level picker, and responsive layout.
3. Keep the existing Webgram guest sidebar, logo, login gate, and navigation so the rest of the guest portal does not break.
4. Add working bottle selection and pour rules, move history with Undo, Restart, previous/next level controls, win state, and sound feedback.
5. Award 20 credits once per completed level through the existing protected credit system; replaying a completed level will not award credits twice.
6. Adapt the game to the existing guest database instead of copying the ZIP’s incompatible authentication and database files.
7. Verify the real signed-in guest flow on desktop, tablet, and phone, including level completion and saved credits.

## Technical details
- Port `GuestGame.tsx` into the existing TanStack route rather than adding React Router.
- Use existing semantic color tokens and Webgram UI components while matching the reference composition.
- Generate solvable starting boards by scrambling completed bottles, avoiding random unsolvable states.
- Update the 10-level labels/progress displays to 20 levels wherever this game exposes them.
- Keep all credit mutations server-validated by the current `complete_game_level` database function.
