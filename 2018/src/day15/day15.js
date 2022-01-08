import PF from "pathfinding";

const input = (raw) => {
  const board = raw
    .trim()
    .split("\n")
    .map((v) => v.split(""));

  const units = [];

  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[0].length; x += 1) {
      if (board[y][x] === "E" || board[y][x] === "G") {
        units.push({
          x,
          y,
          ap: 3,
          hp: 200,
          species: board[y][x] === "E" ? "elf" : "goblin",
        });
      }
    }
  }

  return { board, units: new Set(units) };
};

const xySort = ([xa, ya], [xb, yb]) => {
  if (ya === yb) {
    return xa - xb;
  }
  return ya - yb;
};

const attackMaybe = (unit, enemies, units) => {
  const candidates = [
    [unit.x, unit.y - 1],
    [unit.x - 1, unit.y],
    [unit.x + 1, unit.y],
    [unit.x, unit.y + 1],
  ]
    .map(([x, y]) => enemies.get(`${x},${y}`))
    .filter((v) => !!v)
    // They're already in reading order, so now sort by HP order. If they tie
    // at HP, they'll remain in reading order.
    .sort(({ hp: a }, { hp: b }) => a - b);

  if (candidates.length === 0) {
    // There aren't any candidates to attack
    return false;
  }

  const enemy = candidates[0];
  enemy.hp -= unit.ap;

  if (enemy.hp <= 0) {
    // Oh no, enemy is kaput.
    units.delete(enemy);
  }
  return true;
};

const unitSort = ({ x: xa, y: ya }, { x: xb, y: yb }) =>
  xySort([xa, ya], [xb, yb]);

const unitTurn = (unit, units, room) => {
  const enemies = new Map(
    [...units]
      .filter((u) => u !== unit && u.species !== unit.species)
      .map((u) => [`${u.x},${u.y}`, u])
  );
  if (enemies.size === 0) {
    // There aren't any enemies at all, so just bail out. There's nothing for
    // this unit to do.
    return;
  }

  const pathfinder = new PF.AStarFinder();

  const board = room.clone();
  for (const u of units) {
    if (u !== unit) {
      board.setWalkableAt(u.x, u.y, false);
    }
  }

  if (!attackMaybe(unit, enemies, units)) {
    const potentialSteps = [
      [unit.x, unit.y - 1],
      [unit.x - 1, unit.y],
      [unit.x + 1, unit.y],
      [unit.x, unit.y + 1],
    ].filter(([x, y]) => board.nodes[y][x].walkable);

    const potentialGoals = [...enemies.values()]
      .map(({ x, y }) => [
        [x, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
      ])
      .flat();

    const potentialPaths = potentialSteps
      .map((step) =>
        potentialGoals.map((goal) => ({
          from: step,
          to: goal,
          path: pathfinder.findPath(
            step[0],
            step[1],
            goal[0],
            goal[1],
            board.clone()
          ),
        }))
      )
      .flat()
      .filter(({ path }) => path.length > 0);

    if (potentialPaths.length === 0) {
      return;
    }

    const shortestLength = Math.min(
      ...potentialPaths.map(({ path }) => path.length)
    );

    const shortestPaths = potentialPaths
      .filter(({ path }) => path.length === shortestLength)
      .sort((a, b) => xySort(a.from, b.from))
      .sort((a, b) => xySort(a.to, b.to));

    const next = shortestPaths[0].from;
    unit.x = next[0];
    unit.y = next[1];

    attackMaybe(unit, enemies, units);
  }
};

const playRound = (units, room) => {
  if (new Set([...units].map(({ species }) => species)).size === 1) {
    // There's only one species left, so this game is over because there can't
    // be anymore combat
    return false;
  }

  const sortedUnits = [...units].sort(unitSort);
  units.clear();
  sortedUnits.forEach((u) => units.add(u));

  for (const unit of units) {
    unitTurn(unit, units, room);
  }
  return true;
};

export const part1 = (raw) => {
  const { board, units } = input(raw);
  const room = new PF.Grid(
    board.map((row) => row.map((v) => (v === "#" ? 1 : 0)))
  );

  let round = 0;
  while (playRound(units, room)) {
    round += 1;
  }

  return (round - 1) * [...units].reduce((sum, { hp }) => sum + hp, 0);
};

export const part2 = (raw) => {
  const { board, units } = input(raw);
  const room = new PF.Grid(
    board.map((row) => row.map((v) => (v === "#" ? 1 : 0)))
  );

  const elves = [...units].filter(({ species }) => species === "elf").length;

  let elfAP = 3;
  let gameUnits;
  let round;
  let survivors;

  do {
    elfAP += 1;
    round = 0;
    gameUnits = new Set(JSON.parse(JSON.stringify([...units])));

    [...gameUnits]
      .filter(({ species }) => species === "elf")
      // eslint-disable-next-line no-loop-func
      .forEach((elf) => {
        elf.ap = elfAP;
      });

    while (playRound(gameUnits, room)) {
      round += 1;
    }

    survivors = [...gameUnits].filter(
      ({ species }) => species === "elf"
    ).length;
  } while (survivors !== elves);

  return (round - 1) * [...gameUnits].reduce((sum, { hp }) => sum + hp, 0);
};
