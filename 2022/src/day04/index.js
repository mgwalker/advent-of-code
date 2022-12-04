import run from "aocrunner";
import { toNumbers } from "utils";

const input = (raw) =>
  raw
    .split("\n")
    .map((pair) =>
      pair.split(",").map((range) => range.split("-").map(toNumbers))
    );

export const part1 = (raw) => {
  const data = input(raw).filter(([[a1, a2], [b1, b2]]) => {
    if (a1 >= b1 && a2 <= b2) {
      return true;
    }
    if (b1 >= a1 && b2 <= a2) {
      return true;
    }
    return false;
  });

  return data.length;
};

export const part2 = (raw) => {
  const data = input(raw).filter(([[a1, a2], [b1, b2]]) => {
    if (a1 >= b1 && a1 <= b2) {
      return true;
    }
    if (a2 >= b1 && a2 <= b2) {
      return true;
    }
    if (b1 >= a1 && b1 <= a2) {
      return true;
    }
    if (b2 >= a1 && b2 <= a2) {
      return true;
    }

    return false;
  });

  return data.length;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
