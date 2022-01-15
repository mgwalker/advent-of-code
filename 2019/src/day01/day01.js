const input = (raw) => raw.trim().split("\n").map(Number);

export const part1 = (raw) =>
  input(raw)
    .map((mass) => Math.floor(mass / 3) - 2)
    .reduce((sum, mass) => sum + mass, 0);

export const part2 = (raw) =>
  input(raw)
    .map((mass) => {
      let totalMass = 0;
      let newFuel = Math.floor(mass / 3) - 2;
      while (newFuel > 0) {
        totalMass += newFuel;
        newFuel = Math.floor(newFuel / 3) - 2;
      }
      return totalMass;
    })
    .reduce((sum, mass) => sum + mass, 0);
