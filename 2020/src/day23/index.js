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
  const cups = [...Array(1_000_001)].map((_, i) => i + 0);

  for (let i = 0; i < start.length - 1; i += 1) {
    cups[start[i]] = start[i + 1];
  }
  cups[start[start.length - 1]] = 10;
  cups[1_000_000] = start[0];

  let current = start[0];

  for (let i = 0; i < 1; i += 1) {
    const remove1 = cups[current];
    const remove2 = cups[remove1];
    const remove3 = cups[remove2];

    console.log(remove1, remove2, remove3);

    let dest = current - 1;
    while (
      dest < 1 ||
      remove1 === dest ||
      remove2 === dest ||
      remove3 === dest
    ) {
      dest -= 1;
      if (dest < 1) {
        dest = 1_000_000;
      }
    }

    console.log(cups.slice(1, 12).join(" "));

    cups[current] = cups[remove3];
    cups[remove3] = cups[dest];
    cups[dest] = remove1;

    current = cups[current];

    console.log(cups.slice(1, 12).join(" "));
  }

  const cup1 = cups[1];
  const cup2 = cups[cups[1]];

  console.log(cup1, cup2);

  return cup1 * cup2 === 149245887792;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
