"use strict";

const instructions = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n");
const parts = [
	require("./part1"),
	require("./part2")
]

function parseInstruction(instruction) {
	const parsed = /(^[^0-9]+)([0-9]{1,3}),([0-9]{1,3}) through ([0-9]{1,3}),([0-9]{1,3})/.exec(instruction);
	return {
		command: parsed[1].trim(),
		start: {
			x: Number(parsed[2]),
			y: Number(parsed[3])
		},
		end: {
			x: Number(parsed[4]),
			y: Number(parsed[5])
		}
	}
}

for(let part of parts) {
	const lights = [ ];
	for(let x = 0; x < 1000; x++) {
		lights[x] = [ ];
		for(let y = 0; y < 1000; y++) {
			lights[x].push(part.initialValue);
		}
	}

	for(let line of instructions) {
		const instruction = parseInstruction(line);
		const fn = (instruction.command === "turn on" ? part.on : (instruction.command == "turn off" ? part.off : part.toggle));

		for(let x = instruction.start.x; x <= instruction.end.x; x++) {
			for(let y = instruction.start.y; y <= instruction.end.y; y++) {
				lights[x][y] = fn(lights[x][y]);
			}
		}
	}

	let sum = 0;
	for(let x = 0; x < 1000; x++) {
		for(let y = 0; y < 1000; y++) {
			sum = part.sum(sum, lights[x][y]);
		}
	}

	part.print(sum);
}
