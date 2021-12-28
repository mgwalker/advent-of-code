const input = (raw) => [
  [],
  ...raw.split("\n").map((l) => {
    const [, positions, start] = l.match(
      /(\d+) positions;.* it is at position (\d+)/
    );
    return [+start, +positions];
  }),
];

export const part1 = (raw) => {
  const data = input(raw);

  // Need to find t where:
  //   (p0 + t + i) % m0 = 0
  //
  // for all discs, where p0 is the disc's initial position, is is the disc's
  // index in the list (which is why we insert a null disc to start things off),
  // and m0 is the maximum number of positions the disc can inhabit.

  let openTime = 0;
  let t = 0;
  while (openTime === 0) {
    if (
      data.every(([position, count], i) => {
        if (i === 0) {
          return true;
        }
        const p = (position + t + i) % count;
        return p === 0;
      })
    ) {
      openTime = t;
    }
    t += 1;
  }

  return openTime;
};

export const part2 = (raw) => {
  const data = input(raw);
  data.push([0, 11]);

  let openTime = 0;
  let t = 0;
  while (openTime === 0) {
    if (
      data.every(([position, count], i) => {
        if (i === 0) {
          return true;
        }
        const p = (position + t + i) % count;
        return p === 0;
      })
    ) {
      openTime = t;
    }
    t += 1;
  }

  return openTime;
};
