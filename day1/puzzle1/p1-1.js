"use strict";
let directions = require("fs").readFileSync("./directions.txt", { encoding: "utf-8" });

let floor = 0;
for(let char of directions) {
	// Who knows what other characters might slip into the
	// directions file.  Like, surely atom wouldn't just
	// throw a newline at the end or anything...
	floor += (char === "(" ? 1 : char === ")" ? -1 : 0);
}

console.log(floor);
