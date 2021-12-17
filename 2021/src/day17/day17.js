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

  isIn({ x1, x2, y1, y2 }) {
    const [x, y] = this.#position;
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      return true;
    }
    return false;
  }

  keepGoing({ x1, x2, y1 }) {
    const [x, y] = this.#position;
    const [vx, vy] = this.#velocity;

    if (vx === 0) {
      if (x < x1 || x > x2) {
        return false;
      }
    }
    if (vy < 0) {
      if (y < y1) {
        return false;
      }
    }
    return true;
  }

  get position() {
    return [...this.#position];
  }

  get velocity() {
    return [...this.#velocity];
  }
}

const getMinXVelocity = (x1, x2) => {
  // We can calculate the minimum X velocity required to reach the target zone:
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
  return (
    Math.ceil(
      (-1 + Math.sqrt(1 + 8 * Math.min(Math.abs(x1), Math.abs(x2)))) / 2,
    ) * (x1 < 0 ? -1 : 1)
  );
};

const checkYs = (forX, data) => {
  let maxHeight = -Infinity;
  const maxY = Math.max(Math.abs(data.y1), Math.abs(data.y2));

  const velocitiesThatHit = [];

  let y = (Math.abs(data.y1) + 1) * (data.y1 < 0 ? -1 : 1);
  while (y < maxY) {
    y += 1;

    const velocity = [forX, y];
    const probe = new Probe(velocity);
    const myHeights = [];

    while (probe.keepGoing(data)) {
      probe.step();
      myHeights.push(probe.position[1]);

      if (probe.isIn(data)) {
        velocitiesThatHit.push(velocity);
        const localMaxHeight = Math.max(...myHeights);
        if (localMaxHeight > maxHeight) {
          maxHeight = localMaxHeight;
        }
        break;
      }
    }
  }

  return [maxHeight, velocitiesThatHit];
};

export const part1 = (raw) => {
  const data = input(raw);

  const x = getMinXVelocity(data.x1, data.x2);

  const [maxHeight] = checkYs(x, data);
  return maxHeight;
};

export const part2 = (raw) => {
  const data = input(raw);

  const velocities = [];
  let x = getMinXVelocity(data.x1, data.x2) - 1;

  while (x <= data.x2) {
    x += 1;
    const [, velocitiesThatHit] = checkYs(x, data);
    velocities.push(...velocitiesThatHit);
  }

  return velocities.length;
};
