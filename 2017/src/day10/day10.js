const input = (raw) => raw.trim();

export const part1 = (raw) => {
  const lengths = input(raw).split(",").map(Number);

  const list = [...Array(256)].map((_, i) => i);

  let index = 0;
  let skip = 0;
  for (const length of lengths) {
    if (index + length >= list.length) {
      const initial = [...list];
      const back = list.splice(index, length);
      const front = list.splice(0, length - back.length);

      const wrapped = [...back, ...front].reverse();
      let i = index;
      for (const num of wrapped) {
        initial[i] = num;
        i = (i + 1) % initial.length;
      }
      list.length = 0;
      list.push(...initial);
    } else {
      const subunit = list.splice(index, length).reverse();
      list.splice(index, 0, ...subunit);
    }

    index = (index + length + skip) % list.length;
    skip += 1;
  }

  const [a, b] = list.slice(0, 2);

  return a * b;
};

export const part2 = (raw) => {
  const lengths = input(raw)
    .split("")
    // eslint-disable-next-line no-bitwise
    .map((c) => c.charCodeAt(0) & 0xff);

  lengths.push(17, 31, 73, 47, 23);

  const list = [...Array(256)].map((_, i) => i);

  let index = 0;
  let skip = 0;
  for (let i = 0; i < 64; i += 1) {
    for (const length of lengths) {
      if (index + length >= list.length) {
        const initial = [...list];
        const back = list.splice(index, length);
        const front = list.splice(0, length - back.length);

        const wrapped = [...back, ...front].reverse();
        let i = index;
        for (const num of wrapped) {
          initial[i] = num;
          i = (i + 1) % initial.length;
        }
        list.length = 0;
        list.push(...initial);
      } else {
        const subunit = list.splice(index, length).reverse();
        list.splice(index, 0, ...subunit);
      }

      index = (index + length + skip) % list.length;
      skip += 1;
    }
  }

  const dense = [];
  for (let i = 0; i < list.length; i += 16) {
    // eslint-disable-next-line no-bitwise
    dense.push(list.slice(i, 16 + i).reduce((x, n) => x ^ n, 0));
  }

  return dense.map((v) => v.toString(16).padStart(2, "0")).join("");
};
