import astar from "a-star";
import DefaultMap from "../utils/DefaultMap.js";

const input = (raw) => {
  const maze = raw.split("\n").map((l) => l.split(""));

  const start = [-1, -1, 0];
  const end = [-1, -1, 0];
  const portalLocations = new Map();
  const portals = new Map();

  const letter = /[a-z]/i;

  for (let y = 0; y < maze.length; y += 1) {
    for (let x = 0; x < maze[y].length; x += 1) {
      if (letter.test(maze[y][x])) {
        const portal = [maze[y][x]];

        if (letter.test(maze[y][x + 1])) {
          portal.push(maze[y][x + 1]);
          maze[y][x] = "@";
          maze[y][x + 1] = "@";
        } else {
          portal.push(maze[y + 1][x]);
          maze[y][x] = "@";
          maze[y + 1][x] = "@";
        }

        const point = [
          [x, y - 1],
          [x, y + 2],
          [x - 1, y],
          [x + 2, y],
        ]
          .filter(
            ([xx, yy]) =>
              xx >= 0 && xx < maze[0].length && yy >= 0 && yy < maze.length,
          )
          .filter(([xx, yy]) => maze[yy][xx] === ".")
          .flat();

        const id = portal.join("");

        let depth = -1;
        if (
          point[0] === 2 ||
          point[0] === maze[0].length - 3 ||
          point[1] === 2 ||
          point[1] === maze.length - 3
        ) {
          // These are portals on the outside edges. Going into these reduces
          // our depth in the maze.
          depth = 1;
        }

        if (id === "AA") {
          start[0] = point[0];
          start[1] = point[1];
        } else if (id === "ZZ") {
          end[0] = point[0];
          end[1] = point[1];
        } else if (portalLocations.has(id)) {
          portals.set(point.join(","), [...portalLocations.get(id), id]);
          portals.set(portalLocations.get(id).slice(0, 2).join(","), [
            ...point,
            depth,
            id,
          ]);
        } else {
          portalLocations.set(id, [...point, depth]);
        }
      }
    }
  }

  return { end, maze, portals, start };
};

export const part1 = (raw) => {
  const { start, end, maze, portals } = input(raw);

  const path = astar({
    start,
    isEnd: ([x, y]) => x === end[0] && y === end[1],
    neighbor: ([x, y]) =>
      [
        [x, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
        portals.get(`${x},${y}`) ?? false,
      ]
        .filter((v) => v !== false)
        .filter(
          ([xx, yy]) =>
            xx >= 0 && xx < maze[0].length && yy >= 0 && yy < maze.length,
        )
        .filter(([xx, yy]) => maze[yy][xx] === "."),

    distance: () => 1,
    heuristic: () => 1,
  });

  return path.cost;
};

export const part2 = (raw) => {
  const { start, end, maze, portals } = input(raw);

  const path = astar({
    start,
    isEnd: ([x, y, z]) => x === end[0] && y === end[1] && z === end[2],
    neighbor: ([x, y, z]) => {
      const n = [
        [x, y - 1, z],
        [x - 1, y, z],
        [x + 1, y, z],
        [x, y + 1, z],
      ]
        .filter((v) => v !== false)
        .filter(
          ([xx, yy]) =>
            xx >= 0 && xx < maze[0].length && yy >= 0 && yy < maze.length,
        )
        .filter(([xx, yy]) => maze[yy][xx] === ".")
        .filter(([, , zz]) => zz >= 0)
        .map(([xx, yy, zz]) => {
          const p = portals.get(`${xx},${yy}`) ?? false;
          if (p === false) {
            return [xx, yy, zz];
          }
          return [p[0], p[1], p[2] + zz, p[3]];
        });

      return n;
    },

    distance: () => 1,
    heuristic: () => 1,
  });

  for (const [x, y, z] of path.path) {
    maze[y][x] = z;
  }

  const portalTraversals = path.path.filter(([, , , id]) => !!id).length;

  return path.cost + portalTraversals;
};
