import run from "aocrunner";
import { sum } from "utils";

const input = (raw) => raw.split("\n");

const toPriority = (char) => {
  const isUpper = char.toUpperCase() === char;
  const base = char.toLowerCase().charCodeAt(0) - 96;
  return isUpper ? base + 26 : base;
};

const regexFrom = (array) =>
  new RegExp(`(${Array.from(new Set(array)).join("|")})`, "g");

export const part1 = (raw) => {
  const data = input(raw)
    .map((sack) => [
      sack.slice(0, sack.length / 2),
      sack.slice(sack.length / 2),
    ])
    .map(([a, b]) => {
      const r = regexFrom(a.split(""));
      return b.match(r).pop();
    })
    .map(toPriority);

  return data.reduce(sum);
};

export const part2 = (raw) => {
  const data = input(raw);

  const groups = [...Array(data.length / 3)].map(() => []);

  for (let i = 0; i < data.length; i += 1) {
    groups[Math.floor(i / 3)].push(data[i]);
  }

  return groups
    .map(([a, b, c]) => {
      const ra = regexFrom(a.split(""));
      const rb = regexFrom(b.match(ra));

      return c.match(rb).pop();
    })
    .map(toPriority)
    .reduce(sum);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
