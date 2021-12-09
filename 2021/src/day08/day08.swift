import Foundation

enum Day8 {
  static func parse(_ contents: String) -> [[Substring]] {
    return contents
      .split(separator: "\n").map { line in
        line.split(separator: "|")
      }
  }

  static func part1(input: String) -> Int {
    let data = parse(input).map {
      $0[1].trimmingCharacters(in: .whitespacesAndNewlines)
        .split(separator: " ")
        .filter { $0.count == 2 || $0.count == 4 || $0.count == 3 || $0.count == 7 }
        .count
    }

    return data.reduce(0) { sum, v in sum + v }
  }

  static func part2(input _: String) -> Int {
    return 0
  }
}
