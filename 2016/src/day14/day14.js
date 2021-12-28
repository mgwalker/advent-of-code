import { createHash } from "crypto";

const input = (raw) => raw;

const md5 = (() => {
  const rainbow = new Map();

  return (str, useRainbow = true) => {
    if (useRainbow && rainbow.has(str)) {
      return rainbow.get(str);
    }
    const hash = createHash("md5");
    hash.update(str);
    const out = hash.digest("hex");
    if (useRainbow) {
      rainbow.set(str, out);
    }
    return out;
  };
})();

const md5cycle = (() => {
  const rainbow = new Map();

  return (str, count) => {
    if (rainbow.has(`${str}|${count}`)) {
      return rainbow.get(`${str}|${count}`);
    }

    let hash = md5(str);
    for (let i = 0; i < count; i += 1) {
      hash = md5(hash, false);
    }

    rainbow.set(`${str}|${count}`, hash);
    return hash;
  };
})();

export const part1 = (raw) => {
  const salt = input(raw);
  const hasThree = /(.)\1\1/;

  const keys = [];

  let index = 0;
  while (keys.length < 64) {
    index += 1;
    const hash = md5(`${salt}${index}`);
    const [, target] = hash.match(hasThree) ?? [, false];
    if (target !== false) {
      const hasFive = new RegExp(`(${target})\\1\\1\\1\\1`);
      if (hasThree.test(hash)) {
        for (let nextOffset = 1; nextOffset <= 1000; nextOffset += 1) {
          const nextHash = md5(`${salt}${index + nextOffset}`);
          if (hasFive.test(nextHash)) {
            keys.push(index);
            break;
          }
        }
      }
    }
  }

  return keys[keys.length - 1];
};

export const part2 = (raw) => {
  const salt = input(raw);
  const hasThree = /(.)\1\1/;

  const keys = [];

  let index = 0;
  while (keys.length < 64) {
    index += 1;
    const hash = md5cycle(`${salt}${index}`, 2016);
    const [, target] = hash.match(hasThree) ?? [, false];
    if (target !== false) {
      const hasFive = new RegExp(`(${target})\\1\\1\\1\\1`);
      if (hasThree.test(hash)) {
        for (let nextOffset = 1; nextOffset <= 1000; nextOffset += 1) {
          const nextHash = md5cycle(`${salt}${index + nextOffset}`, 2016);
          if (hasFive.test(nextHash)) {
            keys.push(index);
            break;
          }
        }
      }
    }
  }

  return keys[keys.length - 1];
};
