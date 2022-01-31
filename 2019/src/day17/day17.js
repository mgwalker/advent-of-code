import intcode from "./Intcode.js";

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

  const vacuum = scaffold
    .map((row, i) =>
      /[v><^]/.test(row) ? [row.findIndex((s) => /[v<>^]/.test(s)), i] : false,
    )
    .filter((r) => !!r)
    .flat();
  vacuum.push(scaffold[vacuum[1]][vacuum[0]]);
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

  // console.log(vacuum);
  // console.log(scaffold[vacuum[1]][vacuum[0]]);
  // A:
  //   R,8,R,10

  const A = "R,8,R,10,R,10,R,4";
  const B = "R,8,R,10,R,12";
  const C = "R,12,R,4,L,12,L,12";

  console.log(scaffold.map((r) => r.join("").replaceAll(".", " ")).join("\n"));

  return travel
    .join(",")
    .replaceAll(A, "---A---")
    .replaceAll(B, "---B---")
    .replaceAll(C, "---C---");
};
