import { it } from "node:test";
import assert from "node:assert/strict";
import { makeLevel, isComplete, verifyGameSolution, type GameAction } from "./water-sort";

function solveFirstLevel(): GameAction[] {
  const queue = [{ board: makeLevel(0), actions: [] as GameAction[] }];
  const seen = new Set<string>();
  for (let cursor = 0; cursor < queue.length; cursor++) {
    const { board, actions } = queue[cursor]!;
    if (actions.length && isComplete(board)) return actions;
    for (let from = 0; from < board.length; from++) for (let to = 0; to < board.length; to++) {
      const source = board[from]!.colors; const target = board[to]!.colors;
      if (from === to || !source.length || target.length === 4 || (target.length && target.at(-1) !== source.at(-1))) continue;
      const next = board.map((tube) => ({ colors: [...tube.colors] }));
      const color = source.at(-1);
      while (next[from]!.colors.length && next[from]!.colors.at(-1) === color && next[to]!.colors.length < 4) next[to]!.colors.push(next[from]!.colors.pop()!);
      const key = JSON.stringify(next);
      if (seen.has(key)) continue;
      seen.add(key); queue.push({ board: next, actions: [...actions, { from, to }] });
    }
  }
  throw new Error("No solution found");
}

it("rejects level-only and fabricated puzzle claims", () => {
  for (let level = 1; level <= 20; level++) assert.equal(verifyGameSolution(level, [], 0), false);
  assert.equal(verifyGameSolution(1, [{ from: 99, to: 0 }], 0), false);
  assert.equal(verifyGameSolution(1, [{ from: 0, to: 0 }], 0), false);
  assert.equal(verifyGameSolution(21, [{ from: 0, to: 1 }], 0), false);
});
it("replays actual legal puzzle moves before accepting a win", () => {
  const solution = solveFirstLevel();
  assert.equal(verifyGameSolution(1, solution, 0), true);
  assert.equal(verifyGameSolution(1, solution.slice(0, -1), 0), false);
  assert.equal(verifyGameSolution(1, [{ from: 99, to: 0 }, ...solution], 0), false);
});
it("does not accept unpaid extra glasses", () => {
  const solution = solveFirstLevel();
  assert.equal(verifyGameSolution(1, [{ glass: true }, ...solution], 0), false);
  assert.equal(verifyGameSolution(1, [{ glass: true }, ...solution], 1), true);
});