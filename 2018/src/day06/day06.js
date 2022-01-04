const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.split(", ").map(Number));

export const part1 = (raw) => {
  const data = input(raw);
  return data.slice(0, 3);
};

export const part2 = (raw) => {
  const data = input(raw);
  return;
};
