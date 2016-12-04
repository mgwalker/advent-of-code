"use strict";

const boss = {
	hp: 103,
	damage: 9,
	armor: 2
};

const hp = 100;

const weapons = [
	{ name: "Dagger", cost: 8, damage: 4, armor: 0 },
	{ name: "Shortsword", cost: 10, damage: 5, armor: 0 },
	{ name: "Warhammer", cost: 25, damage: 6, armor: 0 },
	{ name: "Longsword", cost: 40, damage: 7, armor: 0 },
	{ name: "Greataxe", cost: 74, damage: 8, armor: 0 }
];

const armors = [
	{ name: "", cost: 0, damage: 0, armor: 0 },
	{ name: "Leather", cost: 13, damage: 0, armor: 1 },
	{ name: "Chainmail", cost: 31, damage: 0, armor: 2 },
	{ name: "Splintmail", cost: 53, damage: 0, armor: 3 },
	{ name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
	{ name: "Platemail", cost: 102, damage: 0, armor: 5 }
];

const rings = [
	{ name: "", cost: 0, damage: 0, armor: 0 },
	{ name: "", cost: 0, damage: 0, armor: 0 },
	{ name: "Defense +1", cost: 20, damage: 0, armor: 1 },
	{ name: "Damage +1", cost: 25, damage: 1, armor: 0 },
	{ name: "Defense +2", cost: 40, damage: 0, armor: 2 },
	{ name: "Damage +2", cost: 50, damage: 2, armor: 0 },
	{ name: "Defense +3", cost: 80, damage: 0, armor: 3 },
	{ name: "Damage +3", cost: 100, damage: 3, armor: 0 }
];

function canWin(inventory, printRounds) {
	const playerDamage = Math.max(1, inventory.reduce((p, v) => p + v.damage, 0) - boss.armor);
	const bossDamage = Math.max(1, boss.damage - inventory.reduce((p, v) => p + v.armor, 0));
	if(playerDamage >= bossDamage) {
		let playerHP = hp, bossHP = boss.hp;
		while(playerHP > 0 && bossHP > 0) {
			bossHP -= playerDamage;

			if(bossHP > 0) {
				playerHP -= bossDamage;
			}
		}
		return (playerHP > 0);
	}
	return false;
}

let inventory = [ ];
const winModes = [ ];
const loseModes = [ ];
let tries = 0;

for(let weapon of weapons) {
	for(let armor of armors) {
		for(let ring1 of rings) {
			for(let ring2 of rings) {
				if(ring2 == ring1) {
					continue;
				}
				inventory = [ weapon, armor, ring1, ring2 ];
				tries++;
				if(canWin(inventory)) {
					winModes.push({ cost: inventory.reduce((p, v) => p + v.cost, 0), inventory: inventory });
				} else {
					loseModes.push({ cost: inventory.reduce((p, v) => p + v.cost, 0), inventory: inventory });
				}
			}
		}
	}
}

winModes.sort((a, b) => a.cost - b.cost);
loseModes.sort((a, b) => b.cost - a.cost);

console.log(`[Part 1] Minimum cost to win: ${winModes[0].cost}`);
console.log(`[Part 2] Maximum cost to lose: ${loseModes[0].cost}`);
