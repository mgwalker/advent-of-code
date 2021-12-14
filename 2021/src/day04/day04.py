def input():
    parts = open("input.txt", "r").read().split("\n\n")
    calls = parts[0].split(",")
    boards = [
        [
            [(cell, False) for cell in row.split(" ") if cell != ""]
            for row in board.split("\n")
        ]
        for board in parts[1:]
    ]
    return (calls, boards)


def part1():
    (calls, boards) = input()
    for call in calls:
        for board in boards:

            return


part1()
