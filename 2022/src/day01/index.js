import run from "aocrunner";
import { sum, toNumbers } from "utils";

const input = (raw) =>
  raw.split("\n\n").map((elf) => elf.split("\n").map(toNumbers).reduce(sum));

export const part1 = (raw) => {
  const data = input(raw);
  return Math.max(...data);
};

export const part2 = (raw) => {
  const data = input(raw);
  const top3 = data.sort((a, b) => b - a).slice(0, 3);

  return top3.reduce(sum);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
