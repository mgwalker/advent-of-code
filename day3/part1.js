"use strict";
const directions = require("fs").readFileSync("./directions.txt", { encoding: "ascii" }).trim();

const housesVisited = { 0: { 0: true }};
let numberOfHouses = 1;
let currentLocation = { x: 0, y: 0 };

for(let direction of directions) {
	switch(direction) {
		case ">":
			currentLocation.x++;
			break;

		case "<":
			currentLocation.x--;
			break;

		case "v":
			currentLocation.y++;
			break;

		case "^":
			currentLocation.y--;
			break;
	}

	if(housesVisited[currentLocation.x]) {
		if(!housesVisited[currentLocation.x][currentLocation.y]) {
			housesVisited[currentLocation.x][currentLocation.y] = true;
			numberOfHouses++;
		}
	} else {
		let y = { };
		y[currentLocation.y] = true;
		housesVisited[currentLocation.x] = y;
		numberOfHouses++;
	}
}

console.log(numberOfHouses);
