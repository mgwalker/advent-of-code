export default (instructions, registers) => {
  let ip = 0;
  let lastSound = -1;

  while (ip < instructions.length) {
    const [inst, a, b] = instructions[ip];
    const av = registers.get(a);
    const bv = registers.get(b);

    switch (inst) {
      case "add":
        registers.set(a, av + bv);
        break;

      case "jgz":
        if (av > 0) {
          ip = ip + bv - 1; // -1 to account for the increment at the end
        }
        break;

      case "mod":
        registers.set(a, av % bv);
        break;

      case "mul":
        registers.set(a, av * bv);
        break;

      case "rcv":
        return lastSound;

      case "set":
        registers.set(a, bv);
        break;

      case "snd":
        lastSound = av;
        break;

      default:
        throw new Error(`not implemented: ${inst} | ${instructions[ip]}`);
    }

    ip += 1;
  }

  return -1;
};
