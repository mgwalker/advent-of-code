const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => v.replace(/\s/g, "").split(":").map(Number))
    .map(([d, r]) => ({ depth: d, range: r }));

export const part1 = (raw) => {
  const layers = input(raw);

  return layers
    .filter(({ depth, range }) => {
      const timeToZero = range + range - 2;
      return depth % timeToZero === 0;
    })
    .map(({ depth, range }) => depth * range)
    .reduce((sum, c) => sum + c, 0);
};

export const part2 = (raw) => {
  const layers = input(raw);

  // find a t where depth+t below is non-zero for every layer
  // let found = false;
  let t = 0;
  while (
    // eslint-disable-next-line no-loop-func
    !layers.every(({ depth, range }) => {
      const timeToZero = range + range - 2;
      return (depth + t) % timeToZero !== 0;
    })
  ) {
    t += 1;
  }

  return t;
};
