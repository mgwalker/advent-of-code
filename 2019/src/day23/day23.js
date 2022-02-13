import intcode from "./Intcode.js";

const input = (raw) =>
  raw
    .trim()
    .split(",")
    .map((v) => BigInt(v));

export const part1 = async (raw) => {
  const ops = input(raw);

  const output = await new Promise((resolve) => {
    const queues = [...Array(50)].map((_, i) => [[BigInt(i)]]);
    const packets = [...Array(50)].map(() => false);

    const get = (i) => () => {
      if (queues[i].length === 0) {
        return -1n;
      }

      const part = queues[i][0].shift();
      if (queues[i][0].length === 0) {
        queues[i].shift();
      }

      return part;
    };

    const out = (i) => (v) => {
      if (packets[i] === false) {
        packets[i] = [Number(v), []];
      } else {
        packets[i][1].push(v);
      }

      if (packets[i][1].length === 2) {
        if (packets[i][0] === 255) {
          for (const queue of queues) {
            queue[0] = ["stop"];
          }
          resolve(v);
          return;
        }

        queues[packets[i][0]].push(packets[i][1]);
        packets[i] = false;
      }
    };

    [...Array(50)].map((_, i) => intcode(ops, { get: get(i) }, out(i)));
  });

  return output;
};

export const part2 = async (raw) => {
  const ops = input(raw);

  const output = await new Promise((resolve) => {
    const NAT = [];
    let lastNATy = false;

    const queues = [...Array(50)].map((_, i) => [[BigInt(i)]]);
    const packets = [...Array(50)].map(() => false);

    let idleTicks = 0;

    const get = (i) => () => {
      if (NAT.length > 0 && queues.every((q) => q.length === 0)) {
        idleTicks += 1;
        if (idleTicks === 500) {
          if (NAT[1] === lastNATy) {
            resolve(NAT[1]);
            for (const queue of queues) {
              queue[0] = ["stop"];
            }
            return -1n;
          }
          lastNATy = NAT[1];
          queues[0].push([...NAT]);
          NAT.length = 0;
        }
      } else {
        idleTicks = 0;
      }

      if (queues[i].length === 0) {
        return -1n;
      }

      const part = queues[i][0].shift();
      if (queues[i][0].length === 0) {
        queues[i].shift();
      }

      return part;
    };

    const out = (i) => (v) => {
      if (packets[i] === false) {
        packets[i] = [Number(v), []];
      } else {
        packets[i][1].push(v);
      }

      if (packets[i][1].length === 2) {
        if (packets[i][0] === 255) {
          NAT[0] = packets[i][1][0];
          NAT[1] = packets[i][1][1];
        } else {
          queues[packets[i][0]].push(packets[i][1]);
        }
        packets[i] = false;
      }
    };

    [...Array(50)].map((_, i) => intcode(ops, { get: get(i) }, out(i)));
  });

  return output;
};
