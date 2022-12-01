const parseInput = async (rawInput) =>
  rawInput.split("\n\n").map((elf) =>
    elf
      .split("\n")
      .map((calories) => +calories)
      .reduce((sum, calories) => sum + calories, 0)
  );

export const part1 = async (rawInput) => {
  const input = await parseInput(rawInput);
  return Math.max(...input);
};

export const part2 = async (rawInput) => {
  const input = await parseInput(rawInput);
  const top3 = input.sort((a, b) => b - a).slice(0, 3);

  return top3.reduce((s, v) => s + v, 0);
};
