const input = (raw) => {
  const [init, patt] = raw.split("\n\n");

  const [, initial] = init.match(/initial state: (.*)$/);
  const patterns = new Map(patt.split("\n").map((v) => v.split(" => ")));

  return { initial, patterns };
};

const dots = [".", ".", ".", ".", "."];
const cycle = (start, patterns) => {
  const plants = [dots, start, dots].flat();
  const out = [...plants];

  for (let i = 2; i < plants.length - 2; i += 1) {
    out[i] = patterns.get(plants.slice(i - 2, i + 3).join("")) ?? ".";
  }

  return out;
};

export const part1 = (raw) => {
  const { initial, patterns } = input(raw);

  let plants = initial.split("");
  let start = 0;

  for (let i = 0; i < 20; i += 1) {
    plants = cycle(plants, patterns);
    start -= dots.length;
  }

  return plants
    .map((v, i) => (v === "#" ? start + i : 0))
    .reduce((sum, c) => sum + c, 0);
};

export const part2 = (raw) => {
  const { initial, patterns } = input(raw);

  let plants = initial.split("");
  let start = 0;

  const getSum = (plant, zero) =>
    plants
      .map((v, i) => (v === "#" ? zero + i : 0))
      .reduce((sum, c) => sum + c, 0);

  // By observation, the total sum begins to increase by a constant amount after
  // around 100 iterations, so we don't actually need to run them all. Just run
  // enough to start repeating.
  let diff = 0;
  let last = 0;
  for (let i = 0; i < 100; i += 1) {
    plants = cycle(plants, patterns);
    start -= dots.length;

    const sum = getSum(plants, start);
    diff = sum - last;
    last = sum;
  }

  return getSum(plants, start) + diff * (50_000_000_000 - 100);
};
