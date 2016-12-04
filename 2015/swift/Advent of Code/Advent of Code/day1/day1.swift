//
//  day1.swift
//  Advent of Code
//
//  Created by Greg Walker on 12/4/15.
//  Copyright © 2015 Greg Walker. All rights reserved.
//

import Foundation

class Day1 {
	static func run() {
		do {
			let directions = try String(contentsOfFile: "/Users/mgwalker/Documents/Source/advent-of-code/Swift/Advent of Code/Advent of Code/day1/input.txt");
			
			var floor = 0, step = 1, hasGoneUnderground = false;
			for direction in directions.characters {
				floor += (direction == "(" ? 1 : -1);
				if floor < 0 && !hasGoneUnderground {
					hasGoneUnderground = true;
					print("Went underground on step \(step)");
				}
				step++;
			}
			print("Final floor: \(floor)");
		} catch let e as NSError {
			print(e);
		}
	}
}