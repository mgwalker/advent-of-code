const input = (raw) => {
  return `\n${raw}`.split("\n").map((s) => {
    const chips =
      s
        .match(/[^ ]+?-compatible microchip/gi)
        ?.map((c) => c.replace("-compatible microchip", "")) ?? [];

    const generators =
      s.match(/[^ ]+? generator/gi)?.map((g) => g.replace(" generator", "")) ??
      [];

    return { chips, generators };
  });
};

const print = (elevator, floors) => {
  console.log("     Co Cu Pr Ru Pl");
  for (let i = floors.length - 1; i > 0; i -= 1) {
    const cog = floors[i].generators.includes("cobalt") ? "G" : ".";
    const cop = floors[i].chips.includes("cobalt") ? "P" : ".";

    const cug = floors[i].generators.includes("curium") ? "G" : ".";
    const cup = floors[i].chips.includes("curium") ? "P" : ".";

    const prg = floors[i].generators.includes("promethium") ? "G" : ".";
    const prp = floors[i].chips.includes("promethium") ? "P" : ".";

    const rug = floors[i].generators.includes("ruthenium") ? "G" : ".";
    const rup = floors[i].chips.includes("ruthenium") ? "P" : ".";

    const plg = floors[i].generators.includes("plutonium") ? "G" : ".";
    const plp = floors[i].chips.includes("plutonium") ? "P" : ".";

    console.log(
      `F${i} ${
        elevator === i ? "E" : "."
      } ${cog}${cop} ${cug}${cup} ${prg}${prp} ${rug}${rup} ${plg}${plp}`
    );
  }
};

export const part1 = (raw) => {
  const data = input(raw);
  let elevator = 1;

  print(elevator, data);

  return;
};

export const part2 = (raw) => {
  const data = input(raw);

  return;
};
