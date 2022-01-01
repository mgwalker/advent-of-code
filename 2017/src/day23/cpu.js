export default (instructions, registers) => {
  let ip = 0;

  while (ip < instructions.length) {
    const [inst, a, b] = instructions[ip];
    const av = registers.get(a);
    const bv = registers.get(b);

    switch (inst) {
      case "jnz":
        if (av !== 0) {
          ip = ip + bv - 1;
        }
        break;

      case "mul":
        registers.set(a, av * bv);
        registers.set("mm", registers.get("mm") + 1);
        break;

      case "set":
        registers.set(a, bv);
        break;

      case "sub":
        registers.set(a, av - bv);
        break;

      default:
        throw new Error(`not implemented: ${inst} | ${instructions[ip]}`);
    }

    ip += 1;
  }

  return -1;
};
