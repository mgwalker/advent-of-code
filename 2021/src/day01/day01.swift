import Foundation

enum Day1 {
  static func parse(_ contents: String) -> [Int] {
    return contents.split(separator: "\n").map { Int($0) ?? -1 }
  }

  static func part1(input: String) -> Int {
    let data = parse(input)
    return data.indices
      .filter { $0 > 0 && data[$0] > data[$0 - 1] }
      .count
  }

  static func part2(input: String) -> Int {
    let data = parse(input)
    let windows = data.indices
      .filter { $0 < data.count - 2 }
      .map { data[$0] + data[$0 + 1] + data[$0 + 2] }

    return windows.indices
      .filter { $0 > 0 && windows[$0] > windows[$0 - 1] }
      .count
  }
}
