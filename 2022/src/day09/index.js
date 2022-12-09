import run from "aocrunner";

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((move) => {
      const [direction, count] = move.split(" ");
      return { direction, count: +count };
    });

const moveRopeWithKnots = (moves, knotCount) => {
  const knots = [...Array(knotCount)].map(() => [0, 0]);
  const tailLocations = new Set();
  tailLocations.add(knots[knots.length - 1].join(","));

  for (const { direction, count } of moves) {
    const pIndex = direction === "R" || direction === "L" ? 0 : 1;
    const step = direction === "U" || direction === "R" ? 1 : -1;

    for (let i = 0; i < count; i += 1) {
      knots[0][pIndex] += step;

      for (let k = 1; k < knots.length; k += 1) {
        // if the head and tail are two steps apart, move the tail
        const moveKnot =
          Math.abs(knots[k - 1][0] - knots[k][0]) > 1 ||
          Math.abs(knots[k - 1][1] - knots[k][1]) > 1;

        if (moveKnot) {
          if (knots[k - 1][0] === knots[k][0]) {
            knots[k][1] += knots[k - 1][1] > knots[k][1] ? 1 : -1;
          } else if (knots[k - 1][1] === knots[k][1]) {
            knots[k][0] += knots[k - 1][0] > knots[k][0] ? 1 : -1;
          } else {
            // diagonal
            knots[k][0] += knots[k - 1][0] < knots[k][0] ? -1 : 1;
            knots[k][1] += knots[k - 1][1] < knots[k][1] ? -1 : 1;
          }
        } else {
          break;
        }
      }

      tailLocations.add(knots[knots.length - 1].join(","));
    }
  }

  return tailLocations.size;
};

export const part1 = (raw) => {
  const data = input(raw);
  return moveRopeWithKnots(data, 2);
};

export const part2 = (raw) => {
  const data = input(raw);
  return moveRopeWithKnots(data, 10);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
