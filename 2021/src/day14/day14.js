const input = (raw) => {
  const [template, ruleList] = raw.trim().split("\n\n");

  const rules = new Map(ruleList.split("\n").map((str) => str.split(" -> ")));
  return { template, rules };
};

const getIncrementer = (map) => (key, count) => {
  map.set(key, (map.get(key) ?? 0) + count);
};

const doInsertions = (pairs, rules) => {
  const newPairs = new Map(pairs);

  const inc = getIncrementer(newPairs);

  for (const [pair, count] of pairs) {
    const [a, b] = pair.split("");
    const x = rules.get(pair);

    inc(`${a}${x}`, count);
    inc(`${x}${b}`, count);
    inc(pair, -count);
  }

  return newPairs;
};

const run = (raw, iterations) => {
  const { template, rules } = input(raw);

  let pairs = new Map();
  const inc = getIncrementer(pairs);
  for (let i = 0; i < template.length - 1; i += 1) {
    inc(`${template[i]}${template[i + 1]}`, 1);
  }

  for (let i = 0; i < iterations; i += 1) {
    pairs = doInsertions(pairs, rules);
  }

  const occurances = new Map();
  const oinc = getIncrementer(occurances);
  for (const [pair, count] of pairs) {
    oinc(pair[0], count);
  }
  oinc(template[template.length - 1], 1);

  const max = Math.max(...occurances.values());
  const min = Math.min(...occurances.values());

  return max - min;
};

export const part1 = (raw) => {
  return run(raw, 10);
};
export const part2 = (raw) => {
  return run(raw, 40);
};
