import intcode, { InputQueue } from "./Intcode.js";

const input = (raw) => raw.trim().split(",").map(Number);

export const part1 = async (raw) => {
  const ops = input(raw);

  const inputs = new InputQueue();
  inputs.put(1n);

  const output = await intcode(ops, inputs);
  return output[0];
};

export const part2 = async (raw) => {
  const ops = input(raw);

  const inputs = new InputQueue();
  inputs.put(2n);

  const output = await intcode(ops, inputs);
  return output[0];
};
