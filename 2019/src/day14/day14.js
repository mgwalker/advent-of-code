import DefaultMap from "../utils/DefaultMap.js";

class Chemical {
  #_chemical;
  #_inputs;
  #_perReaction;

  static #_chemicals = new Map();
  static #_storage = new DefaultMap(0);
  static #_created = new DefaultMap(0);

  constructor(reaction) {
    const [inputs, output] = reaction.split(" => ");
    const [, outCount, outChemical] = output.match(/(\d+) (.+)/);

    this.#_chemical = outChemical;
    this.#_perReaction = outCount;

    this.#_inputs = [];
    for (const reactionInput of inputs.split(", ")) {
      const [, inCount, inChemical] = reactionInput.match(/(\d+) (.+)/) ?? [];
      if (inChemical) {
        this.#_inputs.push({ chemical: inChemical, count: +inCount });
      }
    }

    Chemical.#_chemicals.set(outChemical, this);
  }

  static reset() {
    Chemical.#_storage.clear();
    Chemical.#_created.clear();
  }

  static get(chemical) {
    return Chemical.#_chemicals.get(chemical);
  }

  static howMuch(chemical) {
    return Chemical.#_created.get(chemical);
  }

  make(count) {
    const inStorage = Chemical.#_storage.get(this.#_chemical);
    const toMake =
      inStorage >= count
        ? 0
        : Math.ceil((count - inStorage) / this.#_perReaction) *
          this.#_perReaction;
    const leftover = Math.max(0, inStorage + toMake - count);

    if (toMake > 0) {
      for (const { chemical, count } of this.#_inputs) {
        Chemical.get(chemical).make((count * toMake) / this.#_perReaction);
      }

      Chemical.#_created.set(
        this.#_chemical,
        Chemical.#_created.get(this.#_chemical) + toMake,
      );
    }

    Chemical.#_storage.set(this.#_chemical, leftover);
  }
}

const input = (raw) =>
  [
    raw
      .trim()
      .split("\n")
      .map((s) => new Chemical(s)),
    new Chemical(" => 1 ORE"),
  ].flat();

export const part1 = (raw) => {
  input(raw);
  Chemical.get("FUEL").make(1);
  return Chemical.howMuch("ORE");
};

export const part2 = (raw) => {
  input(raw);

  Chemical.reset();
  const fuel = Chemical.get("FUEL");
  while (Chemical.howMuch("ORE") <= 1_000_000_000_000) {
    fuel.make(1);
  }

  console.log(Chemical.howMuch("ORE"));

  return Chemical.howMuch("FUEL") - 1;
};
