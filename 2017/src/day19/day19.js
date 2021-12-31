const input = (raw) => raw.split("\n");

const move = (coords, delta) => {
  /* eslint-disable no-param-reassign */
  coords[0] += delta[0];
  coords[1] += delta[1];
};

const zoom = (path) => {
  const delta = [1, 0];
  const coords = [0, path[0].indexOf("|")];

  const isLetter = /[a-z]/gi;

  const letters = [];
  let steps = 0;

  do {
    steps += 1;

    const spot = path[coords[0]][coords[1]];
    if (isLetter.test(spot)) {
      letters.push(spot);
    }

    if (spot === "+") {
      if (delta[0] === 0) {
        // We were moving horizontally. Now to move vertically.
        if (path[coords[0] - 1][coords[1]] !== " ") {
          delta[0] = -1;
          delta[1] = 0;
        } else {
          delta[0] = 1;
          delta[1] = 0;
        }
        // Otherwise, the other thing
      } else if (path[coords[0]][coords[1] - 1] !== " ") {
        delta[0] = 0;
        delta[1] = -1;
      } else {
        delta[0] = 0;
        delta[1] = 1;
      }
    }
    move(coords, delta);
  } while (
    !(
      coords[0] < 0 ||
      coords[1] < 0 ||
      coords[0] > path.length ||
      coords[1] > path[0].length ||
      path[coords[0]][coords[1]] === " "
    )
  );

  return {
    letters: letters.join(""),
    steps,
  };
};

export const part1 = (raw) => {
  const path = input(raw);
  return zoom(path).letters;
};

export const part2 = (raw) => {
  const path = input(raw);
  return zoom(path).steps;
};
