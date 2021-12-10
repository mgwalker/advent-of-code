input = [int(x) for x in open("input.txt", "r").read().splitlines()]


def part1():
    lastdepth = 0
    increases = 0
    for depth in input[1:]:
        if depth > lastdepth:
            increases += 1
        lastdepth = depth
    print("Part 1")
    print("  ", increases)


def part2():
    lastdepth = 0
    increases = 0
    for i in range(1, len(input) - 3):
        depth = sum(input[i : i + 3])
        if depth > lastdepth:
            increases += 1
        lastdepth = depth
    print("Part 2")
    print("  ", increases)


part1()
part2()
