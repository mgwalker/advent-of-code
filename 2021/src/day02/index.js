import run from "aocrunner";

const parseInput = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => {
      const [direction, amount] = v.split(" ");
      return { direction, amount: +amount };
    });

const part1 = (raw) => {
  const input = parseInput(raw);
  const position = [0, 0]; // horizontal, depth

  input.forEach(({ direction, amount }) => {
    switch (direction) {
      case "forward":
        position[0] += amount;
        break;
      case "up":
        amount = -amount;
      case "down":
        position[1] += amount;
        break;
    }
  });

  return position[0] * position[1];
};

const part2 = (raw) => {
  const input = parseInput(raw);
  const position = [0, 0, 0]; // horizontal, depth, aim

  input.forEach(({ direction, amount }) => {
    switch (direction) {
      case "forward":
        position[0] += amount;
        position[1] += amount * position[2];
        break;
      case "up":
        amount = -amount;
      case "down":
        position[2] += amount;
        break;
    }
  });

  return position[0] * position[1];
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
