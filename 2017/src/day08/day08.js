const input = (raw) => raw.trim().split("\n");

class Registers {
  #_registers = new Map();

  get(reg) {
    return this.#_registers.get(reg) ?? 0;
  }

  set(reg, value) {
    this.#_registers.set(reg, value);
  }

  increment(reg, by) {
    this.#_registers.set(reg, this.get(reg) + by);
  }

  decrement(reg, by) {
    this.increment(reg, -by);
  }

  get values() {
    return [...this.#_registers.values()];
  }

  get registers() {
    return new Map(this.#_registers);
  }
}

const run = (instructions) => {
  const registers = new Registers();
  let maxiMax = -Infinity;

  for (const line of instructions) {
    const [target, func, value, , ifLReg, eq, ifRStr] = line.split(" ");

    const ifLeft = registers.get(ifLReg);
    const ifRight = +ifRStr;

    let go = false;
    switch (eq) {
      case ">":
        go = ifLeft > ifRight;
        break;
      case ">=":
        go = ifLeft >= ifRight;
        break;
      case "<":
        go = ifLeft < ifRight;
        break;
      case "<=":
        go = ifLeft <= ifRight;
        break;
      case "==":
        go = ifLeft === ifRight;
        break;
      case "!=":
        go = ifLeft !== ifRight;
        break;
    }

    if (go) {
      if (func === "inc") {
        registers.increment(target, +value);
      } else {
        registers.decrement(target, +value);
      }
      if (registers.get(target) > maxiMax) {
        maxiMax = registers.get(target);
      }
    }
  }

  return [Math.max(...registers.values), maxiMax];
};

export const part1 = (raw) => {
  const instructions = input(raw);
  return run(instructions)[0];
};

export const part2 = (raw) => {
  const instructions = input(raw);
  return run(instructions)[1];
};
