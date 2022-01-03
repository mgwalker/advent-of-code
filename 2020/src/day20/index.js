import run from "aocrunner";
import k from "kleur";

import {
  flipHorizontal,
  flipVertical,
  rotate,
  smooshTogether,
  transpose,
} from "./grid.js";

const binaryize = (str) => {
  const op = (Array.isArray(str) ? str : str.split("")).map((v) =>
    v === "#" ? 1 : 0,
  );

  return [parseInt(op.join(""), 2), parseInt(op.reverse().join(""), 2)];
};

const parseInput = (raw) =>
  raw
    .trim()
    .split("\n\n")
    .map((tileInfo) => {
      const tile = tileInfo.split("\n");
      const [id] = tile.splice(0, 1).pop().match(/\d+/).map(Number);

      const edges = new Set();

      const top = tile[0];
      binaryize(top).forEach((v) => edges.add(v));

      const bottom = tile[tile.length - 1];
      binaryize(bottom).forEach((v) => edges.add(v));

      const left = [];
      const right = [];
      for (const row of tile) {
        left.push(row[0]);
        right.push(row[row.length - 1]);
      }
      binaryize(left).forEach((v) => edges.add(v));
      binaryize(right).forEach((v) => edges.add(v));

      return { id, edges, tile: tile.map((v) => v.split("")) };
    });

const getMatchedEdges = (tiles) => {
  const matchedEdges = new Map();
  for (const { id, edges } of tiles) {
    const matching = new Set();
    for (const edge of edges) {
      for (const { id: nid, edges: neighbor } of tiles) {
        if (nid !== id && neighbor.has(edge)) {
          matching.add(nid);
        }
      }
    }

    matchedEdges.set(id, matching);
  }
  return matchedEdges;
};

const part1 = (raw) => {
  const tilesMetadata = parseInput(raw);
  const matchedEdges = getMatchedEdges(tilesMetadata);

  return [...matchedEdges]
    .filter(([, set]) => set.size === 2)
    .map(([id]) => id)
    .reduce((prod, c) => prod * c, 1);
};

const part2 = (raw) => {
  const tilesMetadata = parseInput(raw);
  const matchedEdges = getMatchedEdges(tilesMetadata);

  const tiles = new Map();
  for (const { id, tile } of tilesMetadata) {
    tiles.set(id, tile);
  }

  const corners = [...matchedEdges].filter(([, set]) => set.size === 2);
  const edges = [...matchedEdges].filter(([, set]) => set.size === 3);
  const interior = [...matchedEdges].filter(([, set]) => set.size === 4);

  const image = [];
  for (let i = 0; i < 12; i += 1) {
    const grid = [];
    for (let j = 0; j < 12; j += 1) {
      grid.push(false);
    }
    image.push(grid);
  }

  image[0][0] = corners[0][0];

  for (let i = 1; i < 11; i += 1) {
    const nIndex = edges.findIndex(([, e]) => e.has(image[0][i - 1]));
    const [neighbor, e] = edges.splice(nIndex, 1).pop();
    e.delete(image[0][i - 1]);

    image[0][i] = neighbor;
  }

  image[0][11] = corners.find(([, e]) => e.has(image[0][10]))[0];

  for (let i = 1; i < 11; i += 1) {
    const nIndex = edges.findIndex(([, e]) => e.has(image[i - 1][11]));
    const [neighbor, e] = edges.splice(nIndex, 1).pop();
    e.delete(image[0][i - 1]);

    image[i][11] = neighbor;
  }

  image[11][11] = corners.find(([, e]) => e.has(image[10][11]))[0];

  for (let i = 10; i > 0; i -= 1) {
    const nIndex = edges.findIndex(([, e]) => e.has(image[11][i + 1]));
    const [neighbor, e] = edges.splice(nIndex, 1).pop();
    e.delete(image[0][i - 1]);

    image[11][i] = neighbor;
  }

  image[11][0] = corners.find(([, e]) => e.has(image[11][1]))[0];

  for (let i = 10; i > 0; i -= 1) {
    const nIndex = edges.findIndex(([, e]) => e.has(image[i + 1][0]));
    const [neighbor, e] = edges.splice(nIndex, 1).pop();
    e.delete(image[0][i - 1]);

    image[i][0] = neighbor;
  }

  for (let i = 1; i < 11; i += 1) {
    for (let j = 1; j < 11; j += 1) {
      const n1 = image[i - 1][j];
      const n2 = image[i][j - 1];

      const nIndex = interior.findIndex(([, e]) => e.has(n1) && e.has(n2));
      const [tile] = interior.splice(nIndex, 1).pop();

      image[i][j] = tile;
    }
  }

  // Figured this out by manually futzing with this tile and its neighbors. Can
  // do the rest programmatically.
  image[0][0] = flipVertical(rotate(rotate(rotate(tiles.get(image[0][0])))));

  // top row
  for (let i = 1; i < 12; i += 1) {
    const [target] = binaryize(image[0][i - 1].map((r) => r[r.length - 1]));
    let tile = tiles.get(image[0][i]);

    let [right] = binaryize(tile.map((r) => r[0]));
    while (right !== target) {
      [right] = binaryize(flipHorizontal(tile).map((r) => r[0]));
      if (right === target) {
        tile = flipHorizontal(tile);
        break;
      }

      [right] = binaryize(flipVertical(tile).map((r) => r[0]));
      if (right === target) {
        tile = flipVertical(tile);
        break;
      }

      tile = rotate(tile);
      [right] = binaryize(tile.map((r) => r[0]));
    }
    image[0][i] = tile;
  }

  // left column
  for (let i = 1; i < 12; i += 1) {
    const [target] = binaryize(image[i - 1][0].slice(-1).pop());
    let tile = tiles.get(image[i][0]);

    let [top] = binaryize(tile[0]);
    while (top !== target) {
      [top] = binaryize(flipHorizontal(tile)[0]);
      if (top === target) {
        tile = flipHorizontal(tile);
        break;
      }

      [top] = binaryize(flipVertical(tile)[0]);
      if (top === target) {
        tile = flipVertical(tile);
        break;
      }

      tile = rotate(tile);
      [top] = binaryize(tile[0]);
    }
    image[i][0] = tile;
  }

  // everything else
  for (let i = 1; i < 12; i += 1) {
    for (let j = 1; j < 12; j += 1) {
      const [topTarget] = binaryize(image[i - 1][j].slice(-1).pop());
      const [leftTarget] = binaryize(
        image[i][j - 1].map((r) => r[r.length - 1]),
      );

      let tile = tiles.get(image[i][j]);
      let [top] = binaryize(tile[0]);
      let [left] = binaryize(tile.map((r) => r[0]));

      while (top !== topTarget && left !== leftTarget) {
        const flipH = flipHorizontal(tile);
        [top] = binaryize(flipH[0]);
        [left] = binaryize(flipH.map((r) => r[0]));
        if (top === topTarget && left === leftTarget) {
          tile = flipH;
          break;
        }

        const flipV = flipHorizontal(tile);
        [top] = binaryize(flipV[0]);
        [left] = binaryize(flipV.map((r) => r[0]));
        if (top === topTarget && left === leftTarget) {
          tile = flipV;
          break;
        }

        tile = rotate(tile);
        [top] = binaryize(tile[0]);
        [left] = binaryize(tile.map((r) => r[0]));
      }

      image[i][j] = tile;
    }
  }

  for (let i = 0; i < 12; i += 1) {
    for (let j = 0; j < 12; j += 1) {
      image[i][j] = transpose(
        transpose(image[i][j].slice(1, image[i][j].length - 1)).slice(
          1,
          image[i][j][0].length - 1,
        ),
      );
    }
  }

  const s = smooshTogether(image).map((r) => r.join(""));

  const head = /..................#./;
  const body = /#....##....##....###/;
  const tail = /.#..#..#..#..#..#.../;

  for (let i = 1; i < s.length - 1; i += 1) {
    let sOffset = 0;
    let tryAgain = false;

    do {
      tryAgain = false;
      const match = s[i].slice(sOffset).match(body) || [];

      if (match.index) {
        const index = match.index + sOffset;
        const maybeBody = match[0];

        const maybeHead = s[i - 1].slice(index, index + 20);
        const maybeTail = s[i + 1].slice(index, index + 20);

        if (head.test(maybeHead) && tail.test(maybeTail)) {
          const b = "X";

          // Found a snake! Oooh, a snake.
          const newHead = maybeHead.split("");
          newHead[18] = b;
          s[i - 1] =
            s[i - 1].substring(0, index) +
            newHead.join("") +
            s[i - 1].substring(index + 20);

          const newBody = maybeBody.split("");
          newBody[0] = b;
          newBody[5] = b;
          newBody[6] = b;
          newBody[11] = b;
          newBody[12] = b;
          newBody[17] = b;
          newBody[18] = b;
          newBody[19] = b;
          s[i] =
            s[i].substring(0, index) +
            newBody.join("") +
            s[i].substring(index + 20);

          const newTail = maybeTail.split("");
          newTail[1] = b;
          newTail[4] = b;
          newTail[7] = b;
          newTail[10] = b;
          newTail[13] = b;
          newTail[16] = b;
          s[i + 1] =
            s[i + 1].substring(0, index) +
            newTail.join("") +
            s[i + 1].substring(index + 20);

          i -= 1;
        } else {
          sOffset += index + 1;
          tryAgain = true;
        }
      }
    } while (tryAgain);
  }

  console.log(s.join("\n").replace(/X/g, k.green("█")));

  return s.join("").replace(/[^#]/g, "").length;
};

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
});
