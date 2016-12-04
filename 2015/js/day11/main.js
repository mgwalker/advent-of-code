"use strict";

function incrementString(str) {
	let c = str[str.length - 1];
	if(c < "z") {
		c = String.fromCharCode(c.charCodeAt(0) + 1);
		str = str.substr(0, str.length - 1) + c;
	} else {
		str = incrementString(str.substr(0, str.length - 1)) + "a";
	}
	return str;
}

const getStraightRegex = (function(){
	let regexStr = "";
	for(let c = "a".charCodeAt(0); c <= "x".charCodeAt(0); c++) {
		if(regexStr.length) {
			regexStr += "|";
		}
		regexStr += `${String.fromCharCode(c)}${String.fromCharCode(c + 1)}${String.fromCharCode(c + 2)}`
	}
	regexStr = `.*(${regexStr}).*`;
	const regex = new RegExp(regexStr);

	return () => regex;
})();

function passwordIsOkay(password) {
	// Test 1
	if(!getStraightRegex().test(password)) {
		return false;
	}

	// Test 2
	if(/[iol]+/g.test(password)) {
		return false;
	}

	// Test 3
	let m1;
	if(m1 = /.*(.)\1.*/g.exec(password)) {
		let repeated = m1[1];
		if(!(new RegExp(`.*([^${repeated}])\\1.*`, "g")).test(password)) {
			return false;
		}
	} else {
		return false;
	}
	return true;
}

if(!process.argv[2]) {
	console.log(`Usage: ${process.argv[1]} <input password>`);
}

let password = incrementString(process.argv[2]);
while(!passwordIsOkay(password)) {
	password = incrementString(password);
}

console.log(`[Part 1] Next password: ${password}`);

password = incrementString(password);
while(!passwordIsOkay(password)) {
	password = incrementString(password);
}

console.log(`[Part 2] Next password: ${password}`);
