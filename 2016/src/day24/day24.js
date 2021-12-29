const input = (raw) => {
  const robot = { x: -1, y: -1 };
  const targets = new Set();

  const grid = raw.split("\n").map((l) => l.split(""));
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      const v = +grid[y][x];
      if (!Number.isNaN(v)) {
        if (v === 0) {
          robot.x = x;
          robot.y = y;
        } else {
          targets.add(`${x},${y}`);
        }
        grid[y][x] = ".";
      }
    }
  }
  return { grid, robot, targets };
};

const print = (grid, robot, targets) => {
  for (let y = 0; y < grid.length; y += 1) {
    const row = JSON.parse(JSON.stringify(grid[y]));
    for (let x = 0; x < row.length; x += 1) {
      if (x === robot.x && y === robot.y) {
        row[x] = "●";
      } else if (targets.has(`${x},${y}`)) {
        row[x] = "★";
      } else if (row[x] === "#") {
        row[x] = "█";
      } else {
        row[x] = " ";
      }
    }
    console.log(row.join(""));
  }
};

class PriorityQueue {
  #_queue = [];
  #_sorter;

  constructor(sorter) {
    this.#_sorter = sorter;
  }

  get empty() {
    return this.#_queue.length === 0;
  }

  includes = (...args) => this.#_queue.includes(...args);

  pop = () => {
    return this.#_queue.pop();
  };

  push = (...items) => {
    items.forEach((item) => {
      this.#_queue.push(item);
    });

    // Always re-sort before popping because priorities may have changed. This
    // seems like a good-enough approximation of a priority queue. For matching
    // priorities, the queue is LIFO.
    if (this.#_sorter) {
      this.#_queue.sort(this.#_sorter);
    }
  };

  get size() {
    return this.#_queue.length;
  }
}

export const part1 = (raw) => {
  const { grid, robot: initialRobot, targets: initialTargets } = input(raw);

  const comparator = (a, b) => {
    if (a.targets.size !== b.targets.size) {
      return b.targets.size - a.targets.size;
    }

    const targetCoordsA = [...a.targets.values()]
      .map((s) => s.split(",").map(Number))
      .map(([x, y]) => ({ x, y }));
    const distanceA = Math.min(
      ...targetCoordsA.map(({ x, y }) => Math.abs(a.x - x) + Math.abs(a.y - y))
    );

    const targetCoordsB = [...b.targets.values()]
      .map((s) => s.split(",").map(Number))
      .map(([x, y]) => ({ x, y }));
    const distanceB = Math.min(
      ...targetCoordsB.map(({ x, y }) => Math.abs(b.x - x) + Math.abs(b.y - y))
    );

    if (distanceA === distanceB) {
      return b.moves - a.moves;
    }

    return distanceB - distanceA;
  };

  const getNextMoves = ({ x, y }) => {
    return [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ].filter(({ x, y }) => grid[y][x] !== "#");
  };

  const seen = new Map();

  const queue = new PriorityQueue(comparator);
  queue.push({ ...initialRobot, moves: 0, targets: initialTargets });

  const finishes = new Set();

  const getRobotKey = (robot) =>
    `${robot.x},${robot.y}|${[...robot.targets].join("|")}`;

  let totalMoves = 0;
  while (!queue.empty) {
    const robot = queue.pop();
    const key = getRobotKey(robot);

    if (robot.moves >= (seen.get(key) ?? Infinity)) {
      continue;
    }
    if (robot.moves >= Math.min(...[...finishes.values()]))
      seen.set(key, robot.moves);
    totalMoves += 1;

    // console.log(robot.x, robot.y, [...targets.values()]);

    if (robot.targets.has(`${robot.x},${robot.y}`)) {
      robot.targets.delete(`${robot.x},${robot.y}`);
      // console.log("found a target!", targets.size, "remaining on this path");
    }
    if (robot.targets.size === 0) {
      finishes.add(robot.moves);
    }
    process.stdout.write(
      `\rCurrent minimum: ${Math.min(...[...finishes.values()])} (${
        finishes.size
      }) (${totalMoves} moves tried, ${queue.size} in the queue)`.padEnd(
        80,
        " "
      )
    );

    queue.push(
      ...getNextMoves(robot).map((c) => ({
        ...c,
        moves: robot.moves + 1,
        targets: new Set(robot.targets),
      }))
    );
  }

  return Math.min(...[...finishes]);
};

export const part2 = (raw) => {
  const data = input(raw);
  return;
};
