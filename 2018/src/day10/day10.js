const input = (raw) =>
  raw.split("\n").map((l) => {
    const [, x, y, dx, dy] = l
      .match(/position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>/)
      .map(Number);
    return [x, y, dx, dy];
  });

const move = (data, by = 1) => {
  /* eslint-disable no-param-reassign */
  for (let i = 0; i < data.length; i += 1) {
    data[i][0] += data[i][2] * by;
    data[i][1] += data[i][3] * by;
  }
};

const go = (raw) => {
  const data = input(raw);
  let yRange =
    Math.max(...data.map(([, y]) => y)) - Math.min(...data.map(([, y]) => y));
  let newYRange = yRange;

  let t = 0;
  do {
    t += 1;
    yRange = newYRange;
    move(data);

    newYRange =
      Math.max(...data.map(([, y]) => y)) - Math.min(...data.map(([, y]) => y));
  } while (newYRange < yRange);

  // Gotta go back one because after the last move the points have begun to
  // diverge again.
  move(data, -1);
  t -= 1;

  const maxX = Math.max(...data.map(([x]) => x));
  const minX = Math.min(...data.map(([x]) => x));

  const maxY = Math.max(...data.map(([, y]) => y));
  const minY = Math.min(...data.map(([, y]) => y));

  const img = [...Array(maxY - minY + 1)].map(() =>
    [...Array(maxX - minX + 1)].map(() => " ")
  );
  for (const [x, y] of data) {
    img[y - minY][x - minX] = "#";
  }
  return { img, t };
};

export const part1 = (raw) => {
  const { img } = go(raw);
  return img.map((row) => row.join("")).join("\n");
};

export const part2 = (raw) => {
  const { t } = go(raw);
  return t;
};
