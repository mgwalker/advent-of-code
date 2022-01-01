import { flipHorizontal, flipVertical, print, rotate } from "./grid.js";

const numFromGrid = (grid) => {
  const bin = grid
    .map((r) => r.join(""))
    .join("")
    .replace(/\./g, "0")
    .replace(/#/g, "1");
  return parseInt(bin, 2);
};

const input = (raw) => {
  const rawRules = raw
    .trim()
    .split("\n")
    .map((v) => v.split(" => "));

  const rules2x2 = new Map();
  const rules3x3 = new Map();

  // eslint-disable-next-line no-unreachable-loop
  for (const [rawRule, rawOutput] of rawRules) {
    const output = rawOutput.split("/").map((v) => v.split(""));
    let ruleGrid = rawRule.split("/").map((v) => v.split(""));

    const target = ruleGrid.length === 2 ? rules2x2 : rules3x3;

    for (let i = 0; i < 4; i += 1) {
      ruleGrid = rotate(ruleGrid);
      target.set(numFromGrid(ruleGrid), output);
      target.set(numFromGrid(flipHorizontal(ruleGrid)), output);
      target.set(numFromGrid(flipVertical(ruleGrid)), output);
    }
  }

  return { rules2x2, rules3x3 };
};

const splitInto = (grid, nxn) => {
  if (grid.length % nxn !== 0 || grid[0].length % nxn !== 0) {
    throw new Error(`grid must be a multiple of ${nxn}x${nxn}`);
  }

  const grids = [];
  for (let g = 0; g < grid.length / nxn; g += 1) {
    const rStart = nxn * g;
    const gridsRow = [];

    for (let g1 = 0; g1 < grid.length / nxn; g1 += 1) {
      const newGrid = [];
      for (let r = rStart; r < rStart + nxn; r += 1) {
        const row = [];
        for (let c = nxn * g1; c < nxn * (g1 + 1); c += 1) {
          row.push(grid[r][c]);
        }
        newGrid.push(row);
      }
      gridsRow.push(newGrid);
    }
    grids.push(gridsRow);
  }

  return grids;
};

const smooshTogether = (grids) => {
  const grid = [];
  for (const row of grids) {
    for (let c = 0; c < row[0][0].length; c += 1) {
      const newRow = [];
      for (const g of row) {
        newRow.push(...g[c]);
      }
      grid.push(newRow);
    }
  }
  return grid;
};

const processImage = (image, rules2x2, rules3x3) => {
  const n = image.length % 2 === 0 ? 2 : 3;
  const rules = n === 2 ? rules2x2 : rules3x3;

  const splits = splitInto(image, n);

  for (let y = 0; y < splits.length; y += 1) {
    for (let x = 0; x < splits.length; x += 1) {
      const nn = numFromGrid(splits[y][x]);
      if (!rules.has(nn)) {
        print(splits[y][x]);

        console.log(`no rule for ${nn}`);
        throw new Error("!");
      }
      splits[y][x] = rules.get(nn);
    }
  }

  return smooshTogether(splits);
};

export const part1 = async (raw) => {
  const { rules2x2, rules3x3 } = input(raw);

  let image = [
    [".", "#", "."],
    [".", ".", "#"],
    ["#", "#", "#"],
  ];

  for (let i = 0; i < 5; i += 1) {
    image = processImage(image, rules2x2, rules3x3);
  }

  return image
    .map((row) => row.filter((v) => v === "#").length)
    .reduce((sum, c) => sum + c, 0);
};

export const part2 = (raw) => {
  const { rules2x2, rules3x3 } = input(raw);

  let image = [
    [".", "#", "."],
    [".", ".", "#"],
    ["#", "#", "#"],
  ];

  for (let i = 0; i < 18; i += 1) {
    image = processImage(image, rules2x2, rules3x3);
  }

  return image
    .map((row) => row.filter((v) => v === "#").length)
    .reduce((sum, c) => sum + c, 0);
};
