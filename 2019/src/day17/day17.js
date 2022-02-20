import intcode, { InputQueue } from "./Intcode.js";

const input = (raw) => raw.trim().split(",").map(BigInt);

export const part1 = async (raw) => {
  const code = input(raw);

  const rows = [];
  let row = [];
  rows.push(row);
  const onOutput = (v) => {
    if (v === 10n) {
      row = [];
      rows.push(row);
    } else {
      row.push(String.fromCharCode(Number(v)));
    }
  };

  await intcode(code, null, onOutput);

  const params = [];
  for (let y = 1; y < rows.length; y += 1) {
    for (let x = 1; x < rows[y].length; x += 1) {
      if (rows[y][x] === "#") {
        if (
          rows[y - 1][x] === "#" &&
          rows[y + 1][x] === "#" &&
          rows[y][x - 1] === "#" &&
          rows[y][x + 1] === "#"
        ) {
          params.push(x * y);
        }
      }
    }
  }

  return params.reduce((sum, p) => sum + p, 0);
};

export const part2 = async (raw) => {
  const code = input(raw);

  // scaffold uses the base intcode program to figure out the entire scaffold
  // map, from start to finish
  const scaffold = await (async () => {
    const rows = [];
    let row = [];
    rows.push(row);
    const onOutput = (v) => {
      if (v === 10n) {
        row = [];
        rows.push(row);
      } else {
        row.push(String.fromCharCode(Number(v)));
      }
    };

    await intcode(code, null, onOutput);

    return rows;
  })();

  // This is the vacuum's location.
  const vacuum = scaffold
    .map((row, i) =>
      /[v><^]/.test(row) ? [row.findIndex((s) => /[v<>^]/.test(s)), i] : false,
    )
    .filter((r) => !!r)
    .flat();
  // And the vacuum's orientation
  vacuum.push(scaffold[vacuum[1]][vacuum[0]]);

  // And the vacuum's delta movement, based on its current orientation.
  const movement = (() => {
    switch (vacuum[2]) {
      case "^":
        return [0, -1];

      case "v":
        return [0, 1];

      case ">":
        return [1, 0];

      case "<":
        return [-1, 0];

      default:
        throw new Error("");
    }
  })();

  // Now figure out the vacuum's path from start to finish, assuming you go
  // straight through all the intersections.
  const travel = (() => {
    const d = (a, b) => [a[0] + b[0], a[1] + b[1]];
    const moves = [];
    let forward = 0;

    do {
      const straight = d(vacuum, movement);
      const n = (scaffold[straight[1]] ?? [])[straight[0]] ?? ".";

      if (n === "#") {
        forward += 1;
        vacuum[0] = straight[0];
        vacuum[1] = straight[1];
      } else {
        // need to turn
        if (forward > 0) {
          moves.push(forward);
          forward = 0;
        }

        switch (vacuum[2]) {
          case "^":
            {
              const left = (scaffold[vacuum[1]] ?? [])[vacuum[0] - 1] ?? ".";
              const right = (scaffold[vacuum[1]] ?? [])[vacuum[0] + 1] ?? ".";
              movement[1] = 0;

              if (left === "#") {
                moves.push("L");
                movement[0] = -1;
                vacuum[2] = "<";
              } else if (right === "#") {
                moves.push("R");
                movement[0] = 1;
                vacuum[2] = ">";
              } else {
                // There's no scaffolding to the left or right, so we can stop.
                return moves;
              }
            }
            break;

          case "v":
            {
              const left = (scaffold[vacuum[1]] ?? [])[vacuum[0] + 1] ?? ".";
              const right = (scaffold[vacuum[1]] ?? [])[vacuum[0] - 1] ?? ".";
              movement[1] = 0;

              if (left === "#") {
                moves.push("L");
                movement[0] = 1;
                vacuum[2] = ">";
              } else if (right === "#") {
                moves.push("R");
                movement[0] = -1;
                vacuum[2] = "<";
              } else {
                // There's no scaffolding to the left or right, so we can stop.
                return moves;
              }
            }
            break;

          case ">":
            {
              const left = (scaffold[vacuum[1] - 1] ?? [])[vacuum[0]] ?? ".";
              const right = (scaffold[vacuum[1] + 1] ?? [])[vacuum[0]] ?? ".";
              movement[0] = 0;

              if (left === "#") {
                moves.push("L");
                movement[1] = -1;
                vacuum[2] = "^";
              } else if (right === "#") {
                moves.push("R");
                movement[1] = 1;
                vacuum[2] = "v";
              } else {
                // There's no scaffolding to the left or right, so we can stop.
                return moves;
              }
            }
            break;

          case "<":
            {
              const left = (scaffold[vacuum[1] + 1] ?? [])[vacuum[0]] ?? ".";
              const right = (scaffold[vacuum[1] - 1] ?? [])[vacuum[0]] ?? ".";
              movement[0] = 0;

              if (left === "#") {
                moves.push("L");
                movement[1] = 1;
                vacuum[2] = "v";
              } else if (right === "#") {
                moves.push("R");
                movement[1] = -1;
                vacuum[2] = "^";
              } else {
                // There's no scaffolding to the left or right, so we can stop.
                return moves;
              }
            }
            break;

          default:
            throw new Error("");
        }
      }
    } while (true);
  })();

  // travel.join(",") will produce the sequence of steps from start to finish.
  // I copied that into another plaintext file and used find+replace to find
  // the sequences below, making sure they were less than 20 total characters.
  const A = "R,8,R,10,R,10";
  const B = "R,4,R,8,R,10,R,12";
  const C = "R,12,R,4,L,12,L,12";

  // Put the whole program together now, and shove it into the input queue
  const program = [
    travel.join(",").replaceAll(A, "A").replaceAll(B, "B").replaceAll(C, "C"),
    A,
    B,
    C,
    "n",
  ].join("\n");

  const instructions = new InputQueue();

  for (const i of program) {
    instructions.put(BigInt(i.charCodeAt(0)));
  }
  instructions.put(10n);

  code[0] = 2;
  const o = await intcode(code, instructions);

  return o.pop();
};
