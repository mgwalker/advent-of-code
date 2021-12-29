const input = (raw) => raw.split("").map(Number);

export const part1 = (raw) => {
  const data = input(raw);
  let sum = 0;
  for (let i = 0; i < data.length; i += 1) {
    if (data[i] === data[(i + 1) % data.length]) {
      sum += data[i];
    }
  }
  return sum;
};

export const part2 = (raw) => {
  const data = input(raw);
  const skip = data.length / 2;

  let sum = 0;
  for (let i = 0; i < data.length; i += 1) {
    if (data[i] === data[(i + skip) % data.length]) {
      sum += data[i];
    }
  }
  return sum;
};
