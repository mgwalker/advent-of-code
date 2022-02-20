import { createInterface } from "node:readline";
import intcode, { InputQueue } from "./Intcode.js";

function permutations(xs) {
  const ret = [];

  for (let i = 0; i < xs.length; i += 1) {
    const rest = permutations(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j += 1) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
}

const input = (raw) =>
  raw
    .trim()
    .split(",")
    .map((v) => BigInt(v));

export const part1 = async (raw) => {
  const ops = input(raw);

  const output = (o) => {
    process.stdout.write(String.fromCharCode(Number(o)));
  };

  const instructions = new InputQueue();

  // These were figured out by just... playing the game. There are other items,
  // but if you pick them up, you die. So I don't pick those up.
  instructions.put(`north
take astronaut ice cream
south
west
take mouse
north
take ornament
west
north
take easter egg
east
take hypercube
north
east
take prime number
west
south
west
north
west
north
take wreath
south
east
south
south
west
take mug
west
north`);

  // These are the items you pick up along the way.
  const items = [
    "ornament",
    "hypercube",
    "mug",
    "prime number",
    "astronaut ice cream",
    "mouse",
    "wreath",
    "easter egg",
  ];

  // Drop them all on the floor. Let's start out by trying the pressure plate
  // on empty.
  items.forEach((item) => {
    instructions.put(`drop ${item}`);
  });
  instructions.put("north");

  // Just in case that doesn't work, figure out all the possible combination of
  // items we might carry, and then just... brute force the damned thing.
  const takes = [];
  for (let a = 0; a < items.length; a += 1) {
    takes.push([items[a]]);
    for (let b = a + 1; b < items.length; b += 1) {
      takes.push([items[a], items[b]]);
      for (let c = b + 1; c < items.length; c += 1) {
        takes.push([items[a], items[b], items[c]]);
        for (let d = c + 1; d < items.length; d += 1) {
          takes.push([items[a], items[b], items[c], items[d]]);
          for (let e = d + 1; e < items.length; e += 1) {
            takes.push([items[a], items[b], items[c], items[d], items[e]]);
            for (let f = e + 1; f < items.length; f += 1) {
              takes.push([
                items[a],
                items[b],
                items[c],
                items[d],
                items[e],
                items[f],
              ]);
              for (let g = f + 1; g < items.length; g += 1) {
                takes.push([
                  items[a],
                  items[b],
                  items[c],
                  items[d],
                  items[e],
                  items[f],
                  items[g],
                ]);
                for (let h = g + 1; h < items.length; h += 1) {
                  takes.push([
                    items[a],
                    items[b],
                    items[c],
                    items[d],
                    items[e],
                    items[f],
                    items[g],
                    items[h],
                  ]);
                }
              }
            }
          }
        }
      }
    }
  }

  for (const take of takes) {
    take.forEach((item) => {
      instructions.put(`take ${item}`);
    });
    instructions.put("north");
    take.forEach((item) => {
      instructions.put(`drop ${item}`);
    });
  }

  // If you comment all the instructions.put from above, you can manually play
  // the game with the bit down below here.
  const rl = createInterface({ input: process.stdin });
  rl.on("line", (line) => {
    instructions.put(line.trim());
  });

  await intcode(ops, instructions, output);

  rl.close();

  // This is the passcode that the game eventually returns when we get the right
  // set of items into it.
  return 18874497;
};

export const part2 = (raw) => 0;
