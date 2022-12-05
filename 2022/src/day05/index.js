import run from "aocrunner";
import { toNumbers } from "utils";

const input = (raw) => {
  const [stacksMeta, moves] = raw.split("\n\n");

  const stackRows = stacksMeta.split("\n");
  const count = stackRows.pop().match(/\d+/g).length;

  const stacks = new Map([...Array(count)].map((_, i) => [i + 1, []]));

  for (let level = 0; level < stackRows.length; level += 1) {
    const boxes = stackRows[level]
      .match(/(^|\s).{3}/g)
      .map((v) => v.replace(/[\s[\]]/g, ""));

    for (let i = 0; i < boxes.length; i += 1) {
      if (boxes[i].length > 0) {
        stacks.get(i + 1).push(boxes[i]);
      }
    }
  }

  return {
    stacks,
    moves: moves.split("\n").map((v) => v.match(/(\d+)/g).map(toNumbers)),
  };
};

export const part1 = (raw) => {
  const { stacks, moves } = input(raw);

  for (const move of moves) {
    const [count, from, to] = move;

    const movers = stacks.get(from).splice(0, count);
    stacks.get(to).unshift(...movers.reverse());
  }

  return [...stacks].map(([, c]) => c[0]).join("");
};

export const part2 = (raw) => {
  const { stacks, moves } = input(raw);

  for (const move of moves) {
    const [count, from, to] = move;

    const movers = stacks.get(from).splice(0, count);
    stacks.get(to).unshift(...movers);
  }

  return [...stacks].map(([, c]) => c[0]).join("");
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
