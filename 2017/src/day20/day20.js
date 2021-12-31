const arrayAdd = (a1, a2) => {
  const arr = [];
  for (let i = 0; i < a1.length; i += 1) {
    arr.push(a1[i] + a2[i]);
  }
  return arr;
};

const manhattanToZero = (a) => Math.abs(a[0]) + Math.abs(a[1]) + Math.abs(a[2]);

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => {
      const [, p0, p1, p2, v0, v1, v2, a0, a1, a2] = l.match(
        /p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/
      );
      const point = {
        position: [+p0, +p1, +p2],
        velocity: [+v0, +v1, +v2],
        acceleration: [+a0, +a1, +a2],
      };

      return point;
    });

export const part1 = (raw) => {
  const points = input(raw);

  let lowest = Infinity;
  let lowestIndex = -1;

  // We only need the point with the smallest acceleration. Over an arbitrarily
  // long time, that is the one that will be closest to any fixed point.
  for (let i = 0; i < points.length; i += 1) {
    const [a1, a2, a3] = points[i].acceleration;
    const magnitude = Math.sqrt(a1 ** 2 + a2 ** 2 + a3 ** 2);
    if (magnitude < lowest) {
      lowest = magnitude;
      lowestIndex = i;
    }
  }

  return lowestIndex;
};

export const part2 = (raw) => {
  const data = input(raw);
  const points = new Map();

  for (let i = 0; i < data.length; i += 1) {
    points.set(i, data[i]);
  }

  let stillAlive = 0;

  const eq = ([p11, p12, p13], [p21, p22, p23]) =>
    p11 === p21 && p12 === p22 && p13 === p23;

  while (points.size > 0) {
    for (const [i, point] of points) {
      point.velocity = arrayAdd(point.velocity, point.acceleration);
      point.position = arrayAdd(point.position, point.velocity);

      if (manhattanToZero(point.position) > 500_000) {
        points.delete(i);
        stillAlive += 1;
      }
    }

    for (const [i, point] of points) {
      let collision = false;
      for (const [j, pt2] of points) {
        if (i !== j) {
          if (eq(point.position, pt2.position)) {
            collision = true;
            points.delete(j);
          }
        }
      }
      if (collision) {
        points.delete(i);
      }
    }
  }

  return stillAlive;
};
