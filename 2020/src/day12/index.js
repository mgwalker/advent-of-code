import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((s) => {
    const [, d, v] = s.match(/^([a-z])(\d+)$/i);
    return { move: d, value: +v };
  });

const deg = (r) => (180 * r) / Math.PI;
const rad = (d) => (d * Math.PI) / 180;

const directions = new Map([
  [0, "east"],
  [90, "south"],
  [180, "west"],
  [270, "north"],
]);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let facing = 0; // east
  const position = [0, 0];

  for (let { move, value } of input) {
    switch (move) {
      case "L":
        value = -value;
      case "R":
        facing += value;
        break;

      case "F":
        const y = Math.round(-Math.sin((facing * Math.PI) / 180));
        const x = Math.round(Math.cos((facing * Math.PI) / 180));
        position[0] += y * value;
        position[1] += x * value;
        break;

      case "S":
        value = -value;
      case "N":
        position[0] += value;
        break;

      case "W":
        value = -value;
      case "E":
        position[1] += value;
        break;
    }
  }

  return position.map((v) => Math.abs(v)).reduce((s, v) => s + v, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  // these are in Y, X coordinates, because I thought about it backwards and
  // now it would be a PITA to change
  const position = [0, 0];
  const waypoint = [1, 10];

  for (let { move, value } of input) {
    switch (move) {
      case "F":
        position[0] += waypoint[0] * value;
        position[1] += waypoint[1] * value;
        // console.log(`forward ${value}`);
        break;

      case "S":
        value = -value;
      case "N":
        waypoint[0] += value;
        break;

      case "W":
        value = -value;
      case "E":
        waypoint[1] += value;
        break;

      case "L":
        value = 360 - value;
      case "R":
        const [y, x] = waypoint;
        switch (value) {
          case 90:
            waypoint[0] = -x;
            waypoint[1] = y;
            break;

          case 180:
            waypoint[0] = -y;
            waypoint[1] = -x;
            break;

          case 270:
            waypoint[0] = x;
            waypoint[1] = -y;
            break;
        }
        break;
    }
  }

  return position.map((v) => Math.abs(v)).reduce((s, v) => s + v, 0);
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
