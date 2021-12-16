import path from "path";
import { StaticPool } from "node-worker-threads-pool";

const parseInput = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.trim().split("").map(Number));

export const part1 = (raw) => {
  const input = parseInput(raw);

  const lowpoints = [];
  input.forEach((row, r) => {
    row.forEach((location, c) => {
      const adjacent = [
        input[r - 1]?.[c] ?? 9,
        input[r + 1]?.[c] ?? 9,
        row[c - 1] ?? 9,
        row[c + 1] ?? 9,
      ];

      if (location < Math.min(...adjacent)) {
        lowpoints.push(location);
      }
    });
  });

  return lowpoints.map((v) => v + 1).reduce((sum, v) => sum + v, 0);
};

export const part2 = async (raw) => {
  const input = parseInput(raw);

  const workerPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "day09-worker.js",
  );

  const threads = new StaticPool({
    size: 4,
    task: workerPath,
    workerData: input,
  });

  const basins = [];
  await Promise.all(
    input.map((row, r) =>
      Promise.all(
        row.map(async (height, c) => {
          if (height < 9) {
            const basin = await threads.exec({ height, row: r, column: c });
            if (basin) {
              basins.push(basin);
            }
          }
        }),
      ),
    ),
  );

  threads.destroy();

  return basins
    .map((b) => b.length)
    .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))
    .slice(0, 3)
    .reduce((prod, b) => prod * b, 1);
};
