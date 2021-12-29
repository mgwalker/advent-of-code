import PathFinding from "pathfinding";

const input = (raw) => {
  const robot = [-1, -1];
  const targets = [];

  const grid = raw.split("\n").map((l) => l.split(""));
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      const v = +grid[y][x];
      if (!Number.isNaN(v)) {
        if (v === 0) {
          robot[0] = x;
          robot[1] = y;
        } else {
          targets.push([x, y]);
        }
        grid[y][x] = ".";
      }
    }
  }
  return { grid, robot, targets };
};

const permutations = (xs) => {
  const ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = permutations(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
};

const getMinimumPathBetweenPoints = (grid, points) => {
  const asGrid = new PathFinding.Grid(
    grid.map((row) => row.map((v) => (v === "#" ? 1 : 0)))
  );

  const aStar = new PathFinding.AStarFinder();

  const pathLengths = points.map((path) => {
    let length = 0;
    for (let i = 1; i < path.length; i += 1) {
      // Remove one to account for the starting node, which is 0 moves to reach
      length +=
        aStar.findPath(...path[i - 1], ...path[i], asGrid.clone()).length - 1;
    }
    return length;
  });

  return Math.min(...pathLengths);
};

export const part1 = (raw) => {
  const { grid, robot, targets } = input(raw);
  const permutes = permutations(targets).map((p) => [robot, ...p]);

  return getMinimumPathBetweenPoints(grid, permutes);
};

export const part2 = (raw) => {
  const { grid, robot, targets } = input(raw);
  const permutes = permutations(targets).map((p) => [robot, ...p, robot]);

  return getMinimumPathBetweenPoints(grid, permutes);
};
