import run from "aocrunner";

const parseInput = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((line) => {
      let l = line;
      const moves = [];

      while (l.length > 0) {
        const two = l.substring(0, 2);
        if (two === "se" || two === "sw" || two === "nw" || two === "ne") {
          moves.push(two);
          l = l.substring(2);
        } else {
          moves.push(l.substring(0, 1));
          l = l.substring(1);
        }
      }
      return moves;
    });

const createFloor = (tiles) => {
  //              q  r  s
  const origin = [0, 0, 0];
  const black = new Set();

  for (const moves of tiles) {
    const position = [...origin];

    for (const move of moves) {
      switch (move) {
        case "ne":
          position[0] += 1;
          position[1] -= 1;
          break;

        case "e":
          position[0] += 1;
          position[2] -= 1;
          break;

        case "se":
          position[1] += 1;
          position[2] -= 1;
          break;

        case "sw":
          position[0] -= 1;
          position[1] += 1;
          break;

        case "w":
          position[0] -= 1;
          position[2] += 1;
          break;

        case "nw":
          position[1] -= 1;
          position[2] += 1;
          break;

        default:
          throw new Error(`unknown: ${move}`);
      }
    }

    const coord = position.join(",");
    if (black.has(coord)) {
      black.delete(coord);
    } else {
      black.add(coord);
    }
  }
  return black;
};

const part1 = (raw) => {
  const tiles = parseInput(raw);
  return createFloor(tiles).size;
};

const getNeighbors = (coords) => {
  const [q, r, s] = coords.split(",").map(Number);

  return [
    [q + 1, r - 1, s],
    [q + 1, r, s - 1],
    [q, r + 1, s - 1],
    [q - 1, r + 1, s],
    [q - 1, r, s + 1],
    [q, r - 1, s + 1],
  ].map((c) => c.join(","));
};

const part2 = (raw) => {
  const tiles = parseInput(raw);
  const black = createFloor(tiles);

  for (let i = 0; i < 100; i += 1) {
    const switchToWhite = [];
    const switchToBlack = [];
    const white = new Set();

    for (const tile of black) {
      const neighbors = getNeighbors(tile);
      const whiteNeighbors = neighbors.filter((c) => !black.has(c));
      whiteNeighbors.forEach((w) => white.add(w));

      const blackNeighbors = neighbors.filter((c) => black.has(c)).length;
      if (blackNeighbors === 0 || blackNeighbors > 2) {
        switchToWhite.push(tile);
      }
    }

    for (const tile of white) {
      const neighbors = getNeighbors(tile);
      const blackNeighbors = neighbors.filter((c) => black.has(c)).length;
      if (blackNeighbors === 2) {
        switchToBlack.push(tile);
      }
    }

    switchToWhite.forEach((tile) => black.delete(tile));
    switchToBlack.forEach((tile) => black.add(tile));
  }

  return black.size;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
