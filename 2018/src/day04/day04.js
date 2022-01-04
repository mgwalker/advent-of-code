import CountingSet from "./CountingSet.js";

const input = (raw) => {
  const dtRegex = /\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/;

  return raw
    .trim()
    .split("\n")
    .map((line) => {
      const [, year, month, day, hour, minute, action] = line.match(dtRegex);
      const ts = +[year, month, day, hour, minute].join("");

      return {
        ts,
        year: +year,
        month: +month,
        day: +day,
        hour: +hour,
        minute: +minute,
        action,
      };
    })
    .sort(({ ts: a }, { ts: b }) => a - b);
};

export const part1 = (raw) => {
  const log = input(raw);

  const elves = new Map();
  let elf = null;
  let start = NaN;

  for (const { action, minute } of log) {
    if (action.startsWith("Guard")) {
      elf = +action.match(/#(\d+) /)[1];
      if (!elves.has(elf)) {
        elves.set(elf, new CountingSet());
      }
    } else if (action === "wakes up") {
      const timecard = elves.get(elf);
      for (let m = start; m < minute; m += 1) {
        timecard.add(m);
      }

      if (minute < start) {
        throw new Error("assumption invalid");
      }
    } else {
      start = minute;
    }
  }

  const [sleepiestElf] = [...elves.entries()]
    .map(([key, value]) => [
      key,
      [...value.values()].reduce((sum, c) => sum + c, 0),
    ])
    .sort(([, a], [, b]) => a - b)
    .pop();

  const minutes = elves.get(sleepiestElf);
  let sleepiestMinute = -1;
  let most = -1;
  for (const [minute, count] of minutes) {
    if (count > most) {
      sleepiestMinute = minute;
      most = count;
    }
  }

  return sleepiestElf * sleepiestMinute;
};

export const part2 = (raw) => {
  const log = input(raw);

  const elves = new Map();
  let elf = null;
  let start = NaN;

  for (const { action, minute } of log) {
    if (action.startsWith("Guard")) {
      elf = +action.match(/#(\d+) /)[1];
      if (!elves.has(elf)) {
        elves.set(elf, new CountingSet());
      }
    } else if (action === "wakes up") {
      const timecard = elves.get(elf);
      for (let m = start; m < minute; m += 1) {
        timecard.add(m);
      }

      if (minute < start) {
        throw new Error("assumption invalid");
      }
    } else {
      start = minute;
    }
  }

  const [sleepiestElf] = [...elves.entries()]
    .map(([key, value]) => [key, Math.max(...[...value.values()])])
    .sort(([, a], [, b]) => a - b)
    .pop();

  const minutes = elves.get(sleepiestElf);
  let sleepiestMinute = -1;
  let most = -1;
  for (const [minute, count] of minutes) {
    if (count > most) {
      sleepiestMinute = minute;
      most = count;
    }
  }

  return sleepiestElf * sleepiestMinute;
};
