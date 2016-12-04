"use strict";

const initialLights = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n");

function getNextLights(lights, stuck) {
	let newLights = [ ];

	for(let row = 0; row < lights.length; row++) {
		let newRow = "";
		for(let i = 0; i < lights[row].length; i++) {
			let neighborsOn = 0;

			if(row > 0) {
				if(i > 0) {
					neighborsOn += (lights[row - 1][i - 1] == "#" ? 1 : 0);
				}
				if(i < lights[row].length - 1) {
					neighborsOn += (lights[row - 1][i + 1] == "#" ? 1 : 0);
				}
				neighborsOn += (lights[row - 1][i] == "#" ? 1 : 0);
			}
			if(row < lights.length - 1) {
				if(i > 0) {
					neighborsOn += (lights[row + 1][i - 1] == "#" ? 1 : 0);
				}
				if(i < lights[row].length - 1) {
					neighborsOn += (lights[row + 1][i + 1] == "#" ? 1 : 0);
				}
				neighborsOn += (lights[row + 1][i] == "#" ? 1 : 0);
			}
			if(i > 0) {
				neighborsOn += (lights[row][i - 1] == "#" ? 1 : 0);
			}
			if(i < lights[row].length - 1) {
				neighborsOn += (lights[row][i + 1] == "#" ? 1 : 0);
			}

			if(stuck && row == 0 && (i == 0 || i == lights[row].length - 1)) {
				newRow += "#";
			} else if(stuck && row == lights.length - 1 && (i == 0 || i == lights[row].length - 1)) {
				newRow += "#";
			} else if(lights[row][i] == "#") {
				if(neighborsOn == 2 || neighborsOn == 3) {
					newRow += "#";
				} else {
					newRow += ".";
				}
			} else {
				if(neighborsOn == 3) {
					newRow += "#";
				} else {
					newRow += ".";
				}
			}
		}
		newLights.push(newRow);
	}

	return newLights;
}

let lights1 = initialLights;
let lights2 = initialLights;
for(let i = 0; i < 100; i++) {
	lights1 = getNextLights(lights1, false);
	lights2 = getNextLights(lights2, true);
}

console.log(`[Part 1] Total number of lights on: ${lights1.reduce((p, row) => p + row.split("").reduce((p, v) => p + (v == "#" ? 1 : 0), 0), 0)}`);
console.log(`[Part 2] Total number of lights on: ${lights2.reduce((p, row) => p + row.split("").reduce((p, v) => p + (v == "#" ? 1 : 0), 0), 0)}`);
