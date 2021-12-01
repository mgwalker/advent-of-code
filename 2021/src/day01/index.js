import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split("\n").map(Number);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.filter((v, i) => (i === 0 ? false : v > input[i - 1])).length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return parseInput(rawInput)
    .slice(0, input.length - 2)
    .map((_, i) => input.slice(i, i + 3).reduce((sum, v) => sum + v, 0))
    .filter((v, i, all) => (i === 0 ? false : v > all[i - 1])).length;
};

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
});
