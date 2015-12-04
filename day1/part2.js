"use strict";
let directions = require("fs").readFileSync("./directions.txt", { encoding: "utf-8" });

let floor = 0;
let i = 0;
for(; i < directions.length; i++) {
	// Who knows what other characters might slip into the
	// directions file.  Like, surely atom wouldn't just
	// throw a newline at the end or anything...
	floor += (directions[i] === "(" ? 1 : directions[i] === ")" ? -1 : 0);
	if(floor < 0) {
		i++;
		break;
	}
}

console.log(i);
