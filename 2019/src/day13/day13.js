import cursor from "cli-position";
import intcode, { InputQueue } from "./Intcode.js";
import DefaultMap from "../utils/DefaultMap.js";
import { setTimeout } from "timers/promises";

const input = (raw) => raw.trim().split(",").map(Number);

let first = true;
let height = 0;
const draw = (board, score) => {
  const coords = [...board.keys()].map((v) => v.split(",").map(Number));
  const xs = coords.map(([x]) => x);
  const ys = coords.map(([, y]) => y);

  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  if (!first) {
    cursor.moveUp(height + 1 + (score !== undefined ? 1 : 0));
  }
  height = maxY;

  first = false;

  console.log(`SCORE: ${score}`.padStart(maxX, " "));
  for (let y = 0; y <= maxY; y += 1) {
    const row = [];
    for (let x = 0; x <= maxX; x += 1) {
      const tile = board.get(`${x},${y}`);

      let type = " ";
      switch (tile) {
        case 1n:
          type = "█";
          break;

        case 2n:
          type = "▤";
          break;

        case 3n:
          type = "-";
          break;

        case 4n:
          type = "●";
          break;

        case 0n:
        default:
          type = " ";
          break;
      }

      row.push(type);
    }
    console.log(row.join(""));
  }
};

export const part1 = async (raw) => {
  const source = input(raw);

  const board = new DefaultMap(0n);
  let o = 0;
  const coords = [0, 0];
  const onOutput = (output) => {
    if (o % 3 === 2) {
      board.set(`${coords[0]},${coords[1]}`, output);
    } else {
      coords[o % 3] = output;
    }
    o += 1;
  };

  await intcode(source, null, onOutput);

  return [...board.values()].filter((v) => v === 2n).length;
};

export const part2 = async (raw) => {
  const source = input(raw);

  const board = new DefaultMap(0n);
  let o = 0;
  const coords = [0, 0];
  let score = 0;

  const deltaBall = [false];
  const ball = [false, 0n];
  const paddle = [0, 0];

  const joystick = new InputQueue();

  const onOutput = async (output) => {
    if (o % 3 === 2) {
      if (coords[0] === -1n && coords[1] === 0n) {
        score = output;
        o += 1;
        return;
      }

      board.set(`${coords[0]},${coords[1]}`, output);
      if (output === 3n) {
        paddle[0] = coords[0];
        paddle[1] = coords[1];
      } else if (output === 4n) {
        // draw(board, score);
        // if (board.size >= 1056) {
        //   await setTimeout(50);
        // }

        if (ball[0] !== false) {
          deltaBall[0] = coords[0] - ball[0];

          if (paddle[0] === coords[0]) {
            joystick.put(0);
          } else if (deltaBall[0] < 0n && paddle[0] > coords[0]) {
            joystick.put(-1n);
          } else if (deltaBall[0] > 0n && paddle[0] < coords[0]) {
            joystick.put(1n);
          } else {
            joystick.put(0n);
          }
        } else {
          joystick.put(0);
        }
        ball[0] = coords[0];
        ball[1] = coords[1];
      }
    } else {
      coords[o % 3] = output;
    }
    o += 1;
  };

  source[0] = 2;
  await intcode(source, joystick, onOutput);

  return score;
};
