/* eslint-disable no-continue */
import DefaultMap from "../utils/DefaultMap.js";

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.split(""));

const keys = new Set("abcdefghijklmnopqrstuvwxyz".split(""));
const doors = new Set([...keys].map((v) => v.toUpperCase()));

function* neighbors(grid, x, y) {
  const nodes = [
    [x - 1, y],
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
  ].filter(
    ([xx, yy]) =>
      xx >= 0 &&
      yy >= 0 &&
      yy < grid.length &&
      xx < grid[yy].length &&
      grid[yy][xx] !== "#",
  );

  for (const node of nodes) {
    yield node;
  }
}

const adjacent = (grid, x, y) => {
  const queue = [];
  const visited = new Set([`${x},${y}`]);
  const found = new Map();

  for (const n of neighbors(grid, x, y)) {
    queue.push([n, 1]);
  }

  while (queue.length > 0) {
    const [node, distance] = queue.shift();
    if (!visited.has(`${node[0]},${node[1]}`)) {
      visited.add(`${node[0]},${node[1]}`);

      const cell = grid[node[1]][node[0]];

      if (keys.has(cell) || doors.has(cell)) {
        if (!found.has(cell)) {
          found.set(cell, distance);
          continue;
        }
      }

      for (const n of neighbors(grid, ...node)) {
        if (!visited.has(`${n[0]},${n[1]}`)) {
          queue.push([n, distance + 1]);
        }
      }
    }
  }

  return found;
};

const buildGraph = (grid) => {
  const graph = new Map();
  const start = [-1, -1];

  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      const cell = grid[y][x];
      if (cell !== "#" && cell !== ".") {
        graph.set(cell, adjacent(grid, x, y));
        if (cell === "@") {
          start[0] = x;
          start[1] = y;
        }
      }
    }
  }

  return { graph, start };
};

const reachableKeys = (() => {
  const cache = new Map();

  const sorter = ([, d1], [, d2]) => d2 - d1;

  const fn = (graph, point, heldKeys) => {
    const keystr = `${point}|${[...heldKeys.values()].sort().join(",")}`;
    if (cache.has(keystr)) {
      return cache.get(keystr);
    }

    const queue = [];
    const distances = new DefaultMap(Infinity);
    const reachable = [];

    for (const [neighbor, distance] of graph.get(point)) {
      queue.push([neighbor, distance]);
    }
    queue.sort(sorter);

    while (queue.length > 0) {
      const [node, distance] = queue.pop();

      // If this is a key and we don't already have it, add this as a place
      // we can go.
      if (keys.has(node) && !heldKeys.has(node)) {
        reachable.push([node, distance]);
        continue;
      }

      // If we don't hold a key for this spot at all, then it's a locked door,
      // so we can't go any further.
      if (!heldKeys.has(node.toLowerCase())) {
        continue;
      }

      // Otherwise we're at a key we've already collected or an open door. In
      // either case, we need to check the node's neighbors.
      for (const [neighbor, nextDistance] of graph.get(node)) {
        const newDistance = distance + nextDistance;
        if (newDistance < distances.get(neighbor)) {
          distances.set(neighbor, newDistance);
          queue.push([neighbor, newDistance]);
        }
      }
      queue.sort(sorter);
    }

    cache.set(keystr, reachable);
    return reachable;
  };

  fn.clearCache = () => cache.clear();

  return fn;
})();

export const part1 = (raw) => {
  const initialMap = input(raw);

  const { graph } = buildGraph(initialMap);
  const keyCount = [...graph.keys()].filter((v) => keys.has(v)).length;

  const fewestSteps = (() => {
    const cache = new Map();

    return (grid, node, remainingKeyCount, heldKeys = new Set()) => {
      if (remainingKeyCount === 0) {
        return 0;
      }

      const keystring = `${node}|${remainingKeyCount}|${[...heldKeys.values()]
        .sort()
        .join(",")}`;
      if (cache.has(keystring)) {
        return cache.get(keystring);
      }

      let minimum = Infinity;

      for (const [key, d] of reachableKeys(grid, node, heldKeys)) {
        let distance = d;
        const nowHeld = new Set([...heldKeys]);
        nowHeld.add(key);

        distance += fewestSteps(grid, key, remainingKeyCount - 1, nowHeld);

        if (distance < minimum) {
          minimum = distance;
        }
      }

      cache.set(keystring, minimum);
      return minimum;
    };
  })();

  return fewestSteps(graph, "@", keyCount);
};

export const part2 = (raw) => {
  const initialMap = input(raw);
  reachableKeys.clearCache();

  const [centerX, centerY] = initialMap
    .map((row, r) => [row.findIndex((v) => v === "@"), r])
    .find(([x]) => x >= 0);

  initialMap[centerY][centerX] = "#";
  initialMap[centerY + 1][centerX] = "#";
  initialMap[centerY - 1][centerX] = "#";
  initialMap[centerY][centerX + 1] = "#";
  initialMap[centerY][centerX - 1] = "#";
  initialMap[centerY - 1][centerX - 1] = "1";
  initialMap[centerY - 1][centerX + 1] = "2";
  initialMap[centerY + 1][centerX - 1] = "3";
  initialMap[centerY + 1][centerX + 1] = "4";

  const { graph } = buildGraph(initialMap);
  const keyCount = [...graph.keys()].filter((v) => keys.has(v)).length;

  const fewestSteps = (() => {
    const cache = new Map();

    // For part 2, just need to change from examining a single node to examining
    // a set of nodes.
    return (grid, nodes, remainingKeyCount, heldKeys = new Set()) => {
      if (remainingKeyCount === 0) {
        return 0;
      }

      const keystring = `${nodes.join(",")}|${remainingKeyCount}|${[
        ...heldKeys.values(),
      ]
        .sort()
        .join(",")}`;
      if (cache.has(keystring)) {
        return cache.get(keystring);
      }

      let minimum = Infinity;

      for (const node of nodes) {
        const otherNodes = [...nodes].filter((n) => n !== node);

        for (const [key, d] of reachableKeys(grid, node, heldKeys)) {
          let distance = d;
          const nowHeld = new Set([...heldKeys]);
          nowHeld.add(key);

          distance += fewestSteps(
            grid,
            [...otherNodes, key],
            remainingKeyCount - 1,
            nowHeld,
          );

          if (distance < minimum) {
            minimum = distance;
          }
        }
      }

      cache.set(keystring, minimum);
      return minimum;
    };
  })();

  return fewestSteps(graph, ["1", "2", "3", "4"], keyCount);
};
