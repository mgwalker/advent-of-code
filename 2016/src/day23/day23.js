const input = (raw) => raw.split("\n").map((v) => v.split(" "));

const run = (instructions, registers) => {
  for (let i = 0; i < instructions.length; i += 1) {
    const [instruction, op1, op2] = instructions[i];

    const a = Number.isNaN(+op1) ? registers.get(op1) : +op1;
    const b = Number.isNaN(+op2) ? registers.get(op2) : +op2;

    // console.log(
    //   `${i.toString().padStart(2, " ")}) ${instruction} ${op1}[${a}] ${
    //     op2 ? `${op2}[${b}]` : ""
    //   }`
    // );

    switch (instruction) {
      case "tgl":
        {
          if (i + a >= instructions.length) {
            break;
          }

          if (instructions[i + a].length === 2) {
            if (instructions[i + a][0] === "inc") {
              instructions[i + a][0] = "dec";
            } else {
              instructions[i + a][0] = "inc";
            }
          } else {
            if (instructions[i + a][0] === "jnz") {
              instructions[i + a][0] = "cpy";
            } else {
              instructions[i + a][0] = "jnz";
            }
          }
        }
        break;

      case "cpy":
        {
          registers.set(op2, a);
        }
        break;

      case "inc":
        registers.set(op1, a + 1);
        break;

      case "dec":
        registers.set(op1, a - 1);
        break;

      case "jnz":
        if (a !== 0) {
          i += b - 1; // subtract one because the loop iterator adds one
        }
        break;
    }
    // console.log("   ", [...registers.values()]);
  }

  return registers.get("a");
};

export const part1 = (raw) => {
  const instructions = input(raw);

  const registers = new Map([
    ["a", 7],
    ["b", 0],
    ["c", 0],
    ["d", 0],
  ]);

  return run(instructions, registers);
};

export const part2 = (raw) => {
  const instructions = input(raw);

  const registers = new Map([
    ["a", 12],
    ["b", 0],
    ["c", 0],
    ["d", 0],
  ]);

  return run(instructions, registers);
};
