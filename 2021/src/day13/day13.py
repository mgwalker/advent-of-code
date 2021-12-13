def getdot(str):
    [x, y] = str.split(",")
    return (int(x), int(y))


def getfold(str):
    [axis, val] = str.split("=")
    return (axis, int(val))


def input():
    lines = [l for l in open("input.txt", "r").read().splitlines() if l != ""]
    dots = [getdot(l) for l in lines if not l.startswith("fold")]
    folds = [getfold(l.split("along ")[1]) for l in lines if l.startswith("fold")]

    xs = [x[0] for x in dots]
    maxx = max(xs)
    x = range(0, maxx + 1)

    ys = [y[1] for y in dots]
    maxy = max(ys)
    y = range(0, maxy + 1)

    grid = []
    for yy in y:
        grid.append([])
        for _ in x:
            grid[yy].append(0)

    for dot in dots:
        grid[dot[1]][dot[0]] = 1

    return (grid, folds)


def fold(grid, fold):
    (axis, value) = fold
    if axis == "x":
        for y in range(0, len(grid)):
            for x in range(value, len(grid[y])):
                if grid[y][x] == 1:
                    newx = value - (x - value)
                    grid[y][newx] = 1
            grid[y] = grid[y][0:value]

    if axis == "y":
        for y in range(value, len(grid)):
            for x in range(0, len(grid[y])):
                if grid[y][x] == 1:
                    newy = value - (y - value)
                    grid[newy][x] = 1
        grid = grid[0:value]

    return grid


def part1():
    (grid, folds) = input()
    fold(grid, folds[0])
    print("Part 1")
    print("   ", sum([sum([cell for cell in row]) for row in grid]))


def part2():
    (grid, folds) = input()
    for instruction in folds:
        grid = fold(grid, instruction)

    print("Part 2")
    # print("   ", sum([sum([cell for cell in row]) for row in grid]))

    for y in range(0, len(grid)):
        print("".join(["█" if x == 1 else " " for x in grid[y]]))


part1()
part2()
