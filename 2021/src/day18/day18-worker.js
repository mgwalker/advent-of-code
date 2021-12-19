import { parentPort } from "worker_threads";
import { magnitude, reduce } from "./fns.js";

parentPort.on("message", (lines) => {
  parentPort.postMessage(
    lines
      .map(reduce)
      .map((s) => JSON.parse(s))
      .map(magnitude),
  );
});
