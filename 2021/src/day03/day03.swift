import Foundation

enum Day3 {
  static func input() -> [Substring] {
    do {
      return try String(contentsOfFile: "input.txt").split(separator: "\n")
    } catch { return [] }
  }

  static func part1() -> Int {
    let data = input()
    var gamma = ""
    var epsilon = ""

    for i in 0 ... data[0].count - 1 {
      var one = 0
      var zro = 0

      for line in data {
        if line[line.index(line.startIndex, offsetBy: i)] == "1" {
          one += 1
        } else {
          zro += 1
        }
      }

      if one > zro {
        gamma += "1"
        epsilon += "0"
      } else {
        gamma += "0"
        epsilon += "1"
      }
    }

    return Int(gamma, radix: 2)! * Int(epsilon, radix: 2)!
  }

  static func part2() -> Int {
    let data = input()

    var o2 = data
    var co2 = data

    var i = 0
    while o2.count > 1 {
      let bits = o2.map { $0[$0.index($0.startIndex, offsetBy: i)] }

      var select: Character = "0"
      if bits.filter({ $0 == "1" }).count >= bits.filter({ $0 == "0" }).count {
        select = "1"
      }

      o2 = o2.filter { $0[$0.index($0.startIndex, offsetBy: i)] == select }
      i += 1
    }

    i = 0
    while co2.count > 1 {
      let bits = co2.map { $0[$0.index($0.startIndex, offsetBy: i)] }

      var select: Character = "0"
      if bits.filter({ $0 == "1" }).count < bits.filter({ $0 == "0" }).count {
        select = "1"
      }

      co2 = co2.filter { $0[$0.index($0.startIndex, offsetBy: i)] == select }
      i += 1
    }

    let o2v = Int(o2[0], radix: 2)!
    let co2v = Int(co2[0], radix: 2)!

    return o2v * co2v
  }
}
