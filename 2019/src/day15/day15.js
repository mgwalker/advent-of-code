import astar from "a-star";
import intcode, { InputQueue } from "./Intcode.js";
import DefaultMap from "../utils/DefaultMap.js";

const input = (raw) => raw.trim().split(",").map(BigInt);

const draw = (map) => {
  const coords = [...map.keys()].map((v) => v.split(",").map(Number));
  const xs = coords.map(([x]) => x);
  const ys = coords.map(([, y]) => y);

  const maxX = Math.max(...xs);
  const minX = Math.min(...xs);
  const maxY = Math.max(...ys);
  const minY = Math.min(...ys);

  for (let y = minY; y <= maxY; y += 1) {
    const row = [];
    for (let x = minX; x <= maxX; x += 1) {
      const tile = map.get(`${x},${y}`);

      let type = " ";
      switch (tile) {
        case "#":
          type = "█";
          break;

        default:
          if (y === 0 && x === 0) {
            type = "@";
          } else {
            type = tile;
          }
          break;
      }

      row.push(type);
    }
    console.log(row.join(""));
  }
};

const getMap = async (instructions) => {
  const map = new DefaultMap(" ");

  let coords = [0, 0];
  map.set(coords.join(","), "@");

  // 1 = north, 2 = south, 3 = west, 4 = east
  const facings = [2, 3, 1, 4];
  let facing = facings.pop();

  const move = new InputQueue();
  move.put(facing);

  const getCoords = (direction) => {
    switch (direction) {
      case 1:
        return [coords[0], coords[1] - 1];

      case 2:
        return [coords[0], coords[1] + 1];

      case 3:
        return [coords[0] - 1, coords[1]];

      case 4:
        return [coords[0] + 1, coords[1]];

      default:
        throw new Error(`Unknown facing: ${direction}`);
    }
  };

  let moves = 0;

  const run = async () =>
    new Promise((resolve) => {
      const goal = [NaN, NaN];

      const feedback = (signal) => {
        if (moves === 5000) {
          move.put("kill -9");
          resolve(goal);
        }
        moves += 1;

        switch (signal) {
          case 0n:
            map.set(getCoords(facing).join(","), "#");
            facing = facings.pop();
            move.put(facing);
            break;
          case 1n:
            coords = getCoords(facing);
            map.set(coords.join(","), ".");

            // facings.length = 0;
            switch (facing) {
              case 1: // facing north
                facings.push(3, 1, 4);
                break;

              case 2: // facing south
                facings.push(4, 2, 3);
                break;

              case 3: // facing west
                facings.push(2, 3, 1);
                break;

              case 4: // facing east
                facings.push(1, 4, 2);
                break;

              default:
                throw new Error(`unknown facing: ${facing}`);
            }

            facing = facings.pop();
            if (facings.length === 0) {
              draw(map);
            }
            move.put(facing);
            break;
          case 2n:
            coords = getCoords(facing);
            goal[0] = coords[0];
            goal[1] = coords[1];
            map.set(coords.join(","), "$");
            // draw(map);
            switch (facing) {
              case 1: // facing north
                facings.push(3, 1, 4);
                break;

              case 2: // facing south
                facings.push(4, 2, 3);
                break;

              case 3: // facing west
                facings.push(2, 3, 1);
                break;

              case 4: // facing east
                facings.push(1, 4, 2);
                break;

              default:
                throw new Error(`unknown facing: ${facing}`);
            }

            facing = facings.pop();
            move.put(facing);

            break;
          default:
            throw new Error(`Unknown signal: ${signal}`);
        }
      };

      intcode(instructions, move, feedback);
    });

  const goal = await run();
  return { goal, map };
};

export const part1 = async (raw) => {
  const instructions = input(raw);
  const { goal, map } = await getMap(instructions);

  const getNeighbors = ([x, y]) =>
    [
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
    ].filter((c) => map.get(c.join(",")) !== "#");

  const path = astar({
    start: [0, 0],
    isEnd: (node) => node[0] === goal[0] && node[1] === goal[1],
    neighbor: getNeighbors,
    distance: ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2),
    heuristic: ([x, y]) => Math.abs(x - goal[0]) + Math.abs(y - goal[1]),
    hash: (node) => node.join(","),
  });

  return path.cost;
};

export const part2 = async (raw) => {
  const instructions = input(raw);
  const { goal, map } = await getMap(instructions);

  const getNeighbors = ([x, y]) =>
    [
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
    ].filter((c) => {
      const p = map.get(c.join(","));
      return p === ".";
    });

  map.set("0,0", ".");
  map.set(goal.join(","), "O");

  let minutes = 0;
  let queue = getNeighbors(goal);

  while (queue.length > 0) {
    const next = [];
    minutes += 1;

    for (const coords of queue) {
      map.set(coords.join(","), "O");
      next.push(...getNeighbors(coords));
    }

    queue = next;
  }

  return minutes;
};
