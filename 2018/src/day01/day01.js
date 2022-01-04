const input = (raw) => raw.trim().split("\n").map(Number);

export const part1 = (raw) => input(raw).reduce((sum, c) => sum + c, 0);

export const part2 = (raw) => {
  const data = input(raw);

  const seen = new Set();

  let frequency = 0;
  let index = 0;
  do {
    frequency += data[index];
    if (seen.has(frequency)) {
      break;
    }
    seen.add(frequency);
    index = (index + 1) % data.length;
  } while (true);

  return frequency;
};
