import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((v) => v.split("\n"));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const yesAnswers = input.map((group) => {
    const set = new Set();
    group.forEach((person) => {
      person.split("").forEach((v) => set.add(v));
    });
    return set.size;
  });

  return yesAnswers.reduce((sum, v) => sum + v, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const allYes = input.map((group) => {
    const map = new Map();
    group.forEach((person) => {
      const yes = person.split("");
      yes.forEach((a) => {
        if (!map.has(a)) {
          map.set(a, 0);
        }
        map.set(a, map.get(a) + 1);
      });
    });
    return Array.from(map).filter(([, v]) => v === group.length).length;
  });

  return allYes.reduce((sum, v) => sum + v, 0);
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
