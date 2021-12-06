import run from "aocrunner";

const parseInput = (raw) => raw.trim().split(",").map(Number);

const runFor = (raw, days) => {
  const input = parseInput(raw);

  const fishies = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  input.forEach((fishy) => {
    fishies[fishy] += 1;
  });

  const nextDay = (() => {
    return () => {
      const newFish = fishies.shift();
      fishies.push(newFish);
      fishies[6] += newFish;
    };
  })();

  [...Array(days)].forEach(nextDay);

  return fishies.reduce((sum, num) => sum + num, 0);
};

const part1 = (raw) => runFor(raw, 80);

const part2 = (raw) => runFor(raw, 256);

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
