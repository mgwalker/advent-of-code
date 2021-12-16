import { parentPort } from "worker_threads";

const difference = (set1, set2) => {
  const diff = new Set();
  set1.forEach((v) => {
    if (!set2.has(v)) {
      diff.add(v);
    }
  });

  set2.forEach((v) => {
    if (!set1.has(v)) {
      diff.add(v);
    }
  });

  return diff;
};

const intersection = (set1, set2) => {
  const int = new Set();
  set1.forEach((v) => {
    if (set2.has(v)) {
      int.add(v);
    }
  });
  return int;
};

parentPort.on("message", (line) => {
  const segments = [];
  line.forEach((o) => {
    segments.push(new Set(o.split("")));
  });

  const cf = segments.filter((s) => s.size === 2).pop();
  const acf = segments.filter((s) => s.size === 3).pop();
  const bcdf = segments.filter((s) => s.size === 4).pop();
  const abcdefg = segments.filter((s) => s.size === 7).pop();

  const a = difference(cf, acf);
  const bd = difference(bcdf, cf);
  const aeg = difference(abcdefg, bcdf);
  const eg = difference(a, aeg);

  const adg = segments
    .filter((s) => s.size === 5)
    .reduce((u, s) => intersection(u, s), abcdefg);
  const dg = difference(a, adg);
  const g = intersection(dg, eg);
  const d = difference(dg, g);
  const e = difference(eg, g);
  const b = difference(bd, d);

  const abfg = segments
    .filter((s) => s.size === 6)
    .reduce((u, s) => intersection(u, s), abcdefg);
  const bfg = difference(a, abfg);
  const bf = difference(bfg, g);
  const f = difference(bf, b);
  const c = difference(cf, f);

  const mapping = new Map([
    [0, [a, b, c, e, f, g]],
    [1, [c, f]],
    [2, [a, c, d, e, g]],
    [3, [a, c, d, f, g]],
    [4, [b, c, d, f]],
    [5, [a, b, d, f, g]],
    [6, [a, b, d, e, f, g]],
    [7, [a, c, f]],
    [8, [a, b, c, d, e, f, g]],
    [9, [a, b, c, d, f, g]],
  ]);

  mapping.forEach((sets, number) => {
    if (Array.isArray(sets)) {
      const key = sets
        .map((set) => Array.from(set))
        .flat()
        .sort()
        .join("");
      mapping.set(key, number);
    }
  });

  parentPort.postMessage(mapping);
});
