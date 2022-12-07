import run from "aocrunner";
import path from "path";
import { sum } from "utils";

const input = (raw) => raw.split("\n");

const getFSTree = (instructions) => {
  const directories = new Map();

  let currentPath = "";
  for (let i = 0; i < instructions.length; i += 1) {
    const [, cmd, arg] = instructions[i].match(/^\$ (\S+)\s?(.*)/);

    switch (cmd) {
      case "cd":
        currentPath = path.resolve(currentPath, arg);
        if (!directories.has(currentPath)) {
          directories.set(currentPath, {
            path: currentPath,
            subdirs: [],
            files: [],
            size: 0,
          });
        }
        break;

      case "ls":
        {
          const dir = directories.get(currentPath);
          i += 1;
          const output = [];
          while (i < instructions.length && !instructions[i].startsWith("$")) {
            output.push(instructions[i]);
            i += 1;
          }
          i -= 1;

          dir.subdirs.push(
            ...output
              .filter((o) => o.startsWith("dir"))
              .map((d) => path.join(currentPath, d.substr(4))) // eslint-disable-line no-loop-func
          );
          dir.files.push(
            ...output
              .filter((o) => !o.startsWith("dir"))
              .map((v) => {
                const [size, name] = v.split(" ");
                return { name, size: +size };
              })
          );
        }
        break;

      default:
        throw new Error(`unknown command: ${cmd} [with arg ${arg}]`);
    }
  }

  [...directories].forEach(([, dir]) => {
    dir.subdirs = dir.subdirs.map((sub) => directories.get(sub));
  });

  const getDirectorySize = (dir) => {
    if (dir) {
      dir.subdirs.forEach(getDirectorySize);

      dir.size =
        dir.files.map(({ size }) => size).reduce(sum, 0) +
        dir.subdirs.map((sub) => sub.size ?? 0).reduce(sum, 0);
    }
  };

  getDirectorySize(directories.get("/"));

  return directories;
};

export const part1 = (raw) => {
  const data = input(raw);
  const tree = getFSTree(data);

  const dirs = [...tree]
    .map(([, dir]) => dir)
    .filter(({ size }) => size <= 100000);

  return dirs.map(({ size }) => size).reduce(sum, 0);
};

export const part2 = (raw) => {
  const data = input(raw);
  const tree = getFSTree(data);

  const totalSize = 70_000_000;
  const min = 30_000_000;
  const free = totalSize - tree.get("/").size;

  const deleteSize = min - free;

  return [...tree]
    .map(([, { size }]) => size)
    .filter((s) => s >= deleteSize)
    .sort((a, b) => b - a)
    .pop();
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
