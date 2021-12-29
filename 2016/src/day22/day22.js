const input = (raw) => {
  const grid = [];

  raw
    .trim()
    .split("\n")
    .slice(2)
    .forEach((l) => {
      const [, x, y, size, used, avail] = l.match(
        /\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s/
      );
      if (y >= grid.length) {
        grid.push([]);
      }
      grid[y].push({
        x: +x,
        y: +y,
        size: +size,
        used: +used,
        avail: +avail,
        moves: 0,
      });
    });

  return grid;
};

export const part1 = (raw) => {
  const grid = input(raw);

  let pairs = 0;

  const allAvail = grid.map((row) => row.map((v) => v.avail));

  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      const { used, avail } = grid[y][x];
      if (used > 0) {
        allAvail[y][x] = -Infinity;
        pairs += allAvail
          .map((row) => row.filter((a) => a >= used).length)
          .reduce((sum, c) => sum + c, 0);
        allAvail[y][x] = avail;
      }
    }
  }

  return pairs;
};

class PriorityQueue {
  #_queue = [];

  get empty() {
    return this.#_queue.length === 0;
  }

  includes = (...args) => this.#_queue.includes(...args);

  pop = () => {
    // Always re-sort before popping because priorities may have changed. This
    // seems like a good-enough approximation of a priority queue. For matching
    // priorities, the queue is LIFO.
    this.#_queue.sort((a, b) => {
      const manhattanA =
        Math.abs(a.target.x - a.empty.x) + Math.abs(a.target.y - a.empty.y);
      const manhattanB =
        Math.abs(b.target.x - b.empty.x) + Math.abs(b.target.y - b.empty.y);

      const manhattanDiff = manhattanB - manhattanA;
      if (manhattanDiff === 0) {
        return b.moves - a.moves;
      }
      return manhattanDiff;
    });

    return this.#_queue.pop();
  };

  push = (item) => {
    this.#_queue.push(item);
  };

  get size() {
    return this.#_queue.length;
  }
}

export const part2 = (raw) => {
  // Looking at the results in part 1 and the hints in the part 2 description,
  // there's just one empty disk and it's the only one with space to hold any
  // other disks. As a result, we can reduce our disks to just full or empty.
  const initialGrid = input(raw);

  // Game state, thus, is the position of the empty, the number of steps so far,
  // and the position of the data to extract, I think.
  const state = {
    moves: 0,

    empty: initialGrid
      .flat()
      .filter(({ used }) => used === 0)
      .map(({ x, y }) => ({ x, y }))
      .pop(),

    target: { x: initialGrid[0].length - 1, y: 0 },

    grid: initialGrid,
  };

  const { avail } = initialGrid[state.empty.y][state.empty.x];

  const seen = new Map();

  const getStateKey = ({ empty, target }) =>
    `${empty.x},${empty.y}|${target.x},${target.y}`;

  const getNextMoves = (state, grid) => {
    const { x, y } = state.empty;
    const moves = [
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ].filter(
      ({ x, y }) =>
        x >= 0 &&
        y >= 0 &&
        x < grid[0].length &&
        y < grid.length &&
        grid[y][x].used <= avail
    );
    return moves;
  };

  const run = (initial) => {
    const queue = new PriorityQueue();
    queue.push(initial);

    while (!queue.empty) {
      const state = queue.pop();
      const grid = state.grid;
      const key = getStateKey(state);

      if ((seen.get(key) ?? Infinity) <= state.moves) {
        // If we've already seen this state with a lower number of moves, we can
        // just stop processing it now.
        continue;
      }
      seen.set(key, state.moves);

      if (state.target.x === 0 && state.target.y === 0) {
        // The first time we match, we should be finished because we prioritized
        // distance to finish and number of moves.
        return state.moves;
      }

      const moves = getNextMoves(state, grid);

      for (const move of moves) {
        const newGrid = JSON.parse(JSON.stringify(grid));

        const tmp = newGrid[state.target.y][state.target.x];
        newGrid[state.target.y][state.target.x] = newGrid[move.y][move.x];
        newGrid[move.y][move.x] = tmp;

        const target = { ...state.target };
        if (move.x === target.x && move.y === target.y) {
          target.x = state.empty.x;
          target.y = state.empty.y;
        }
        queue.push({ moves: state.moves + 1, empty: move, target, grid });
      }
    }
  };

  return run(state);
};
