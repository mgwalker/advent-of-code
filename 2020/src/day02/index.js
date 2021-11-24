import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((v) => {
    const [range, letter, password] = v.replace(/([a-z]): /, "$1 ").split(" ");
    const [low, high] = range.split("-").map((v) => +v);
    return {
      high,
      letter,
      low,
      password,
    };
  });

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.filter(({ high, low, letter, password }) => {
    const letters = password.replace(
      new RegExp(`[^${letter}]`, "g"),
      "",
    ).length;
    return letters >= low && letters <= high;
  }).length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.filter(({ high, low, letter, password }) => {
    const one = password[low - 1] === letter;
    const two = password[high - 1] === letter;
    return (one && !two) || (two && !one);
  }).length;
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
