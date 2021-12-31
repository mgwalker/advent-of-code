import time

raw = open("input.txt", "r").read()


def input():
    return raw


def part1():
    return


def part2():
    return


print("Part 1")
t1 = time.time()
sol = part1()
t2 = time.time()
print("   ", sol, round(1000 * (t2 - t1), 3), "ms")
print()

print("Part 2")
t1 = time.time()
sol = part2()
t2 = time.time()
print("   ", sol, round(1000 * (t2 - t1), 3), "ms")
