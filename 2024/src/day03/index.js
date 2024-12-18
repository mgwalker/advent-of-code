import run from "aocrunner";

const input = (raw) => raw;

export const part1 = (raw) => {
  const data = input(raw);
  return data
    .match(/mul\(\d{1,3},\d{1,3}\)/gi)
    .map((mul) =>
      mul
        .match(/\d{1,3}/g)
        .map((v) => +v)
        .reduce((product, next) => product * next, 1),
    )
    .reduce((sum, next) => sum + next, 0);
};

export const part2 = (raw) => {
  const instructions = input(raw).match(
    /(do|don't|mul)\((\d{1,3},\d{1,3})?\)/g,
  );
  let enabled = true;
  const muls = instructions.filter((instruction) => {
    if (instruction.startsWith("mul(")) {
      return enabled;
    }
    if (instruction === "don't()") {
      enabled = false;
    }
    if (instruction === "do()") {
      enabled = true;
    }
  });

  return muls
    .map((mul) =>
      mul
        .match(/\d{1,3}/g)
        .map((v) => +v)
        .reduce((product, next) => product * next, 1),
    )
    .reduce((sum, next) => sum + next, 0);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
