import run from "aocrunner";
import { sum } from "utils";

const input = (raw) => raw.split("\n").map((v) => v.split(" "));

export const part1 = (raw) => {
  const data = input(raw);

  const points = new Map([
    ["X", 1],
    ["Y", 2],
    ["Z", 3],
  ]);

  const type = new Map([
    ["A", "rock"],
    ["X", "rock"],
    ["B", "paper"],
    ["Y", "paper"],
    ["C", "scissors"],
    ["Z", "scissors"],
  ]);

  const scores = data.map(([them, me]) => {
    const a = type.get(them);
    const b = type.get(me);

    let outcome = 3;
    if (a === "rock" && b === "paper") {
      outcome = 6;
    } else if (a === "paper" && b === "scissors") {
      outcome = 6;
    } else if (a === "scissors" && b === "rock") {
      outcome = 6;
    } else if (a !== b) {
      outcome = 0;
    }

    return points.get(me) + outcome;
  });

  return scores.reduce(sum);
};

export const part2 = (raw) => {
  const data = input(raw);

  const neededOutcome = new Map([
    ["X", "lose"],
    ["Y", "draw"],
    ["Z", "win"],
  ]);

  const outcomes = new Map([
    [
      "draw",
      new Map([
        ["A", 1],
        ["B", 2],
        ["C", 3],
      ]),
    ],
    [
      "win",
      new Map([
        ["A", 2],
        ["B", 3],
        ["C", 1],
      ]),
    ],
    [
      "lose",
      new Map([
        ["A", 3],
        ["B", 1],
        ["C", 2],
      ]),
    ],
  ]);

  const points = new Map([
    ["win", 6],
    ["lose", 0],
    ["draw", 3],
  ]);

  return data
    .map(([them, me]) => {
      const need = neededOutcome.get(me);
      const score = outcomes.get(need).get(them);

      return score + points.get(need);
    })
    .reduce(sum);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
