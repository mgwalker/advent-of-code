const input = (raw) => {
  const [[x1, x2], [y1, y2]] = raw
    .replace("target area: x=", "")
    .replace(", y=", " ")
    .split(" ")
    .map((v) => v.split("..").map(Number));

  return {
    x1: Math.min(x1, x2),
    x2: Math.max(x1, x2),
    y1: Math.min(y1, y2),
    y2: Math.max(y1, y2),
  };
};

class Probe {
  #position = [0, 0];
  #velocity = [0, 0];

  constructor(velocity) {
    this.#velocity[0] = velocity[0];
    this.#velocity[1] = velocity[1];
  }

  step() {
    this.#position[0] += this.#velocity[0];
    this.#position[1] += this.#velocity[1];

    if (this.#velocity[0] > 0) {
      this.#velocity[0] -= 1;
    }
    this.#velocity[1] -= 1;
  }

  isIn([x1, x2], [y1, y2]) {
    const [x, y] = this.#position;
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      return true;
    }
    return false;
  }

  get position() {
    return [...this.#position];
  }

  get velocity() {
    return [...this.#velocity];
  }
}

export const part1 = (raw) => {
  const data = input(raw);

  // We want to minimize the x velocity to maximize the y velocity, and we
  // can calculate the minimum X velocity required to reach the target zone.
  // x + (x - 1) + (x - 2) + (x - 3) ... + (x -n) = (x * (x + 1)) / 2
  //
  // Minimizing, we want:
  //   (x * (x + 1)) / 2 = Xmin
  //   x^2 + x = 2 * Xmin
  //   x^2 + x - 2Xmin = 0
  //
  // Quadratic:
  //  x = (-b +- root(b^2 - 4ac)) / 2a
  //  x = (-1 +- root(1 - 4(-2*Xmin))) / 2
  //  x = (-1 +- root(1 + (8 * Xmin))) / 2
  //
  // For minX, we'll use the absolute distance to the nearest X edge, and we'll
  // adjust the value of X afterwards accordingly. Because we're using absolute
  // values, we know the velocity must be positive, which means we can safely
  // ignore the subtraction part of the quadratic and just go with the addition.
  // And we're doing integer math, so we can take the ceiling.
  const minXVelocity =
    Math.ceil(
      (-1 + Math.sqrt(1 + 8 * Math.min(Math.abs(data.x1), Math.abs(data.x2)))) /
        2,
    ) * (data.x1 < 0 ? -1 : 1);

  const keepGoing = (probe) => {
    const [x, y] = probe.position;
    const [vx, vy] = probe.velocity;

    if (vx === 0) {
      if (x < data.x1 || x > data.x2) {
        return false;
      }
    }
    if (vy < 0) {
      if (y < data.y1) {
        return false;
      }
    }
    return true;
  };

  const range = [
    [data.x1, data.x2],
    [data.y1, data.y2],
  ];

  const ys = [];

  let y = 0;

  while (y < 200) {
    y += 1;

    const velocity = [minXVelocity, y];
    const probe = new Probe(velocity);
    const myYs = [];

    while (keepGoing(probe)) {
      probe.step();
      myYs.push([probe.position[1], velocity]);
      if (probe.isIn(...range)) {
        ys.push(...myYs);
        break;
      }
    }
  }

  return Math.max(...ys.map(([y]) => y));
};

export const part2 = (raw) => {
  const data = input(raw);

  // We want to minimize the x velocity to maximize the y velocity, and we
  // can calculate the minimum X velocity required to reach the target zone.
  // x + (x - 1) + (x - 2) + (x - 3) ... + (x -n) = (x * (x + 1)) / 2
  //
  // Minimizing, we want:
  //   (x * (x + 1)) / 2 = Xmin
  //   x^2 + x = 2 * Xmin
  //   x^2 + x - 2Xmin = 0
  //
  // Quadratic:
  //  x = (-b +- root(b^2 - 4ac)) / 2a
  //  x = (-1 +- root(1 - 4(-2*Xmin))) / 2
  //  x = (-1 +- root(1 + (8 * Xmin))) / 2
  //
  // For minX, we'll use the absolute distance to the nearest X edge, and we'll
  // adjust the value of X afterwards accordingly. Because we're using absolute
  // values, we know the velocity must be positive, which means we can safely
  // ignore the subtraction part of the quadratic and just go with the addition.
  // And we're doing integer math, so we can take the ceiling.
  const minXVelocity =
    Math.ceil(
      (-1 + Math.sqrt(1 + 8 * Math.min(Math.abs(data.x1), Math.abs(data.x2)))) /
        2,
    ) * (data.x1 < 0 ? -1 : 1);

  const keepGoing = (probe) => {
    const [x, y] = probe.position;
    const [vx, vy] = probe.velocity;

    if (vx === 0) {
      if (x < data.x1 || x > data.x2) {
        return false;
      }
    }
    if (vy < 0) {
      if (y < data.y1) {
        return false;
      }
    }
    return true;
  };

  const range = [
    [data.x1, data.x2],
    [data.y1, data.y2],
  ];

  const velocities = [];

  let y = 0;
  let x = minXVelocity - 1;

  while (x < minXVelocity * 20) {
    x += 1;
    y = data.y1 - 1;
    while (y < 200) {
      y += 1;

      const velocity = [x, y];
      const probe = new Probe(velocity);

      while (keepGoing(probe)) {
        probe.step();
        if (probe.isIn(...range)) {
          velocities.push(velocity);
          break;
        }
      }
    }
  }

  return velocities.length;
};
