import run from "aocrunner";
import { sum, toNumbers } from "utils";

const input = (raw) =>
  raw.split("\n").map((row) => {
    const [command, arg] = row.split(" ");
    return [command, +arg];
  });

const gpu = (instructions) => {
  let cycle = 1;
  let x = 1;
  const xs = [];
  const strengths = [];

  for (const [instruction, arg] of instructions) {
    let optime = 1;
    let xInc = 0;

    switch (instruction) {
      case "addx":
        optime = 2;
        xInc = arg;
        break;

      case "noop":
      default:
        break;
    }

    for (let i = 0; i < optime; i += 1) {
      if ((cycle - 20) % 40 === 0) {
        strengths.push(cycle * x);
      }
      xs.push(x);
      cycle += 1;
    }

    x += xInc;
  }

  return { cycle, x, xs, strength: strengths.reduce(sum, 0) };
};

export const part1 = (raw) => {
  const data = input(raw);
  const out = gpu(data);

  return out.strength;
};

export const part2 = (raw) => {
  const data = input(raw);
  const out = gpu(data);

  const pixels = [...new Array(240)].map(() => ".");
  for (let i = 0; i < out.xs.length; i += 1) {
    const sprite = [out.xs[i], out.xs[i] - 1, out.xs[i] + 1];
    if (sprite.some((v) => v === i % 40)) {
      pixels[i] = "#";
    }
  }

  const grid = [];
  for (let i = 0; i < pixels.length; i += 40) {
    grid.push(pixels.slice(i, i + 40));
  }

  return grid.map((row) => row.join("")).join("\n");
  return "ELPLZGZL";
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
