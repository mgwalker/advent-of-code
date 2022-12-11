import run from "aocrunner";
import { product, toNumbers } from "utils";

class Monkey {
  static registry = new Map();

  static supermod = 1n;

  constructor(id, startingItems, operation, test, onTrue, onFalse) {
    Monkey.registry.set(id, this);
    this.id = id;
    this.items = [...startingItems].reverse().map((v) => BigInt(v));
    this.operation = operation;
    this.test = test;
    this.onTrue = onTrue;
    this.onFalse = onFalse;
    this.inspections = 0;

    Monkey.supermod *= BigInt(this.test[1]);
  }

  static parse(str) {
    const [idStr, start, op, condition, trueMove, falseMove] = str
      .split("\n")
      .map((s) => s.trim());

    const [, id] = idStr.match(/(\d+):/).map(toNumbers);
    const startingItems = start.match(/(\d+)/g).map(toNumbers);
    const operation = op.match(/new = (\S+) (.) (.+)/).slice(1, 4);
    const test = condition
      .match(/(\S+) by (\d+)/)
      .slice(1, 3)
      .map((v, i) => (i === 1 ? +v : v));
    const [onTrue] = trueMove.match(/(\d+)/).map(toNumbers);
    const [onFalse] = falseMove.match(/(\d+)/).map(toNumbers);

    return new Monkey(id, startingItems, operation, test, onTrue, onFalse);
  }

  catch(item) {
    this.items.unshift(item % Monkey.supermod);
  }

  inspect({ autocalm = true, debug = false } = {}) {
    const p = (s) => (debug ? console.log(s) : null);

    p(`Monkey ${this.id} [${Monkey.supermod}]`);

    let item = this.items.pop();
    while (item) {
      p(`  have item with worry ${item}`);

      this.inspections += 1;
      const [x, op, y] = this.operation.map((v) =>
        v === "old" ? item : Number.isNaN(+v) ? v : BigInt(+v)
      );

      switch (op) {
        case "+":
          item = x + y;
          break;
        case "*":
          item = x * y;
          break;
        default:
          console.log(`unknown operand: ${op}`);
          break;
      }

      p(`    play, increasing worry to ${item}`);

      if (autocalm) {
        item /= 3n;
        p(`    chill; decreasing to ${item}`);
      }

      let testCondition = false;
      switch (this.test[0]) {
        case "divisible": {
          const divisor = BigInt(this.test[1]);
          const prod = item / divisor;
          if (item === prod * divisor) {
            testCondition = true;
          }
          break;
        }

        default:
          console.log(`unknown condition: ${this.test[0]}`);
          break;
      }

      if (testCondition) {
        p(`    condition true; throwing to ${this.onTrue}`);
        Monkey.registry.get(this.onTrue).catch(item);
      } else {
        p(`    condition false; throwing to ${this.onFalse}`);
        Monkey.registry.get(this.onFalse).catch(item);
      }

      item = this.items.pop();
    }
  }
}

const input = (raw) => raw.split("\n\n").map((str) => Monkey.parse(str));

export const part1 = (raw) => {
  const monkeys = input(raw);

  for (let i = 0; i < 20; i += 1) {
    for (const monkey of monkeys) {
      monkey.inspect();
    }
  }

  return monkeys
    .map((m) => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce(product, 1);
};

export const part2 = (raw) => {
  const monkeys = input(raw);

  for (let i = 0; i < 10_000; i += 1) {
    for (const monkey of monkeys) {
      monkey.inspect({ autocalm: false, debug: false });
    }
  }

  return monkeys
    .map((m) => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce(product, 1);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
