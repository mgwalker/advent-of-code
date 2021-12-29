const input = (raw) => raw.split("");

const addRow = (previous) => {
  return previous.map((center, i) => {
    let pL = i - 1;
    let pR = i + 1;

    const left = pL >= 0 ? previous[pL] : ".";
    const right = pR < previous.length ? previous[pR] : ".";

    if (left === "^" && right === ".") {
      return "^";
    }
    if (right === "^" && left === ".") {
      return "^";
    }
    return ".";
  });
};

export const part1 = (raw) => {
  let data = input(raw);
  let safe = 0;

  for (let i = 0; i < 40; i += 1) {
    safe += data.filter((c) => c === ".").length;
    data = addRow(data);
  }

  return safe;
};

export const part2 = (raw) => {
  let data = input(raw);
  let safe = 0;

  for (let i = 0; i < 400_000; i += 1) {
    safe += data.filter((c) => c === ".").length;
    data = addRow(data);
  }

  return safe;
};
