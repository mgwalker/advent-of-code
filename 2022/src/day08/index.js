import run from "aocrunner";
import { product, sum, toNumbers } from "utils";

const input = (raw) =>
  raw.split("\n").map((row) => row.split("").map(toNumbers));

export const part1 = (raw) => {
  const heights = input(raw);

  const visibilityFromOutside = [];
  for (let x = 0; x < heights.length; x += 1) {
    const row = [];
    visibilityFromOutside.push(row);
    for (let y = 0; y < heights[x].length; y += 1) {
      const height = heights[x][y];

      const column = heights.flatMap((r) => r.filter((_, i) => i === y));

      const paths = [
        heights[x].slice(0, y) ?? [],
        heights[x].slice(y + 1) ?? [],
        column.slice(0, x) ?? [],
        column.slice(x + 1) ?? [],
      ];

      const visibleFromOutside = paths
        .map((path) => path.every((h) => h < height))
        .some((visibleAlongPath) => visibleAlongPath === true);

      row.push(visibleFromOutside);
    }
  }

  return visibilityFromOutside
    .map((row) => row.filter((vis) => vis === true).length)
    .reduce(sum, 0);
};

export const part2 = (raw) => {
  const heights = input(raw);

  const visibilityScore = [];
  for (let x = 0; x < heights.length; x += 1) {
    const row = [];
    visibilityScore.push(row);

    for (let y = 0; y < heights[x].length; y += 1) {
      const height = heights[x][y];

      const column = heights.flatMap((r) => r.filter((_, i) => i === y));

      const paths = [
        (heights[x].slice(0, y) ?? []).reverse(),
        heights[x].slice(y + 1) ?? [],
        (column.slice(0, x) ?? []).reverse(),
        column.slice(x + 1) ?? [],
      ];

      row.push(
        paths
          .map((path) => {
            const lastTree = path.findIndex((e) => e >= height);
            if (lastTree < 0) {
              return path.length;
            }
            return lastTree + 1;
          })
          .reduce(product, 1)
      );
    }
  }

  return Math.max(...visibilityScore.map((row) => Math.max(...row)));
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
