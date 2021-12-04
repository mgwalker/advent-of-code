import run from "aocrunner";

const parseInput = (raw) => {
  const out = {
    calls: [],
    boards: [],
    numberMap: new Map(),
  };

  raw
    .trim()
    .split("\n\n")
    .forEach((v, inputItemNumber) => {
      if (inputItemNumber === 0) {
        out.calls = v.split(",").map(Number);
      } else {
        out.numberMap.set(inputItemNumber - 1, new Map());
        out.boards.push(
          v.split("\n").map((row, rowNumber) =>
            row
              .trim()
              .replace(/\s+/g, " ")
              .split(" ")
              .map(Number)
              .map((number, colNumber) => {
                out.numberMap
                  .get(inputItemNumber - 1)
                  .set(number, { row: rowNumber, col: colNumber });
                return { checked: false, number };
              }),
          ),
        );
      }
    });

  return out;
};

const hasBingo = (board) => {
  // row-wise
  if (board.some((row) => row.every((cell) => cell.checked))) {
    return true;
  }

  // column-wise; transpose the board, then basically do the same thing
  return board
    .map((row, i) => row.map((_, c) => board[c][i]))
    .some((col) => col.every((cell) => cell.checked));
};

const boardScore = (board, number) =>
  number *
  board.reduce(
    (rowsSum, row) =>
      rowsSum +
      row
        .filter(({ checked }) => !checked)
        .reduce((rowSum, { number }) => rowSum + number, 0),
    0,
  );

const part1 = (raw) => {
  const input = parseInput(raw);

  for (const number of input.calls) {
    for (const [boardNumber, board] of input.boards.entries()) {
      const map = input.numberMap.get(boardNumber);
      const location = map.get(number);
      if (location) {
        board[location.row][location.col].checked = true;
        if (hasBingo(board)) {
          return boardScore(board, number);
        }
      }
    }
  }
};

const part2 = (raw) => {
  const input = parseInput(raw);

  let lastWinningNumber = -1;
  let lastWinningBoard = [];

  for (const number of input.calls) {
    for (
      let boardNumber = 0;
      boardNumber < input.boards.length;
      boardNumber += 1
    ) {
      const board = input.boards[boardNumber];
      // A board is false if it already has a win. We don't need to examine
      // those boards anymore.
      if (board === false) {
        continue;
      }

      const map = input.numberMap.get(boardNumber);
      const location = map.get(number);
      if (location) {
        board[location.row][location.col].checked = true;
        if (hasBingo(board)) {
          lastWinningNumber = number;
          lastWinningBoard = board;
          // Remove the winning board from the list of boards to be examined.
          // Once the board has won, subsequent wins are irrelevant. We can't
          // just splice it out because the mapping of numbers into board
          // locations is based on the board index; splicing would change the
          // indices of the remaining boards. So set this board as false, and
          // just skip it in subsequent loops
          input.boards[boardNumber] = false;
        }
      }
    }
  }

  return boardScore(lastWinningBoard, lastWinningNumber);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
