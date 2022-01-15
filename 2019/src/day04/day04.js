const input = (raw) => raw.trim().split("-").map(Number);

export const part1 = (raw) => {
  const [min, max] = input(raw);

  const possibles = [...Array(max - min + 1)].map((_, i) => [
    `${i + min}`,
    `${i + min}`.split("").map(Number),
  ]);

  const adjacentRepeat = /(\d)\1/;

  return possibles.filter(([str, digits]) => {
    if (!adjacentRepeat.test(str)) {
      return false;
    }
    for (let i = 0; i < digits.length - 1; i += 1) {
      if (digits[i] > digits[i + 1]) {
        return false;
      }
    }
    return true;
  }).length;
};

export const part2 = (raw) => {
  const [min, max] = input(raw);

  const possibles = [...Array(max - min + 1)].map((_, i) => [
    `${i + min}`,
    `${i + min}`.split("").map(Number),
  ]);

  const adjacentRepeat = /(\d)\1/;
  const adjacentRepeatG = /(\d)\1/g;

  return possibles.filter(([str, digits]) => {
    if (!adjacentRepeat.test(str)) {
      return false;
    }

    const adjacentPairs = str.matchAll(adjacentRepeatG);
    let validMatch = false;
    for (const { 1: digit, index } of adjacentPairs) {
      if (str[index - 1] !== digit && str[index + 2] !== digit) {
        validMatch = true;
      }
    }
    if (!validMatch) {
      return false;
    }

    for (let i = 0; i < digits.length - 1; i += 1) {
      if (digits[i] > digits[i + 1]) {
        return false;
      }
    }
    return true;
  }).length;
};
