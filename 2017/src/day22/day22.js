const input = (raw) => {
  const coords = new Map();

  const grid = raw
    .trim()
    .split("\n")
    .map((v) => v.split(""));

  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      coords.set(`${x},${y}`, grid[y][x] === "#");
    }
  }

  const start = {
    y: Math.floor(grid.length / 2),
    x: Math.floor(grid[0].length / 2),
  };

  return { coords, start };
};

export const part1 = (raw) => {
  const { coords, start } = input(raw);

  const position = [start.x, start.y];
  const delta = [0, -1];

  const toggle = (x, y) => {
    const infected = coords.get(`${x},${y}`) ?? false;
    coords.set(`${x},${y}`, !infected);
    return infected;
  };

  let infectionCount = 0;

  for (let i = 0; i < 10_000; i += 1) {
    const status = toggle(...position);
    if (!status) {
      infectionCount += 1;
    }

    if (status) {
      if (delta[0] === 0) {
        delta[0] = -delta[1];
        delta[1] = 0;
      } else {
        delta[1] = delta[0];
        delta[0] = 0;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (delta[0] === 0) {
        delta[0] = delta[1];
        delta[1] = 0;
      } else {
        delta[1] = -delta[0];
        delta[0] = 0;
      }
    }

    position[0] += delta[0];
    position[1] += delta[1];
  }

  return infectionCount;
};

export const part2 = (raw) => {
  const { coords, start } = input(raw);

  for (const [key, value] of coords) {
    coords.set(key, value ? "infected" : "clean");
  }

  const position = [start.x, start.y];
  const delta = [0, -1];

  const toggle = (x, y) => {
    const key = `${x},${y}`;
    const status = coords.get(key) ?? "clean";
    switch (status) {
      case "clean":
        coords.set(key, "weakened");
        break;

      case "weakened":
        coords.set(key, "infected");
        break;

      case "flagged":
        coords.set(key, "clean");
        break;

      case "infected":
      default:
        coords.set(key, "flagged");
        break;
    }
    return status;
  };

  let infectionCount = 0;

  for (let i = 0; i < 10_000_000; i += 1) {
    const status = toggle(...position);
    if (status === "weakened") {
      infectionCount += 1;
    }

    if (status === "infected") {
      if (delta[0] === 0) {
        delta[0] = -delta[1];
        delta[1] = 0;
      } else {
        delta[1] = delta[0];
        delta[0] = 0;
      }
    } else if (status === "clean") {
      if (delta[0] === 0) {
        delta[0] = delta[1];
        delta[1] = 0;
      } else {
        delta[1] = -delta[0];
        delta[0] = 0;
      }
    } else if (status === "flagged") {
      delta[0] = -delta[0];
      delta[1] = -delta[1];
    }

    position[0] += delta[0];
    position[1] += delta[1];
  }

  return infectionCount;
};
