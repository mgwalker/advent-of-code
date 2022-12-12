import run from "aocrunner";
import astar from "a-star";

const input = (raw) => {
  const s = [];
  const e = [];

  const nodes = raw.split("\n").map((row, y) =>
    row.split("").map((char, x) => {
      let height = char.charCodeAt(0) - 97;
      if (char === "S") {
        s.push(x, y);
        height = 0;
      } else if (char === "E") {
        e.push(x, y);
        height = 25;
      }

      return { x, y, char, height };
    })
  );

  return { start: nodes[s[1]][s[0]], end: nodes[e[1]][e[0]], nodes };
};

const options = (start, end, nodes) => {
  const MAX_Y = nodes.length;
  const MAX_X = nodes[0].length;

  return {
    start,
    isEnd: (node) => node === end,
    neighbor: (node) =>
      [
        [node.x - 1, node.y],
        [node.x + 1, node.y],
        [node.x, node.y - 1],
        [node.x, node.y + 1],
      ]
        .filter(([x, y]) => x >= 0 && y >= 0 && x < MAX_X && y < MAX_Y)
        .map(([x, y]) => nodes[y][x])
        .filter(({ height }) => height <= node.height + 1),
    distance: () => 1,
    heuristic: () => 1,
    hash: (node) => `${node.x},${node.y}`,
  };
};

export const part1 = (raw) => {
  const data = input(raw);
  const out = astar(options(data.start, data.end, data.nodes));
  return out.cost;
};

export const part2 = (raw) => {
  const data = input(raw);

  const costsFromStarts = data.nodes
    .flat()
    .filter(({ height }) => height === 0)
    .map((start) => astar(options(start, data.end, data.nodes)))
    .filter(({ status }) => status === "success")
    .map(({ cost }) => cost);

  return Math.min(...costsFromStarts);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
