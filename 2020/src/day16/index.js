import run from "aocrunner";

const parseInput = (rawInput) => {
  const [fieldRules, myTicket, otherTickets] = rawInput.trim().split("\n\n");

  const allValidNumbers = new Set();

  const fields = new Map();
  fieldRules
    .trim()
    .split("\n")
    .forEach((line) => {
      const [field, rangeString] = line.split(": ");
      const ranges = rangeString
        .split(" or ")
        .map((s) => s.split("-").map(Number));

      const rangeSet = new Set();
      ranges.forEach(([min, max]) => {
        [...Array(max - min + 1)].forEach((_, i) => {
          allValidNumbers.add(min + i);
          rangeSet.add(min + i);
        });
      });

      fields.set(field, rangeSet);
    });

  const nearby = otherTickets
    .split("\n")
    .slice(1)
    .map((v) => v.split(",").map(Number));

  return {
    allValidNumbers,
    fields,
    ticket: myTicket
      .split("\n")
      .slice(1)
      .map((v) => v.split(",").map(Number))
      .pop(),
    nearby,
  };
};

const part1 = (rawInput) => {
  const { allValidNumbers, nearby } = parseInput(rawInput);

  let invalidRate = 0;
  nearby.forEach((numbers) => {
    numbers.forEach((number) => {
      if (!allValidNumbers.has(number)) {
        invalidRate += number;
      }
    });
  });

  return invalidRate;
};

const part2 = (rawInput) => {
  const { allValidNumbers, fields, nearby, ticket } = parseInput(rawInput);

  for (let i = 0; i < nearby.length; i += 1) {
    const invalid = nearby[i].some((number) => !allValidNumbers.has(number));
    if (invalid) {
      nearby.splice(i, 1);
      i -= 1;
    }
  }

  const possibles = new Map();
  for (const [field] of fields) {
    possibles.set(
      field,
      new Set([...Array(nearby[0].length)].map((_, i) => i)),
    );
  }

  nearby.forEach((numbers) => {
    const localPossibles = new Map();
    for (const [field] of fields) {
      localPossibles.set(field, new Set());
    }

    numbers.forEach((number, i) => {
      for (const [field, range] of fields) {
        if (range.has(number)) {
          localPossibles.get(field).add(i);
        }
      }
    });

    // Now intersect the local possibilities with
    // the global set.
    for (const [field, set] of possibles) {
      for (const number of set) {
        if (!localPossibles.get(field).has(number)) {
          possibles.get(field).delete(number);
        }
      }
    }
  });

  const fieldMap = new Map();

  while (possibles.size > 0) {
    const [knownField, set] = Array.from(possibles)
      .filter(([f, s]) => s.size === 1)
      .pop();
    const fieldNumber = Array.from(set).pop();
    fieldMap.set(knownField, fieldNumber);
    possibles.delete(knownField);
    for (const [, fieldSet] of possibles) {
      fieldSet.delete(fieldNumber);
    }
  }

  const positionMap = new Map();
  for (const [field, position] of fieldMap) {
    positionMap.set(position, field);
  }

  const myTicket = ticket.reduce(
    (o, value, i) => ({ ...o, [positionMap.get(i)]: value }),
    {},
  );

  return Object.entries(myTicket).reduce(
    (product, [field, value]) =>
      product * (field.startsWith("departure") ? value : 1),
    1,
  );
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
