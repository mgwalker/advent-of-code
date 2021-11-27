import run from "aocrunner";

const parseInput = (rawInput) => {
  const [time, buses] = rawInput.split("\n");
  return {
    time: +time,
    buses: buses.split(",").map((v) => (Number.isNaN(+v) ? false : +v)),
  };
};

const part1 = (rawInput) => {
  const { time, buses } = parseInput(rawInput);

  const nearestDepartures = buses
    .filter((v) => !!v)
    .reduce((o, v) => {
      const rounds = Math.ceil(time / v);
      return { ...o, [v]: rounds * v };
    }, {});

  const sorted = Object.entries(nearestDepartures).sort(([, a], [, b]) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  });

  const [bus, departs] = sorted[0];

  return bus * (departs - time);
};

// From:
// https://www.geeksforgeeks.org/chinese-remainder-theorem-set-2-implementation/
// Modified for cleanliness
const inv = (a, m) => {
  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  if (m == 1) {
    return 0;
  }

  let aa = a;

  // Apply extended Euclid Algorithm
  while (aa > 1) {
    // q is quotient
    const q = parseInt(aa / m);

    let t = m;

    // m is remainder now, process
    // same as euclid's algo
    m = aa % m;
    aa = t;

    t = x0;

    x0 = x1 - q * x0;

    x1 = t;
  }

  // Make x1 positive
  if (x1 < 0) {
    x1 += m0;
  }

  return x1;
};

const part2 = (rawInput) => {
  // The Chinese remainder theorem. This was a huge pain in the butt.
  const buses = parseInput(rawInput)
    .buses.map((v, i) => (v === false ? false : [v, v - i]))
    .filter((v) => v !== false);

  const P = buses.reduce((product, [number]) => product * number, 1);
  const X = buses.reduce((sum, [number, remainder]) => {
    const prodI = parseInt(P / number);
    return sum + remainder * prodI * inv(prodI, number);
  }, 0);

  return X % P;
};

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
});
