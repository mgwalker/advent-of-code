import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((v) => +v);

const getFirstInvalid = (input) => {
  const previous = input.splice(0, 25);

  const hasPairwiseSum = (input, sum) => {
    const values = [...input];

    while (values.length > 0) {
      const a = values.pop();
      const hasSum = values.map((v) => a + v).some((v) => v === sum);
      if (hasSum) {
        return true;
      }
    }
    return false;
  };

  for (const value of input) {
    const valid = hasPairwiseSum(previous, value);
    if (!valid) {
      return value;
    }
    previous.shift();
    previous.push(value);
  }

  return;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return getFirstInvalid(input);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const invalid = getFirstInvalid([...input]);
  const values = input.filter((v) => v < invalid);

  let startIndex = 0;

  while (startIndex < values.length) {
    let sum = 0;
    let stopIndex = startIndex;
    while (sum < invalid) {
      sum += values[stopIndex];
      if (sum === invalid) {
        const contiguous = values.slice(startIndex, stopIndex + 1);
        return Math.max(...contiguous) + Math.min(...contiguous);
      }
      stopIndex += 1;
    }
    startIndex += 1;
  }

  return;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
