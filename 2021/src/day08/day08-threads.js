import { StaticPool } from "node-worker-threads-pool";
import path from "path";

const parseInput = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => {
      const [input, output] = v.split(" | ");
      return {
        input: input.split(" "),
        output: output.split(" "),
      };
    });

export const part1 = (raw) => {
  const input = parseInput(raw);
  const outputs = input.map((entry) => entry.output).flat();

  // These are the number of segmets for digits 1, 4, 7, 8
  const lookFor = [2, 4, 3, 7];
  return outputs.filter((v) => lookFor.includes(v.length)).length;
};

export const part2 = async (raw) => {
  const input = parseInput(raw);
  const outputs = input.map((entry) => entry.output);

  const computed = [];

  const lines = input.map(({ input, output }) => [input, output].flat());

  const workerPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "day08-worker.js",
  );

  const threads = new StaticPool({
    size: 16,
    task: workerPath,
  });

  await Promise.all(
    lines.map(async (line, i) => {
      const mapping = await threads.exec(line);

      const output = +outputs[i]
        .map((o) => o.split("").sort().join(""))
        .map((o) => mapping.get(o))
        .join("");
      computed.push(output);
    }),
  );

  threads.destroy();

  return computed.reduce((sum, output) => sum + output, 0);
};
