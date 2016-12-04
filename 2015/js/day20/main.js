"use strict";

const factors1 = [ ], factors2 = [ ], visitsByElf = [ ];
let houseNumber = 0	;
let stop = 0;
let finalHouse1 = 0, finalHouse2 = 0;

function doElfVisit(elfNumber) {
	if(!visitsByElf[elfNumber]) {
		visitsByElf[elfNumber] = 1;
		return true;
	}

	visitsByElf[elfNumber]++;
	return visitsByElf[elfNumber] <= 50;
}

do {
	houseNumber++;
	factors1.length = 0;
	factors2.length = 0;

	stop = Math.floor(Math.sqrt(houseNumber));

	for(let i = 1; i <= stop; i++) {
		if(houseNumber % i == 0) {
			factors1.push(i);
			if(doElfVisit(i)) {
				factors2.push(i);
			}

			if(houseNumber != i * i) {
				factors1.push(houseNumber / i );
				if(doElfVisit([houseNumber / i])) {
					factors2.push(houseNumber / i );
				}
			}
		}
	}

	const presents1 = factors1.reduce((p, v) => p + v, 0) * 10;
	const presents2 = factors2.reduce((p, v) => p + v, 0) * 11;

	if(houseNumber % 10000 == 0) {
		console.log(`${houseNumber}: ${presents1} | ${presents2}`);
	}

	if(presents1 >= 29000000 && !finalHouse1) {
		finalHouse1 = houseNumber;
	}
	if(presents2 >= 29000000 && !finalHouse2) {
		finalHouse2 = houseNumber;
	}

	if(finalHouse1 && finalHouse2) {
		break;
	}
} while(true);

console.log(`[Part 1] Lowest house number with 29000000 gifts is: ${finalHouse1}`);
console.log(`[Part 2] Lowest house number with 29000000 gifts is: ${finalHouse2}`);
