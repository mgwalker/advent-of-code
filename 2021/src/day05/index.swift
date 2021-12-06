import Foundation

struct Point: Equatable, Hashable {
  var x: Int
  var y: Int

  static func == (lhs: Point, rhs: Point) -> Bool {
    return lhs.x == rhs.x && lhs.y == rhs.y
  }

  func hash(into hasher: inout Hasher) {
    hasher.combine(x)
    hasher.combine(y)
  }
}

class Line {
  private var start: Point
  private var end: Point

  init(with lineStr: String) {
    let coords = lineStr.replacingOccurrences(of: " -> ", with: ",").split(separator: ",")
    start = Point(x: Int(coords[0])!, y: Int(coords[1])!)
    end = Point(x: Int(coords[2])!, y: Int(coords[3])!)
  }

  func allPoints() -> [Point] {
    if horizontal() {
      let range = start.x < end.x ? start.x ... end.x : end.x ... start.x
      return range.map { Point(x: $0, y: start.y) }
    } else if vertical() {
      let range = start.y < end.y ? start.y ... end.y : end.y ... start.y
      return range.map { Point(x: start.x, y: $0) }
    } else {
      var points: [Point] = []

      var deltaX = 0
      var deltaY = 0

      deltaX = end.x - start.x > 0 ? 1 : -1
      deltaY = end.y - start.y > 0 ? 1 : -1

      var x = start.x
      var y = start.y

      while x != end.x || y != end.y {
        points.append(Point(x: x, y: y))
        x += deltaX
        y += deltaY
      }
      points.append(Point(x: x, y: y))

      return points
    }
  }

  func horizontal() -> Bool {
    return start.y == end.y
  }

  func vertical() -> Bool {
    return start.x == end.x
  }
}

enum Day5 {
  static func input() -> [Line] {
    do {
      return try String(contentsOfFile: "input.txt").split(separator: "\n").map { Line(with: String($0)) }
    } catch { return [] }
  }

  static func run(ventLines: [Line]) -> Int {
    var board: [Point: Int] = [:]

    for vent in ventLines {
      for point in vent.allPoints() {
        if let count = board[point] {
          board[point] = count + 1
        } else {
          board[point] = 1
        }
      }
    }
    return board.values.filter { $0 > 1 }.count
  }

  static func part1() -> Int {
    let data = input().filter { $0.horizontal() || $0.vertical() }
    return run(ventLines: data)
  }

  static func part2() -> Int {
    let data = input()
    return run(ventLines: data)
  }
}

print("PART 1:")
let t1 = DispatchTime.now()
print("  ", Day5.part1())
print("  ", Double(DispatchTime.now().uptimeNanoseconds - t1.uptimeNanoseconds) / 1_000_000.0, "ms")
print("")
print("PART 2:")
let t2 = DispatchTime.now()
print("  ", Day5.part2())
print("  ", Double(DispatchTime.now().uptimeNanoseconds - t2.uptimeNanoseconds) / 1_000_000.0, "ms")
