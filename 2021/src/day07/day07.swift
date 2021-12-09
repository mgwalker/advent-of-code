import Foundation

struct Day7 {
  static func parse(_ contents: String) -> [Int] {
    return contents.split(separator: ",").map { Int($0, radix: 10)! }
  }

  static func part1(input: String) -> Int {
    let crabs = parse(input)
    let target = crabs.sorted()[crabs.count / 2]

    let fuel = crabs.reduce(0) { sum, crab in sum + abs(target - crab) }
    return fuel
  }

  static func part2(input: String) -> Int {
    let crabs = parse(input)

    let fuelCosts = (crabs.min()! ... crabs.max()!).map { crabspot in
      crabs.map { crab in
        let n = abs(crab - crabspot)
        return n * (n + 1) / 2
      }
      .reduce(0) { sum, fuel in sum + fuel }
    }

    return fuelCosts.min()!
  }
}
