"use strict";

const crypto = require("crypto");
const input = "yzbqklnj";

let startsWith = process.argv[2];
if(!startsWith) {
	startsWith = "00000";
}

let collissions = 0;
let num = 1;
do {
	const hash = crypto.createHash("md5");
	hash.update(input + num);
	if(hash.digest("hex").startsWith(startsWith)) {
		console.log(num);
		collissions++;
	};
	num++;
} while(collissions < 1);
