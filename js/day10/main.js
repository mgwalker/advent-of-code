"use strict";

function lookAndSay(value) {
	let newString = "";
	let lastChar = String(value)[0];
	let count = 0;

	for(let c of String(value)) {
		if(c === lastChar) {
			count++;
		} else {
			newString += `${count}${lastChar}`;
			lastChar = c;
			count = 1;
		}
	}
	newString += `${count}${lastChar}`;
	return newString;
}

if(Number.isNaN(Number(process.argv[2]))) {
	console.log(`Usage: ${process.argv[1]} <initial string> [iterations=1]`);
} else {
	let iterations = 1;
	if(!Number.isNaN(Number(process.argv[3]))) {
		iterations = Number(process.argv[3]);
	}

	if(iterations > 0) {
		let output = process.argv[2];
		for(let i = 0; i < iterations; i++) {
			output = lookAndSay(output);
		}
		console.log(`[Part 1] Length: ${output.length}`);
	} else {
		console.log("-- Invalid number of iterations");
		console.log(`Usage: ${process.argv[1]} <initial string> [iterations=1]`);
	}
}
