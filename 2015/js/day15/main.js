"use strict";

let maxScore = -Infinity;
let maxCalScore = -Infinity;

for(let frosting = 1; frosting <= 99; frosting++) {
	for(let candy = 1; candy <= (98 - frosting); candy++) {
		for(let butterscotch = 1; butterscotch <= (99 - frosting - candy); butterscotch++) {
			const sugar = 100 - frosting - candy - butterscotch;

			const capacity = Math.max((4 * frosting) + (-1 * butterscotch), 0);
			const durability = Math.max((-2 * frosting) + (5 * candy), 0);
			const flavor = Math.max((-1 * candy) + (5 * butterscotch) + (-2 * sugar), 0);
			const texture = Math.max((2 * sugar), 0);
			const calories = (5 * frosting) + (8 * candy) + (6 * butterscotch) + (1 * sugar);

			const score = capacity * durability * flavor * texture;

			if(score > maxScore) {
				maxScore = score;
			}
			if(score > maxCalScore && calories == 500) {
				maxCalScore = score;
			}
		}
	}
}

console.log(`[Part 1] Best total score is ${maxScore}`);
console.log(`[Part 2] Best total score with exactly 500 calories is ${maxCalScore}`);
