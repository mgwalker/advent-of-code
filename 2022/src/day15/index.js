import run from "aocrunner";
import { sum, toNumbers } from "utils";

const manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const input = (raw) =>
  raw.split("\n").map((row) => {
    const [x, y, nX, nY] = row.match(/-?\d+/g).map(toNumbers);
    return {
      x,
      y,
      beacon: { x: nX, y: nY },
      manhattan: manhattanDistance({ x, y }, { x: nX, y: nY }),
    };
  });

const getVisibleXRangeForSensorAtRow = (sensor, row) => {
  const rangeLength = 2 * (sensor.manhattan - Math.abs(row - sensor.y)) + 1;
  if (rangeLength > 0) {
    const delta = Math.floor(rangeLength / 2);
    return [sensor.x - delta, sensor.x + delta];
  }
  return [];
};

export const part1 = (raw) => {
  const sensors = input(raw);

  const sortedRanges = sensors
    .map((sensor) => getVisibleXRangeForSensorAtRow(sensor, 2_000_000))
    .filter((a) => a.length)
    .sort(([a], [b]) => a - b);

  let max = sortedRanges[0][1];
  for (let i = 1; i < sortedRanges.length; i += 1) {
    if (sortedRanges[i][1] > max) {
      max = sortedRanges[i][1];
      sortedRanges[i - 1][1] = max;
      sortedRanges.splice(i, 1);
      i -= 1;
    } else {
      sortedRanges.splice(i, 1);
      i -= 1;
    }
  }

  return sortedRanges.map((range) => range[1] - range[0]).reduce(sum, 0);
};

export const part2 = (raw) => {
  const sensors = input(raw);

  const MAX = 4_000_000;

  for (let y = 0; y <= MAX; y += 1) {
    const xRanges = sensors
      .map((sensor) => getVisibleXRangeForSensorAtRow(sensor, y))
      .filter((a) => a.length > 0);

    const sortedRanges = xRanges
      .map(([min, max]) => [min > 0 ? min : 0, max < MAX ? max : MAX])
      .sort(([a], [b]) => a - b);

    const rangeMin = sortedRanges[0][0];
    if (rangeMin !== 0) {
      return y;
    }
    let rangeMax = sortedRanges[0][1];

    for (let i = 1; i < sortedRanges.length; i += 1) {
      if (sortedRanges[i][0] > rangeMax + 1) {
        return (rangeMax + 1) * 4_000_000 + y;
      }
      if (sortedRanges[i][1] > rangeMax) {
        rangeMax = sortedRanges[i][1];
      }
    }
  }

  return -1;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
