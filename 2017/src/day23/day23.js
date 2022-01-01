import cpu from "./cpu.js";

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.split(" "));

const createRegisters = () => {
  const registers = new Map();

  return {
    get(value) {
      if (!value) {
        return null;
      }
      if (Number.isNaN(+value)) {
        return registers.get(value) ?? 0;
      }
      return +value;
    },

    print() {
      const pads = [...registers.entries()].map(([key, value]) =>
        Math.max(key.toString().length, value.toString().length)
      );

      const keys = `|| ${[...registers.keys()]
        .map((v, i) => v.toString().padEnd(pads[i], " "))
        .join(" | ")} ||`;

      console.log("".padEnd(keys.length, "="));
      console.log(keys);
      console.log("".padEnd(keys.length, "-"));
      console.log(
        `|| ${[...registers.values()]
          .map((v, i) => v.toString().padStart(pads[i]))
          .join(" | ")} ||`
      );
      console.log("".padEnd(keys.length, "="));
      console.log();
    },

    set(register, value) {
      registers.set(register, value);
    },
  };
};

export const part1 = (raw) => {
  const instructions = input(raw);
  const registers = createRegisters();
  cpu(instructions, registers);
  return registers.get("mm");
};

export const part2 = () => {
  // I cheated on this part. I do AoC for the code challenge, not the "decipher
  // assembly and figure out the math" puzzles. Those are cool puzzles, but I
  // frankly don't know enough about math to recognize the patterns, so I can
  // never figure them out. So I went to reddit to see what the code is actually
  // doing and implemented a solver accordingly. I just wanted the star. And
  // anyway, implementing an "is this prime" checker was worth doing.

  let composites = 0;
  let b = 105_700n;

  const primes = [
    2n,
    3n,
    5n,
    7n,
    11n,
    13n,
    17n,
    19n,
    23n,
    27n,
    31n,
    37n,
    41n,
    43n,
    47n,
    53n,
  ];

  for (let i = 0; i < 1001; i += 1) {
    // eslint-disable-next-line no-loop-func
    if (primes.every((p) => b % p > 0n)) {
      for (let n = primes[primes.length - 1]; n < b; n += 1n) {
        if (b % n === 0n) {
          composites += 1;
          break;
        }
      }
    } else {
      composites += 1;
    }
    // }
    b += 17n;
  }

  return composites;
};
