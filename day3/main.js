"use strict";
const directions = require("fs").readFileSync("./directions.txt", { encoding: "ascii" }).trim();

let numberOfSantas = Number(process.argv[2]);
if(Number.isNaN(numberOfSantas)) {
	numberOfSantas = 1;
}

const housesVisited = { 0: { 0: true }};
let numberOfHouses = 1;
let currentLocation = { };
for(let i = 0; i < numberOfSantas; i++) {
	currentLocation[i] = { x: 0, y: 0 };
}

for(let i = 0; i < directions.length; i++) {
	const location = currentLocation[i % numberOfSantas];
	const direction = directions[i];
	switch(direction) {
		case ">":
			location.x++;
			break;

		case "<":
			location.x--;
			break;

		case "v":
			location.y++;
			break;

		case "^":
			location.y--;
			break;
	}

	if(housesVisited[location.x]) {
		if(!housesVisited[location.x][location.y]) {
			housesVisited[location.x][location.y] = true;
			numberOfHouses++;
		}
	} else {
		housesVisited[location.x] = { [location.y]: true };
		numberOfHouses++;
	}
}

console.log(`Total houses visted by ${numberOfSantas} Santas: ${numberOfHouses}`);
