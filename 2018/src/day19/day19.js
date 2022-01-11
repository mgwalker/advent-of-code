import * as ops from "./operations.js";

const input = (raw) => {
  const [ip, ...instructions] = raw.trim().split("\n");

  return {
    ip: ip.match(/(\d+)/).map(Number)[0],
    instructions: instructions.map((i) => {
      const [op, ...r] = i.split(" ");
      return [op, ...r.map(Number)];
    }),
  };
};

const run = (raw, initial0 = 0) => {
  const { ip, instructions } = input(raw);

  let registers = [initial0, 0, 0, 0, 0, 0];

  for (let i = 0; i < instructions.length; i = registers[ip]) {
    if (i === 1) {
      break;
    }
    const instruction = instructions[i];
    registers = ops[instruction[0]](instruction, registers);
    registers[ip] += 1;
  }

  const target = registers[1];
  const factors = new Set();
  for (let i = 1; i <= target; i += 1) {
    if (target % i === 0) {
      factors.add(i);
    }
  }
  return [...factors].reduce((sum, c) => sum + c, 0);
};

// Basically, the program starts by jumping down several lines, computing a
// number, and then jumping back to the top. Once it comes back to the top, it
// begins computing the sum of the factors of the number it came up with. So
// once we get back to IP=1, we can skip the rest of the program and just
// factorize the number and get the sum directly.
//
// I did not figure this out myself; I found an explanation on reddit:
// https://old.reddit.com/r/adventofcode/comments/a7j9zc/2018_day_19_solutions/ec3id1r/
// Which register to use is input-dependent, but I figured that out by letting
// the program run until it came back to IP=1 and then looked at the registers.
// In my case, register 1 had a giant number in it, so I assumed that was the
// one I was interested in. Turned out I was right. :)

export const part1 = (raw) => run(raw);

export const part2 = (raw) => run(raw, 1);
