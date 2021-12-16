import { parentPort, workerData } from "worker_threads";

let data = [];

const getAdjacent = (row, column) => {
  return [
    data[row - 1]?.[column] ?? 9,
    data[row + 1]?.[column] ?? 9,
    data[row]?.[column - 1] ?? 9,
    data[row]?.[column + 1] ?? 9,
  ];
};

const getBasin = (row, column) => {
  const basin = [];
  const height = data[row]?.[column] ?? 9;

  if (height < 9) {
    basin.push(height);
    data[row][column] = 9;

    basin.push(...getBasin(row - 1, column));
    basin.push(...getBasin(row + 1, column));
    basin.push(...getBasin(row, column - 1));
    basin.push(...getBasin(row, column + 1));
  }
  return basin;
};

parentPort.on("message", ({ height, row, column }) => {
  data = workerData.map((a) => [...a]);

  const neighbors = getAdjacent(row, column);
  if (height < Math.min(...neighbors)) {
    data[row][column] = 9;
    const basin = [height];
    basin.push(...getBasin(row - 1, column));
    basin.push(...getBasin(row + 1, column));
    basin.push(...getBasin(row, column - 1));
    basin.push(...getBasin(row, column + 1));
    parentPort.postMessage(basin);
  }

  parentPort.postMessage(null);
});
