const line = (start, end) => {
  const horizontal = start[0] === end[0];
  const vertical = start[1] === end[1];

  const deltaH = end[0] - start[0];
  const deltaV = end[1] - start[1];

  const slope = [];
  if (vertical) {
    slope[0] = deltaH / Math.abs(deltaH);
    slope[1] = 0;
  } else if (horizontal) {
    slope[0] = 0;
    slope[1] = deltaV / Math.abs(deltaV);
  } else {
    slope[0] = deltaH > 0 ? 1 : -1;
    slope[1] = deltaV > 0 ? 1 : -1;
  }

  const allPoints = () => {
    const points = [start];
    let x = start[0];
    let y = start[1];
    while (x !== end[0] || y !== end[1]) {
      x += slope[0];
      y += slope[1];
      points.push([x, y]);
    }
    return points;
  };

  return { allPoints, end, horizontal, start, vertical };
};

const parseInput = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => {
      const [start, end] = v.split(" -> ");
      return line(start.split(",").map(Number), end.split(",").map(Number));
    });

const findIntersections = (input) => {
  const map = new Map();
  input.forEach((line) => {
    line.allPoints().forEach(([x, y]) => {
      const key = `${x},${y}`;
      if (!map.has(key)) {
        map.set(key, 0);
      }
      map.set(key, map.get(key) + 1);
    });
  });
  return Array.from(map.values()).filter((v) => v > 1).length;
};

export const part1 = (raw) => {
  const input = parseInput(raw).filter(
    ({ horizontal, vertical }) => horizontal || vertical,
  );

  return findIntersections(input);
};

export const part2 = (raw) => {
  const input = parseInput(raw);

  return findIntersections(input);
};
