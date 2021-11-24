import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((v) => +v);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let n = input.pop();
  while (input.length) {
    const x = input.filter((v) => n + v === 2020).pop();
    if (x) {
      return n * x;
    }
    n = input.pop();
  }
  return -1;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let n = input.pop();
  while (input.length) {
    const x = input.filter((v) => n + v < 2020);
    let m = x.pop();
    while (m) {
      const y = input.filter((v) => n + m + v === 2020).pop();
      if (y) {
        return n * m * y;
      }
      m = x.pop();
    }
    n = input.pop();
  }
  return -1;
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
