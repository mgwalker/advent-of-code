"use strict";

const lines = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n").map(v => Number(v));
lines.sort((a, b) => b - a);
lines.unshift(0);

const containersFor150 = [ ];
let minContainers = Infinity;

const iterations = 1 << lines.length - 1;
for(let it = 0; it < iterations; it++) {
	let sum = 0;
	let bits = [ ];
	let mask = 1;
	for(let i = 1; i < lines.length; i++) {
		if(mask & it) {
			sum += lines[i];
			if(sum > 150) {
				break;
			}
			bits.push(lines[i]);
		}
		mask = mask << 1;
	}
	if(sum == 150) {
		containersFor150.push(bits.length);
		if(bits.length < minContainers) {
			minContainers = bits.length;
		}
	}
}

console.log(`[Part 1] Unique ways to sum to 150: ${containersFor150.length}`);
console.log(`[Part 2] Ways to sum to 150 with ${minContainers} containers: ${containersFor150.reduce((p, v) => v == minContainers ? p + 1 : p, 0)}`);
