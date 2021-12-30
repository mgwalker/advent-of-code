const input = (raw) => raw.trim().split(",");

const traverse = (steps) => {
  // Use magical cube coordinates!
  // https://www.redblobgames.com/grids/hexagons/#coordinates-cube
  const target = [0, 0, 0];
  let max = -Infinity;

  // The normal manhattan distance for 3d points works for 3d space, but we're
  // in 2d space. The distance is half. The link above explains more.
  const manhattan = (pt) =>
    (Math.abs(0 - pt[0]) + Math.abs(0 - pt[1]) + Math.abs(0 - pt[2])) / 2;

  for (const step of steps) {
    switch (step) {
      case "n":
        target[1] += 1;
        target[2] -= 1;
        break;

      case "ne":
        target[0] += 1;
        target[2] -= 1;
        break;

      case "se":
        target[0] += 1;
        target[1] -= 1;
        break;

      case "s":
        target[1] -= 1;
        target[2] += 1;
        break;

      case "sw":
        target[0] -= 1;
        target[2] += 1;
        break;

      case "nw":
        target[0] -= 1;
        target[1] += 1;
        break;

      default:
        console.log("oh no");
        break;
    }

    const m = manhattan(target);
    if (m > max) {
      max = m;
    }
  }

  return { max, current: manhattan(target) };
};

export const part1 = (raw) => {
  const steps = input(raw);
  return traverse(steps).current;
};

export const part2 = (raw) => {
  const steps = input(raw);
  return traverse(steps).max;
};
