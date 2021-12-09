import Foundation

enum Day2 {
  static func parse(_ contents: String) -> [[Substring]] {
    return contents.split(separator: "\n").map { $0.split(separator: " ") }
  }

  static func part1(input: String) -> Int {
    let data = parse(input)
    var horizontal = 0, depth = 0

    data.forEach { value in
      let dir = value[0]
      let amount = Int(value[1]) ?? -1

      switch dir {
      case "forward":
        horizontal += amount
      case "down":
        depth += amount
      case "up":
        depth -= amount
      default:
        break
      }
    }

    return horizontal * depth
  }

  static func part2(input: String) -> Int {
    let data = parse(input)
    var aim = 0, horizontal = 0, depth = 0

    data.forEach { value in
      let dir = value[0]
      let amount = Int(value[1]) ?? -1

      switch dir {
      case "forward":
        horizontal += amount
        depth += amount * aim
      case "down":
        aim += amount
      case "up":
        aim -= amount
      default:
        break
      }
    }

    return horizontal * depth
  }
}
