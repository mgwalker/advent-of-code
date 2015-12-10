"use strict";

const input = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim().split("\n");
const distances = { };
const cities = [ ];

for(let line of input) {
	const bits = /(\S+) to (\S+) = (\d+)/.exec(line);
	if(!distances[bits[1]]) {
		distances[bits[1]] = { };
		cities.push(bits[1]);
	}
	if(!distances[bits[2]]) {
		distances[bits[2]] = { };
		cities.push(bits[2]);
	}

	distances[bits[1]][bits[2]] = Number(bits[3]);
	distances[bits[2]][bits[1]] = Number(bits[3]);
}

const allPaths = [ ];
function allPathsBetweenCities(cities, path) {
	if(cities.length) {
		for(let i = 0; i < cities.length; i++) {
			let x = cities.slice();
			const city = x.splice(i, 1);
			allPathsBetweenCities(x, path.concat(city))
		}
	} else {
		let distance = 0;
		for(let i = 1; i < path.length; i++) {
			distance += distances[path[i - 1]][path[i]]
		}
		allPaths.push({ distance: distance, path: path });
	}
}

allPathsBetweenCities(cities, [ ]);

let minimumDistance = allPaths.reduce((prev, curr) => {
	return (curr.distance < prev ? curr.distance : prev);
}, Infinity);

let maximumDistance = allPaths.reduce((prev, curr) => {
	return (curr.distance > prev ? curr.distance : prev);
}, -Infinity);

console.log(`[Part 1] Minimum distance: ${minimumDistance}`);
console.log(`[Part 2] Maximum distance: ${maximumDistance}`);
