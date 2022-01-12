import pf from "pathfinding";

class DefaultMap extends Map {
  #_default;

  constructor(defaultValue) {
    super();
    this.#_default = defaultValue;
  }

  get(key) {
    const v = super.get(key);
    if (v === undefined) {
      const d = JSON.parse(JSON.stringify(this.#_default));
      super.set(key, d);
      return d;
    }
    return v;
  }
}

const input = (raw) => raw;

const getSplits = (str) => {
  let depth = 0;
  const splits = [];
  for (let i = 0; i < str.length; i += 1) {
    const c = str[i];
    if (c === "(") {
      depth += 1;
    } else if (c === ")") {
      depth -= 1;
    } else if (c === "|" && depth === 0) {
      splits.push(i);
    }
  }

  if (splits.length > 0) {
    const parts = [];
    for (let i = 0; i < splits.length; i += 1) {
      parts.push(str.substring(i > 0 ? splits[i - 1] + 1 : 0, splits[i]));
    }
    parts.push(str.substring(splits.pop() + 1));
    return parts;
  }
  return [str];
};

const buildBuilding = (data) => {
  const building = new DefaultMap([]);

  const moves = new Map([
    ["N", [0, -1]],
    ["E", [1, 0]],
    ["S", [0, 1]],
    ["W", [-1, 0]],
  ]);

  const run = (str, orig) => {
    const paths = getSplits(str);

    const newEndpoints = [];

    for (const path of paths) {
      let origins = JSON.parse(JSON.stringify(orig));

      for (let i = 0; i < path.length; i += 1) {
        const c = path[i];
        if (c === "(") {
          let open = 1;
          let j = i + 1;
          for (; j < path.length; j += 1) {
            if (path[j] === "(") {
              open += 1;
            } else if (path[j] === ")") {
              open -= 1;
              if (open === 0) {
                break;
              }
            }
          }

          const sub = path.substring(i + 1, j);
          origins = run(sub, origins);

          i = j;
        } else {
          const move = moves.get(c);
          for (const origin of origins) {
            const room = building.get(`${origin[0]},${origin[1]}`);
            room.push(c);
            origin[0] += move[0];
            origin[1] += move[1];
          }
        }
      }

      for (const origin of origins) {
        newEndpoints.push(origin);
      }
    }

    const seen = new Set();

    return newEndpoints.filter(([x, y]) => {
      if (seen.has(`${x},${y}`)) {
        return false;
      }
      seen.add(`${x},${y}`);
      return true;
    });
  };

  run(data.substring(1, data.length - 1), [[0, 0]]);

  return building;
};

const buildGraph = (building) => {
  const points = [...building.keys()].map((v) => v.split(",").map(Number));
  const minX = Math.min(...points.map(([x]) => x));
  const maxX = Math.max(...points.map(([x]) => x));
  const minY = Math.min(...points.map(([, y]) => y));
  const maxY = Math.max(...points.map(([, y]) => y));

  const dx = maxX - minX;
  const dy = maxY - minY;

  const floorplan = [...Array(2 * dy + 3)].map(() =>
    [...Array(2 * dx + 3)].map(() => "#")
  );

  for (const [key, directions] of building) {
    const [x1, y1] = key.split(",").map(Number);
    const x = 2 * (x1 - minX) + 1;
    const y = 2 * (y1 - minY) + 1;

    floorplan[y][x] = ".";

    for (const dir of directions) {
      switch (dir) {
        case "N":
          floorplan[y - 1][x] = "-";
          floorplan[y - 2][x] = ".";
          break;

        case "W":
          floorplan[y][x - 1] = "|";
          floorplan[y][x - 2] = ".";
          break;

        case "S":
          floorplan[y + 1][x] = "-";
          floorplan[y + 2][x] = ".";
          break;

        case "E":
          floorplan[y][x + 1] = "|";
          floorplan[y][x + 2] = ".";
          break;
      }
    }
  }

  const origin = [2 * (0 - minX) + 1, 2 * (0 - minY) + 1];

  const g = new pf.Grid(
    floorplan.map((row) => row.map((v) => (v === "#" ? 1 : 0)))
  );

  return [g, origin, [dx, dy]];
};

export const part1 = (raw) => {
  const data = input(raw);

  const building = buildBuilding(data);
  const [grid, origin, [dx, dy]] = buildGraph(building);

  const astar = new pf.AStarFinder();

  const xs = [...Array(dx + 1)].map((_, i) => 2 * i + 1);
  const ys = [...Array(dy + 1)].map((_, i) => 2 * i + 1);

  const targets = [];
  for (const x of xs) {
    for (const y of ys) {
      if (x !== origin[0] || y !== origin[1]) {
        targets.push([x, y]);
      }
    }
  }

  const x = targets.map(([x, y]) =>
    astar.findPath(origin[0], origin[1], x, y, grid.clone())
  );
  x.sort((a, b) => b.length - a.length);

  // Subtract one for the origin, and divide by two because going through a door
  // is actually two steps in our grid.
  return (x[0].length - 1) / 2;
};

export const part2 = (raw) => {
  const data = input(raw);

  const building = buildBuilding(data);
  const [grid, origin, [dx, dy]] = buildGraph(building);

  const astar = new pf.AStarFinder();

  const xs = [...Array(dx + 1)].map((_, i) => 2 * i + 1);
  const ys = [...Array(dy + 1)].map((_, i) => 2 * i + 1);

  const targets = [];
  for (const x of xs) {
    for (const y of ys) {
      if (x !== origin[0] || y !== origin[1]) {
        targets.push([x, y]);
      }
    }
  }

  // Subtract one for the origin, and divide by two because going through a door
  // is actually two steps in our grid.
  const x = targets
    .map(([x, y]) => astar.findPath(origin[0], origin[1], x, y, grid.clone()))
    .filter((v) => (v.length - 1) / 2 >= 1000);

  return x.length;
};
