import run from "aocrunner";

const parseInput = (raw) => raw.trim().split("\n").map(Number);

const part1 = (raw) => {
  const [pub1, pub2] = parseInput(raw);

  let v = 1;
  const sn = 7;
  const priv = [false, false];

  let loops = 1;
  do {
    v *= sn;
    v %= 20201227;
    if (v === pub1) {
      priv[0] = loops;
    } else if (v === pub2) {
      priv[1] = loops;
    }
    loops += 1;
  } while (priv[0] === false && priv[1] === false);

  const count = priv[0] || priv[1];
  const key = priv[0] ? pub2 : pub1;

  v = 1;
  for (let i = 0; i < count; i += 1) {
    v *= key;
    v %= 20201227;
  }

  return v;
};

const part2 = (raw) => {
  const input = parseInput(raw);

  return;
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
