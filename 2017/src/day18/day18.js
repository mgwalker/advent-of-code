import cpu1 from "./cpu1.js";
import cpu2 from "./cpu2.js";

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.split(" "));

const createRegisters = () => {
  const registers = new Map();

  return {
    get(value) {
      if (!value) {
        return null;
      }
      if (Number.isNaN(+value)) {
        return registers.get(value) ?? 0;
      }
      return +value;
    },

    print() {
      const keys = `|| ${[...registers.keys()]
        .map((v) => v.toString().padEnd(4, " "))
        .join(" | ")} ||`;
      console.log("".padEnd(keys.length, "="));
      console.log(keys);
      console.log("".padEnd(keys.length, "-"));
      console.log(
        `|| ${[...registers.values()]
          .map((v) => v.toString().padStart(4, " "))
          .join(" | ")} ||`
      );
      console.log("".padEnd(keys.length, "="));
      console.log();
    },

    set(register, value) {
      registers.set(register, value);
    },
  };
};

export const part1 = (raw) => {
  const instructions = input(raw);
  const registers = createRegisters();

  return cpu1(instructions, registers);
};

const queue = () => {
  const messages = [];
  let awaiting = null;

  return {
    get length() {
      return messages.length;
    },

    get waiting() {
      return awaiting !== null;
    },

    put(message) {
      messages.unshift(message);
      if (awaiting) {
        awaiting(messages.shift());
        awaiting = null;
      }
    },

    async get() {
      if (messages.length) {
        return messages.pop();
      }
      return new Promise((resolve) => {
        awaiting = resolve;
      });
    },
  };
};

export const part2 = async (raw) => {
  const instructions = input(raw);

  const registers0 = createRegisters();
  const registers1 = createRegisters();

  registers0.set("p", 0);
  registers1.set("p", 1);

  const queue0 = queue(0);
  const queue1 = queue(1);

  let oneSent = 0;

  const get0 = async () => {
    if (queue1.waiting && queue0.length === 0) {
      throw new Error("deadlock");
    }
    return queue0.get();
  };

  const get1 = async () => {
    if (queue0.waiting && queue1.length === 0) {
      throw new Error("deadlock");
    }
    return queue1.get();
  };

  const emit0 = (msg) => {
    queue1.put(msg);
  };
  const emit1 = (msg) => {
    oneSent += 1;
    queue0.put(msg);
  };

  const p0 = cpu2(instructions, registers0, get0, emit0);
  const p1 = cpu2(instructions, registers1, get1, emit1);

  await Promise.any([p0, p1]);

  return oneSent;
};
