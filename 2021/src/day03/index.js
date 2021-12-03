import run from "aocrunner";

const parseInput = (raw) => raw.trim().split("\n");

const part1 = (raw) => {
  const input = parseInput(raw);

  const ones = [...Array(input[0].length)].map(() => 0);
  const zeroes = [...Array(input[0].length)].map(() => 0);

  input.forEach((row) => {
    row.split("").forEach((c, i) => {
      if (c === "1") {
        ones[i] += 1;
      } else {
        zeroes[i] += 1;
      }
    });
  });

  const g = [];
  const e = [];

  for (let i = 0; i < ones.length; i += 1) {
    if (ones[i] > zeroes[i]) {
      g[i] = "1";
      e[i] = "0";
    } else {
      g[i] = "0";
      e[i] = "1";
    }
  }

  const gamma = parseInt(g.join(""), 2);
  const epsilon = parseInt(e.join(""), 2);

  return gamma * epsilon;
};

const part2 = (raw) => {
  const input = parseInput(raw);

  let o2 = input;
  let co2 = input;

  for (let i = 0; i < o2[0].length && o2.length > 1; i += 1) {
    const bits = o2.map((s) => s.substr(i, 1));

    let select = "0";
    if (
      bits.filter((b) => b === "1").length >=
      bits.filter((b) => b === "0").length
    ) {
      select = "1";
    }
    o2 = o2.filter((s) => s.substr(i, 1) === select);
  }

  for (let i = 0; i < co2[0].length && co2.length > 1; i += 1) {
    const bits = co2.map((s) => s.substr(i, 1));

    let select = "0";
    if (
      bits.filter((b) => b === "1").length <
      bits.filter((b) => b === "0").length
    ) {
      select = "1";
    }
    co2 = co2.filter((s) => s.substr(i, 1) === select);
  }

  const o2value = parseInt(o2.join(""), 2);
  const co2value = parseInt(co2.join(""), 2);

  return o2value * co2value;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
