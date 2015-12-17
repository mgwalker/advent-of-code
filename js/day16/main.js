"use strict";

const lines = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n");
const target = { children: 3, cats: 7, samoyeds: 2, pomeranians: 3, akitas: 0, vizslas: 0, goldfish: 5, trees: 3, cars: 2, perfumes: 1 };

// Have the Sues 1-index instead of 0.
const sues1 = [ -1 ];
const sues2 = [ -1 ];

for(let i = 0; i < lines.length; i++) {
	const regex = / ([a-z]+): ([0-9]+)/g;
	let score1 = 0, score2 = 0;

	let bits;
	while((bits = regex.exec(lines[i]))) {
		const name = bits[1];
		const value = Number(bits[2]);

		if(name == "cats" || name == "trees") {
			if(target[name] < value) {
				score2++;
			}
		} else if(name == "pomeranians" || name == "goldfish") {
			if(target[name] > value) {
				score2++;
			}
		} else if(target[name] == value) {
			score2++;
		}

		if(target[name] == value) {
			score1++;
		}
	}
	sues1.push(score1);
	sues2.push(score2);
}

console.log(`[Part 1] Sue #${sues1.reduce((p, c, i) => sues1[p] > c ? p : i, 0)}`);
console.log(`[Part 2] Sue #${sues2.reduce((p, c, i) => sues2[p] > c ? p : i, 0)}`);
