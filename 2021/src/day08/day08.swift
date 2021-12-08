import Foundation

enum Day8 {
  static func input() -> [[Substring]] {
    do {
      return try String(contentsOfFile: "input.txt")
        .split(separator: "\n").map { line in
          line.split(separator: "|")
        }
    } catch {
      return []
    }
  }

  static func part1() -> Int {
    let data = input().map {
      $0[1].trimmingCharacters(in: .whitespacesAndNewlines)
        .split(separator: " ")
        .filter { $0.count == 2 || $0.count == 4 || $0.count == 3 || $0.count == 7 }
        .count
    }

    return data.reduce(0) { sum, v in sum + v }
  }

  static func part2() -> Int {
    return 0
  }
}
