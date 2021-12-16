import { Worker } from "worker_threads";
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
    "day08-solver.js",
  );

  await Promise.all(
    lines.map((line, i) => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, { workerData: { line } });
        worker.on("error", (e) => {
          console.log(e);
          reject();
        });
        worker.on("exit", () => reject());
        worker.on("message", (mapping) => {
          const output = +outputs[i]
            .map((o) => o.split("").sort().join(""))
            .map((o) => mapping.get(o))
            .join("");
          computed.push(output);
          resolve();
        });
      });
    }),
  );

  return computed.reduce((sum, output) => sum + output, 0);
};
