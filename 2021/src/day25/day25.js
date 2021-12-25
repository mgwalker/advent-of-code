const input = (raw) => raw.split("\n").map((v) => v.split(""));

const move = (oldGrid) => {
  const grid = [];
  let moved = false;

  for (let y = 0; y < oldGrid.length; y += 1) {
    const row = [];
    for (let x = 0; x < oldGrid[y].length; x += 1) {
      if (oldGrid[y][x] === ">") {
        const next = (x + 1) % oldGrid[y].length;
        if (oldGrid[y][next] === ".") {
          moved = true;
          row.push(".");
          if (next === 0) {
            row[0] = ">";
          } else {
            row.push(">");
          }
          x += 1;
        } else {
          row.push(">");
        }
      } else {
        row.push(".");
      }
    }
    grid.push(row);
  }

  for (let y = 0; y < oldGrid.length; y += 1) {
    for (let x = 0; x < oldGrid[y].length; x += 1) {
      if (oldGrid[y][x] === "v") {
        const next = (y + 1) % oldGrid.length;

        const emptyNow = grid[next][x] === ".";
        const openedByMovement =
          oldGrid[next][x] === "." || oldGrid[next][x] === ">";

        if (emptyNow && openedByMovement) {
          moved = true;
          grid[y][x] = ".";
          grid[next][x] = "v";
        } else {
          grid[y][x] = "v";
        }
      }
    }
  }

  return moved ? grid : false;
};

const print = (grid) => {
  for (let i = 0; i < grid.length; i += 1) {
    console.log(`${i}`.padEnd(3, " "), grid[i].join(" "));
  }
};

export const part1 = (raw) => {
  let grid = input(raw);

  let steps = 0;
  do {
    grid = move(grid);
    steps += 1;
  } while (grid);

  return steps;
};

export const part2 = (raw) => {
  const data = input(raw);
};
