const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.replace(/\s/g, " ").split(" ").map(Number));

export const part1 = (raw) =>
  input(raw).reduce((sum, row) => sum + Math.max(...row) - Math.min(...row), 0);

export const part2 = (raw) => {
  const data = input(raw);

  const divisions = data.map((row) => {
    for (let i = 0; i < row.length; i += 1) {
      for (let j = i + 1; j < row.length; j += 1) {
        if (row[i] % row[j] === 0) {
          return row[i] / row[j];
        }
        if (row[j] % row[i] === 0) {
          return row[j] / row[i];
        }
      }
    }
    return 0;
  });

  return divisions.reduce((sum, c) => sum + c, 0);
};
