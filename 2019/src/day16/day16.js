const input = (raw) => raw.trim();

function* pattern(repeats = 1) {
  const p = [0, 1, 0, -1];
  let i = 0;
  let r = 0;

  if (repeats === 1) {
    i = 1;
  } else {
    r = 1;
  }

  do {
    yield p[i % p.length];

    r += 1;
    if (r >= repeats) {
      r = 0;
      i += 1;
    }
  } while (true);
}

export const part1 = (raw) => {
  const data = input(raw);

  const process = (num) => {
    const digits = num.split("").map(Number);

    return digits
      .map((_, i) => {
        const p = pattern(i + 1);
        let sum = 0;
        for (const d of digits) {
          const pp = p.next().value;
          sum += d * pp;
        }
        return Math.abs(sum) % 10;
      })
      .join("")
      .padStart(digits.length, "0");
  };

  let out = data;
  for (let i = 0; i < 100; i += 1) {
    out = process(out);
  }

  return out.substr(0, 8);
};

export const part2 = (raw) => {
  const data = input(raw);

  const process = (num) => {
    const digits = num.split("").map(Number);

    return digits
      .map((_, i) => {
        const p = pattern(i + 1);
        let sum = 0;
        for (const d of digits) {
          const pp = p.next().value;
          sum += d * pp;
        }
        return Math.abs(sum) % 10;
      })
      .join("")
      .padStart(digits.length, "0");
  };

  const len = +data.substring(0, 7);

  let out = [...Array(10_000)]
    .flatMap(() => data)
    .join("")
    .substring(0, len);

  for (let i = 0; i < 100; i += 1) {
    console.log(i);
    out = process(out);
  }

  return out.substr(0, 8);
};
