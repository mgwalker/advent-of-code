import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let column = 0;
  let trees = 0;

  for (let row = 1; row < input.length; row++) {
    column = (column + 3) % input[row].length;
    if (input[row][column] === "#") {
      trees += 1;
    }
  }

  return trees;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  let allTrees = [];

  slopes.forEach(([right, down]) => {
    let trees = 0;

    let column = 0;
    for (let row = down; row < input.length; row += down) {
      column = (column + right) % input[row].length;
      if (input[row][column] === "#") {
        trees += 1;
      }
    }

    allTrees.push(trees);
  });

  return allTrees.reduce((p, v) => p * v, 1);
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
