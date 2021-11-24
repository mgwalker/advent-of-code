import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((v) =>
    v.match(/[a-z]{3}:([#\w]+)/gi).reduce((o, s) => {
      const [key, value] = s.split(":");
      return { ...o, [key]: value };
    }, {}),
  );

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.filter(
    (passport) =>
      requiredFields.filter((f) => {
        return !!passport[f];
      }).length === requiredFields.length,
  ).length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const rules = {
    byr: (v) => +v >= 1920 && +v <= 2002,
    iyr: (v) => +v >= 2010 && +v <= 2020,
    eyr: (v) => +v >= 2020 && +v <= 2030,
    hgt: (v) => {
      const [, num, units] = v.match(/^(\d+)(in|cm)$/i) ?? ["", "", ""];
      switch (units.toLowerCase()) {
        case "cm":
          return +num >= 150 && +num <= 193;
        case "in":
          return +num >= 59 && +num <= 76;
        default:
          return false;
      }
    },
    hcl: (v) => /^#[a-f0-9]{6}$/i.test(v),
    ecl: (v) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
    pid: (v) => /^\d{9}$/.test(v),
  };

  return input.filter((passport) => {
    return (
      requiredFields.filter((f) => {
        return !!passport[f] && rules[f](passport[f]);
      }).length === requiredFields.length
    );
  }).length;
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
