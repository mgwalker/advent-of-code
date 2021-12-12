const parseInput = (raw) => raw.trim().split(",").map(Number);

const runFor = (raw, days) => {
  const input = parseInput(raw);

  const fishies = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  input.forEach((fishy) => {
    fishies[fishy] += 1;
  });

  for (let i = 0; i < days; i += 1) {
    const newFish = fishies.shift();
    fishies.push(newFish);
    fishies[6] += newFish;
  }

  return fishies.reduce((sum, num) => sum + num, 0);
};

export const part1 = (raw) => runFor(raw, 80);

export const part2 = (raw) => runFor(raw, 256);
