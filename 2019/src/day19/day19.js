import intcode, { InputQueue } from "./Intcode.js";

function* range(r, start = 0) {
  for (let i = start; i < r + start; i += 1) {
    yield i;
  }
}

function* inc(start = 0) {
  let i = start;
  do {
    yield i;
    i += 1;
  } while (true);
}

const input = (raw) =>
  raw
    .trim()
    .split(",")
    .map((n) => BigInt(n));

export const part1 = async (raw) => {
  const instructions = input(raw);

  const coords = new InputQueue();

  let hits = 0;
  for await (const x of range(50)) {
    for await (const y of range(50)) {
      coords.put(x);
      coords.put(y);
      hits += (await intcode(instructions, coords)).pop() === 1n ? 1 : 0;
    }
  }

  return hits;
};

export const part2 = async (raw) => {
  const instructions = input(raw);

  const coords = new InputQueue();

  const check = async (x, y) => {
    coords.put(x);
    coords.put(y);
    return (await intcode(instructions, coords)).pop();
  };

  let startX = await (async () => {
    let startingY = 0;
    let x = 100;
    do {
      /* eslint-disable no-await-in-loop */
      let count = 0;
      for await (const y of inc(startingY)) {
        const ding = await check(x, y);

        if (ding !== 1n && count > 0) {
          break;
        } else if (ding === 1n) {
          if (count === 0) {
            startingY = y;
          }
          count += 1;
        }
      }

      if (count >= 100) {
        break;
      }
      x += 1;
    } while (true);
    return x;
  })();

  let startY = await (async () => {
    let startingX = 0;
    let y = 100;
    do {
      /* eslint-disable no-await-in-loop */
      let count = 0;
      for await (const x of inc(startingX)) {
        const ding = await check(x, y);

        if (ding !== 1n && count > 0) {
          break;
        } else if (ding === 1n) {
          if (count === 0) {
            startingX = x;
          }
          count += 1;
        }
      }

      if (count >= 100) {
        break;
      }
      y += 1;
    } while (true);
    return y;
  })();

  if (startX > startY) {
    for await (const y of inc(startY)) {
      const ding = await check(startX, y);
      if (ding === 1n) {
        startY = y;
        break;
      }
    }
  } else {
    for await (const x of inc(startX)) {
      const ding = await check(x, startY);
      if (ding === 1n) {
        startX = x;
        break;
      }
    }
  }

  // eslint-disable-next-line consistent-return
  const out = await (async () => {
    for await (const y of inc(startY)) {
      let maybeX = -1;
      let rowCount = 0;
      let dinged = false;

      for await (const x of inc(startX)) {
        const ding = await check(x, y);

        if (ding === 1n) {
          if (rowCount === 0) {
            maybeX = x;
          }
          if (!dinged) {
            startX = x;
          }

          dinged = true;
          rowCount += 1;

          let colCount = 0;
          for await (const yy of range(100, y)) {
            const dingV = await check(x, yy);
            if (dingV === 1n) {
              colCount += 1;
            }
          }

          if (colCount < 100) {
            rowCount -= 1;
            maybeX = -1;
          }
        } else if (ding === 0n && rowCount > 0) {
          break;
        }

        if (rowCount === 100) {
          return maybeX * 10_000 + y;
        }
      }
    }
  })();

  return out;
};
