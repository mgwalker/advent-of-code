import run from "aocrunner";
import { product, sum } from "utils";

const input = (raw) =>
  raw
    .trim()
    .split("\n\n")
    .map((pair) => pair.split("\n").map(JSON.parse));

const comparator = (p1, p2) => {
  const queue = [[p1, p2]];

  while (queue.length) {
    const [left, right] = queue.pop();

    if (Array.isArray(left) && Array.isArray(right)) {
      const count = Math.max(left.length, right.length);
      for (let j = count - 1; j >= 0; j -= 1) {
        queue.push([left[j], right[j]]);
      }
    } else if (!Array.isArray(left) && !Array.isArray(right)) {
      // numbers
      if (left < right || left === undefined) {
        return true;
      }
      if (left > right || right === undefined) {
        return false;
      }
    } else {
      // mixed
      if (left === undefined) {
        return true;
      }
      if (right === undefined) {
        return false;
      }

      const newLeft = Array.isArray(left) ? left : [left];
      const newRight = Array.isArray(right) ? right : [right];
      queue.push([newLeft, newRight]);
    }
  }

  return true;
};

export const part1 = (raw) => {
  const packets = input(raw);

  const ordered = packets.map((pair) => comparator(pair[0], pair[1]));

  return ordered
    .map((v, i) => [v, i + 1])
    .filter(([v]) => v)
    .map(([, i]) => i)
    .reduce(sum);
};

export const part2 = (raw) => {
  const data = input(raw);

  const sorter = (p1, p2) => (comparator(p1, p2) ? -1 : 1);

  const sorted = data.flat().sort(sorter);
  const dividers = [[2], [6]].sort(sorter).map((p, j) => {
    for (let i = 0; i < sorted.length; i += 1) {
      if (comparator(p, sorted[i])) {
        return i + 1 + j;
      }
    }
    return null;
  });

  return dividers.reduce(product);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
