"use strict";
const targetRow = 2947, targetCol = 3029;

let targetValue = 0;
for(let i = 1; i <= targetCol; i++) {
	targetValue += i;
}
for(let i = 1; i< targetRow; i++) {
	targetValue += (targetCol + i - 1);
}

let number = 20151125;
for(let i = 1; i < targetValue; i ++) {
	number *= 252533;
	number = number % 33554393;
}

console.log(`[Part 1] Hey, your code is ${number}`);
