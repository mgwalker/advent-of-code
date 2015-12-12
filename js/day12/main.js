"use strict";

const input = require("./input.json");
//const input = {"a":{"b":4},"c":-1};

function getSum(value, ignoreRed) {
	let sum = 0;
	if(Array.isArray(value)) {
		for(let v of value) {
			sum += getSum(v, ignoreRed);
		}
	} else if(typeof(value) === "object") {
		const valuesToSum = [ ];
		for(let prop in value) {
			if(value[prop] == "red" && ignoreRed) {
				valuesToSum.length = 0;
				break;
			}
			valuesToSum.push(value[prop]);
		}
		sum += getSum(valuesToSum, ignoreRed);
	} else if(!Number.isNaN(Number(value))) {
		sum += +value;
	}
	return sum;
}

let sum1 = 0, sum2 = 0;
if(Array.isArray(input)) {
	for(let value of input) {
		sum1 += getSum(value, false);
		sum2 += getSum(value, true);
	}
} else {
	for(let property in input) {
		sum1 += getSum(input[property], false);
		sum2 += getSum(input[property], true);
	}
}

console.log(`[Part 1]: Sum = ${sum1}`);
console.log(`[Part 2]: Sum = ${sum2}`);
