const input = (raw) => raw.trim().split(",");

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const dance = (moves, programCount, iterations = 1) => {
  const programs = alphabet.slice(0, programCount);
  const initial = programs.join("");

  const arrangements = [];

  for (let i = 0; i < iterations; i += 1) {
    const pstr = programs.join("");
    // My observation, I saw that the initial string reappears. Thus, there is
    // a cycle of repeating results, and we can build those and then use a
    // modulus to get the one we want. Hooray!
    if (i > 0 && pstr === initial) {
      break;
    }
    arrangements.push(pstr);

    for (const move of moves) {
      const m = move[0];
      switch (m) {
        case "s":
          {
            const count = +move.slice(1);
            programs.splice(0, 0, ...programs.splice(-count));
          }
          break;

        case "x":
          {
            const [a, b] = move.slice(1).split("/").map(Number);
            const tmp = programs[a];
            programs[a] = programs[b];
            programs[b] = tmp;
          }
          break;

        case "p":
          {
            const a = programs.indexOf(move[1]);
            const b = programs.indexOf(move[3]);
            const tmp = programs[a];
            programs[a] = programs[b];
            programs[b] = tmp;
          }
          break;

        default:
          console.log(`oh no - no idea what to do with ${move}`);
          break;
      }
    }
  }

  if (iterations === 1) {
    return programs.join("");
  }

  return arrangements[iterations % arrangements.length];
};

export const part1 = (raw) => {
  const moves = input(raw);
  return dance(moves, 16);
};

export const part2 = (raw) => {
  const moves = input(raw);
  return dance(moves, 16, 1_000_000_000);
};
