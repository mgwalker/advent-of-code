import Foundation

func help() {
  print("""
  Usage: \(CommandLine.arguments[0]) <day number>
  """)
}

public extension String {
  func leftpad(length: Int, character: Character = " ") -> String {
    var out = self
    var extra = length - out.count

    while extra > 0 {
      out.insert(character, at: out.startIndex)
      extra -= 1
    }

    return out
  }
}

func time(part1: (String) -> Int, part2: (String) -> Int, day: Int) {
  let fm = FileManager()
  let path = fm.currentDirectoryPath
  fm.changeCurrentDirectoryPath("src/day\("\(day)".leftpad(length: 2, character: "0"))")

  print("DAY \(day)")
  let blue = "\u{001b}[34m"
  let green = "\u{001b}[0;92m"
  let reset = "\u{001b}[0m"

  do {
    let input = try String(contentsOfFile: "input.txt")

    let t1 = DispatchTime.now()
    let p1 = part1(input)
    let d1 = Double(DispatchTime.now().uptimeNanoseconds - t1.uptimeNanoseconds) / 1_000_000.0
    print("  Part 1: \(green)\(p1) \(blue)\(d1) ms\(reset)")

    let t2 = DispatchTime.now()
    let p2 = part2(input)
    let d2 = Double(DispatchTime.now().uptimeNanoseconds - t2.uptimeNanoseconds) / 1_000_000.0
    print("  Part 2: \(green)\(p2) \(blue)\(d2) ms\(reset)")
  } catch {
    print("  There was an error reading the input file")
  }

  fm.changeCurrentDirectoryPath(path)
}

let days = [
  1: { time(part1: Day1.part1, part2: Day1.part2, day: 1) },
  2: { time(part1: Day2.part1, part2: Day2.part2, day: 2) },
  3: { time(part1: Day3.part1, part2: Day3.part2, day: 3) },
  4: { time(part1: Day4.part1, part2: Day4.part2, day: 4) },
  5: { time(part1: Day5.part1, part2: Day5.part2, day: 5) },
  6: { time(part1: Day6.part1, part2: Day6.part2, day: 6) },
  7: { time(part1: Day7.part1, part2: Day7.part2, day: 7) },
  8: { time(part1: Day8.part1, part2: Day8.part2, day: 8) },
]

if CommandLine.arguments.count < 2 {
  let keys = days.keys.sorted()
  for day in keys {
    if let fn = days[day] {
      if day > 1 {
        print("""
        -----------------------------
        """)
      }
      fn()
    }
  }
} else {
  if let day = Int(CommandLine.arguments[1]) {
    if let fn = days[day] {
      fn()
    } else {
      print("Looks like we don't have \(day) yet")
    }
  } else {
    help()
  }
}
