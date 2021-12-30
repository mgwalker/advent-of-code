const input = (raw) => raw.trim().replace(/\s/g, " ").split(" ").map(Number);

const getMaxIndex = (data) => {
  let max = 0;
  for (let i = 1; i < data.length; i += 1) {
    if (data[i] > data[max]) {
      max = i;
    }
  }
  return max;
};

const cycle = (data) => {
  /* eslint-disable no-param-reassign */
  let index = getMaxIndex(data);
  let distribute = data[index];
  data[index] = 0;

  while (distribute > 0) {
    index = (index + 1) % data.length;
    data[index] += 1;
    distribute -= 1;
  }
};

export const part1 = (raw) => {
  const data = input(raw);
  const seen = new Set();

  let iterations = 0;
  while (!seen.has(data.join(","))) {
    seen.add(data.join(","));
    cycle(data);

    iterations += 1;
  }

  return iterations;
};

export const part2 = (raw) => {
  const data = input(raw);
  const seen = new Set();

  while (!seen.has(data.join(","))) {
    seen.add(data.join(","));
    cycle(data);
  }

  const target = data.join(",");
  cycle(data);
  let cycles = 1;
  while (data.join(",") !== target) {
    cycle(data);
    cycles += 1;
  }

  return cycles;
};
