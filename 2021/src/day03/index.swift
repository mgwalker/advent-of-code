import Foundation

enum Day2 {
  static func input() -> [Substring] {
    do {
      return try String(contentsOfFile: "input.txt").split(separator: "\n")
    } catch { return [] }
  }

  static func part1() {
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

    print(Int(gamma, radix: 2)! * Int(epsilon, radix: 2)!)
  }

  static func part2() {}
}

Day2.part1()
Day2.part2()
