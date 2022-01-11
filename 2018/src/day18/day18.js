const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => v.split(""));

const printable = (woods) => woods.map((row) => row.join("")).join("\n");

const getNeighbors = (x, y, woods) =>
  [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ]
    .filter(
      ([xx, yy]) =>
        xx >= 0 && yy >= 0 && xx < woods[0].length && yy < woods.length
    )
    .map(([xx, yy]) => woods[yy][xx]);

const passAMinute = (woods) => {
  const newWoods = [];
  for (let y = 0; y < woods.length; y += 1) {
    const newRow = [];
    for (let x = 0; x < woods[y].length; x += 1) {
      const me = woods[y][x];
      const neighbors = getNeighbors(x, y, woods);

      if (me === ".") {
        if (neighbors.filter((n) => n === "|").length >= 3) {
          newRow.push("|");
        } else {
          newRow.push(me);
        }
      } else if (me === "|") {
        if (neighbors.filter((n) => n === "#").length >= 3) {
          newRow.push("#");
        } else {
          newRow.push(me);
        }
      } else if (me === "#") {
        if (
          neighbors.filter((n) => n === "#").length >= 1 &&
          neighbors.filter((n) => n === "|").length >= 1
        ) {
          newRow.push(me);
        } else {
          newRow.push(".");
        }
      }
    }
    newWoods.push(newRow);
  }

  return newWoods;
};

export const part1 = (raw) => {
  let woods = input(raw);

  for (let i = 0; i < 10; i += 1) {
    woods = passAMinute(woods);
  }

  const wooded = woods
    .map((row) => row.join(""))
    .join("")
    .replace(/[^|]/g, "").length;
  const lumberyards = woods
    .map((row) => row.join(""))
    .join("")
    .replace(/[^#]/g, "").length;

  return wooded * lumberyards;
};

export const part2 = (raw) => {
  const TARGET = 1_000_000_000;
  let woods = input(raw);

  const woodsToStr = (woods) => woods.map((row) => row.join("")).join("");

  const seen = new Map();

  let minute = 0;

  do {
    minute += 1;
    const newWoods = passAMinute(woods);
    seen.set(woodsToStr(woods), { minute, woods: newWoods });
    woods = newWoods;
  } while (!seen.has(woodsToStr(woods)));

  const { minute: loopTo } = seen.get(woodsToStr(woods));

  // add one to account for the inclusive nature of the loop - that is, it's not
  // just the states in [start, end), but rather [start, end]
  const loopSize = minute - loopTo + 1;
  const remainingMinutes = TARGET - minute;
  const advance = remainingMinutes % loopSize;

  for (let i = 0; i < advance; i += 1) {
    woods = passAMinute(woods);
  }

  const wooded = woods
    .map((row) => row.join(""))
    .join("")
    .replace(/[^|]/g, "").length;
  const lumberyards = woods
    .map((row) => row.join(""))
    .join("")
    .replace(/[^#]/g, "").length;

  return wooded * lumberyards;
};
