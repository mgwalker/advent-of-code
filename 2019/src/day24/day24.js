import DefaultMap from "../utils/DefaultMap.js";
import { range, reduceSum } from "../utils/index.js";

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => v.split(""));

export const part1 = (raw) => {
  let bugs = input(raw);

  const layoutStr = (layout) => layout.map((row) => row.join("")).join("");

  const seenLayouts = new Set();

  do {
    seenLayouts.add(layoutStr(bugs));
    const newBugs = [];
    for (let y = 0; y < bugs.length; y += 1) {
      newBugs.push([]);
      for (let x = 0; x < bugs[y].length; x += 1) {
        const space = bugs[y][x];

        const adjacent = [
          [x, y - 1],
          [x - 1, y],
          [x + 1, y],
          [x, y + 1],
        ]
          .filter(
            ([xx, yy]) =>
              xx >= 0 && yy >= 0 && xx < bugs[y].length && yy < bugs.length,
          )
          .map(([xx, yy]) => bugs[yy][xx])
          .filter((v) => v === "#");

        if (space === "#") {
          if (adjacent.length === 1) {
            newBugs[y].push("#");
          } else {
            newBugs[y].push(".");
          }
        } else if (adjacent.length === 1 || adjacent.length === 2) {
          newBugs[y].push("#");
        } else {
          newBugs[y].push(".");
        }
      }
    }

    bugs = newBugs;
  } while (!seenLayouts.has(layoutStr(bugs)));

  return bugs
    .flat()
    .map((v, i) => (v === "#" ? 2 ** i : 0))
    .reduce(reduceSum, 0);
};

export const part2 = (raw) => {
  let bugs = new DefaultMap(() => [
    ".....".split(""),
    ".....".split(""),
    "..?..".split(""),
    ".....".split(""),
    ".....".split(""),
  ]);
  const initial = input(raw);
  initial[2][2] = "?";
  bugs.set(0, initial);

  const getNeighbors = (x, y, z) =>
    [
      [x, y - 1, z],
      [x - 1, y, z],
      [x + 1, y, z],
      [x, y + 1, z],
    ].flatMap(([xx, yy, zz]) => {
      if (xx === 2 && yy === 2) {
        if (x === 1) {
          return [
            [0, 0, zz - 1],
            [0, 1, zz - 1],
            [0, 2, zz - 1],
            [0, 3, zz - 1],
            [0, 4, zz - 1],
          ];
        }

        if (x === 3) {
          return [
            [4, 0, zz - 1],
            [4, 1, zz - 1],
            [4, 2, zz - 1],
            [4, 3, zz - 1],
            [4, 4, zz - 1],
          ];
        }

        if (y === 1) {
          return [
            [0, 0, zz - 1],
            [1, 0, zz - 1],
            [2, 0, zz - 1],
            [3, 0, zz - 1],
            [4, 0, zz - 1],
          ];
        }

        return [
          [0, 4, zz - 1],
          [1, 4, zz - 1],
          [2, 4, zz - 1],
          [3, 4, zz - 1],
          [4, 4, zz - 1],
        ];
      }
      if (xx >= 0 && yy >= 0 && xx < 5 && yy < 5) {
        return [[xx, yy, zz]];
      }

      const neighbors = [];

      if (xx < 0) {
        neighbors.push([2 + xx, 2, zz + 1]);
      }

      if (xx >= 5) {
        neighbors.push([3, 2, zz + 1]);
      }

      if (yy < 0) {
        neighbors.push([2, 2 + yy, zz + 1]);
      }

      if (yy >= 5) {
        neighbors.push([2, 3, zz + 1]);
      }

      return neighbors;
    });

  const oneMinute = (withBugs) => {
    const newBugs = new DefaultMap(() => [
      ".....".split(""),
      ".....".split(""),
      "..?..".split(""),
      ".....".split(""),
      ".....".split(""),
    ]);

    const start = Math.min(...bugs.keys()) - 1;
    const stop = Math.max(...bugs.keys()) + 1;

    for (let z = start; z <= stop; z += 1) {
      for (let y = 0; y < 5; y += 1) {
        for (let x = 0; x < 5; x += 1) {
          // 2,2 isn't a location, it's a portal
          if (x === 2 && y === 2) {
            continue; // eslint-disable-line no-continue
          }

          const spot = withBugs.get(z)[y][x];
          const adjacentBugs = getNeighbors(x, y, z)
            .map(([xx, yy, zz]) => withBugs.get(zz)[yy][xx])
            .filter((v) => v === "#").length;

          newBugs.get(z);
          if (spot === "#" && adjacentBugs === 1) {
            newBugs.get(z)[y][x] = "#";
          } else if (
            spot === "." &&
            (adjacentBugs === 1 || adjacentBugs === 2)
          ) {
            newBugs.get(z)[y][x] = "#";
          }
        }
      }
    }

    for (const [z, level] of newBugs) {
      if (level.flat().filter((v) => v === "#").length === 0) {
        newBugs.delete(z);
      }
    }

    return newBugs;
  };

  for (const _ of range(200)) {
    bugs = oneMinute(bugs);
  }

  return [...bugs]
    .map(([, level]) => level.flat().filter((v) => v === "#").length)
    .reduce(reduceSum, 0);
};
