import Foundation

struct Day1 {
  static func input() -> [Int] {
    do {
      let contents = try String(contentsOfFile: "input.txt")
      return contents.split(separator: "\n").map { Int($0) ?? -1 }
    } catch {
      print("oh noes")
      return []
    }
  }

  static func part1() {
    let data = input()
    let valid = data.indices
      .filter { $0 > 0 && data[$0] > data[$0 - 1] }
      .count
    print(valid)
  }

  static func part2() {
    let data = input()
    let windows = data.indices
      .filter { $0 < data.count - 2 }
      .map { data[$0] + data[$0 + 1] + data[$0 + 2] }

    let valid = windows.indices
      .filter { $0 > 0 && windows[$0] > windows[$0 - 1] }
      .count

    print(valid)
  }
}

Day1.part1()
Day1.part2()
