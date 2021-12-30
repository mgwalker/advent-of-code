import hash from "./knot-hash.js";

const input = (raw) => raw.trim();

const getDisk = (key) => {
  const disk = [];
  for (let i = 0; i < 128; i += 1) {
    disk.push(hash(`${key}-${i}`).split(""));
  }
  return disk;
};

export const part1 = (raw) => {
  const key = input(raw);

  return getDisk(key)
    .map((row) => row.filter((v) => v === "1").length)
    .reduce((sum, c) => sum + c, 0);
};

export const part2 = (raw) => {
  const key = input(raw);
  const disk = getDisk(key);

  const used = new Set();
  const regions = [];

  for (let y = 0; y < disk.length; y += 1) {
    for (let x = 0; x < disk[y].length; x += 1) {
      if (disk[y][x] === "1") {
        used.add(`${x},${y}`);
      }
    }
  }

  const getRegion = (x, y) => {
    const members = new Set();

    const queue = [[x, y]];
    while (queue.length > 0) {
      const [px, py] = queue.pop();
      if (!members.has(`${px},${py}`) && disk[py][px] === "1") {
        members.add(`${px},${py}`);

        const neighbors = [
          [px - 1, py],
          [px + 1, py],
          [px, py - 1],
          [px, py + 1],
        ].filter(
          ([nx, ny]) =>
            nx >= 0 && ny >= 0 && nx < disk[0].length && ny < disk.length
        );

        queue.push(...neighbors);
      }
    }

    return members;
  };

  for (const coords of used) {
    const [x, y] = coords.split(",").map(Number);
    const region = getRegion(x, y);
    for (const coordKey of region) {
      used.delete(coordKey);
    }
    regions.push(region);
  }

  return regions.length;
};
