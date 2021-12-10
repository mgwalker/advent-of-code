def instruction(line):
    bits = line.split(" ")
    return (bits[0], int(bits[1]))


input = [instruction(line) for line in open("input.txt", "r").read().splitlines()]


def part1():
    d = 0
    h = 0
    for line in input:
        (instruction, value) = line
        if instruction == "forward":
            h += value
        elif instruction == "down":
            d += value
        else:
            d -= value
    print("Part 1")
    print("  ", d * h)


def part2():
    a = 0
    d = 0
    h = 0
    for line in input:
        (instruction, value) = line
        if instruction == "forward":
            h += value
            d += a * value
        elif instruction == "down":
            a += value
        else:
            a -= value
    print("Part 2")
    print("  ", d * h)


part1()
part2()
