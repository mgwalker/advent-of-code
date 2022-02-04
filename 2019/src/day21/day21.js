import intcode, { InputQueue } from "./Intcode.js";

const input = (raw) =>
  raw
    .trim()
    .split(",")
    .map((v) => BigInt(v));

const instructions = () => {
  const queue = new InputQueue();

  const instruct = (str) => {
    str
      .split("")
      .map((v) => BigInt(v.charCodeAt(0)))
      .forEach((v) => queue.put(v));
    queue.put(10n);
  };

  return { instruct, queue };
};

export const part1 = async (raw) => {
  const data = input(raw);
  const { instruct, queue } = instructions();

  instruct("NOT B J");
  instruct("NOT C T");
  instruct("OR T J");
  instruct("AND D J");
  instruct("  NOT A T");
  instruct("OR T J");
  instruct("WALK");

  const out = (o) => {
    process.stdout.write(String.fromCharCode(Number(o)));
  };

  const result = await intcode(data, queue, out);

  return result.pop();
};

export const part2 = async (raw) => {
  const data = input(raw);
  const { instruct, queue } = instructions();

  instruct("NOT B J");
  instruct("NOT C T");
  instruct("OR T J");
  instruct("AND D J");
  instruct("AND H J");
  instruct("NOT A T");
  instruct("OR T J");
  instruct("RUN");

  const out = (o) => {
    process.stdout.write(String.fromCharCode(Number(o)));
  };

  const result = await intcode(data, queue, out);

  return result.pop();
  return;
};
