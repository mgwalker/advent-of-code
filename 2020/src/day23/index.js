import run from "aocrunner";

const parseInput = (raw) => raw.split("").map(Number);

const part1 = (raw) => {
  const start = parseInput(raw);
  const cups = [...Array(start.length + 1)];

  for (let i = 0; i < start.length - 1; i += 1) {
    cups[start[i]] = start[i + 1];
  }
  cups[start[start.length - 1]] = start[0];

  let current = start[0];

  for (let i = 0; i < 100; i += 1) {
    let next = current - 1;
    while (
      next < 1 ||
      cups[current] === next ||
      cups[cups[current]] === next ||
      cups[cups[cups[current]]] === next
    ) {
      next -= 1;
      if (next < 1) {
        next = 9;
      }
    }

    const head = cups[current];
    const tail = cups[cups[cups[current]]];
    cups[current] = cups[tail];
    cups[tail] = cups[next];
    cups[next] = head;
    current = cups[current];
  }

  let n = cups[1];
  const nums = [];
  do {
    nums.push(n);
    n = cups[n];
  } while (n !== 1);
  return nums.join("");
};

const part2 = (raw) => {
  const start = parseInput(raw);
  const cups = [...Array(1_000_001)].map((_, i) => i + 1);

  for (let i = 1; i < start.length; i += 1) {
    cups[start[i - 1]] = start[i];
  }
  cups[start[start.length - 1]] = start.length + 1;
  cups[cups.length - 1] = start[0];

  let current = start[0];
  for (let i = 0; i < 10_000_000; i += 1) {
    let next = current - 1;

    const mv1 = cups[current];
    const mv2 = cups[mv1];
    const mv3 = cups[mv2];

    while (next < 1 || mv1 === next || mv2 === next || mv3 === next) {
      next -= 1;
      if (next < 1) {
        next = 1_000_000;
      }
    }

    const head = cups[current];
    const tail = cups[cups[cups[current]]];
    cups[current] = cups[tail];
    cups[tail] = cups[next];
    cups[next] = head;
    current = cups[current];
  }

  const cup1 = cups[1];
  const cup2 = cups[cup1];

  return cup1 * cup2;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
