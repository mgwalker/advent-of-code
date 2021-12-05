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
    var points: [Point] = []

    var deltaX = 0
    var deltaY = 0
    if horizontal() {
      deltaX = end.x - start.x > 0 ? 1 : -1
    } else if vertical() {
      deltaY = end.y - start.y > 0 ? 1 : -1
    } else {
      deltaX = end.x - start.x > 0 ? 1 : -1
      deltaY = end.y - start.y > 0 ? 1 : -1
    }

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

  static func part1() {
    let data = input().filter { $0.horizontal() || $0.vertical() }

    print("PART 1")
    print("  ", run(ventLines: data))
  }

  static func part2() {
    let data = input()

    print("PART 2")
    print("  ", run(ventLines: data))
  }
}

Day5.part1()
Day5.part2()
