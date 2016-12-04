"use strict";

const lines = require("fs").readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n");
const reindeer = [ ];

for(let line of lines) {
	const deer = /([A-Za-z]+) can fly ([0-9]+) km\/s for ([0-9]+) seconds, but then must rest for ([0-9]+) seconds\./.exec(line);
	reindeer.push({
		name: deer[1],
		speed: Number(deer[2]),
		duration: Number(deer[3]),
		rest: Number(deer[4]),
		distance: 0,
		score: 0
	});
}

function reindeerDistanceAfterTime(reindeer, seconds) {
	const cycleTime = reindeer.duration + reindeer.rest;
	const totalCycles = Math.floor(seconds / (reindeer.duration + reindeer.rest));
	let extraTime = seconds - (cycleTime * totalCycles);
	extraTime = (extraTime > reindeer.duration ? reindeer.duration : extraTime);

	return ((totalCycles * reindeer.duration) + extraTime) * reindeer.speed;
}

for(let i = 1; i <= 2503; i++) {
	for(let deer of reindeer) {
		deer.distance = reindeerDistanceAfterTime(deer, i);
	}
	reindeer.sort((a, b) => a.distance < b.distance);

	let bestDistance = reindeer[0].distance;
	for(let deer of reindeer) {
		if(deer.distance == bestDistance) {
			deer.score++;
		}
	}
}

console.log(`[Part 1]: ${reindeer[0].name} wins at ${reindeer[0].distance} km`);

reindeer.sort((a, b) => a.score < b.score);

console.log(`[Part 2]: ${reindeer[0].name} wins with ${reindeer[0].score} points`);
