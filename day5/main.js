"use strict";
const words = require("fs").readFileSync("./input.txt", { encoding: "ascii" }).trim().split("\n");

const part1NiceChecks = [
	/.*[aeiou].*[aeiou].*[aeiou].*/,
	/([a-z])\1/
];
const part1NaughtyChecks = [
	/(ab|cd|pq|xy)/
];

const part2NiceChecks = [
	/([a-z]{2}).*\1/,
	/([a-z]).\1/
];

let part1Nice = 0, part2Nice = 0;
for(let word of words) {
	let isPart1Nice = true, isPart2Nice = true;

	for(let check of part1NiceChecks) {
		if(!check.test(word)) {
			isPart1Nice = false;
			break;
		}
	}

	if(isPart1Nice) {
		for(let check of part1NaughtyChecks) {
			if(check.test(word)) {
				isPart1Nice = false;
				break;
			}
		}
	}

	for(let check of part2NiceChecks) {
		if(!check.test(word)) {
			isPart2Nice = false;
			break;
		}
	}

	if(isPart1Nice) {
		part1Nice++;
	}
	if(isPart2Nice) {
		part2Nice++;
	}
}

console.log(`There are ${part1Nice} nice strings by the original rules`);
console.log(`There are ${part2Nice} nice strings by the modified rules`);
