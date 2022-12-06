import run from "aocrunner";

const input = (raw) => raw.split("");

const findUniqueSequence = (data, len) => {
  let index = 0;
  while (index <= data.length - len) {
    const unique = new Set(data.slice(index, index + len));

    if (unique.size === len) {
      break;
    }
    index += 1;
  }

  return index + len;
};

export const part1 = (raw) => {
  const data = input(raw);
  return findUniqueSequence(data, 4);
};

export const part2 = (raw) => {
  const data = input(raw);
  return findUniqueSequence(data, 14);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
