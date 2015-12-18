"use strict";

const lines = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n").map(v => Number(v));
lines.unshift(0);

const containersFor150 = [ ];
let minContainers = Infinity;
let sumsTo150 = 0;

for(let it = 0; it < Math.pow(2, lines.length - 1); it++) {
	let sum = 0;
	let bits = [ ];
	for(let i = 1; i < lines.length; i++) {
		if((1 << (i - 1)) & it) {
			sum += lines[i]
			bits.push(lines[i]);
		}
	}
	if(sum == 150) {
		containersFor150.push(bits.length);
		if(bits.length < minContainers) {
			minContainers = bits.length;
		}
		sumsTo150++;
	}
}

console.log(`[Part 1] Unique ways to sum to 150: ${sumsTo150}`);
console.log(`[Part 2] Ways to sum to 150 with ${minContainers} containers: ${containersFor150.reduce((p, v) => v == minContainers ? p + 1 : p, 0)}`);
