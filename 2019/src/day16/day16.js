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

    const output = digits
      .map((_, i) => {
        const p = pattern();
        let sum = 0;
        for (let j = i; j < digits.length; j += i + 1) {
          const pp = p.next().value;
          if (pp !== 0) {
            sum += digits.slice(j, j + i + 1).reduce((s, dd) => s + dd * pp, 0);
          }
        }

        return Math.abs(sum) % 10;
      })
      .join("")
      .padStart(digits.length, "0");

    return output;
  };

  let out = data;
  for (let i = 0; i < 100; i += 1) {
    out = process(out);
  }

  return out.substring(0, 8);
};

export const part2 = (raw) => {
  const data = input(raw);

  const process = (num) => {
    for (let i = num.length - 2; i >= 0; i -= 1) {
      num[i] = (num[i + 1] + num[i]) % 10;
    }
  };

  const len = +data.slice(0, 7);
  const out = [...Array(10_000)]
    .flatMap(() => data)
    .join("")
    .split("")
    .map(Number)
    .slice(len); // Slice off everything before the part we care about.
  // It *JUST SO HAPPENS* that this offset is always in the second half of the
  // input, which is important because in the second half of the input, a
  // given "next" digit is defined as the sum of the digits that follow it,
  // except for the last digit which just stays the same.
  //
  // So in the process() method above, we start from the BACK of the input,
  // skipping the very last element, and then just increment each digit by the
  // "new" value of the digit that follows it.

  for (let i = 0; i < 100; i += 1) {
    process(out);
  }

  return out.slice(0, 8).join("");
};
