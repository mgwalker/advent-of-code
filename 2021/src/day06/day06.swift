import Foundation

struct Day6 {
  static func parse(_ contents: String) -> [Int] {
    return contents
      .split(separator: ",")
      .map { Int($0, radix: 10)! }
  }

  static func run(days: Int, input: String) -> Int {
    let data = parse(input)
    var fishies = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for fish in data {
      fishies[fish] += 1
    }

    for _ in 0 ..< days {
      let fish = fishies.removeFirst()
      fishies[6] += fish
      fishies.append(fish)
    }

    return fishies.reduce(0) { sum, fish in sum + fish }
  }

  static func part1(input: String) -> Int {
    return run(days: 80, input: input)
  }

  static func part2(input: String) -> Int {
    return run(days: 256, input: input)
  }
}
