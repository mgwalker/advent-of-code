//
//  day1.swift
//  Advent of Code
//
//  Created by Greg Walker on 12/4/15.
//  Copyright © 2015 Greg Walker. All rights reserved.
//

import Foundation

class Day2 {
	static func run() {
		do {
			let boxDimensions = try String(contentsOfFile: "/Users/mgwalker/Documents/Source/advent-of-code/Swift/Advent of Code/Advent of Code/day2/input.txt").stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet()).componentsSeparatedByString("\n");
			
			var totalWrapArea = 0;
			var totalRibbonLength = 0;
			
			for dimensions in boxDimensions {
				let dimStrings = dimensions.componentsSeparatedByString("x");
				var dims = [ Int(dimStrings[0]), Int(dimStrings[1]), Int(dimStrings[2]) ].sort(<);
				
				let area = 2 * ((dims[0]! * dims[1]!) + (dims[0]! * dims[2]!) + (dims[1]! * dims[2]!));
				totalWrapArea += area + (dims[0]! * dims[1]!);
				
				totalRibbonLength += (2 * (dims[0]! + dims[1]!)) + (dims[0]! * dims[1]! * dims[2]!);
			}
			
			print("Total wrapping area: \(totalWrapArea)");
			print("Total ribbon length: \(totalRibbonLength)");
		} catch _ {
			
		}
	}
}