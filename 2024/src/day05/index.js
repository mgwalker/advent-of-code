import run from "aocrunner";

export default class DefaultMap extends Map {
  #_default;

  constructor(defaultValue, ...args) {
    super(...args);
    this.#_default = defaultValue;
  }

  get(key) {
    const v = super.get(key);
    if (v === undefined) {
      if (typeof this.#_default === "function") {
        super.set(key, this.#_default());
      } else {
        super.set(key, this.#_default);
      }
      return super.get(key);
    }
    return v;
  }
}

const getOrdered = (updates, rules) =>
  updates.filter((pages) => {
    for (let i = 0; i < pages.length; i += 1) {
      const following = rules.get(pages[i]);
      if (!pages.slice(i + 1).every((page) => following.has(page))) {
        return false;
      }
    }
    return true;
  });

const input = (raw) => {
  const [rawRules, updates] = raw.split("\n\n");

  const rules = new DefaultMap(() => new Set());
  rawRules
    .split("\n")
    .map((rule) => rule.split("|").map((v) => +v))
    .forEach(([x, y]) => {
      rules.get(x).add(y);
    });

  return {
    rules,
    updates: updates.split("\n").map((r) => r.split(",").map((v) => +v)),
  };
};

export const part1 = (raw) => {
  const { rules, updates } = input(raw);

  return getOrdered(updates, rules)
    .map((pages) => pages[Math.floor(pages.length / 2)])
    .reduce((sum, next) => sum + next, 0);
};

export const part2 = (raw) => {
  const { rules, updates } = input(raw);

  const inOrder = getOrdered(updates, rules);
  const outOfOrder = updates.filter((update) => !inOrder.includes(update));

  const fixed = outOfOrder.map((pages) => {
    const afterCounts = [];

    pages.forEach((page) => {
      const follows = pages
        .map((p) => rules.get(p))
        .filter((following) => following.has(page)).length;

      afterCounts.push({ page, follows });
    });

    return afterCounts
      .sort(({ follows: a }, { follows: b }) => a - b)
      .map(({ page }) => page);
  });

  return fixed
    .map((pages) => pages[Math.floor(pages.length / 2)])
    .reduce((sum, next) => sum + next, 0);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
