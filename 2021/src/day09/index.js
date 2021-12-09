import run from "aocrunner";

const parseInput = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.trim().split("").map(Number));

const part1 = (raw) => {
  const input = parseInput(raw);

  const lowpoints = [];
  input.forEach((row, r) => {
    row.forEach((location, c) => {
      const above = input[r - 1]?.[c] ?? 9;
      const below = input[r + 1]?.[c] ?? 9;
      const left = row[c - 1] ?? 9;
      const right = row[c + 1] ?? 9;

      if (
        location < above &&
        location < below &&
        location < left &&
        location < right
      ) {
        lowpoints.push(location);
      }
    });
  });

  return lowpoints.map((v) => v + 1).reduce((sum, v) => sum + v, 0);
};

const part2 = (raw) => {
  const input = parseInput(raw);
  let data = [];

  const getAdjacent = (row, column) => {
    const above = data[row - 1]?.[column] ?? 9;
    const below = data[row + 1]?.[column] ?? 9;
    const left = data[row]?.[column - 1] ?? 9;
    const right = data[row]?.[column + 1] ?? 9;
    return { above, below, left, right };
  };

  const getBasin = (row, column) => {
    const basin = [];
    const height = data[row]?.[column] ?? 9;

    if (height < 9) {
      basin.push(height);
      data[row][column] = 9;

      basin.push(...getBasin(row - 1, column));
      basin.push(...getBasin(row + 1, column));
      basin.push(...getBasin(row, column - 1));
      basin.push(...getBasin(row, column + 1));
    }
    return basin;
  };

  const basins = [];
  input.forEach((row, r) => {
    row.forEach((height, c) => {
      if (height < 9) {
        data = JSON.parse(JSON.stringify(input));
        const { above, below, left, right } = getAdjacent(r, c);
        if (
          height < above &&
          height < below &&
          height < left &&
          height < right
        ) {
          data[r][c] = 9;
          const basin = [height];
          basin.push(...getBasin(r - 1, c));
          basin.push(...getBasin(r + 1, c));
          basin.push(...getBasin(r, c - 1));
          basin.push(...getBasin(r, c + 1));
          basins.push(basin);
        }
      }
    });
  });

  return basins
    .map((b) => b.length)
    .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))
    .slice(0, 3)
    .reduce((prod, b) => prod * b, 1);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
