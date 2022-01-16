import DefaultMap from "../utils/DefaultMap.js";
import intcode, { InputQueue } from "./Intcode.js";

const input = (raw) => raw.trim().split(",").map(Number);

const paint = async (ops, startColor = 0n) => {
  const panels = new DefaultMap(0n);
  panels.set("0,0", startColor);

  const position = [0, 0];
  const delta = [0, -1];

  const queue = new InputQueue();

  const paintPanel = (color) => {
    panels.set(`${position[0]},${position[1]}`, color);
  };

  const turn = (direction) => {
    if (direction === 0n) {
      // turn left 90 degrees
      if (delta[1] === -1) {
        delta[0] = -1;
        delta[1] = 0;
      } else if (delta[1] === 1) {
        delta[0] = 1;
        delta[1] = 0;
      } else if (delta[0] === 1) {
        delta[0] = 0;
        delta[1] = -1;
      } else {
        delta[0] = 0;
        delta[1] = 1;
      }
    } else if (direction === 1n) {
      // turn right 90 degrees
      if (delta[1] === -1) {
        delta[0] = 1;
        delta[1] = 0;
      } else if (delta[1] === 1) {
        delta[0] = -1;
        delta[1] = 0;
      } else if (delta[0] === 1) {
        delta[0] = 0;
        delta[1] = 1;
      } else {
        delta[0] = 0;
        delta[1] = -1;
      }
    }

    position[0] += delta[0];
    position[1] += delta[1];
    queue.put(panels.get(`${position[0]},${position[1]}`));
  };

  let action = 0;
  const actions = [paintPanel, turn];

  const output = (v) => {
    actions[action % 2](v);
    action += 1;
  };

  queue.put(panels.get(`${position[0]},${position[1]}`));
  await intcode(ops, queue, output);

  return panels;
};

export const part1 = async (raw) => {
  const ops = input(raw);
  const panels = await paint(ops);

  return panels.size;
};

export const part2 = async (raw) => {
  const ops = input(raw);
  const panels = await paint(ops, 1n);

  const maxX = Math.max(
    ...[...panels.keys()].map((v) => v.split(",").map(Number)).map(([x]) => x),
  );

  const image = [...Array(6)].map(() => [...Array(maxX)].map(() => " "));
  for (const [coords, color] of panels) {
    const [x, y] = coords.split(",").map(Number);
    image[y][x] = color === 1n ? "█" : " ";
  }

  return image.map((row) => row.join("")).join("\n");
};
