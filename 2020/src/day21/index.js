import run from "aocrunner";

class CountingSet extends Map {
  add(value) {
    super.set(value, (super.get(value) ?? 0) + 1);
  }

  count(value) {
    return super.get(value) ?? 0;
  }

  delete(value) {
    super.set(value, (super.get(value) ?? 1) - 1);
  }

  remove(value) {
    super.delete(value);
  }
}

const parseInput = (raw) => {
  const allergensToIngredients = new Map();
  const allIngredients = new CountingSet();

  const allergenRE = /\(contains (.+)\)/i;

  const lines = raw.split("\n");
  for (const line of lines) {
    const allergens = line.match(allergenRE)[1].replace(/\s/g, "").split(",");

    const ingredients = line.replace(allergenRE, "").trim().split(" ");
    ingredients.forEach((i) => {
      allIngredients.add(i);
    });

    for (const allergen of allergens) {
      const set = allergensToIngredients.get(allergen) ?? new CountingSet();
      ingredients.forEach((i) => {
        set.add(i);
      });
      allergensToIngredients.set(allergen, set);
    }
  }

  return { allIngredients, allergensToIngredients };
};

const part1 = (raw) => {
  const { allIngredients, allergensToIngredients } = parseInput(raw);

  let foundOne;
  do {
    foundOne = false;
    for (const [, possibleIngredients] of allergensToIngredients) {
      const ingr = [...possibleIngredients.entries()].sort(
        ([, a], [, b]) => b - a,
      );
      const [, max] = ingr[0];
      if (ingr.filter(([, c]) => c === max).length === 1) {
        foundOne = true;
        allIngredients.remove(ingr[0][0]);

        for (const [, set] of allergensToIngredients) {
          set.delete(ingr[0][0]);
        }
      }
    }
  } while (foundOne);

  return [...allIngredients.values()].reduce((sum, c) => sum + c, 0);
};

const part2 = (raw) => {
  const { allergensToIngredients } = parseInput(raw);

  const mapping = new Map();

  let foundOne;
  do {
    foundOne = false;
    for (const [allergen, possibleIngredients] of allergensToIngredients) {
      const ingr = [...possibleIngredients.entries()].sort(
        ([, a], [, b]) => b - a,
      );
      const [, max] = ingr[0];
      if (ingr.filter(([, c]) => c === max).length === 1) {
        foundOne = true;

        mapping.set(allergen, ingr[0][0]);

        for (const [, set] of allergensToIngredients) {
          set.delete(ingr[0][0]);
        }
      }
    }
  } while (foundOne);

  return [...mapping.entries()]
    .sort(([a], [b]) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    })
    .map(([, ingredient]) => ingredient)
    .join(",");
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
