const parseInput = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => l.split("").map(Number));

const forAllOctopuses = (octopuses, fn) => {
  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      fn(x, y);
    }
  }
};

const octopusesPlusOne = (octopuses) => {
  forAllOctopuses(octopuses, (x, y) => {
    octopuses[y][x] += 1;
  });
};

const blinkTheOctopuses = (octopuses, alreadyBlinkered = new Set()) => {
  let blinkies = 0;
  let neighbors = [];

  forAllOctopuses(octopuses, (x, y) => {
    if (octopuses[y][x] > 9 && !alreadyBlinkered.has(`${x},${y}`)) {
      alreadyBlinkered.add(`${x},${y}`);

      neighbors.push(
        ...[
          [x - 1, y - 1],
          [x, y - 1],
          [x + 1, y - 1],
          [x - 1, y],
          [x + 1, y],
          [x - 1, y + 1],
          [x, y + 1],
          [x + 1, y + 1],
        ],
      );
      blinkies += 1;
    }
  });

  neighbors = neighbors.filter(
    ([x, y]) =>
      !alreadyBlinkered.has(`${x},${y}`) &&
      x >= 0 &&
      y >= 0 &&
      x < 10 &&
      y < 10,
  );

  if (neighbors.length > 0) {
    neighbors.forEach(([x, y]) => {
      octopuses[y][x] += 1;
    });
    blinkies += blinkTheOctopuses(octopuses, alreadyBlinkered);
  }

  for (const xy of alreadyBlinkered) {
    const [x, y] = xy.split(",").map(Number);
    octopuses[y][x] = 0;
  }

  return blinkies;
};

export const part1 = (raw) => {
  const octopuses = parseInput(raw);

  return [...Array(100)].reduce((sum) => {
    octopusesPlusOne(octopuses);
    return sum + blinkTheOctopuses(octopuses);
  }, 0);
};

export const part2 = (raw) => {
  const octopuses = parseInput(raw);

  let blinkies = 0;
  let steps = 0;
  while (blinkies < 100) {
    octopusesPlusOne(octopuses);
    blinkies = blinkTheOctopuses(octopuses);
    steps += 1;
  }

  return steps;
};
