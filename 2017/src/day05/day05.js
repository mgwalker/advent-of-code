const input = (raw) => raw.trim().split("\n").map(Number);

export const part1 = (raw) => {
  const data = input(raw);

  let ip = 0;
  let steps = 0;

  while (ip < data.length) {
    const jmp = data[ip];
    data[ip] += 1;
    ip += jmp;
    steps += 1;
  }

  return steps;
};

export const part2 = (raw) => {
  const data = input(raw);

  let ip = 0;
  let steps = 0;

  while (ip < data.length) {
    const jmp = data[ip];
    if (jmp >= 3) {
      data[ip] -= 1;
    } else {
      data[ip] += 1;
    }
    ip += jmp;
    steps += 1;
  }

  return steps;
};
