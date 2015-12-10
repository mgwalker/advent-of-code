"use strict";

const input = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim().split("\n");

let codeLength = 0;
let memoryLength = 0;
let encodedLength = 0;
for(let line of input) {
	codeLength += line.length;
	memoryLength += line.replace(/^"(.*)"$/, "$1").replace(/\\["\\]/g, "\"").replace(/\\x[a-f0-9]{2}/g, "*").length;
	encodedLength += line.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/^"(.*)"$/, "\\\"$1\\\"").length + 2;
}

console.log(`[Part 1] Code length: ${codeLength}  |  Mem Length: ${memoryLength}  |  Diff: ${codeLength - memoryLength}`);
console.log(`[Part 1] Encoded length: ${encodedLength}  |  Code Length: ${codeLength}  |  Diff: ${encodedLength - codeLength}`);
