"use strict";

const instructions = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n");

function getInstruction(instruction) {
	return instruction.substr(0, 3);
}

function getRegister(instruction) {
	return instruction.substr(4, 1);
}

function run(registers, instructions) {
	for(let i = 0; i < instructions.length; i++) {
		const inst = getInstruction(instructions[i]);
		switch(inst) {
			case "hlf":
				registers[getRegister(instructions[i])] = Math.floor(registers[getRegister(instructions[i])] / 2);
				break;

			case "tpl":
				registers[getRegister(instructions[i])] *= 3;
				break;

			case "inc":
				registers[getRegister(instructions[i])]++;
				break;

			case "jmp":
				i += (Number(instructions[i].substr(4)) - 1);
				break;

			case "jie":
				if(registers[getRegister(instructions[i])] % 2 == 0) {
					i += (Number(instructions[i].substr(7)) - 1);
				}
				break;

			case "jio":
				if(registers[getRegister(instructions[i])] == 1) {
					i += (Number(instructions[i].substr(7)) - 1);
				}
				break;
		}
	}
}

const registers = { a: 0, b: 0 };
run(registers, instructions);
console.log(`[Part 1] Register b value: ${registers.b}`);

registers.a = 1;
registers.b = 0;
run(registers, instructions);
console.log(`[Part 2] Register b value: ${registers.b}`);
