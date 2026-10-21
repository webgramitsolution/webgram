export type Tube = { colors: number[] };
export const LEVELS = [
  { colors: 3, name: "Level 1 (Easy)" }, { colors: 3, name: "Level 2" }, { colors: 4, name: "Level 3" },
  { colors: 4, name: "Level 4" }, { colors: 5, name: "Level 5" }, { colors: 5, name: "Level 6" },
  { colors: 6, name: "Level 7" }, { colors: 6, name: "Level 8" }, { colors: 7, name: "Level 9" },
  { colors: 7, name: "Level 10" }, { colors: 8, name: "Level 11" }, { colors: 8, name: "Level 12" },
  { colors: 9, name: "Level 13" }, { colors: 9, name: "Level 14" }, { colors: 10, name: "Level 15" },
  { colors: 10, name: "Level 16" }, { colors: 11, name: "Level 17" }, { colors: 11, name: "Level 18" },
  { colors: 12, name: "Level 19" }, { colors: 12, name: "Level 20 (Master)" },
] as const;
export const TUBE_CAPACITY = 4;


function randomSequence(seed: number) {
  let value = seed + 1;
  return () => { value = (value * 9301 + 49297) % 233280; return value / 233280; };
}

// Every scramble step records a legal move in reverse, guaranteeing a path back to the solved board.
export function makeLevel(levelIndex: number): Tube[] {
  const config = LEVELS[levelIndex] ?? LEVELS[0];
  const tubes: Tube[] = Array.from({ length: config.colors }, (_, color) => ({ colors: Array(TUBE_CAPACITY).fill(color) }));
  tubes.push({ colors: [] }, { colors: [] });
  const random = randomSequence((levelIndex + 1) * 7919);
  let previousSource = -1;
  let previousTarget = -1;
  for (let step = 0; step < 34 + levelIndex * 3; step += 1) {
    const candidates: Array<[number, number]> = [];
    for (let source = 0; source < tubes.length; source += 1) {
      const from = tubes[source];
      if (!from?.colors.length) continue;
      const color = from.colors[from.colors.length - 1];
      const remainingTop = from.colors[from.colors.length - 2];
      if (remainingTop !== undefined && remainingTop !== color) continue;
      for (let target = 0; target < tubes.length; target += 1) {
        const to = tubes[target];
        if (!to || source === target || to.colors.length >= TUBE_CAPACITY) continue;
        if (source === previousTarget && target === previousSource) continue;
        candidates.push([source, target]);
      }
    }
    const choice = candidates[Math.floor(random() * candidates.length)];
    if (!choice) break;
    const [source, target] = choice;
    const color = tubes[source]?.colors.pop();
    if (color === undefined) continue;
    tubes[target]?.colors.push(color);
    previousSource = source;
    previousTarget = target;
  }
  return tubes.map((tube) => ({ colors: [...tube.colors] }));
}

export function isComplete(tubes: Tube[]) {
  return tubes.every((tube) => tube.colors.length === 0 || (tube.colors.length === TUBE_CAPACITY && tube.colors.every((color) => color === tube.colors[0])));
}

export type GameAction = { from: number; to: number } | { glass: true };

export function verifyGameSolution(level: number, actions: GameAction[], paidGlasses: number) {
  if (!Number.isInteger(level) || level < 1 || level > LEVELS.length || !actions.length || actions.length > 5000) return false;
  const board = makeLevel(level - 1);
  let glasses = 0;
  for (const action of actions) {
    if ("glass" in action) {
      if (action.glass !== true || ++glasses > paidGlasses) return false;
      board.push({ colors: [] });
      continue;
    }
    if (!Number.isInteger(action.from) || !Number.isInteger(action.to) || action.from === action.to) return false;
    const source = board[action.from]?.colors;
    const target = board[action.to]?.colors;
    if (!source?.length || !target || target.length >= TUBE_CAPACITY) return false;
    const color = source[source.length - 1];
    if (target.length && target[target.length - 1] !== color) return false;
    while (source.length && source[source.length - 1] === color && target.length < TUBE_CAPACITY) {
      target.push(source.pop()!);
    }
  }
  return isComplete(board);
}

