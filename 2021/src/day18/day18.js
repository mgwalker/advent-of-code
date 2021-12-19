import { magnitude, reduce } from "./fns.js";

const input = (raw) => raw.split("\n");

export const part1 = (raw) => {
  const data = input(raw);

  // We only reduce numbers after they are added together. Adding two numbers
  // together just means making the first number the left side of a new pair
  // and the second number is the right side of that same pair. After making
  // the new pair, reduce it before adding the next number.
  let line = data[0];
  for (let i = 1; i < data.length; i += 1) {
    line = reduce(`[${line},${data[i]}]`);
  }

  return magnitude(JSON.parse(line));
};

export const part2 = (raw) => {
  const data = input(raw);

  // Build all the permutations of pairs of snailfish numbers.
  const pairs = [];
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data.length; j += 1) {
      if (i !== j) {
        pairs.push(`[${data[i]},${data[j]}]`);
      }
    }
  }

  // Reduce each pair, then compute their magnitudes, and get the biggest one.
  return Math.max(...pairs.map(reduce).map((s) => magnitude(JSON.parse(s))));
};
