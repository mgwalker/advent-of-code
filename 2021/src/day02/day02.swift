import Foundation

enum Day2 {
  static func input() -> [[Substring]] {
    do {
      let contents = try String(contentsOfFile: "input.txt")
      let v = contents.split(separator: "\n").map { $0.split(separator: " ") }
      return v
    } catch {
      print("oh noes")
      return []
    }
  }

  static func part1() -> Int {
    let data = input()
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

  static func part2() -> Int {
    let data = input()
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
