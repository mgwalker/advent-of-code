import PF from "pathfinding";

const input = (raw) => +raw;

const getXY = (n) => {
  let size = Math.floor(Math.sqrt(n));
  if (size !== Math.sqrt(n)) {
    size += 1;
  }
  size = size % 2 === 0 ? size + 1 : size;

  const ringStartsWith = (size - 2) ** 2 + 1;

  const center = [Math.floor(size / 2), Math.floor(size / 2)];

  const ringStartY = center[1] + Math.floor(size / 2) - 1;
  const ringStartX = center[0] + Math.floor(size / 2);

  const pos = [ringStartX, ringStartY];

  let diff = n - ringStartsWith;
  if (diff >= ringStartY) {
    pos[1] = 0;
    diff -= ringStartY;
  } else {
    pos[1] = ringStartY - diff;
    return [size, center, pos];
  }

  if (diff >= ringStartX) {
    pos[0] = 0;
    diff -= ringStartX;
  } else {
    pos[0] = ringStartX - diff;
    return [size, center, pos];
  }

  if (diff >= size - 1) {
    pos[1] = size - 1;
    diff -= size - 1;
  }
  pos[0] = diff;

  return [size, center, pos];
};

export const part1 = (raw) => {
  const data = input(raw);
  const [size, center, target] = getXY(data);

  const grid = [];
  for (let y = 0; y < size; y += 1) {
    grid.push("".padStart(size, "0").split("").map(Number));
  }

  const aStar = new PF.AStarFinder();
  return aStar.findPath(...center, ...target, new PF.Grid(grid)).length - 1;
};

export const part2 = (raw) => {
  const data = input(raw);
  const [gridSize, center] = getXY(data);

  const grid = [];
  for (let y = 0; y < gridSize; y += 1) {
    grid.push("".padStart(gridSize, "0").split("").map(Number));
  }
  grid[center[1]][center[0]] = 1;

  const neighbors = (x, y) =>
    [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ]
      .map(([x1, y1]) => grid[y1][x1])
      .reduce((sum, c) => sum + c, 0);

  function* spiral([fromX, fromY]) {
    let n = 1;

    while (true) {
      n += 1;

      let size = Math.floor(Math.sqrt(n));
      if (size !== Math.sqrt(n)) {
        size += 1;
      }
      size = size % 2 === 0 ? size + 1 : size;

      const ringStartsWith = (size - 2) ** 2 + 1;

      const ringStartY = fromY + Math.floor(size / 2) - 1;
      const ringStartX = fromX + Math.floor(size / 2);

      const pos = [ringStartX, ringStartY];

      let diff = n - ringStartsWith;

      const startYOffset =
        size - (fromY + Math.floor(size / 2) - ringStartY) - 1;

      if (diff > 0) {
        const dy = Math.min(diff, startYOffset);
        pos[1] -= dy;
        diff -= dy;
      }
      if (diff > 0) {
        const dx = Math.min(diff, size - 1);
        pos[0] -= dx;
        diff -= dx;
      }
      if (diff > 0) {
        const dy = Math.min(diff, size - 1);
        pos[1] += dy;
        diff -= dy;
      }
      if (diff > 0) {
        const dx = Math.min(diff, size - 1);
        pos[0] += dx;
        diff -= dx;
      }

      yield pos;
    }
  }

  const s = spiral(center);
  let n = 2;
  for (const p of s) {
    n = neighbors(...p);
    grid[p[1]][p[0]] = n;

    if (n > data) {
      break;
    }
  }

  return n;
};
