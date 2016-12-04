//
//  day1.swift
//  Advent of Code
//
//  Created by Greg Walker on 12/4/15.
//  Copyright © 2015 Greg Walker. All rights reserved.
//

import Foundation

class Day3 {
	static func run() {
		do {
			let directions = try String(contentsOfFile: "/Users/mgwalker/Documents/Source/advent-of-code/Swift/Advent of Code/Advent of Code/day3/input.txt");
			let numberOfSantas = 1;
			
			let locations = { };
			for(var i = 0; i < numberOfSantas; i++) {
				locations[String(i)] = { "0": { "0": true }};
			}
			
		} catch let e as NSError {
			print(e);
		}
	}
}