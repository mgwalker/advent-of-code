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

  for (let ip = 0; ip < ops.length; ) {
    const [opcode, a, b, c] = ops.slice(ip, ip + 4);
    const op = opcode % 100;

    const mode = Math.floor(opcode / 100)
      .toString()
      .split("")
      .map(Number)
      .reverse();

    const [av, bv, cv] = [a, b, c].map((v, i) => {
      const m = mode[i] ?? 0;
      if (m === 0) {
        return ops[v];
      }
      return v;
    });

    switch (op) {
      case 1: // add
        ops[c] = av + bv;
        ip += 4;
        break;

      case 2: // multiply
        ops[c] = av * bv;
        ip += 4;
        break;

      case 3: // input
        ops[a] = await inputQueue.get();
        ip += 2;
        break;

      case 4: // output
        if (onOutput) {
          await onOutput(av);
        }
        outputs.push(av);
        ip += 2;
        break;

      case 5: // jump-if-true
        if (av !== 0) {
          ip = bv;
        } else {
          ip += 3;
        }
        break;

      case 6: // jump-if-false
        if (av === 0) {
          ip = bv;
        } else {
          ip += 3;
        }
        break;

      case 7: // less than
        ops[c] = av < bv ? 1 : 0;
        ip += 4;
        break;

      case 8: // equals
        ops[c] = av === bv ? 1 : 0;
        ip += 4;
        break;

      case 99:
        return outputs;

      default:
        throw new Error(`Unknown op code: ${op}`);
    }
  }

  return outputs;
};
