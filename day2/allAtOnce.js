"use strict";
const dimensions = require("fs").readFileSync("./dimensions.txt", { encoding: "ascii" }).trim().split("\n");

let totalArea = 0;
let totalLength = 0;

for(let dimension of dimensions) {
	let dims = dimension.split("x").map(x => Number(x)).sort((v1, v2) => v1 > v2);

	let pkgArea = 2 * (dims[0] * dims[1] + dims[0] * dims[2] + dims[1] * dims[2]);
	pkgArea += (dims[0] * dims[1]);

	totalLength += (2 * (dims[0] + dims[1])) + (dims[0] * dims[1] * dims[2]);
	totalArea += pkgArea;
}

console.log(`Packing paper area: ${totalArea}`);
console.log(`Ribbon length: ${totalLength}`);
