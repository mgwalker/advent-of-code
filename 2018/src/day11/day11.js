const input = (raw) => {
  const serialNumber = +raw;
  const grid = [...Array(301)].map((_, y) =>
    [...Array(301)].map((_, x) => {
      const rackID = x + 10;
      const power = (rackID * y + serialNumber) * rackID;
      return (Math.floor(power / 100) % 10) - 5;
    })
  );
  return grid;
};

const getMax = (grid, size = 3) => {
  let max = -Infinity;
  const maxTopLeftCords = [-1, -1];

  for (let y = 1; y <= 300 - size + 1; y += 1) {
    for (let x = 1; x <= 300 - size + 1; x += 1) {
      const coords = [];
      for (let xo = 0; xo < size; xo += 1) {
        for (let yo = 0; yo < size; yo += 1) {
          coords.push([x + xo, y + yo]);
        }
      }

      const power = coords.reduce((sum, [xx, yy]) => sum + grid[yy][xx], 0);

      if (power > max) {
        max = power;
        maxTopLeftCords[0] = x;
        maxTopLeftCords[1] = y;
      }
    }
  }

  return [max, maxTopLeftCords];
};

export const part1 = (raw) => {
  const grid = input(raw);
  return getMax(grid)[1].join(",");
};

export const part2 = (raw) => {
  const grid = input(raw);

  let max = -Infinity;
  const coords = [-1, -1, -1];

  for (let size = 1; size <= 15; size += 1) {
    const [localMax, maxCoords] = getMax(grid, size);
    if (localMax > max) {
      max = localMax;
      coords[0] = maxCoords[0];
      coords[1] = maxCoords[1];
      coords[2] = size;
    }
  }

  return coords.join(",");
};
