import Foundation

struct Day7 {
  static func input() -> [Int] {
    do {
      return try String(contentsOfFile: "input.txt").split(separator: ",").map { Int($0, radix: 10)! }
    } catch {
      return []
    }
  }

  static func part1() {
    let crabs = input()
    let target = crabs.sorted()[crabs.count / 2]

    let fuel = crabs.reduce(0) { sum, crab in sum + abs(target - crab) }
    print("""
    PART 1
      \(fuel)
    """)
  }

  static func part2() {
    let crabs = input()

    let fuelCosts = (crabs.min()! ... crabs.max()!).map { crabspot in
      crabs.map { crab in
        let n = abs(crab - crabspot)
        return n * (n + 1) / 2
      }
      .reduce(0) { sum, fuel in sum + fuel }
    }

    print("""
    PART 2
      \(fuelCosts.min()!)
    """)
  }
}

Day7.part1()
Day7.part2()
