import CountingSet from "./CountingSet.js";

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.split(", ").map(Number));

const manhattan = (p1, p2) => Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);

export const part1 = (raw) => {
  const locations = input(raw);
  let [minX, maxX, minY, maxY] = [Infinity, -Infinity, Infinity, -Infinity];

  for (const [x, y] of locations) {
    if (x < minX) {
      minX = x;
    }
    if (x > maxX) {
      maxX = x;
    }
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }

  const finiteLocations = locations.filter(
    ([x, y]) => x < maxX && x > minX && y < maxY && y > minY
  );

  const manhattan = (p1, p2) =>
    Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);

  const distances = new Map();
  for (const location of locations) {
    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const key = `${x},${y}`;
        const [, previous] = distances.get(key) ?? [null, Infinity];

        const d = manhattan(location, [x, y]);
        if (d < previous) {
          distances.set(key, [location, d]);
        } else if (d === previous) {
          distances.set(key, [".", d]);
        }
      }
    }
  }

  const positionsByOrigin = new CountingSet();
  for (const [origin] of distances.values()) {
    if (finiteLocations.includes(origin)) {
      positionsByOrigin.add(`${origin[0]},${origin[1]}`);
    }
  }

  return Math.max(...positionsByOrigin.values());
};

export const part2 = (raw) => {
  const locations = input(raw);
  let [minX, maxX, minY, maxY] = [Infinity, -Infinity, Infinity, -Infinity];

  for (const [x, y] of locations) {
    if (x < minX) {
      minX = x;
    }
    if (x > maxX) {
      maxX = x;
    }
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }
  minX -= 2_000;
  maxX += 2_000;
  minY -= 2_000;
  maxY += 2_000;

  let regionCount = 0;
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      let distances = 0;
      for (const location of locations) {
        distances += manhattan(location, [x, y]);
      }
      if (distances < 10_000) {
        regionCount += 1;
        console.log(regionCount);
      }
    }
  }

  return regionCount;
};
