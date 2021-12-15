const input = (raw) => {
  const cave = raw
    .trim()
    .split("\n")
    .map((v, y) =>
      v.split("").map((cost, x) => ({
        // These are fields used by the A* algorithm
        cost: +cost,
        discovered: false,
        distance: Infinity,
        manhattan: Infinity,
        parent: null,
        priority: Infinity,
        rootDistance: Infinity,
        x,
        y,
      })),
    );

  const endX = cave[0].length - 1;
  const endY = cave.length - 1;

  cave.forEach((_, y) => {
    cave[y].forEach((_, x) => {
      // Once everything is in the grid, we can compute everything's
      // Manhattan distance. Doing this separately just saves on having to split
      // and map as separate steps and the data is small enough that it doesn't
      // matter.
      cave[y][x].manhattan = Math.abs(x - endX) + Math.abs(y - endY);
    });
  });
  cave[0][0].rootDistance = 0;

  return cave;
};

class PriorityQueue {
  #_queue = [];

  empty = () => this.#_queue.length === 0;

  includes = (...args) => this.#_queue.includes(...args);

  pop = () => {
    // Always re-sort before popping because priorities may have changed. This
    // seems like a good-enough approximation of a priority queue. For matching
    // priorities, the queue is LIFO.
    this.#_queue.sort(({ priority: a }, { priority: b }) => {
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    });

    return this.#_queue.pop();
  };

  push = (item) => {
    this.#_queue.push(item);
  };
}

const getUnvisitedNeighbors = (cave) => {
  const maxX = cave[0].length;
  const maxY = cave.length;

  return (spot) => {
    const { x, y } = spot;

    // can't move diagonally
    return (
      [
        [x, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
      ]
        // Remove coordinates that are out-of-bounds
        .filter(([x, y]) => x >= 0 && y >= 0 && x < maxX && y < maxY)
        .map(([x, y]) => cave[y][x])
        // Remove spots that have already been visited
        .filter((spot) => !spot.discovered)
    );
  };
};

const aStar = (cave) => {
  const queue = new PriorityQueue();
  const getNeighbors = getUnvisitedNeighbors(cave);
  queue.push(cave[0][0]);

  while (!queue.empty()) {
    const current = queue.pop();
    current.discovered = true;

    const neighbors = getNeighbors(current);
    for (const neighbor of neighbors) {
      neighbor.rootDistance = Math.min(
        neighbor.rootDistance,
        current.rootDistance + neighbor.cost,
      );

      const minDistance = Math.min(
        neighbor.distance,
        neighbor.rootDistance + neighbor.manhattan,
      );

      if (minDistance !== neighbor.distance) {
        neighbor.distance = minDistance;
        neighbor.parent = current;

        if (queue.includes(neighbor)) {
          neighbor.priority = minDistance;
        }
      }

      if (!queue.includes(neighbor)) {
        neighbor.priority = neighbor.distance;
        queue.push(neighbor);
      }
    }
  }

  const costs = [];
  let parent = cave[cave.length - 1][cave[0].length - 1];

  while (parent !== null) {
    costs.unshift(parent.cost);
    parent = parent.parent;
  }
  // Remove the initial spot, because it doesn't actually cost anything
  costs[0] = 0;
  return costs;
};

export const part1 = (raw) => {
  const cave = input(raw);
  const costs = aStar(cave);
  return costs.reduce((sum, v) => sum + v, 0);
};

export const part2 = (raw) => {
  const cave = input(raw);

  // First extend outwards
  cave.forEach((row) => {
    const offset = row.length;
    const baseRow = JSON.parse(JSON.stringify(row));

    for (let i = 1; i < 5; i += 1) {
      const newRow = JSON.parse(JSON.stringify(baseRow));
      newRow.forEach((spot) => {
        spot.cost += i;
        if (spot.cost > 9) {
          spot.cost -= 9;
        }
        spot.x += offset * i;
        row.push(spot);
      });
    }
  });

  // Now duplicate downwards
  const length = cave.length;
  for (let add = 0; add < 4; add += 1) {
    const newRows = JSON.parse(
      JSON.stringify(cave.slice(add * length, (add + 1) * length)),
    );
    newRows.forEach((row, i) => {
      row.forEach((spot) => {
        spot.cost += 1;
        if (spot.cost > 9) {
          spot.cost -= 9;
        }
        spot.y += length;
      });
      cave.push(row);
    });
  }

  // Gotta go fix up the initial values of a bunch of these, too.
  const endX = cave[0].length - 1;
  const endY = cave.length - 1;
  cave.forEach((_, y) => {
    cave[y].forEach((_, x) => {
      // Have to set these again because Infinity doesn't stringify
      cave[y][x].distance = Infinity;
      cave[y][x].priority = Infinity;
      cave[y][x].rootDistance = Infinity;

      // And recompute the Manhattan distances, because those aren't
      // right anymore either.
      cave[y][x].manhattan = Math.abs(x - endX) + Math.abs(y - endY);
    });
  });
  cave[0][0].rootDistance = 0;

  const costs = aStar(cave);
  return costs.reduce((sum, v) => sum + v, 0);
};
