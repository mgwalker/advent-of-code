"use strict";

const scores = [ ];
function tryTheThings(frosting, candy, butterscotch) {
	if(!frosting) {
		for(let frosting = 1; frosting <= 99; frosting++) {
			tryTheThings(frosting);
		}
	} else if(!candy) {
		for(let candy = 1; candy <= (98 - frosting); candy++) {
			tryTheThings(frosting, candy);
		}
	} else {
		for(let butterscotch = 1; butterscotch <= (99 - frosting - candy); butterscotch++) {
			let sugar = 100 - frosting - candy - butterscotch;
			const combo = {
				frosting, candy, butterscotch, sugar,
				score: {
					capacity: Math.max((4 * frosting) + (-1 * butterscotch), 0),
					durability: Math.max((-2 * frosting) + (5 * candy), 0),
					flavor: Math.max((-1 * candy) + (5 * butterscotch) + (-2 * sugar), 0),
					texture: Math.max((2 * sugar), 0),
					calories: (5 * frosting) + (8 * candy) + (6 * butterscotch) + (1 * sugar)
				}
			};
			combo.score.composite = combo.score.capacity * combo.score.durability * combo.score.flavor * combo.score.texture;
			scores.push(combo);
		}
	}
}

tryTheThings();

let maxRecipe = { score: { composite: -Infinity }};
for(let score of scores) {
	if(score.score.composite > maxRecipe.score.composite) {
		maxRecipe = score;
	}
}

console.log(`[Part 1] Best total score is ${maxRecipe.score.composite}`);

maxRecipe = { score: { composite: -Infinity }};
for(let score of scores) {
	if(score.score.composite > maxRecipe.score.composite && score.score.calories == 500) {
		maxRecipe = score;
	}
}

console.log(`[Part 2] Best total score with exactly 500 calories is ${maxRecipe.score.composite}`);
