import astar from "a-star";

const ROCKY = Symbol("rocky");
const WET = Symbol("wet");
const NARROW = Symbol("narrow");

const terrainTypes = [ROCKY, WET, NARROW];

const TORCH = Symbol("torch");
const GEAR = Symbol("climbing gear");
const NEITHER = Symbol("neither");

const tools = new Map([
  [ROCKY, [TORCH, GEAR]],
  [WET, [GEAR, NEITHER]],
  [NARROW, [TORCH, NEITHER]],
]);

const input = (raw) => {
  const [d, target] = raw.split("\n");

  const [, depth] = d.match(/(\d+)/).map(Number);
  const [x, y] = target.match(/(\d+)/g).map(Number);

  const indices = new Map([
    [
      "0,0",
      {
        index: 0,
        erosion: depth % 20183,
        risk: (depth % 20183) % 3,
        type: terrainTypes[(depth % 20183) % 3],
      },
    ],
    [
      `${x},${y}`,
      {
        index: 0,
        erosion: depth % 20183,
        risk: (depth % 20183) % 3,
        type: terrainTypes[(depth % 20183) % 3],
      },
    ],
  ]);

  return { indices, depth, target: [x, y] };
};

const getGeologicIndex = (x, y, depth, indices) => {
  const key = `${x},${y}`;
  if (indices.has(key)) {
    return indices.get(key);
  }

  let index;
  if (y === 0) {
    index = x * 16807;
  } else if (x === 0) {
    index = y * 48271;
  } else {
    const n1 = getGeologicIndex(x - 1, y, depth, indices);
    const n2 = getGeologicIndex(x, y - 1, depth, indices);

    index = n1.erosion * n2.erosion;
  }

  const erosion = (index + depth) % 20183;
  const risk = erosion % 3;

  indices.set(key, { index, erosion, risk, type: terrainTypes[risk] });
  return indices.get(key);
};

const manhattan = (a, b, tool) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + (tool === TORCH ? 0 : 1);

const getNeighborMaker = (depth, indices, target) => {
  const node = (x, y, tool) => ({
    x,
    y,
    key: `${x},${y},${tool.toString()}`,
    distance: manhattan([x, y], target, tool),
    tool,
  });

  const getNeighbors = ({ x, y, tool }) => {
    const { type } = getGeologicIndex(x, y, depth, indices);

    const neighbors = [
      {
        ...node(
          x,
          y,
          tools
            .get(type)
            .filter((v) => v !== tool)
            .pop()
        ),
        cost: 7,
      },
      ...[
        [x, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
      ]
        .filter(([xx, yy]) => xx >= 0 && yy >= 0)
        .filter(([xx, yy]) =>
          tools
            .get(getGeologicIndex(xx, yy, depth, indices).type)
            .includes(tool)
        )
        .map(([xx, yy]) => ({
          ...node(xx, yy, tool),
          cost: 1,
        })),
    ];

    return neighbors;
  };

  return { node, getNeighbors };
};

export const part1 = (raw) => {
  const { depth, indices, target } = input(raw);

  for (let x = 0; x <= target[0]; x += 1) {
    for (let y = 0; y <= target[1]; y += 1) {
      getGeologicIndex(x, y, depth, indices);
    }
  }

  return [...indices.values()].reduce((sum, { risk }) => sum + risk, 0);
};

export const part2 = (raw) => {
  const { depth, indices, target } = input(raw);

  const { node, getNeighbors } = getNeighborMaker(depth, indices, target);
  const start = node(0, 0, TORCH);

  const p = astar({
    start,
    isEnd: ({ x, y, tool }) =>
      x === target[0] && y === target[1] && tool === TORCH,
    neighbor: getNeighbors,
    distance: (a, b) => (a.tool === b.tool ? 1 : 7),
    heuristic: (n) => n.distance,
    hash: (n) => n.key,
  });

  return p.cost;
};
