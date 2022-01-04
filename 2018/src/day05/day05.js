const input = (raw) => raw.trim();

const reduce = (polymer) => {
  let reduced = polymer;
  const newStr = [];
  let offset = 0;
  let exploded = false;
  do {
    exploded = false;
    for (let i = 0; i < reduced.length - 1; i += 1) {
      const a = reduced[i];
      const b = reduced[i + 1];

      if (
        (a.toLowerCase() === a && a.toUpperCase() === b) ||
        (a.toUpperCase() === a && a.toLowerCase() === b)
      ) {
        newStr.push(reduced.substring(offset, i));
        offset = i + 2;
        i += 1;
        exploded = true;
      }
    }
    newStr.push(reduced.substring(offset));

    reduced = newStr.join("");
    newStr.length = 0;
    offset = 0;
  } while (exploded);

  return reduced;
};

export const part1 = (raw) => {
  const polymer = input(raw);
  return reduce(polymer).length;
};

export const part2 = (raw) => {
  const polymer = input(raw);

  let shortest = Infinity;
  "abcdefghijklmnopqrstuvwxyz".split("").forEach((l) => {
    const len = reduce(polymer.replace(new RegExp(`${l}`, "ig"), "")).length;
    if (len < shortest) {
      shortest = len;
    }
  });

  return shortest;
};
