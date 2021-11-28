import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split(",").map(Number);

const runTheGame = (input, iterations) => {
  const lastSeen = new Uint32Array(iterations);
  input.forEach((number, i) => {
    lastSeen[number] = i + 1;
  });

  let turn = input.length;
  let last = input[input.length - 1];

  while (turn < iterations) {
    const lastTurnForN = lastSeen[last];

    lastSeen[last] = turn;
    last = lastTurnForN ? turn - lastTurnForN : 0;
    turn += 1;
  }

  return last;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return runTheGame(input, 2020);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return runTheGame(input, 30000000);
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
