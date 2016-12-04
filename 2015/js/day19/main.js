"use strict";

const input = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n");

let calibration = "";
const replacements = [ ];
const replacementRegex = /([A-Za-z]+) => ([A-Za-z]+)/;
for(let line of input) {
	if(line.length) {
		const match = replacementRegex.exec(line);
		if(match) {
			replacements.push({
				from: match[1],
				to: match[2]
			});
		} else {
			calibration = line;
		}
	}
}

const molecules = [ ];
for(let replacement of replacements) {
	const regex = new RegExp(replacement.from, "g");
	let match = regex.exec(calibration);
	while(match != null) {
		let molecule = calibration.substr(0, match.index) + replacement.to + calibration.substr(match.index + replacement.from.length);
		if(molecules.indexOf(molecule) < 0) {
			molecules.push(molecule);
		}
		match = regex.exec(calibration);
	}
}

console.log(`[Part 1] Possible distinct molecules: ${molecules.length}`);

const iterations = [ [ calibration ] ];

while(iterations[iterations.length - 1].indexOf("e") < 0) {
	let candidates = [ ];
	for(let replacement of replacements) {
		const regex = new RegExp(replacement.to, "g");

		for(let molecule of iterations[iterations.length - 1]) {
			let match = regex.exec(molecule);
			while(match != null) {
				let candidate = molecule.substr(0, match.index) + replacement.from + molecule.substr(match.index + replacement.to.length);
				if(candidates.indexOf(candidate) < 0) {
					candidates.push(candidate);
				}
				match = regex.exec(molecule);
			}
		}
	}
	candidates.sort((a, b) => a.length - b.length);
	// Only keep the shortest one.  It turns out, for this
	// input, that's all we need.
	if(candidates.length > 1) {
		candidates = candidates.slice(0, 1);
	}
	iterations.push(candidates);
	console.log(`Iteration ${iterations.length - 1}: ${iterations[iterations.length - 1].length} (shortest = ${candidates[0].length})`);
}

console.log(`[Part 2] Minimum iterations: ${iterations.length - 1}`);
