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

const printable = (data, ground) => {
  const xs = data.map(([x]) => x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  const ys = data.map(([, y]) => y);
  const maxY = Math.max(...ys);

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

const run = (data) => {
  const ys = data.map(([, y]) => y);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const ground = new DefaultMap(
    false,
    data.map(([x, y]) => [`${x},${y}`, "#"])
  );

  const queue = [[500, minY]];

  while (queue.length > 0) {
    const down = queue.pop();

    if (down[1] <= maxY) {
      ground.set(`${down[0]},${down[1]}`, "~");
      const below = ground.get(`${down[0]},${down[1] + 1}`);

      if (below === false) {
        queue.push([down[0], down[1] + 1]);
      } else if (below !== "~") {
        let y = down[1];
        const downs = { left: -Infinity, right: Infinity };

        while (downs.left === -Infinity && downs.right === Infinity) {
          let [xL] = down;
          let [xR] = down;

          do {
            ground.set(`${xL},${y}`, "`");
            if (
              ground.get(`${xL},${y + 1}`) === false ||
              ground.get(`${xL},${y + 1}`) === "~"
            ) {
              downs.left = xL;

              break;
            }
            xL -= 1;
          } while (ground.get(`${xL},${y}`) !== `#`);

          do {
            ground.set(`${xR},${y}`, "`");
            if (
              ground.get(`${xR},${y + 1}`) === false ||
              ground.get(`${xR},${y + 1}`) === "~"
            ) {
              downs.right = xR;
              break;
            }
            xR += 1;
          } while (ground.get(`${xR},${y}`) !== "#");

          y -= 1;
        }

        y += 1;
        if (downs.left !== -Infinity) {
          for (let x = downs.left; x < downs.right; x += 1) {
            if (ground.get(`${x},${y}`) === "#") {
              break;
            }
            ground.set(`${x},${y}`, "~");
          }
          queue.push([downs.left, y]);
        }
        if (downs.right !== Infinity) {
          for (let x = downs.right; x > downs.left; x -= 1) {
            if (ground.get(`${x},${y}`) === "#") {
              break;
            }
            ground.set(`${x},${y}`, "~");
          }
          queue.push([downs.right, y]);
        }
      }
    }
  }

  return ground;
};

export const part1 = (raw) => {
  const data = input(raw);
  const ground = run(data);

  for (const [key, value] of ground) {
    if (value === "`") {
      ground.set(key, "~");
    }
  }

  fs.writeFileSync("src/day17/map.txt", printable(data, ground));

  return [...ground.values()].filter((v) => v === "~").length;
};

export const part2 = (raw) => {
  const data = input(raw);
  const ground = run(data);

  return [...ground.values()].filter((v) => v === "`").length;
};
