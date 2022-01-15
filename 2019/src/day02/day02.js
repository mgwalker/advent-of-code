import intcode from "./Intcode.js";

const input = (raw) => raw.trim().split(",").map(Number);

export const part1 = (raw) => {
  const ops = input(raw);
  ops[1] = 12;
  ops[2] = 2;

  intcode(ops);

  return ops[0];
};

export const part2 = (raw) => {
  const initial = input(raw);

  const target = 19_690_720;
  let noun = 0;
  let verb = 0;

  do {
    noun += 1;
    const ops = [...initial];
    ops[1] = noun;
    ops[2] = verb;
    intcode(ops);

    if (ops[0] > target - 100) {
      break;
    }
  } while (true);

  do {
    verb += 1;
    const ops = [...initial];
    ops[1] = noun;
    ops[2] = verb;
    intcode(ops);

    if (ops[0] === target) {
      break;
    }
  } while (true);

  return 100 * noun + verb;
};
