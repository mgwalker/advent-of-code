"use strict";

const player = {
	hp: 50,
	mana: 500,
	armor: 0,
	effects: [ ]
};

const boss = {
	hp: 71,
	damage: 10
};

const spells = [
	{ name: "Magic Missiles", cost: 53, damage: 4, heal: 0, effect: { name: "None1", time: 0, armor: 0, damage: 0, mana: 0 }},
	{ name: "Drain", cost: 73, damage: 2, heal: 2, effect: { name: "None2", time: 0, armor: 0, damage: 0, mana: 0 }},
	{ name: "Shield", cost: 113, damage: 0, heal: 0, effect: { name: "Shield", time: 6, armor: 7, damage: 0, mana: 0 }},
	{ name: "Poison", cost: 173, damage: 0, heal: 0, effect: { name: "Poison", time: 6, armor: 0, damage: 3, mana: 0 }},
	{ name: "Recharge", cost: 229, damage: 0, heal: 0, effect: { name: "Recharge", time: 5, armor: 0, damage: 0, mana: 101 }},
];

let winModes = [ ];

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function pickSpell(player) {
	let possibleSpells = spells.filter(v => player.effects.every(pe => pe.name != v.name));
	return possibleSpells[Math.round(Math.random() * (possibleSpells.length - 1))];
}

function applyEffects(player, boss, spaces, print) {
	player.armor = 0;

	player.effects = player.effects.filter(v => {
			v.time--;
		if(v.armor) {
			player.armor += v.armor;
			if(print) {
				console.log(`${spaces} : ${v.name} adds ${v.armor} armor; timer is now ${v.time}`);
			}
		}
		if(v.mana) {
			player.mana += v.mana;
			if(print) {
				console.log(`${spaces} : ${v.name} adds ${v.mana} mana; timer is now ${v.time}`);
			}
		}
		if(v.damage) {
			boss.hp -= v.damage;
			if(print) {
				console.log(`${spaces} : ${v.name} deals ${v.damage} damage; timer is now ${v.time}`);
			}
		}
		return (v.time > 0);
	});
}

function header(player, boss, spaces, print, turn) {
	if(print) {
		console.log(`${spaces}--- ${turn} Turn ---`);
		console.log(`${spaces}Player has ${player.hp} HP, ${player.mana} MP, ${player.armor} armor`);
		console.log(`${spaces}Boss has ${boss.hp} HP`);
	}
}

function playerTurn(player, boss, spell, hardMode, spaces, print) {
	header(player, boss, spaces, print, "Player");
	if(hardMode) {
		player.hp--;
		if(player.hp <= 0) {
			return 0;
		}
	}
	applyEffects(player, boss, spaces, print);

	if(boss.hp <= 0) {
		return 0;
	}

	if(print) {
		console.log(`${spaces} -> Player casts ${spell.name}`);
	}

	if(spell.damage && print) {
		console.log(`${spaces}  :: ${spell.name} hits for ${spell.damage} damage`);
	}
	boss.hp -= spell.damage;

	if(spell.heal && print) {
		console.log(`${spaces}  :: Player gains ${spell.heal} from ${spell.name}`);
	}
	player.hp += spell.heal;
	player.mana -= spell.cost;

	player.effects.push(spell.effect);
	return spell.cost;
}

function bossTurn(player, boss, spaces, print) {
	header(player, boss, spaces, print, "Boss");
	applyEffects(player, boss, spaces, print);

	if(boss.hp <= 0) {
		return;
	}

	const bossDamage = boss.damage - player.armor;
	if(print) {
		console.log(`${spaces} -> Boss hits for ${bossDamage} damage`);
	}
	player.hp -= bossDamage;
}

let runs = 0;
function run(player, boss, spell, hardMode, manaSpent, spaces, print) {
	player = clone(player);
	boss = clone(boss);
	spell = clone(spell);

	manaSpent += playerTurn(player, boss, spell, hardMode, spaces, print);
	if(player.hp <= 0) {
		if(print) {
			console.log(`${spaces} ¡¡¡ PLAYER LOSES ¡¡¡`);
		}
		runs++;
		return;
	}
	if(boss.hp <= 0) {
		if(print) {
			console.log(`${spaces} !!! PLAYER WINS !!!`);
		}
		winModes.push(manaSpent);
		runs++;
		return;
	}

	bossTurn(player, boss, spaces, print);
	if(boss.hp <= 0) {
		if(print) {
			console.log(`${spaces} !!! PLAYER WINS !!!`);
		}
		winModes.push(manaSpent);
		runs++;
		return;
	} else if(player.hp > 0) {
		for(let newSpell of spells) {
			if(player.mana >= newSpell.cost && player.effects.every(v => (v.name != newSpell.effect.name) || (v.time <= 1))) {
				run(player, boss, newSpell, hardMode, manaSpent, `${spaces}    `, print);
			}
		}
	} else {
		if(print) {
			console.log(`${spaces} ¡¡¡ PLAYER LOSES ¡¡¡`);
		}
		runs++;
		return;
	}
}

console.time("part1");
for(let spell of spells) {
	run(player, boss, spell, false, 0, "", false);
}

winModes.sort((a, b) => a - b);
console.log(`In ${runs} battles, found ${winModes.length} wins`);
console.log(`[Part 1] Least mana to win: ${winModes[0]}`);
console.timeEnd("part1");

runs = 0;
winModes.length = 0;

console.time("part2");
for(let spell of spells) {
	run(player, boss, spell, true, 0, "", false);
}

winModes.sort((a, b) => a - b);
console.log();
console.log(`In ${runs} battles, found ${winModes.length} wins`);
console.log(`[Part 2] Least mana to win: ${winModes[0]}`);
console.timeEnd("part2");
