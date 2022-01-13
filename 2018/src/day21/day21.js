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

const run1 = (ip, instructions, initial0 = 0) => {
  let registers = [initial0, 0, 0, 0, 0, 0];

  for (let i = 0; i < instructions.length; i = registers[ip]) {
    if (i === 28) {
      return registers[3];
    }
    const instruction = instructions[i];
    registers = ops[instruction[0]](instruction, registers);
    registers[ip] += 1;
  }

  return -1;
};

const run2 = (ip, instructions, initial0 = 0) => {
  let registers = [initial0, 0, 0, 0, 0, 0];

  let lastR3 = 0;
  const threes = new Set();
  for (let i = 0; i < instructions.length; i = registers[ip]) {
    if (i === 28) {
      if (threes.has(registers[3])) {
        return lastR3;
      }
      threes.add(registers[3]);
      lastR3 = registers[3];
    }
    const instruction = instructions[i];
    registers = ops[instruction[0]](instruction, registers);
    registers[ip] += 1;
  }

  return -1;
};

export const part1 = (raw) => {
  const { ip, instructions } = input(raw);

  // By observation, the program only exits when register 0 equals register 3 on
  // IP=28. So for the first part, we just run the program until IP=28 and check
  // the value of register 3. If register 0 is initialized with that value, we
  // will drop out of the bottom on the first pass, which is necessarily the
  // fewest number of instructions.
  return run1(ip, instructions);
};

export const part2 = (raw) => {
  const { ip, instructions } = input(raw);

  // In this case, watch register 3 for a loop. Whenever it loops, the value we
  // want is the last unique one. This one takes a while and there's just no way
  // around it.
  return run2(ip, instructions);
};
