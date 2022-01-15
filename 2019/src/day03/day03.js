const input = (raw) =>
  raw.split("\n").map((l) =>
    l.split(",").map((v) => {
      const [, dir, val] = v.match(/^([LRUD])(\d+)$/);
      return [dir, +val];
    }),
  );

const getIntersections = (wire1, wire2) => {
  const xMap = new Map();
  const yMap = new Map();

  const pos1 = [0, 0];
  for (const [dir, value] of wire1) {
    const x = xMap.get(pos1[0]) ?? xMap.set(pos1[0], []).get(pos1[0]);
    const y = yMap.get(pos1[1]) ?? yMap.set(pos1[1], []).get(pos1[1]);

    switch (dir) {
      case "R":
        y.push([pos1[0], pos1[0] + value]);
        pos1[0] += value;
        break;

      case "L":
        y.push([pos1[0] - value, pos1[0]]);
        pos1[0] -= value;
        break;

      case "U":
        x.push([pos1[1] - value, pos1[1]]);
        pos1[1] -= value;
        break;

      case "D":
        x.push([pos1[1], pos1[1] + value]);
        pos1[1] += value;
        break;

      default:
        throw new Error(`Unknown direction ${dir}`);
    }
  }

  const intersections = [];

  const pos2 = [0, 0];
  for (const [dir, value] of wire2) {
    switch (dir) {
      case "R":
        {
          const xt = pos2[0] + value;
          const yy = pos2[1];

          for (let xx = pos2[0]; xx <= xt; xx += 1) {
            if (xMap.has(xx)) {
              if (
                xMap.get(xx).some(([yMin, yMax]) => yy >= yMin && yy <= yMax)
              ) {
                intersections.push([xx, yy]);
              }
            }
          }
          pos2[0] += value;
        }
        break;

      case "L":
        {
          const xt = pos2[0] - value;
          const yy = pos2[1];

          for (let xx = xt; xx <= pos2[0]; xx += 1) {
            if (xMap.has(xx)) {
              if (
                xMap.get(xx).some(([yMin, yMax]) => yy >= yMin && yy <= yMax)
              ) {
                intersections.push([xx, yy]);
              }
            }
          }
          pos2[0] -= value;
        }
        break;

      case "U":
        {
          const yt = pos2[1] - value;
          const xx = pos2[0];

          for (let yy = yt; yy <= pos2[1]; yy += 1) {
            if (yMap.has(yy)) {
              if (
                yMap.get(yy).some(([xMin, xMax]) => xx >= xMin && xx <= xMax)
              ) {
                intersections.push([xx, yy]);
              }
            }
          }
          pos2[1] -= value;
        }
        break;

      case "D":
        {
          const yt = pos2[1] + value;
          const xx = pos2[0];
          for (let yy = pos2[1]; yy <= yt; yy += 1) {
            if (yMap.has(yy)) {
              if (
                yMap.get(yy).some(([xMin, xMax]) => xx >= xMin && xx <= xMax)
              ) {
                intersections.push([xx, yy]);
              }
            }
          }
          pos2[1] += value;
        }
        break;

      default:
        throw new Error(`Unknown direction ${dir}`);
    }
  }

  return intersections;
};

export const part1 = (raw) => {
  const [wire1, wire2] = input(raw);

  return Math.min(
    ...getIntersections(wire1, wire2)
      .map(([x, y]) => Math.abs(x) + Math.abs(y))
      .filter((d) => d > 0),
  );
};

export const part2 = (raw) => {
  const wires = input(raw);

  const intersections = new Map(
    getIntersections(wires[0], wires[1]).map(([x, y]) => [
      `${x},${y}`,
      [Infinity, Infinity],
    ]),
  );
  intersections.delete("0,0");

  for (let i = 0; i < wires.length; i += 1) {
    const p = [0, 0];
    let steps = 0;
    for (const [dir, value] of wires[i]) {
      switch (dir) {
        case "R":
          {
            const stop = p[0] + value;
            for (let x = p[0] + 1; x <= stop; x += 1) {
              steps += 1;
              p[0] = x;
              if (intersections.has(`${p[0]},${p[1]}`)) {
                const stepsTaken = intersections.get(`${p[0]},${p[1]}`);
                if (steps < stepsTaken[i]) {
                  stepsTaken[i] = steps;
                }
              }
            }
          }
          break;

        case "L":
          {
            const stop = p[0] - value;
            for (let x = p[0] - 1; x >= stop; x -= 1) {
              steps += 1;
              p[0] = x;
              if (intersections.has(`${p[0]},${p[1]}`)) {
                const stepsTaken = intersections.get(`${p[0]},${p[1]}`);
                if (steps < stepsTaken[i]) {
                  stepsTaken[i] = steps;
                }
              }
            }
          }
          break;

        case "D":
          {
            const stop = p[1] + value;
            for (let y = p[1] + 1; y <= stop; y += 1) {
              steps += 1;
              p[1] = y;
              if (intersections.has(`${p[0]},${p[1]}`)) {
                const stepsTaken = intersections.get(`${p[0]},${p[1]}`);
                if (steps < stepsTaken[i]) {
                  stepsTaken[i] = steps;
                }
              }
            }
          }
          break;

        case "U":
          {
            const stop = p[1] - value;
            for (let y = p[1] - 1; y >= stop; y -= 1) {
              steps += 1;
              p[1] = y;
              if (intersections.has(`${p[0]},${p[1]}`)) {
                const stepsTaken = intersections.get(`${p[0]},${p[1]}`);
                if (steps < stepsTaken[i]) {
                  stepsTaken[i] = steps;
                }
              }
            }
          }
          break;

        default:
          throw new Error(`unhandled: ${dir}`);
      }
    }
  }

  return Math.min(...[...intersections.values()].map(([a, b]) => a + b));
};
