/* eslint-disable no-await-in-loop */
import intcode, { InputQueue } from "./Intcode.js";

function permutations(xs) {
  const ret = [];

  for (let i = 0; i < xs.length; i += 1) {
    const rest = permutations(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j += 1) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
}

const input = (raw) => raw.trim().split(",").map(Number);

export const part1 = async (raw) => {
  const ops = input(raw);

  const permutes = permutations([0, 1, 2, 3, 4]);

  let max = -Infinity;

  for (const permute of permutes) {
    let chain = 0;
    for (let i = 0; i < 5; i += 1) {
      const queue = new InputQueue();
      queue.put(permute[i]);
      queue.put(chain);
      const x = await intcode([...ops], queue);
      chain = x[0];
    }
    if (chain > max) {
      max = chain;
    }
  }

  return max;
};

export const part2 = async (raw) => {
  const ops = input(raw);

  const permutes = permutations([5, 6, 7, 8, 9]);

  let max = -Infinity;

  for (const permute of permutes) {
    const queues = [
      new InputQueue(),
      new InputQueue(),
      new InputQueue(),
      new InputQueue(),
      new InputQueue(),
    ];

    const amps = [];

    for (let i = 0; i < 5; i += 1) {
      queues[i].put(permute[i]);
      if (i === 0) {
        queues[i].put(0);
      }
      amps.push(
        intcode([...ops], queues[i], (o) => {
          queues[(i + 1) % 5].put(o);
        }),
      );
    }

    const outputs = await Promise.all(amps);
    const final = outputs.flat().pop();

    if (final > max) {
      max = final;
    }
  }

  return max;
};
