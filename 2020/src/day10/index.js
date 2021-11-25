import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((v) => +v)
    .sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  input.unshift(0);
  input.push(input[input.length - 1] + 3);

  const jumps = { 1: 0, 2: 0, 3: 0 };

  for (let i = 1; i < input.length; i++) {
    jumps[input[i] - input[i - 1]] += 1;
  }

  return jumps[1] * jumps[3];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).reverse();
  input.push(0);

  const pathsForward = new Map();

  for (const jolt of input) {
    const nexts = input.filter((v) => v > jolt && v < jolt + 4);
    if (nexts.length === 0) {
      pathsForward.set(jolt, 1);
      continue;
    }

    const nextPathDepths = nexts.map((nextJolt) => pathsForward.get(nextJolt));
    pathsForward.set(
      jolt,
      nextPathDepths.reduce((sum, j) => sum + j, 0),
    );
  }

  return pathsForward.get(0);
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
