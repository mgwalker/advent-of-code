import DefaultMap from "../utils/DefaultMap.js";

export class InputQueue {
  #_messages = [];
  #_awaiting = null;

  get length() {
    return this.#_messages.length;
  }

  get waiting() {
    return this.#_awaiting !== null;
  }

  put(message) {
    this.#_messages.unshift(message);
    if (this.#_awaiting) {
      this.#_awaiting(this.#_messages.shift());
      this.#_awaiting = null;
    }
  }

  async get() {
    if (this.#_messages.length) {
      return this.#_messages.pop();
    }
    return new Promise((resolve) => {
      this.#_awaiting = resolve;
    });
  }
}

export default async (ops, inputQueue, onOutput) => {
  const outputs = [];
  let ip = 0n;
  let rp = 0n;

  const memory = new DefaultMap(0n);
  for (let i = 0; i < ops.length; i += 1) {
    memory.set(BigInt(i), BigInt(ops[i]));
  }

  while (true) {
    const opcode = memory.get(ip);
    const op = opcode % 100n;
    const mode = (opcode / 100n).toString().split("").map(BigInt).reverse();

    const a = memory.get(ip + 1n);
    const b = memory.get(ip + 2n);
    const c = memory.get(ip + 3n);

    const ao = mode[0] === 2n ? a + rp : a;
    const bo = mode[1] === 2n ? b + rp : b;
    const co = mode[2] === 2n ? c + rp : c;

    const [av, bv, cv] = [a, b, c].map((v, i) => {
      const m = mode[i] ?? 0n;
      switch (m) {
        case 0n: // register mode
          return memory.get(v);

        case 1n: // immediate mode
          return v;

        case 2n: // relative mode:
          return memory.get(v + rp);

        default:
          throw new Error(`Unknown mode: ${mode}`);
      }
    });

    switch (op) {
      case 1n: // add
        memory.set(co, av + bv);
        ip += 4n;
        break;

      case 2n: // multiply
        memory.set(co, av * bv);
        ip += 4n;
        break;

      case 3n: // input
        {
          memory.set(ao, await inputQueue.get());
          ip += 2n;
        }
        break;

      case 4n: // output
        if (onOutput) {
          await onOutput(av);
        }
        outputs.push(av);
        ip += 2n;
        break;

      case 5n: // jump-if-true
        if (av !== 0n) {
          ip = bv;
        } else {
          ip += 3n;
        }
        break;

      case 6n: // jump-if-false
        if (av === 0n) {
          ip = bv;
        } else {
          ip += 3n;
        }
        break;

      case 7n: // less than
        memory.set(co, av < bv ? 1n : 0n);
        ip += 4n;
        break;

      case 8n: // equals
        memory.set(co, av === bv ? 1n : 0n);
        ip += 4n;
        break;

      case 9n: // adjust rp
        rp += av;
        ip += 2n;
        break;

      case 99n:
        return outputs;

      default:
        throw new Error(`Unknown op code: ${op}`);
    }
  }
};
