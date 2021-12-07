import run from "aocrunner";

const parseInput = (raw) => raw.trim().split(",").map(Number);

const part1 = (raw) => {
  const crabspots = parseInput(raw);

  const fuelCost = (toSpot) =>
    crabspots
      .map((crabspot) => Math.abs(crabspot - toSpot))
      .reduce((sum, fuel) => sum + fuel, 0);

  const minimalCrab = Math.min(...crabspots);
  return Math.min(
    ...[...Array(crabspots.length)].map((_, i) => fuelCost(i + minimalCrab)),
  );
};

const part2 = (raw) => {
  const crabspots = parseInput(raw);

  const fuelCost = (toSpot) =>
    crabspots
      .map((crabspot) => {
        const n = Math.abs(crabspot - toSpot);
        return (n * (n + 1)) / 2;
      })
      .reduce((sum, fuel) => sum + fuel, 0);

  const minimalCrab = Math.min(...crabspots);
  return Math.min(
    ...[...Array(crabspots.length)].map((_, i) => fuelCost(i + minimalCrab)),
  );
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
