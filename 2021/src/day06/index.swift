import Foundation

struct Day06 {
  static func input() -> [Int] {
    do {
      return try String(contentsOfFile: "input.txt")
        .split(separator: ",")
        .map { Int($0, radix: 10)! }
    } catch {
      print("There was an error loading input")
      return []
    }
  }

  static func run(days: Int) -> Int {
    let data = input()
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

  static func part1() {
    print("""
    Part 1:
          \(run(days: 80))
    """)
  }

  static func part2() {
    print("""
    Part 2:
          \(run(days: 256))
    """)
  }
}

Day06.part1()
Day06.part2()
