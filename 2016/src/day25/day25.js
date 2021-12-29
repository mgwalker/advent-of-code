const input = (raw) => raw.split("\n").map((v) => v.split(" "));

const run = (instructions, registers) => {
  const outs = [];
  for (let i = 0; i < instructions.length; i += 1) {
    const [instruction, op1, op2] = instructions[i];

    const a = Number.isNaN(+op1) ? registers.get(op1) : +op1;
    const b = Number.isNaN(+op2) ? registers.get(op2) : +op2;

    switch (instruction) {
      case "out":
        {
          outs.push(a);
          if (outs.length > 100) {
            let expect = outs[0];
            return outs.every((c) => {
              const cc = expect;
              expect = expect === 1 ? 0 : 1;
              return c === cc;
            });
          }
        }
        break;
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
  }

  return registers.get("a");
};

export const part1 = (raw) => {
  const instructions = input(raw);

  let i = -1;
  let found = false;
  while (!found) {
    i += 1;
    const registers = new Map([
      ["a", i],
      ["b", 0],
      ["c", 0],
      ["d", 0],
    ]);

    found = run(instructions, registers);
  }
  return i;
};

export const part2 = (raw) => {
  const instructions = input(raw);

  // const registers = new Map([
  //   ["a", 12],
  //   ["b", 0],
  //   ["c", 0],
  //   ["d", 0],
  // ]);

  // return run(instructions, registers);
};
