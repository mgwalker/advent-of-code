const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => {
      const [, x, y, z, r] = l
        .match(/^pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)$/)
        .map(Number);
      return { x, y, z, r };
    });

const distance = (a, b) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

export const part1 = (raw) => {
  const nanobots = input(raw);

  const maxRadius = Math.max(...nanobots.map(({ r }) => r));
  const strongestBot = nanobots.find(({ r }) => maxRadius === r);

  const manhattan = (bot) => distance(bot, strongestBot);

  return nanobots.filter((bot) => manhattan(bot) <= maxRadius).length;
};

export const part2 = (raw) => {
  const nanobots = input(raw);
  const manhattan = (bot) => distance(bot, { x: 0, y: 0, z: 0 });

  // I still don't actually understand this problem, but I found a solution on
  // reddit that worked and worked very quickly:
  // https://www.reddit.com/r/adventofcode/comments/a8s17l/2018_day_23_solutions/ecfkmyo/?context=8&depth=9

  const queue = Array.from(
    new Set(
      nanobots.flatMap(({ r, ...bot }) => {
        const d = manhattan(bot);
        return [
          [Math.max(0, d - r), 1],
          [d + r, -1],
        ];
      })
    )
  );

  let count = 0;
  let maxCount = 0;
  let result = 0;

  while (queue.length > 0) {
    queue.sort(([a], [b]) => b - a);
    const [dist, end] = queue.pop();
    count += end;
    if (count > maxCount) {
      maxCount = count;
      result = dist;
    }
  }

  return result;
};
