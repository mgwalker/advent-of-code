class Cubish {
  constructor([xRange, yRange, zRange]) {
    this.range = [xRange, yRange, zRange];
    this.holes = [];
  }

  count() {
    const [[xMin, xMax], [yMin, yMax], [zMin, zMax]] = this.range;
    const holes = this.holes.reduce((sum, hole) => sum + hole.count(), 0);

    return (xMax - xMin + 1) * (yMax - yMin + 1) * (zMax - zMin + 1) - holes;
  }

  addHole(otherCubish) {
    const intersection = this.intersectionWith(otherCubish);

    if (intersection) {
      this.holes.forEach((hole) => hole.addHole(intersection));
      this.holes.push(intersection);
    }
  }

  intersectionWith(otherCubish) {
    const [[xMin1, xMax1], [yMin1, yMax1], [zMin1, zMax1]] = this.range;
    const [[xMin2, xMax2], [yMin2, yMax2], [zMin2, zMax2]] = otherCubish.range;

    if (
      xMin2 <= xMax1 &&
      xMax2 >= xMin1 &&
      yMin2 <= yMax1 &&
      yMax2 >= yMin1 &&
      zMin2 <= zMax1 &&
      zMax2 >= zMin1
    ) {
      const xMin = Math.max(xMin1, xMin2);
      const xMax = Math.min(xMax1, xMax2);

      const yMin = Math.max(yMin1, yMin2);
      const yMax = Math.min(yMax1, yMax2);

      const zMin = Math.max(zMin1, zMin2);
      const zMax = Math.min(zMax1, zMax2);

      return new Cubish([
        [xMin, xMax],
        [yMin, yMax],
        [zMin, zMax],
      ]);
    }
    return false;
  }
}

const input = (raw, min = -Infinity, max = Infinity) =>
  raw
    .split("\n")
    .map((v) => {
      const [state, ranges] = v.split(" ");

      const [x, y, z] = ranges.replace(/[xyz]=/g, "").split(",");

      const [xMin, xMax] = x.split("..").map(Number);
      const [yMin, yMax] = y.split("..").map(Number);
      const [zMin, zMax] = z.split("..").map(Number);

      return {
        state,
        range: [
          [xMin, xMax],
          [yMin, yMax],
          [zMin, zMax],
        ],
      };
    })
    .filter(({ range: [[xMin, xMax], [yMin, yMax], [zMin, zMax]] }) => {
      return !(
        xMin > max ||
        xMax < min ||
        yMin > max ||
        yMax < min ||
        zMin > max ||
        zMax < min
      );
    })
    .map((o) => {
      const [[xMin, xMax], [yMin, yMax], [zMin, zMax]] = o.range;
      const range = [
        [xMin < min ? min : xMin, xMax > max ? max : xMax],
        [yMin < min ? min : yMin, yMax > max ? max : yMax],
        [zMin < min ? min : zMin, zMax > max ? max : zMax],
      ];
      const cube = new Cubish(range);
      o.range = range;
      o.cube = cube;
      return o;
    });

const run = (raw, min = -Infinity, max = Infinity) => {
  const data = input(raw, min, max);
  const cubes = [];

  for (const step of data) {
    cubes.forEach((cube) => cube.addHole(step.cube));
    if (step.state === "on") {
      cubes.push(step.cube);
    }
  }

  return cubes.reduce((sum, c) => sum + c.count(), 0);
};

export const part1 = (raw) => run(raw, -50, 50);
export const part2 = (raw) => run(raw);
