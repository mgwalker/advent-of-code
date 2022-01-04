const input = (raw) => raw.trim().split("\n");

export const part1 = (raw) => {
  const data = input(raw);

  let two = 0;
  let three = 0;

  const frequency = new Map();

  for (const id of data) {
    frequency.clear();
    for (const c of id) {
      frequency.set(c, (frequency.get(c) ?? 0) + 1);
    }

    if ([...frequency.values()].some((v) => v === 2)) {
      two += 1;
    }
    if ([...frequency.values()].some((v) => v === 3)) {
      three += 1;
    }
  }

  return two * three;
};

export const part2 = (raw) => {
  const data = input(raw);

  for (let i = 0; i < data.length - 1; i += 1) {
    const id1 = data[i];
    for (let j = i + 1; j < data.length; j += 1) {
      const id2 = data[j];

      const diff = id1.split("").map((_, k) => id1[k] === id2[k]);

      if (diff.filter((v) => v === false).length === 1) {
        return diff
          .map((v, k) => (v ? id1[k] : v))
          .filter((v) => v !== false)
          .join("");
      }
    }
  }

  return false;
};
