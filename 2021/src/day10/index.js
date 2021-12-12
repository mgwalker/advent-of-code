import run from "aocrunner";

const parseInput = (raw) => raw.trim().split("\n");

const pairs = new Map([
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"],
]);
const closers = new Set(pairs.values());

const isValid = (line) => {
  const closerStack = [];
  for (const char of line) {
    if (closers.has(char)) {
      if (char !== closerStack.pop()) {
        return [false, char];
      }
    } else {
      closerStack.push(pairs.get(char));
    }
  }
  return [true, closerStack];
};

const part1 = (raw) => {
  const input = parseInput(raw);

  const costs = new Map([
    [")", 3],
    ["]", 57],
    ["}", 1197],
    [">", 25137],
  ]);

  return input
    .map(isValid)
    .filter(([valid]) => !valid)
    .map(([, c]) => costs.get(c))
    .reduce((sum, v) => sum + v, 0);
};

const part2 = (raw) => {
  const input = parseInput(raw);

  const costs = new Map([
    [")", 1],
    ["]", 2],
    ["}", 3],
    [">", 4],
  ]);

  const missingClosers = input
    .map(isValid)
    .filter(([valid]) => valid)
    .map(([, neededClosers]) => neededClosers.reverse());

  const scores = [];
  for (const closers of missingClosers) {
    let score = 0;
    for (const closer of closers) {
      score *= 5;
      score += costs.get(closer);
    }
    scores.push(score);
  }

  scores.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
  return scores[Math.floor(scores.length / 2)];

  // 2802519786
  return;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
