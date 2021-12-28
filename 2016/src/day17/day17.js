import { createHash } from "crypto";

const md5 = (str) => {
  const hash = createHash("md5");
  hash.update(str);
  return hash.digest("hex").substring(0, 4);
};

const input = (raw) => raw;

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
    this.#_queue.sort(([, , a], [, , b]) => {
      if (a.length > b.length) {
        return -1;
      }
      if (a.length < b.length) {
        return 1;
      }
      return 0;
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

const astar = (code) => {
  const queue = new PriorityQueue();
  queue.push([0, 0, ""]);
  const paths = [];

  const getNeighbors = (x, y, moves) => {
    const open = /^[bcdef]$/;

    const neighbors = [];

    const travelState = md5(`${code}${moves}`).split("");
    if (open.test(travelState[0])) {
      neighbors.push([x, y - 1, `${moves}U`]);
    }
    if (open.test(travelState[1])) {
      neighbors.push([x, y + 1, `${moves}D`]);
    }
    if (open.test(travelState[2])) {
      neighbors.push([x - 1, y, `${moves}L`]);
    }
    if (open.test(travelState[3])) {
      neighbors.push([x + 1, y, `${moves}R`]);
    }

    return neighbors.filter(([x, y]) => x >= 0 && y >= 0 && x < 4 && y < 4);
  };

  while (!queue.empty) {
    const [x, y, moves] = queue.pop();

    if (x === 3 && y === 3) {
      paths.push(moves);
      continue;
    }

    const neighbors = getNeighbors(x, y, moves);
    for (let i = 0; i < neighbors.length; i += 1) {
      queue.push(neighbors[i]);
    }
  }
  return paths;
};

export const part1 = (raw) => {
  const code = input(raw);
  const paths = astar(code).sort((a, b) => a.length - b.length);
  return paths[0];
};

export const part2 = (raw) => {
  const code = input(raw);
  const paths = astar(code).sort((a, b) => a.length - b.length);
  return paths.pop().length;
};
