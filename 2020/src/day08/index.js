import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((v) => {
    const [instruction, val] = v.toLowerCase().split(" ");
    return { instruction, value: Number.parseInt(val) };
  });

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let accumulator = 0;
  let stackPointer = 0;
  const alreadyRun = new Set();

  while (!alreadyRun.has(stackPointer)) {
    alreadyRun.add(stackPointer);

    const { instruction, value } = input[stackPointer];

    switch (instruction) {
      case "acc":
        accumulator += value;
      case "nop":
        stackPointer += 1;
        break;
      case "jmp":
        stackPointer += value;
        break;
    }
  }

  return accumulator;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const run = (code) => {
    let accumulator = 0;
    let stackPointer = 0;
    const alreadyRun = new Set();

    while (
      !alreadyRun.has(stackPointer) &&
      stackPointer >= 0 &&
      stackPointer < code.length
    ) {
      alreadyRun.add(stackPointer);

      const { instruction, value } = code[stackPointer];

      switch (instruction) {
        case "acc":
          accumulator += value;
        case "nop":
          stackPointer += 1;
          break;
        case "jmp":
          stackPointer += value;
          break;
      }
    }
    if (stackPointer < code.length) {
      return false;
    }

    return accumulator;
  };

  const jmps = [];
  const nops = [];
  input.forEach(({ instruction }, i) => {
    if (instruction === "jmp") {
      jmps.push(i);
    } else if (instruction === "nop") {
      nops.push(i);
    }
  });

  // It's brute-force, but... it works?

  for (let i = 0; i < jmps.length; i++) {
    const code = input.map(({ instruction, value }) => ({
      instruction,
      value,
    }));
    code[jmps[i]].instruction = "nop";
    const out = run(code);
    if (out !== false) {
      return out;
    }
  }

  for (let i = 0; i < nops.length; i++) {
    const code = input.map(({ instruction, value }) => ({
      instruction,
      value,
    }));
    code[nops[i]].instruction = "jmp";
    const out = run(code);
    if (out !== false) {
      return out;
    }
  }

  return run(input);
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
