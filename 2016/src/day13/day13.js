import pf from "pathfinding";

const input = (raw) => Number(raw);

const isOpenSpace = (x, y, magicNumber) => {
  const bits = (magicNumber + (x * x + 3 * x + 2 * x * y + y + y * y))
    .toString(2)
    .split("")
    .map(Number);

  const b1 = bits.filter((b) => b === 1).length;
  return b1 % 2 === 0 ? true : false;
};

const print = (grid, path) => {
  for (let y = 0; y < grid.length; y += 1) {
    console.log(
      grid[y]
        .map((v, x) => {
          if (path.has(`${x},${y}`)) {
            return "*";
          }
          return v === 0 ? " " : "█";
        })
        .join("")
    );
  }
};

export const part1 = (raw) => {
  const data = input(raw);
  const start = [1, 1];
  const goal = [31, 39];

  const grid = [];
  for (let y = 0; y < goal[1] * 2; y += 1) {
    const row = [];
    for (let x = 0; x < goal[0] * 2; x += 1) {
      row.push(isOpenSpace(x, y, data) ? 0 : 1);
    }
    grid.push(row);
  }

  const g = new pf.Grid(grid);
  const astar = new pf.AStarFinder();
  const path = astar.findPath(...start, ...goal, g);

  return path.length - 1;
};

export const part2 = (raw) => {
  const data = input(raw);

  const locations = new Set(["1,1"]);
  const start = [1, 1];

  const grid = [];
  for (let y = 0; y < 52; y += 1) {
    const row = [];
    for (let x = 0; x < 52; x += 1) {
      row.push(isOpenSpace(x, y, data) ? 0 : 1);
    }
    grid.push(row);
  }

  const astar = new pf.AStarFinder();

  for (let y = 0; y < 50; y += 1) {
    for (let x = 0; x < 50; x += 1) {
      if (isOpenSpace(x, y, data)) {
        const g = new pf.Grid(grid);
        const path = astar.findPath(...start, x, y, g);
        if (path.length > 0 && path.length <= 51) {
          path.map((c) => c.join(",")).forEach((c) => locations.add(c));
        }
      }
    }
  }

  return locations.size;
};
