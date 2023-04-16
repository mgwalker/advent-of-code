import run from "aocrunner";
import astar from "a-star";

const input = (raw) => {
  const valves = new Map();
  raw.split("\n").forEach((row) => {
    const [, name, flow, links] = row.match(
      /Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.+)/
    );
    const valve = {
      name,
      flow: +flow,
      links: links.split(",").map((v) => v.trim()),
    };
    valves.set(name, valve);
  });

  for (const [, valve] of valves) {
    valve.links = valve.links.map((link) => valves.get(link));
  }

  return valves;
};

export const part1 = (raw) => {
  const valves = input(raw);

  let max = -Infinity;

  const x = astar({
    start: {
      valve: valves.get("AA"),
      opened: [],
      time: 1,
      pressure: 0,
      cumulative: 0,
    },
    hash: (node) =>
      `${node.valve.name}|${node.opened.join(",")}|${node.time}|${
        node.pressure
      }|${node.cumulative}`,
    isEnd: () => false,
    distance: () => -1,
    heuristic: () => -1,
    neighbor: ({ valve, opened, time, pressure, cumulative }) => {
      // console.log(
      //   `ON VALVE ${valve.name} | ${valve.flow} | OPENED: ${opened.join(",")}`
      // );
      if (time === 30) {
        if (cumulative > max) {
          max = cumulative;
          console.log(max);
        }
        return [];
      }

      const neighbors = [];
      if (valve.flow > 0 && !opened.includes(valve.name)) {
        // console.log(`OPENING ${valve.name}`);
        // valve is not opened and can contribute, so one of its neighbors
        // is if we open this valve
        neighbors.push({
          valve,
          opened: [...opened, valve.name],
          time: time + 1,
          pressure: pressure + valve.flow,
          cumulative,
        });
      }

      // Regardless of whether the valve is open or closed, add its links
      valve.links.forEach((link) => {
        neighbors.push({
          valve: link,
          opened,
          time: time + 1,
          pressure,
          cumulative: cumulative + pressure,
        });
      });

      return neighbors;
    },
  });

  return max;
};

export const part2 = (raw) => {
  const data = input(raw);
  return;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
