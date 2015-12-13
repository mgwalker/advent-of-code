"use strict";

const input = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim().split("\n");
const happiness = { }
const people = [ ];

for(let line of input) {
	const bits = /(\S+) would (\S+) (\d+) happiness units by sitting next to (\S+)\./.exec(line);
	if(!happiness[bits[1]]) {
		happiness[bits[1]] = { };
		people.push(bits[1]);
	}
	happiness[bits[1]][bits[4]] = Number(bits[3]) * (bits[2] == "lose" ? -1 : 1);
}

const allArrangements = [ ];
function getAllArrangements(people, seating) {
	if(people.length) {
		for(let i = 0; i < people.length; i++) {
			let x = people.slice();
			const person = x.splice(i, 1);
			getAllArrangements(x, seating.concat(person))
		}
	} else {
		let seatingHappiness = 0;
		for(let i = 1; i < seating.length; i++) {
			seatingHappiness += happiness[seating[i - 1]][seating[i]];
			seatingHappiness += happiness[seating[i]][seating[i - 1]];
		}
		seatingHappiness += happiness[seating[seating.length - 1]][seating[0]];
		seatingHappiness += happiness[seating[0]][seating[seating.length - 1]];
		allArrangements.push({ happiness: seatingHappiness, seating: seating });
	}
}

getAllArrangements(people, [ ]);

let maximumHappiness = allArrangements.reduce((prev, curr) => {
	return (curr.happiness > prev ? curr.happiness : prev);
}, -Infinity);

console.log(`[Part 1]: Maximum happiness: ${maximumHappiness}`);

happiness.Me = { };
for(let person of people) {
	happiness[person].Me = 0;
	happiness.Me[person] = 0;
}
people.push("Me");

allArrangements.length = 0;
getAllArrangements(people, [ ]);

maximumHappiness = allArrangements.reduce((prev, curr) => {
	return (curr.happiness > prev ? curr.happiness : prev);
}, -Infinity);

console.log(`[Part 2]: Maximum happiness: ${maximumHappiness}`);
