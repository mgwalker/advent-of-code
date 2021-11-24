import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((v) => {
    const rowInfo = v.substr(0, 7);
    const colInfo = v.substr(7, 3);

    const row = parseInt(rowInfo.replace(/b/gi, 1).replace(/f/gi, 0), 2);
    const col = parseInt(colInfo.replace(/r/gi, 1).replace(/l/gi, 0), 2);

    return { row, col, id: row * 8 + col, raw: v };
  });

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return Math.max(...input.map(({ id }) => id));
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const ids = input
    .map(({ id }) => id)
    .sort((a, b) => {
      // default sort is super stupid and converts values into strings first, so
      // if you want an actual numeric sort, you have to do it yourself
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });

  for (let i = 0; i < ids.length - 1; i += 1) {
    if (ids[i] + 1 !== ids[i + 1]) {
      return ids[i] + 1;
    }
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
