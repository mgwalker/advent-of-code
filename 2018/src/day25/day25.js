const input = (raw) => raw.split("\n").map((l) => l.split(",").map(Number));

const manhattan = (a, b) =>
  [0, 1, 2, 3].map((i) => Math.abs(a[i] - b[i])).reduce((sum, i) => sum + i, 0);

export const part1 = (raw) => {
  const points = input(raw);

  const constellations = [];

  const addToConstellations = (point) => {
    for (const constellation of constellations) {
      for (const link of constellation) {
        if (manhattan(point, link) <= 3) {
          constellation.push(point);
          return true;
        }
      }
    }
    return false;
  };

  for (const point of points) {
    if (!addToConstellations(point)) {
      constellations.push([point]);
    }
  }

  // Now see if any constellations overlap
  for (let i = 0; i < constellations.length; i += 1) {
    const others = constellations.slice(i + 1);
    for (const link of constellations[i]) {
      const mergeWith = others.find((pts) =>
        pts.some((pt) => manhattan(pt, link) <= 3)
      );

      if (mergeWith) {
        // merge these ones
        constellations[i].forEach((pt) => mergeWith.push(pt));
        constellations.splice(i, 1);
        i -= 1;
        break;
      }
    }
  }

  return constellations.length;
};

export const part2 = (raw) => {
  const data = input(raw);
  return;
};
