import Foundation

enum Day8 {
  static func parse(_ contents: String) -> [[Substring]] {
    return contents
      .split(separator: "\n").map { line in
        line.split(separator: "|")
      }
  }

  static func part1(_ input: String) -> Int {
    let data = parse(input).map {
      $0[1].trimmingCharacters(in: .whitespacesAndNewlines)
        .split(separator: " ")
        .filter { $0.count == 2 || $0.count == 4 || $0.count == 3 || $0.count == 7 }
        .count
    }

    return data.reduce(0) { sum, v in sum + v }
  }

  static func part2(_ input: String) -> Int {
    let data = parse(input)

    let lines = data.map { $0.joined().split(separator: " ") }
    for line in lines {
      var segments = [Int: Set<Character>]()
      for pattern in line {
        var segment = segments[pattern.count, default: []]
        pattern.forEach { segment.insert($0) }
        segments[pattern.count] = segment
      }

      let cf = segments[2]!
      let acf = segments[3]!
      let bcdf = segments[4]!
      let abcdefg = segments[7]!

      let a = acf.symmetricDifference(cf)
      let bd = bcdf.symmetricDifference(cf)
      let aeg = abcdefg.symmetricDifference(bcdf)
      let eg = aeg.symmetricDifference(a)

      let adg = segments[5]!.union(abcdefg)
      print(adg)
      break
    }
    return -1
  }
}

do {
  let input = try String(contentsOfFile: "input.txt")
  print(Day8.part2(input))
} catch {}
