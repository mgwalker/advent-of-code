import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((s) => {
    return s
      .match(/(.+?) bags?/g)
      .map((s) => s.replace(/contains?/g, ""))
      .map((s) => s.replace(",", ""))
      .map((s) => s.replace("bags", "bag"))
      .map((s) => s.trim())
      .reduce(
        (o, bag, i) =>
          i === 0
            ? { bag, contains: [] }
            : {
                ...o,
                contains: [
                  ...o.contains,
                  (bag.match(/^(\d)+ (.+)$/) ?? [])
                    .slice(1, 3)
                    .reduce(
                      (o, v, i) => (i === 0 ? { count: +v } : { ...o, bag: v }),
                      {},
                    ),
                ].filter(({ count }) => !!count),
              },
        {},
      );
  });

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const getContainers = (forBag) =>
    new Set([
      ...input
        .filter((bag) => bag.contains.some(({ bag }) => bag === forBag))
        .map(({ bag }) => bag),
    ]);

  const containers = getContainers("shiny gold bag");
  containers.forEach((bag) => {
    getContainers(bag).forEach((newBag) => {
      containers.add(newBag);
    });
  });

  return containers.size;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  console.log("------");

  const getContains = (inBag) => {
    const bags = input.filter(({ bag }) => bag === inBag).pop().contains;
    if (bags.length) {
      const bagCount = bags.reduce((sum, { count }) => sum + count, 0);

      const subBags = bags
        .map(({ count, bag }) => count * getContains(bag, count))
        .reduce((sum, count) => sum + count, 0);

      return bagCount + subBags;
    } else {
      return 0;
    }
  };

  return getContains("shiny gold bag");
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
