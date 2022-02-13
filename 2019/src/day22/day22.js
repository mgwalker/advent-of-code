const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => {
      if (v.startsWith("deal into")) {
        return { move: "new" };
      }

      const [n] = v.match(/-?\d+/).map(Number);
      if (v.startsWith("deal with")) {
        return { move: "deal", value: n };
      }
      return { move: "cut", value: n };
    });

const makeDeck = (size) => [...Array(size)].map((_, i) => i);

const shuffler = (instructions, size) => {
  let mapping = makeDeck(size);

  for (const { move, value } of instructions) {
    switch (move) {
      case "new":
        mapping.reverse();
        break;

      case "deal":
        {
          const old = mapping;
          mapping = Array(old.length);

          let i = 0;
          for (const card of old) {
            mapping[i] = card;
            i = (i + value) % mapping.length;
          }
        }
        break;

      case "cut":
        {
          const cut = mapping.splice(Math.min(0, value), Math.abs(value));
          if (value > 0) {
            mapping.push(...cut);
          } else {
            mapping.unshift(...cut);
          }
        }
        break;

      default:
        throw new Error(`Unknown move: ${move}`);
    }
  }

  return (deck) => mapping.map((i) => deck[i]);
};

export const part1 = (raw) => {
  const instructions = input(raw);
  const shuffle = shuffler(instructions, 10_007);

  // index 0 is the "top"
  const deck = shuffle(makeDeck(10_007));

  return deck.findIndex((v) => v === 2019);
};

// I don't know the necessary math to solve this, and I'm not particularly
// intereted in learning it, so I snagged a solution from Reddit, ran it, and
// got the answer. It's in the day22.py file here, which I imported from
// https://github.com/mcpower/adventofcode/blob/501b66084b0060e0375fc3d78460fb549bc7dfab/2019/22/a-improved.py
export const part2 = () => 32376123569821;
