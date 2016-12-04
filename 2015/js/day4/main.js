"use strict";

const crypto = require("crypto");
const prefix = "yzbqklnj";

let startsWith = process.argv[2];
if(!startsWith) {
	startsWith = "00000";
}

let num = 1;
do {
	const hash = crypto.createHash("md5");
	hash.update(prefix + num);
	if(hash.digest("hex").startsWith(startsWith)) {
		console.log(`First int that produces a hash starting with ${startsWith}: ${num}`);
		break;
	};
	num++;
} while(true);
