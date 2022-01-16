import DefaultMap from "../utils/DefaultMap.js";

function* rangeExclusive(a, b) {
  const step = a < b ? 1 : -1;

  let x = a + step;
  while (x !== b) {
    yield x;
    x += step;
  }
}

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => v.split(""));

const getWhichAsteroidsCanSeeWhichOthers = (space) => {
  const canSee = new DefaultMap(() => new Set());

  const asteroids = space
    .map((row, y) =>
      row
        .map((object, x) => (object === "#" ? [x, y] : false))
        .filter((v) => !!v),
    )
    .flat();

  for (let i = 0; i < asteroids.length; i += 1) {
    const [xa, ya] = asteroids[i];
    const asteroid = asteroids[i].join(",");
    const peers = canSee.get(asteroid);

    for (let j = i + 1; j < asteroids.length; j += 1) {
      const [xb, yb] = asteroids[j];
      const potential = asteroids[j].join(",");

      if (xa === xb) {
        let obstructed = false;
        for (const y of rangeExclusive(ya, yb)) {
          if (space[y][xa] === "#") {
            obstructed = true;
          }
        }
        if (!obstructed) {
          peers.add(potential);
          canSee.get(potential).add(asteroid);
        }
      } else {
        const m = (yb - ya) / (xb - xa);
        const b = ya - m * xa;

        let obstructed = false;
        for (const x of rangeExclusive(xa, xb)) {
          // Handle floating-point glitches
          const y = Math.round((m * x + b) * 1000) / 1000;

          if (y === Math.floor(y) && space[y][x] === "#") {
            obstructed = true;
          }
        }
        if (!obstructed) {
          peers.add(potential);
          canSee.get(potential).add(asteroid);
        }
      }
    }
  }

  return canSee;
};

export const part1 = (raw) => {
  const space = input(raw);
  const canSee = getWhichAsteroidsCanSeeWhichOthers(space);

  return Math.max(...[...canSee.values()].map((v) => v.size));
};

export const part2 = (raw) => {
  const space = input(raw);
  const canSee = getWhichAsteroidsCanSeeWhichOthers(space);

  const most = Math.max(...[...canSee.values()].map((v) => v.size));
  const [x, y] = [...canSee.keys()]
    .find((asteroid) => canSee.get(asteroid).size === most)
    .split(",")
    .map(Number);

  const thereAreAsteroids = () =>
    space.flat().filter((v) => v === "#").length > 1;

  const asploded = [false];

  // For funsies, blow them all up. We only *need* the first 200, but just go
  // to town and destroy them all.
  while (thereAreAsteroids()) {
    const canSeeNow = getWhichAsteroidsCanSeeWhichOthers(space);

    const targets = [...canSeeNow.get(`${x},${y}`)]
      .map((v) => v.split(",").map(Number))
      .map(([xx, yy]) => [xx, yy, (Math.atan2(xx - x, y - yy) * 180) / Math.PI])
      .map(([xx, yy, angle]) => [xx, yy, angle >= 0 ? angle : 360 + angle])
      .sort(([, , a], [, , b]) => a - b);

    for (const asteroid of targets) {
      const [xx, yy] = asteroid;
      asploded.push([xx, yy]);
      space[yy][xx] = ".";
    }
  }

  return asploded[200][0] * 100 + asploded[200][1];
};
