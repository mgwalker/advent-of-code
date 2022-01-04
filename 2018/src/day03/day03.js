import CountingSet from "./CountingSet.js";

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => {
      const [, id, left, top, width, height] = v
        .match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/)
        .map(Number);
      return [id, [left, top], [width, height]];
    });

export const part1 = (raw) => {
  const claims = input(raw);
  const set = new CountingSet();

  for (const [, [left, top], [width, height]] of claims) {
    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        set.add(`${left + x},${top + y}`);
      }
    }
  }

  return [...set.values()].filter((v) => v > 1).length;
};

export const part2 = (raw) => {
  const claims = input(raw);
  const set = new CountingSet();

  for (const [, [left, top], [width, height]] of claims) {
    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        set.add(`${left + x},${top + y}`);
      }
    }
  }

  let unoverlapped = false;
  for (const [id, [left, top], [width, height]] of claims) {
    let hasOverlap = false;
    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        if (set.get(`${left + x},${top + y}`) > 1) {
          hasOverlap = true;
          break;
        }
      }
      if (hasOverlap) {
        break;
      }
    }
    if (!hasOverlap) {
      unoverlapped = id;
      break;
    }
  }

  return unoverlapped;
};
