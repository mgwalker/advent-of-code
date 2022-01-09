import * as ops from "./operations.js";

const input = (raw) => {
  const [top, bottom] = raw.split("\n\n\n");

  return {
    samples: top.split("\n\n").map((block) => {
      const [before, instruction, after] = block.split("\n");

      return {
        before: before
          .replace(/[^\d,]/g, "")
          .split(",")
          .map(Number),
        instruction: instruction.split(" ").map(Number),
        after: after
          .replace(/[^\d,]/g, "")
          .split(",")
          .map(Number),
      };
    }),

    instructions: bottom
      .trim()
      .split("\n")
      .map((l) => l.split(" ").map(Number)),
  };
};

export const part1 = (raw) => {
  const { samples } = input(raw);

  const equal = (reg1, reg2) =>
    reg1[0] === reg2[0] &&
    reg1[1] === reg2[1] &&
    reg1[2] === reg2[2] &&
    reg1[3] === reg2[3];

  let threeOrMore = 0;

  const opFns = Object.values(ops);

  for (const { after, before, instruction } of samples) {
    let possibles = 0;
    for (const op of opFns) {
      if (equal(after, op(instruction, before))) {
        possibles += 1;
        if (possibles === 3) {
          threeOrMore += 1;
          break;
        }
      }
    }
  }

  return threeOrMore;
};

export const part2 = (raw) => {
  const { instructions, samples } = input(raw);

  const equal = (reg1, reg2) =>
    reg1[0] === reg2[0] &&
    reg1[1] === reg2[1] &&
    reg1[2] === reg2[2] &&
    reg1[3] === reg2[3];

  const opFns = Object.entries(ops);
  const matches = new Map(Object.keys(ops).map((op) => [op, new Set()]));

  for (const { after, before, instruction } of samples) {
    for (const [op, fn] of opFns) {
      if (equal(after, fn(instruction, before))) {
        matches.get(op).add(instruction[0]);
      }
    }
  }

  const map = new Map();

  while (matches.size > 0) {
    for (const [op, set] of matches) {
      if (set.size === 1) {
        const code = [...set.values()][0];
        map.set(code, ops[op]);
        matches.delete(op);

        for (const [, s] of matches) {
          s.delete(code);
        }
      }
    }
  }

  let register = [0, 0, 0, 0];
  for (const instruction of instructions) {
    register = map.get(instruction[0])(instruction, register);
  }

  return register[0];
};
