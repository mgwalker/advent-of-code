import intcode from "./Intcode.js";

const input = (raw) => raw.trim().split(",").map(Number);

export const part1 = (raw) => {
  const data = input(raw);

  const outputs = intcode(data, [1]);
  const code = outputs.pop();

  if (!outputs.every((v) => v === 0)) {
    console.log([...outputs, code]);
    throw new Error("tests failed");
  }

  return code;
};

export const part2 = (raw) => {
  const data = input(raw);

  const outputs = intcode(data, [5]);
  const code = outputs.pop();

  if (!outputs.every((v) => v === 0)) {
    console.log([...outputs, code]);
    throw new Error("tests failed");
  }

  return code;
};
