"use strict";

module.exports = {
	initialValue: 0,
	on(value) {
		return (value + 1);
	},
	off(value) {
		return (value > 0 ? value - 1 : 0);
	},
	toggle(value) {
		return (value + 2);
	},
	sum(sum, value) {
		return sum + value;
	},
	print(sum) {
		console.log(`[Part 2] Total brightness is ${sum}`);
	}
};
