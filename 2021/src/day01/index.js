import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split("\n").map(Number);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.filter((v, i) => (i === 0 ? false : v > input[i - 1])).length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const windows = [];
  for (let i = 0; i < input.length - 2; i += 1) {
    windows.push(input.slice(i, i + 3).reduce((sum, v) => sum + v, 0));
  }

  return windows.filter((v, i) => (i === 0 ? false : v > windows[i - 1]))
    .length;
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
