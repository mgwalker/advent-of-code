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
          hp: 200,
          species: board[y][x] === "E" ? "elf" : "goblin",
        });
      }
    }
  }

  return { board, units };
};

const xySort = ([xa, ya], [xb, yb]) => {
  if (ya === yb) {
    return xa - xb;
  }
  return ya - yb;
};

const unitSort = ({ x: xa, y: ya }, { x: xb, y: yb }) =>
  xySort([xa, ya], [xb, yb]);

export const part1 = (raw) => {
  const { board, units } = input(raw);
  const room = new PF.Grid(
    board.map((row) => row.map((v) => (v === "#" ? 1 : 0)))
  );
  const pathfinder = new PF.BreadthFirstFinder();

  const takeTurn = (unit) => {
    if (unit.hp <= 0) {
      return;
    }

    const enemy = unit.species === "elf" ? "goblin" : "elf";
    const enemyID = enemy[0].toUpperCase();

    if (!units.some(({ species }) => species === enemy)) {
      // If there aren't any enemies left, this unit doesn't actually need to
      // do anything, so bail out.
      return;
    }

    const fightMaybe = () => {
      const { x, y } = unit;

      const enemiesToEvaluate = [
        [x, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
      ]
        .filter(([xx, yy]) => board[yy][xx] === enemyID)
        .map(([xx, yy]) =>
          units.find(({ x: xu, y: yu }) => xu === xx && yu === yy)
        )
        .filter((u) => !!u)
        .sort(({ hp: a }, { hp: b }) => a - b);

      if (enemiesToEvaluate.length > 0) {
        const enemyToAttack = enemiesToEvaluate[0];

        enemyToAttack.hp -= 3;

        if (enemyToAttack.hp <= 0) {
          units.splice(units.indexOf(enemyToAttack), 1);
          board[enemyToAttack.y][enemyToAttack.x] = ".";
        }
        return true;
      }
      return false;
    };

    if (!fightMaybe()) {
      const enemies = units.filter(({ species }) => species === enemy);

      const constrainedRoom = room.clone();
      for (const otherUnit of units) {
        if (otherUnit !== unit) {
          constrainedRoom.setWalkableAt(otherUnit.x, otherUnit.y, false);
        }
      }

      const paths = enemies
        .map(({ x, y }) => {
          const clone = constrainedRoom.clone();
          clone.setWalkableAt(x, y, true);
          return [
            [x, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x, y + 1],
          ].map(([ex, ey]) =>
            pathfinder.findPath(unit.x, unit.y, ex, ey, clone.clone())
          );
        })
        .flat()
        .filter((p) => p.length > 0);

      if (paths.length > 0) {
        const shortest = Math.min(
          ...paths.map((p) => (p.length > 0 ? p.length : Infinity))
        );

        const potentialNextSteps = paths
          .filter((p) => p.length === shortest)
          .map((p) => p[1]);
        const [newX, newY] = potentialNextSteps.sort(xySort)[0];

        if (potentialNextSteps.length > 4) {
          console.log(paths);
          console.log(potentialNextSteps);
          console.log(newX, newY);
          console.log("============");

          // throw new Error();
        }

        board[unit.y][unit.x] = ".";
        board[newY][newX] = unit.species[0].toUpperCase();

        unit.x = newX;
        unit.y = newY;

        fightMaybe();
      }
    }
  };

  let rounds = 0;

  const print = () => {
    console.log();
    console.log(`===== After ${rounds} rounds =====`);
    for (let y = 0; y < board.length; y += 1) {
      console.log(
        board[y].join(""),
        "  ",
        units
          .filter(({ y: yy }) => y === yy)
          .sort(({ x: xa }, { x: xb }) => xa - xb)
          .map(({ hp, species }) => `${species[0]}(${hp})`)
          .join(", ")
      );
    }
  };

  print();
  const round = () => {
    units.sort(unitSort);

    if (new Set(units.map(({ species }) => species)).size === 1) {
      return false;
    }
    rounds += 1;

    for (const unit of [...units]) {
      takeTurn(unit);
    }

    // if (rounds === 1) {
    print();
    // }

    return true;
  };

  while (round()) {}

  return (rounds - 1) * units.reduce((sum, { hp }) => sum + hp, 0);
};

export const part2 = (raw) => {
  const data = input(raw);
  return;
};
