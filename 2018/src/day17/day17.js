import fs from "fs";

class DefaultMap extends Map {
  #_default;

  constructor(defaultValue, ...args) {
    super(...args);
    this.#_default = defaultValue;
  }

  get(key) {
    return super.get(key) ?? this.#_default;
  }
}

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .flatMap((v) => {
      const coords = [];
      const [, x, y1, y2] = (v.match(/x=(\d+), y=(\d+)\.\.(\d+)/) ?? []).map(
        Number
      );
      if (x !== undefined) {
        for (let y = y1; y <= y2; y += 1) {
          coords.push([x, y]);
        }
      } else {
        const [, y, x1, x2] = (v.match(/y=(\d+), x=(\d+)\.\.(\d+)/) ?? []).map(
          Number
        );

        for (let x = x1; x <= x2; x += 1) {
          coords.push([x, y]);
        }
      }
      return coords;
    });

export const part1 = (raw) => {
  const data = input(raw);
  const ys = data.map(([, y]) => y);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  // false = unblocked (sand), true = blocked (clay or water)
  const ground = new DefaultMap(
    false,
    data.map(([x, y]) => [`${x},${y}`, "#"])
  );

  const printable = () => {
    const xs = data.map(([x]) => x);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);

    const rows = [];
    for (let y = 1; y <= maxY; y += 1) {
      const row = [];
      for (let x = minX; x <= maxX; x += 1) {
        const v = ground.get(`${x},${y}`);
        row.push(v === false ? " " : v);
      }
      rows.push(row.join(""));
    }
    return rows.join("\n");
  };

  const queue = [[500, minY]];

  const sort = (a, b) => {
    let ya = a[1];
    let yb = b[1];

    if (Array.isArray(a[0])) {
      ya = a[0][1];
    }
    if (Array.isArray(b[0])) {
      yb = b[0][1];
    }

    return yb - ya;
  };

  let i = 0;
  while (queue.length > 0) {
    i += 1;
    queue.sort(sort);
    const next = queue.pop();
    if (Array.isArray(next[0])) {
      next.forEach(([x, y]) => ground.set(`${x},${y}`, "~"));

      if (next.some(([x, y]) => ground.get(`${x},${y + 1}`) === false)) {
        // At least one of them can go down, starting a new stream. We don't
        // want to queue a new stream but instead individual points.
        for (const [x, y] of next) {
          if (ground.get(`${x},${y + 1}`) === false) {
            queue.push([x, y + 1]);
          } else {
            if (ground.get(`${x + 1},${y}`) === false) {
              queue.push([[x + 1, y, false]]);
            }
            if (ground.get(`${x - 1},${y}`) === false) {
              queue.push([[x - 1, y, false]]);
            }
          }
        }
      } else {
        // Neither side goes down, so just keep spreading.
        const stream = [];
        const [[, , source]] = next;

        for (const [x, y] of next) {
          if (ground.get(`${x + 1},${y}`) === false) {
            stream.push([x + 1, y, source]);
          }
          if (ground.get(`${x - 1},${y}`) === false) {
            stream.push([x - 1, y, source]);
          }
        }
        if (stream.length > 0) {
          queue.unshift(stream);
        } else {
          // We can't spread left or right any further, and we can't go down.
          // Re-queue the source node for more investigation!
          if (source) {
            queue.push([source[0], source[1] - 1]);
          }
        }
      }
    } else {
      const [x, y] = next;
      if (y >= minY && y <= maxY) {
        ground.set(`${x},${y}`, "~");

        if (ground.get(`${x},${y + 1}`) === false) {
          queue.push([x, y + 1]);
        } else {
          const stream = [];
          if (ground.get(`${x + 1},${y}`) !== "#") {
            stream.push([x + 1, y, [x, y]]);
          }
          if (ground.get(`${x - 1},${y}`) !== "#") {
            stream.push([x - 1, y, [x, y]]);
          }
          if (stream.length > 0) {
            queue.push(stream);
          }
        }
      }
    }
    if (i > 897) {
      console.log(queue);
      break;
    }
  }

  fs.writeFileSync("src/day17/map.txt", printable());

  return [...ground.values()].filter((v) => v === "~").length;
};

export const part2 = (raw) => {
  const data = input(raw);
  return;
};
