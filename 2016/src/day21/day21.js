class Machine {
  #_steps;
  static MOVE_POSITION = Symbol("move position");
  static REVERSE = Symbol("reverse positions");
  static ROTATE_BASED_ON = Symbol("rotate based on position");
  static ROTATE_LEFT = Symbol("rotate left");
  static ROTATE_RIGHT = Symbol("rotate right");
  static SWAP_LETTER = Symbol("swap letters");
  static SWAP_POSITION = Symbol("swap position");

  constructor(steps) {
    this.#_steps = steps.map((line) => {
      if (line.startsWith("move position")) {
        const [, a, b] = line.match(/move position (\d)+ to position (\d+)/);
        return { instruction: Machine.MOVE_POSITION, a: +a, b: +b };
      } else if (line.startsWith("reverse positions")) {
        const [, a, b] = line.match(/reverse positions (\d+) through (\d+)/);
        return { instruction: Machine.REVERSE, a: +a, b: +b };
      } else if (line.startsWith("rotate based on")) {
        const [, a] = line.match(/rotate based on position of letter ([a-z])/);
        return { instruction: Machine.ROTATE_BASED_ON, a };
      } else if (line.startsWith("rotate")) {
        const [, dir, c] = line.match(/rotate (left|right) (\d+) steps?/);
        if (dir === "left") {
          return { instruction: Machine.ROTATE_LEFT, count: +c };
        }
        return { instruction: Machine.ROTATE_RIGHT, count: +c };
      } else if (line.startsWith("swap letter")) {
        const [, a, b] = line.match(/swap letter ([a-z]) with letter ([a-z])/);
        return { instruction: Machine.SWAP_LETTER, a, b };
      } else if (line.startsWith("swap position")) {
        const [, a, b] = line.match(/swap position (\d+) with position (\d+)/);
        return { instruction: Machine.SWAP_POSITION, a: +a, b: +b };
      }
    });
  }

  run(seed) {
    const bits = seed.split("");

    for (const step of this.#_steps) {
      const { instruction, a, b, count } = step;

      switch (instruction) {
        case Machine.MOVE_POSITION:
          {
            const aa = bits.splice(a, 1).pop();
            bits.splice(b, 0, aa);
          }
          break;

        case Machine.REVERSE:
          {
            const back = bits.splice(a, bits.length);
            const reverse = back.splice(0, b - a + 1).reverse();
            bits.push(...reverse);
            bits.push(...back);
          }
          break;

        case Machine.ROTATE_BASED_ON:
          {
            const ai = bits.indexOf(a);
            const rotate = (1 + ai + (ai >= 4 ? 1 : 0)) % bits.length;
            const take = bits.splice(-rotate, bits.length - 1);
            bits.unshift(...take);
          }
          break;

        case Machine.ROTATE_LEFT:
          {
            const take = bits.splice(0, count);
            bits.push(...take);
          }
          break;

        case Machine.ROTATE_RIGHT:
          {
            const take = bits.splice(-count, bits.length - 1);
            bits.unshift(...take);
          }
          break;

        case Machine.SWAP_LETTER:
          {
            const ai = bits.indexOf(a);
            const bi = bits.indexOf(b);

            const tmp = bits[ai];
            bits[ai] = bits[bi];
            bits[bi] = tmp;
          }
          break;

        case Machine.SWAP_POSITION:
          {
            const tmp = bits[a];
            bits[a] = bits[b];
            bits[b] = tmp;
          }
          break;
      }
    }

    return bits.join("");
  }
}

const input = (raw) => new Machine(raw.split("\n"));

export const part1 = (raw) => {
  const data = input(raw);
  return data.run("abcdefgh");
};

export const part2 = (raw) => {
  const data = input(raw);

  const permutations = (xs) => {
    const ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = permutations(xs.slice(0, i).concat(xs.slice(i + 1)));

      if (!rest.length) {
        ret.push([xs[i]]);
      } else {
        for (let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]));
        }
      }
    }
    return ret;
  };

  const scrambled = "fbgdceah";
  const all = permutations(scrambled.split(""));
  for (const i of all) {
    if (data.run(i.join("")) === scrambled) return i.join("");
  }
  return;
};
