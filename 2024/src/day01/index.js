import { readFile } from "node:fs/promises";
import { join } from "node:path";
import run from "aocrunner";

const input = (raw) => raw.split("\n").filter((v) => v.length > 0);

export async function part1(raw) {
  const lists = [[], []];
  input(raw)
    .map((line) => {
      const [, list1, list2] = line.match(/^(\d+)\s+(\d+)$/);
      return [+list1, +list2];
    })
    .forEach(([item1, item2]) => {
      lists[0].push(item1);
      lists[1].push(item2);
    });

  const sort = (a, b) => a - b;
  lists[0].sort(sort);
  lists[1].sort(sort);

  return lists[0]
    .map((item1, i) => Math.abs(item1 - lists[1][i]))
    .reduce((sum, distance) => sum + distance, 0);
}
export async function part2(raw) {
  const list = [];
  const frequency = new Map();
  input(raw).forEach((line) => {
    const [, list1, list2] = line.match(/^(\d+)\s+(\d+)$/);
    const value1 = +list1;
    const value2 = +list2;
    if (!frequency.has(value1)) {
      frequency.set(value1, 0);
    }
    if (!frequency.has(value2)) {
      frequency.set(value2, 0);
    }
    frequency.set(value2, frequency.get(value2) + 1);
    list.push(value1);
  });
  return list.reduce((sum, value) => sum + value * frequency.get(value), 0);
}

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
