import run from "aocrunner";

const parseInput = (rawInput, dimensions = 3) => {
  const map = new Map();

  const dimInit = dimensions > 2 ? [...Array(dimensions - 2)].map(() => 0) : [];

  rawInput
    .trim()
    .split("\n")
    .forEach((line, y) => {
      line
        .trim()
        .split("")
        .forEach((state, x) => {
          map.set(`${x}.${y}.${dimInit.join(".")}`, state === "#"); //state === "#", x, y, ...dimInit);
        });
    });

  return map;
};

const getNeighbors = (coord) => {
  const internalRecurse = (...dimensions) => {
    const dim = dimensions.pop();
    if (dimensions.length === 0) {
      return [[dim - 1], [dim], [dim + 1]];
    } else {
      const childNeighbors = internalRecurse(...dimensions);
      const neighbors = [];
      for (let i = dim - 1; i <= dim + 1; i += 1) {
        childNeighbors.forEach((child) => {
          neighbors.push([...child, i]);
        });
      }
      return neighbors;
    }
  };

  return internalRecurse(...coord.split(".").map(Number))
    .map((v) => v.join("."))
    .filter((v) => v !== coord);
};

const runMachineCycle = (initialMap) => {
  const newMap = new Map();

  const coordsToCheck = new Set();
  for (const coords of initialMap.keys()) {
    coordsToCheck.add(coords);
    getNeighbors(coords).forEach((neighbor) => {
      coordsToCheck.add(neighbor);
    });
  }

  coordsToCheck.forEach((coords) => {
    const neighbors = getNeighbors(coords)
      .map((coord) => initialMap.get(coord) ?? false)
      .filter((active) => active).length;

    if (initialMap.get(coords) === true) {
      newMap.set(coords, neighbors === 2 || neighbors === 3);
    } else {
      newMap.set(coords, neighbors === 3);
    }
  });
  return newMap;
};

const part1 = (rawInput) => {
  const map = parseInput(rawInput, 3);

  let finalMap = map;
  for (let i = 0; i < 6; i += 1) {
    finalMap = runMachineCycle(finalMap);
  }

  return Array.from(finalMap.values()).filter((v) => v).length;
};

const part2 = (rawInput) => {
  const map = parseInput(rawInput, 4);
  let finalMap = map;
  for (let i = 0; i < 6; i += 1) {
    finalMap = runMachineCycle(finalMap);
  }
  return Array.from(finalMap.values()).filter((v) => v).length;
};

run({
  part1: {
    tests: [{ input: `.#.\n..#\n###`, expected: 112 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `.#.\n..#\n###`, expected: 848 }],
    solution: part2,
  },
  trimTestInputs: true,
});
