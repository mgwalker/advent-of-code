"use strict";
const fs = require("fs");
const pkgs = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n").map(v => Number(v)).sort((a, b) => a - b);

const totalWeight = pkgs.reduce((p, v) => p + v, 0);
const weightPerGroup1 = totalWeight / 3;
const weightPerGroup2 = totalWeight / 4;

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

let allCombos = [ ];
function getNumbersThatSumTo(sum, group, prev) {
	prev = clone(prev);

	if(sum == 0) {
		allCombos.push(prev);
		process.stderr.write(`\r${allCombos.length} (${prev.reduce((p, v) => p + v, 0)})`);
		return;
	}

	let groups = [ ];
	for(let number of group) {
		if(number <= sum) {
			let newPrev = clone(prev);
			newPrev.push(number);

			getNumbersThatSumTo(sum - number, group.filter(v => (v <= sum - number && v < number)), newPrev);
		}
	}
}

function hasOverlap(arr1, arr2) {
	for(let value of arr1) {
		if(arr2.indexOf(value) >= 0) {
			return true;
		}
	}
	return false;
}

function runPart1() {
	allCombos = [ ];
	if(fs.existsSync("part1-sums.json")) {
		allCombos = require("./part1-sums.json");
	} else {
		getNumbersThatSumTo(weightPerGroup1, pkgs, [ ]);
		fs.writeFileSync("part1-sums.json", JSON.stringify(allCombos));
	}

	allCombos.sort((a, b) => a.reduce((p, v) => p * v, 1) - b.reduce((p, v) => p * v, 1));
	allCombos.sort((a, b) => a.length - b.length);

	for(let i = 0; i < allCombos.length; i++) {
		for(let j = i + 1; j < allCombos.length; j++) {
			if(allCombos[j].length > (pkgs.length - allCombos[i].length) || (allCombos[i].length + allCombos[j].length) == pkgs.length) {
				continue;
			}
			if(!hasOverlap(allCombos[i], allCombos[j])) {
				for(let k = j + 1; k < allCombos.length; k++) {
					if(allCombos[k].length > (pkgs.length - allCombos[i].length - allCombos[j].length)) {
						continue;
					}
					if(!hasOverlap(allCombos[j], allCombos[k]) && !hasOverlap(allCombos[i], allCombos[k])) {
						if(allCombos[i].length + allCombos[j].length + allCombos[k].length == pkgs.length) {
							console.log("[Part 1]");
							console.log(`[${allCombos[i].reduce((p, v) => p * v, 1)}]  ${allCombos[i]}`);
							console.log(`[${allCombos[j].reduce((p, v) => p * v, 1)}]  ${allCombos[j]}`);
							console.log(`[${allCombos[k].reduce((p, v) => p * v, 1)}]  ${allCombos[k]}`);
							return;
						}
					}
				}
			}
		}
	}
}

function runPart2() {
	allCombos = [ ];
	if(fs.existsSync("part2-sums.json")) {
		allCombos = require("./part2-sums.json");
	} else {
		getNumbersThatSumTo(weightPerGroup2, pkgs, [ ]);
		fs.writeFileSync("part2-sums.json", JSON.stringify(allCombos));
	}

	allCombos.sort((a, b) => a.reduce((p, v) => p * v, 1) - b.reduce((p, v) => p * v, 1));
	//allCombos.sort((a, b) => a.length - b.length);

	for(let i = 0; i < allCombos.length; i++) {
		for(let j = i + 1; j < allCombos.length; j++) {
			if(allCombos[j].length > (pkgs.length - allCombos[i].length) || (allCombos[i].length + allCombos[j].length) == pkgs.length) {
				continue;
			}
			if(!hasOverlap(allCombos[i], allCombos[j])) {
				for(let k = j + 1; k < allCombos.length; k++) {
					if(allCombos[k].length > (pkgs.length - allCombos[i].length - allCombos[j].length)) {
						continue;
					}
					if(!hasOverlap(allCombos[j], allCombos[k]) && !hasOverlap(allCombos[i], allCombos[k])) {
						for(let l = k + 1; l < allCombos.length; l++) {
							if((allCombos[i].length + allCombos[j].length + allCombos[k].length + allCombos[l].length) != pkgs.length) {
								continue;
							}
							if(!hasOverlap(allCombos[k], allCombos[l]) && !hasOverlap(allCombos[j], allCombos[l]) && !hasOverlap(allCombos[i], allCombos[l])) {
									console.log("[Part 2]");
									console.log(`[${allCombos[i].reduce((p, v) => p * v, 1)}]  ${allCombos[i]}`);
									console.log(`[${allCombos[j].reduce((p, v) => p * v, 1)}]  ${allCombos[j]}`);
									console.log(`[${allCombos[k].reduce((p, v) => p * v, 1)}]  ${allCombos[k]}`);
									console.log(`[${allCombos[l].reduce((p, v) => p * v, 1)}]  ${allCombos[l]}`);
									return;
							}
						}
					}
				}
			}
		}
	}
}

//runPart1();
runPart2();
