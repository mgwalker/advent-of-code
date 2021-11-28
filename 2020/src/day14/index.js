import run from "aocrunner";

const memRegex = /^mem\[([0-9]+)\]$/;

const parseInput = (rawInput) =>
  rawInput
    .trim()
    .split("\n")
    .map((v) => {
      const [instruction, value] = v.split(" = ");

      const [, address] = instruction.match(memRegex) ?? [];
      if (address) {
        return {
          instruction: "mem",
          address: BigInt(+address),
          value: BigInt(+value),
        };
      } else {
        return {
          instruction: "mask",
          value,
          ones: BigInt(parseInt(value.replace(/[^1]/gi, "0"), 2)),
          zeroes: BigInt(parseInt(value.replace(/[^0]/gi, "1"), 2)),
        };
      }
    });

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const memory = new Map();

  const mask = { ones: BigInt(0), zeroes: BigInt(0) };

  input.forEach(({ instruction, address, value, ones, zeroes }) => {
    switch (instruction.toLowerCase()) {
      case "mask":
        mask.ones = ones;
        mask.zeroes = zeroes;
        break;

      case "mem":
        memory.set(address, mask.ones | (value & mask.zeroes));
        break;
    }
  });

  return +BigInt.asUintN(
    64,
    Array.from(memory.values()).reduce((sum, value) => sum + value, BigInt(0)),
  ).toString(10);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const memory = new Map();
  let mask = "";

  input.forEach(({ instruction, address, value }) => {
    switch (instruction.toLowerCase()) {
      case "mask":
        mask = value;
        break;

      case "mem":
        {
          let a = BigInt(address);
          a = address | BigInt(parseInt(mask.replace(/x/gi, "0"), 2));

          const floaters = mask.replace(/[^x]/gi, "").length;
          const permutations = 2 ** floaters;

          const masks = [];
          const clearMask = BigInt(
            parseInt(mask.replace(/[^x]/gi, "1").replace(/x/gi, "0"), 2),
          );

          while (masks.length < permutations) {
            const mm = masks.length.toString(2).padStart(floaters, "0");

            let c = 0;
            masks.push(
              BigInt(
                parseInt(
                  mask.replace(/[^x]/gi, "0").replace(/x/gi, () => {
                    const newValue = mm[c];
                    c += 1;
                    return newValue;
                  }),
                  2,
                ),
              ),
            );
          }

          masks.forEach((mask) => {
            memory.set((a & clearMask) | mask, value);
          });
        }
        break;
    }
  });

  return +BigInt.asUintN(
    64,
    Array.from(memory.values()).reduce((sum, value) => sum + value, BigInt(0)),
  ).toString(10);
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
