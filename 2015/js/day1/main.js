"use strict";
let directions = require("fs").readFileSync("./directions.txt", { encoding: "utf-8" }).trim();

let floor = 0, step = 1, wentDown = false;
for(let char of directions) {
	floor += (char === "(" ? 1 : -1);
	if(floor < 0 && !wentDown) {
		wentDown = true;
		console.log(`Went below ground at step ${step}`);
	}
	step++;
}

console.log(`Final floor is ${floor}`);
