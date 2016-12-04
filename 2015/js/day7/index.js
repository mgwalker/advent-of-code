"use strict";

const instructions = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n");

let wires = { };
function getWiring() {
	wires = { };
	for(let instruction of instructions) {
		let match = /(.*) -> ([a-z]+)/.exec(instruction);

		const name = match[2];
		const wire = { name: name };

		if(/^[0-9]+$/.test(match[1])) {
			wire.value = Number(match[1]);
		} else if(/^[a-z]+$/.test(match[1])) {
			wire.operation = "SET";
			wire.rightOperand = match[1];
		} else {
			match = /(([a-z0-9]+) )*([A-Z]+) ([a-z0-9]+)/.exec(match[1]);
			wire.operation = match[3];
			wire.rightOperand = Number.isNaN(Number(match[4])) ? match[4] : Number(match[4]);
			wire.leftOperand = Number.isNaN(Number(match[2])) ? match[2] : Number(match[2]);
		}
		wires[name] = wire;
	}
}

const functions = {
	AND(wire) {
		wire.value = resolve(wire.leftOperand) & resolve(wire.rightOperand);
	},
	OR(wire) {
		wire.value = resolve(wire.leftOperand) | resolve(wire.rightOperand);
	},
	LSHIFT(wire) {
		wire.value = resolve(wire.leftOperand) << resolve(wire.rightOperand);
	},
	RSHIFT(wire) {
		wire.value = resolve(wire.leftOperand) >> resolve(wire.rightOperand);
	},
	NOT(wire) {
		wire.value = ~ resolve(wire.rightOperand);
	},
	SET(wire) {
		wire.value = resolve(wire.rightOperand);
	}
};

function resolve(wireName) {
	if(Number.isNaN(Number(wireName))) {
		const wire = wires[wireName];
		if(Number.isNaN(Number(wire.value))) {
			functions[wire.operation](wire);
		}
		return wire.value;
	} else {
		return wireName;
	}
};

getWiring();
for(let wireName in wires) {
	resolve(wireName);
}

const originalAValue = wires.a.value;
console.log(`Part 1: a = ${wires.a.value}`);

getWiring();
wires.b.value = originalAValue;

for(let wireName in wires) {
	resolve(wireName);
}

console.log(`Part 2: a = ${wires.a.value}`);
