import run from "aocrunner";
import fs from "node:fs/promises";
import path from "node:path";

const input = (raw) =>
  raw
    .split("\n")
    .filter((s) => s.length > 0)
    .map((line) => line.split(" ").map((v) => +v));

const isSafe = (levels) => {
  const shifts = levels.slice(1).map((level, i) => level - levels[i]);

  // There must be SOME shift in each level.
  if (shifts.some((v) => v === 0)) {
    return false;
  }

  // All shifts must be in the same direction.
  const negative = shifts[0] < 0 ? -1 : 1;
  if (!shifts.every((v) => v === Math.abs(v) * negative)) {
    return false;
  }

  // All shifts must be between [1,3].
  return shifts.map(Math.abs).every((shift) => shift >= 1 && shift <= 3);
};

export const part1 = async (raw) => {
  const reports = input(raw);

  const safe = reports.filter(isSafe);

  return safe.length;
};

export const part2 = async (raw) => {
  const reports = input(raw);

  const found = [];

  const safe = reports.filter((report) => {
    for (let i = -1; i < report.length; i += 1) {
      const levels = report.filter((_, index) => index !== i);
      if (isSafe(levels)) {
        return true;
      }
    }
    found.push(report.join(" "));

    return false;
  });

  // await fs.writeFile("bob.txt", found.join("\n"));

  return safe.length;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
