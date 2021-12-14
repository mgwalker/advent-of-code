const input = (raw) => {
  const [pointsStr, foldsStr] = raw.split("\n\n");

  const folds = foldsStr
    .split("\n")
    .map((v) => v.replace("fold along ", "").split("="))
    .map(([axis, value]) => ({ axis, value: Number(value) }));

  const points = pointsStr.split("\n").map((v) => v.split(",").map(Number));
  const xMax = Math.max(...points.map((p) => p[0]));
  const yMax = Math.max(...points.map((p) => p[1]));

  const pointSet = new Set(points.map(([x, y]) => `${x},${y}`));

  const grid = [...Array(yMax + 1)].map((_, y) =>
    [...Array(xMax + 1)].map((_, x) => pointSet.has(`${x},${y}`)),
  );

  return { folds, grid };
};

const foldIt = (grid, fold) => {
  const { axis, value } = fold;
  if (axis === "x") {
    for (let y = 0; y < grid.length; y += 1) {
      for (let x = value; x < grid[y].length; x += 1) {
        if (grid[y][x]) {
          const newX = value - (x - value);
          grid[y][newX] = true;
        }
      }
      grid[y].splice(value, grid[y].length);
    }
  } else {
    for (let y = value; y < grid.length; y += 1) {
      const newY = value - (y - value);
      for (let x = 0; x < grid[y].length; x += 1) {
        if (grid[y][x]) {
          grid[newY][x] = true;
        }
      }
    }
    grid = grid.splice(value, grid.length);
  }
};

export const part1 = (raw) => {
  const { folds, grid } = input(raw);
  foldIt(grid, folds[0]);

  return grid.reduce(
    (sum, row) =>
      sum + row.map((v) => (v ? 1 : 0)).reduce((sum, v) => sum + v, 0),
    0,
  );
};

export const part2 = (raw) => {
  const { folds, grid } = input(raw);
  folds.forEach((fold) => {
    foldIt(grid, fold);
  });

  const lines = [""];
  grid.forEach((row) => {
    lines.push(row.map((v) => (v ? "█" : " ")).join(""));
  });

  return lines.join("\n");
};
