import run from "aocrunner";

const input = (raw) => raw.split("\n").map((line) => line.split(""));

const reverse = (str) => str.split("").reverse().join("");

export const part1 = (raw) => {
  const data = input(raw);

  let count = 0;
  for (let row = 0; row < data.length; row += 1) {
    for (let col = 0; col < data[row].length; col += 1) {
      if (data[row][col] === "X") {
        const backward = data[row]
          .slice(col - 3, col + 1)
          .reverse()
          .join("");
        if (backward === "XMAS") {
          count += 1;
        }

        const forward = data[row].slice(col, col + 4).join("");
        if (forward === "XMAS") {
          count += 1;
        }

        const up = data
          .slice(row - 3, row + 1)
          .map((r) => r[col])
          .reverse()
          .join("");
        if (up === "XMAS") {
          count += 1;
        }

        const down = data
          .slice(row, row + 4)
          .map((r) => r[col])
          .join("");
        if (down === "XMAS") {
          count += 1;
        }

        // can only go north if we're not too near the top
        if (row >= 3) {
          // can only go west if we're not too near the left border
          if (col >= 3) {
            const northwest = [
              data[row][col],
              data[row - 1][col - 1],
              data[row - 2][col - 2],
              data[row - 3][col - 3],
            ].join("");
            if (northwest === "XMAS") {
              count += 1;
            }
          }
          // can only go east if we're not too near the right border
          if (col <= data[row].length - 4) {
            const northeast = [
              data[row][col],
              data[row - 1][col + 1],
              data[row - 2][col + 2],
              data[row - 3][col + 3],
            ].join("");
            if (northeast === "XMAS") {
              count += 1;
            }
          }
        }

        // can only go south if we're not too near the bottom
        if (row <= data.length - 4) {
          // can only go west if we're not too near the left border
          if (col >= 3) {
            const southwest = [
              data[row][col],
              data[row + 1][col - 1],
              data[row + 2][col - 2],
              data[row + 3][col - 3],
            ].join("");
            if (southwest === "XMAS") {
              count += 1;
            }
          }
          // can only go east if we're not too near the right border
          if (col <= data[row].length - 4) {
            const southeast = [
              data[row][col],
              data[row + 1][col + 1],
              data[row + 2][col + 2],
              data[row + 3][col + 3],
            ].join("");
            if (southeast === "XMAS") {
              count += 1;
            }
          }
        }
      }
    }
  }
  return count;
};

export const part2 = (raw) => {
  const data = input(raw);
  let count = 0;

  for (let row = 2; row < data.length; row += 1) {
    for (let col = 2; col < data[row].length; col += 1) {
      const diagonal1 = [
        data[row - 2][col - 2],
        data[row - 1][col - 1],
        data[row][col],
      ].join("");

      if (diagonal1 === "MAS" || reverse(diagonal1) === "MAS") {
        const diagonal2 = [
          data[row][col - 2],
          data[row - 1][col - 1],
          data[row - 2][col],
        ].join("");

        if (diagonal2 === "MAS" || reverse(diagonal2) === "MAS") {
          count += 1;
        }
      }
    }
  }
  return count;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
