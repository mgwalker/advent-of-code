import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((s) => s.split(""));

const seatMap = (array) => array.map((s) => s.join("")).join("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let last = [[]];
  let next = JSON.parse(JSON.stringify(input));

  while (seatMap(last) !== seatMap(next)) {
    last = next;
    next = JSON.parse(JSON.stringify(last));
    for (let row = 0; row < last.length; row += 1) {
      for (let col = 0; col < last[row].length; col += 1) {
        const adjacent = [
          [row - 1, col - 1],
          [row - 1, col],
          [row - 1, col + 1],
          [row, col - 1],
          [row, col + 1],
          [row + 1, col - 1],
          [row + 1, col],
          [row + 1, col + 1],
        ]
          .filter(
            ([r, c]) =>
              r >= 0 && c >= 0 && r < last.length && c < last[row].length,
          )
          .map(([r, c]) => last[r][c])
          .filter((s) => s === "#").length;

        if (last[row][col] === "L" && adjacent === 0) {
          next[row][col] = "#";
        } else if (last[row][col] === "#" && adjacent >= 4) {
          next[row][col] = "L";
        }
      }
    }
  }

  return seatMap(next).replace(/\n/g, "").replace(/[^#]/gi, "").length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let last = [[]];
  let next = JSON.parse(JSON.stringify(input));

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  while (seatMap(last) !== seatMap(next)) {
    last = next;
    next = JSON.parse(JSON.stringify(last));
    for (let row = 0; row < last.length; row += 1) {
      for (let col = 0; col < last[row].length; col += 1) {
        let adjacent = [];
        for (const dir of directions) {
          const [rd, cd] = dir;
          let r = row + rd;
          let c = col + cd;
          while (
            r >= 0 &&
            c >= 0 &&
            r < last.length &&
            c < last[row].length &&
            last[r][c] === "."
          ) {
            r += rd;
            c += cd;
          }
          adjacent.push([r, c]);
        }

        adjacent = adjacent
          .filter(
            ([r, c]) =>
              r >= 0 && c >= 0 && r < last.length && c < last[row].length,
          )
          .map(([r, c]) => last[r][c])
          .filter((s) => s === "#").length;

        if (last[row][col] === "L" && adjacent === 0) {
          next[row][col] = "#";
        } else if (last[row][col] === "#" && adjacent >= 5) {
          next[row][col] = "L";
        }
      }
    }
  }

  return seatMap(next).replace(/\n/g, "").replace(/[^#]/gi, "").length;
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
