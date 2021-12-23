const input = (raw) => raw.split("\n").map((v) => v.split(" "));

const run = (instructions, registers) => {
  for (let i = 0; i < instructions.length; i += 1) {
    const [instruction, op1, op2] = instructions[i];

    switch (instruction) {
      case "cpy":
        const value = Number.isNaN(+op1) ? registers.get(op1) : +op1;
        registers.set(op2, value);
        break;

      case "inc":
        registers.set(op1, registers.get(op1) + 1);
        break;

      case "dec":
        registers.set(op1, registers.get(op1) - 1);
        break;

      case "jnz":
        if (registers.get(op1) !== 0) {
          i += +op2 - 1; // subtract one because the loop iterator adds one
        }
        break;
    }
  }

  return registers.get("a");
};

export const part1 = (raw) => {
  const instructions = input(raw);

  const registers = new Map([
    ["a", 0],
    ["b", 0],
    ["c", 0],
    ["d", 0],
  ]);

  return run(instructions, registers);
};

export const part2 = (raw) => {
  const instructions = input(raw);

  const registers = new Map([
    ["a", 0],
    ["b", 0],
    ["c", 1],
    ["d", 0],
  ]);

  return run(instructions, registers);
};
