const input = (raw) => raw.split("\n").map((v) => v.split("-").map(Number));

const getAllowRanges = (data) => {
  const sorted = data.sort(([a], [b]) => a - b);
  const breaks = [];

  let floor = 0;
  for (let i = 0; i < sorted.length; i += 1) {
    const [min, max] = sorted[i];
    if (max < floor) {
      continue;
    }

    if (min <= floor) {
      floor = max + 1;
    } else {
      breaks.push([floor, min - 1]);
      floor = max + 1;
    }
  }

  return breaks;
};

export const part1 = (raw) => {
  const data = input(raw);
  return getAllowRanges(data)[0][0];
};

export const part2 = (raw) => {
  const data = input(raw);
  return getAllowRanges(data)
    .map(([min, max]) => max - min + 1)
    .reduce((sum, c) => sum + c, 0);
};
