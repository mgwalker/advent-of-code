import DefaultMap from "../utils/DefaultMap.js";

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.split(""));

const lc = "abcdefghijklmnopqrstuvwxyz".split("");

const clone = (o) => JSON.parse(JSON.stringify(o));

const keys = (map) =>
  map
    .flatMap((row) => row.filter((v) => lc.includes(v)))
    .sort()
    .join("");

const getNeighbors = ([x, y], map) =>
  [
    [x, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x, y + 1],
  ].filter(([xx, yy]) => map[yy][xx] === "." || lc.includes(map[yy][xx]));

export const part1 = (raw) => {
  const initialMap = input(raw);

  const start = [0, 0];
  for (let y = 0; y < initialMap.length; y += 1) {
    for (let x = 0; x < initialMap[y].length; x += 1) {
      if (initialMap[y][x] === "@") {
        start[0] = x;
        start[1] = y;
        initialMap[y][x] = ".";
      }
    }
  }

  const seen = new DefaultMap(() => new DefaultMap(Infinity));

  let min = Infinity;

  const doAStep = (coords, map, steps = 0) => {
    if (steps < min && steps < seen.get(keys(map)).get(coords.join(","))) {
      let myMap = map;
      seen.get(keys(myMap)).set(coords.join(","), steps);

      if (lc.includes(myMap[coords[1]][coords[0]])) {
        // Landed on a key; remove the key and its associated door. Make a copy
        // of the map so as not to disturb other search paths that are using the
        // same map.
        myMap = clone(map);
        const door = myMap[coords[1]][coords[0]].toUpperCase();
        myMap[coords[1]][coords[0]] = ".";

        for (let y = 0; y < myMap.length; y += 1) {
          for (let x = 0; x < myMap[y].length; x += 1) {
            if (myMap[y][x] === door) {
              myMap[y][x] = ".";
            }
          }
        }
      }

      if (keys(myMap).length > 0 && steps + 1 < min) {
        const neighbors = getNeighbors(coords, myMap);
        return neighbors.map((n) => [n, myMap, steps + 1]);
      }
      if (steps < min) {
        min = steps;
      }
    }
    return [];
  };

  const cache = [[start, initialMap, 0]];
  while (cache.length > 0) {
    const args = cache.pop();
    const next = doAStep(...args);
    cache.unshift(...next);
  }

  return min;
};

export const part2 = (raw) => {
  const data = input(raw);
  return;
};
