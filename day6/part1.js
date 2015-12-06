"use strict";

module.exports = {
	initialValue: false,
	on(value) {
		return true;
	},
	off(value) {
		return false;
	},
	toggle(value) {
		return !value;
	},
	sum(sum, value) {
		return (value ? sum + 1 : sum);
	},
	print(sum) {
		console.log(`[Part 1] ${sum} lights on`);
	}
};
