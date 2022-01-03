const clone = (o) => JSON.parse(JSON.stringify(o));

export const flipHorizontal = (grid) => {
  const ng = clone(grid);

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < Math.floor(grid[0].length / 2); j += 1) {
      const tmp = ng[i][j];
      ng[i][j] = ng[i][grid[0].length - j - 1];
      ng[i][grid[0].length - j - 1] = tmp;
    }
  }
  return ng;
};

export const flipVertical = (grid) => {
  const ng = clone(grid);

  for (let i = 0; i < Math.floor(grid.length / 2); i += 1) {
    const tmp = ng[i];
    ng[i] = ng[grid.length - i - 1];
    ng[grid.length - i - 1] = tmp;
  }
  return ng;
};

export const transpose = (grid) => {
  const ng = [];
  for (let i = 0; i < grid[0].length; i += 1) {
    const row = [];
    for (let j = 0; j < grid.length; j += 1) {
      row.push(grid[j][i]);
    }
    ng.push(row);
  }
  return ng;
};

export const rotate = (grid) => {
  if (grid.length < 1 || grid.length !== grid[0].length) {
    throw new Error("grid must be square");
  }
  const ng = clone(grid);
  for (let i = 0; i < Math.floor(grid.length / 2); i += 1) {
    const tmp = ng[i];
    ng[i] = ng[ng.length - 1 - i];
    ng[ng.length - 1 - i] = tmp;
  }
  return transpose(ng);
};

export const smooshTogether = (grids) => {
  const grid = [];
  for (const row of grids) {
    for (let c = 0; c < row[0][0].length; c += 1) {
      const newRow = [];
      for (const g of row) {
        newRow.push(...g[c]);
      }
      grid.push(newRow);
    }
  }
  return grid;
};

export const print = (grid) => {
  for (const row of grid) {
    console.log(
      "[",
      row.map((v) => v.toString().padStart(2, " ")).join(" "),
      "]",
    );
  }
};
