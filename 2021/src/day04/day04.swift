import Foundation

private class BoardSpot {
  private(set) var number = -1
  var checked = false

  init(withNumber: Int) {
    number = withNumber
  }

  func called(withNumber: Int) {
    if number == withNumber {
      checked = true
    }
  }
}

private class Board {
  private var spots: [[BoardSpot]] = []

  init(boardStrings: [String]) {
    let lines = boardStrings.map { $0.split(separator: " ") }
    lines.forEach { line in
      var row: [BoardSpot] = []
      line.map { Int($0)! }.forEach { n in
        row.append(BoardSpot(withNumber: n))
      }
      spots.append(row)
    }
  }

  func called(withNumber: Int) {
    spots.forEach { $0.forEach { $0.called(withNumber: withNumber) }}
  }

  func hasBingo() -> Bool {
    if spots.contains(where: { row in
      row.allSatisfy { $0.checked }
    }) {
      return true
    }

    for i in 0 ..< 5 {
      if (spots.allSatisfy { $0[i].checked })
      { return true }
    }
    return false
  }

  func score(withNumber: Int) -> Int {
    var sum = 0
    for row in spots {
      for col in row {
        if !col.checked {
          sum += col.number
        }
      }
    }
    return sum * withNumber
  }

  func printBoard() {
    for row in spots {
      print(row.map { "\($0.number)|\($0.checked)" })
    }
  }
}

enum Day4 {
  struct Input {
    var calls: [Int] = []
    fileprivate var boards: [Board] = []
  }

  static func input() -> Input? {
    do {
      let data = try String(contentsOfFile: "input.txt").split(separator: "\n").map { String($0) }
      var out = Input()

      data[0].split(separator: ",").map { Int($0, radix: 10)! }.forEach { n in out.calls.append(n) }

      var line = 1
      while line < data.count {
        let lineValue = Array(data[line ..< line + 5])
        out.boards.append(Board(boardStrings: lineValue))
        line += 5
      }

      return out
    } catch { return nil }
  }

  static func part1() -> Int {
    let data = input()!

    var callIndex = 0
    while callIndex < data.calls.count {
      let called = data.calls[callIndex]

      for board in data.boards {
        board.called(withNumber: called)

        if board.hasBingo() {
          return board.score(withNumber: called)
        }
      }
      callIndex += 1
    }
    return -1
  }

  static func part2() -> Int {
    let data = input()!
    var boards = data.boards

    var lastWinningNumber = -1
    var lastWinningBoard: Board?

    var callIndex = 0
    while callIndex < data.calls.count {
      let called = data.calls[callIndex]

      for board in boards {
        board.called(withNumber: called)

        if board.hasBingo() {
          lastWinningNumber = called
          lastWinningBoard = board
          boards.removeAll(where: { $0 === board })
        }
      }
      callIndex += 1
    }

    return lastWinningBoard!.score(withNumber: lastWinningNumber)
  }
}
