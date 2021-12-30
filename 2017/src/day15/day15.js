const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => BigInt(+l.split(" ").pop()));

export const part1 = (raw) => {
  const [startA, startB] = input(raw);
  const [factorA, factorB] = [16807n, 48271n];
  const divisor = 2_147_483_647n;
  const bits16 = BigInt(0xff_ff);

  let count = 0;
  let a = startA;
  let b = startB;
  for (let i = 0; i < 40_000_000; i += 1) {
    a = (a * factorA) % divisor;
    b = (b * factorB) % divisor;

    if ((a & bits16) === (b & bits16)) {
      count += 1;
    }
  }

  return count;
};

export const part2 = (raw) => {
  const [startA, startB] = input(raw);
  const [factorA, factorB] = [16807n, 48271n];
  const divisor = 2_147_483_647n;
  const bits16 = BigInt(0xff_ff);

  let count = 0;
  let a = startA;
  let b = startB;
  for (let i = 0; i < 5_000_000; i += 1) {
    do {
      a = (a * factorA) % divisor;
    } while (a % 4n !== 0n);

    do {
      b = (b * factorB) % divisor;
    } while (b % 8n !== 0n);

    if ((a & bits16) === (b & bits16)) {
      count += 1;
    }
  }

  return count;
};
