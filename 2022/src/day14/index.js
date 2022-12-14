import run from "aocrunner";
import { sum, toNumbers } from "utils";

const input = (raw) => {
  const rocks = new Set();

  const seams = raw
    .split("\n")
    .map((row) =>
      row.split("->").map((p) => p.trim().split(",").map(toNumbers))
    );

  seams.forEach((seam) => {
    for (let i = 0; i < seam.length - 1; i += 1) {
      const [sX, sY] = seam[i];
      const [eX, eY] = seam[i + 1];

      rocks.add(`${sX},${sY}`);
      if (sX === eX) {
        const delta = eY - sY;
        const step = delta > 0 ? 1 : -1;

        for (let y = sY + step; y !== eY + step; y += step) {
          rocks.add(`${sX},${y}`);
        }
      } else if (sY === eY) {
        const delta = eX - sX;
        const step = delta > 0 ? 1 : -1;

        for (let x = sX + step; x !== eX + step; x += step) {
          rocks.add(`${x},${sY}`);
        }
      }
    }
  });

  return rocks;
};

const print = (rocks, blockers) => {
  const values = [...blockers].map((v) => v.split(",").map(toNumbers));
  const MAX_X = Math.max(...values.map((v) => v[0]));
  const MIN_X = Math.min(...values.map((v) => v[0]));
  const MAX_Y = Math.max(...values.map((v) => v[1]));
  const MIN_Y = Math.min(...values.map((v) => v[1]));

  for (let y = MIN_Y; y <= MAX_Y; y += 1) {
    console.log(
      [...Array(MAX_X - MIN_X + 1)]
        .map((_, i) => [i + MIN_X, y].join(","))
        .map((c) => (rocks.has(c) ? "#" : blockers.has(c) ? "O" : "."))
        .join("")
    );
  }
};

export const part1 = (raw) => {
  const rocks = input(raw);
  const blockers = new Set(rocks);

  const MAX_Y = Math.max(
    ...[...rocks].map((v) => v.split(",").map(toNumbers)[1])
  );

  let canSettle = true;
  let settled = 0;
  const sand = [500, 0];

  while (canSettle) {
    if (sand[1] > MAX_Y) {
      // sand is flowing out of the world
      canSettle = false;
    }
    if (!blockers.has(`${sand[0]},${sand[1] + 1}`)) {
      // the sand can move down
      sand[1] += 1;
    } else if (!blockers.has(`${sand[0] - 1},${sand[1] + 1}`)) {
      // sand can move left
      sand[0] -= 1;
    } else if (!blockers.has(`${sand[0] + 1},${sand[1] + 1}`)) {
      // sand can move right
      sand[0] += 1;
    } else {
      // sand cannot move
      settled += 1;
      blockers.add(sand.join(","));
      sand[0] = 500;
      sand[1] = 0;
    }
  }

  return settled;
};

export const part2 = (raw) => {
  const rocks = input(raw);
  const blockers = new Set(rocks);

  const MAX_Y = Math.max(
    ...[...rocks].map((v) => v.split(",").map(toNumbers)[1])
  );

  let canSettle = true;
  let settled = 0;
  const sand = [500, 0];

  while (canSettle) {
    if (sand[1] === MAX_Y + 1) {
      // sand is flowing out of the world
      settled += 1;
      blockers.add(sand.join(","));
      sand[0] = 500;
      sand[1] = 0;
    } else if (!blockers.has(`${sand[0]},${sand[1] + 1}`)) {
      // the sand can move down
      sand[1] += 1;
    } else if (!blockers.has(`${sand[0] - 1},${sand[1] + 1}`)) {
      // sand can move left
      sand[0] -= 1;
    } else if (!blockers.has(`${sand[0] + 1},${sand[1] + 1}`)) {
      // sand can move right
      sand[0] += 1;
    } else {
      // sand cannot move
      settled += 1;
      blockers.add(sand.join(","));

      if (sand[0] === 500 && sand[1] === 0) {
        canSettle = false;
      }

      sand[0] = 500;
      sand[1] = 0;
    }
  }

  return settled;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
