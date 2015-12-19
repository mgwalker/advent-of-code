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
