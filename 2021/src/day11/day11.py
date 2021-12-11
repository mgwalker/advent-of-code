def input():
    return [
        [[(x, y), int(value)] for x, value in enumerate(row)]
        for y, row in enumerate(open("input.txt", "r").read().splitlines())
    ]


def increment_octopuses(octopuses):
    for row in octopuses:
        for octopus in row:
            octopus[1] += 1


def octo_flash(octopuses, already_flashed):
    flashes = 0
    neighbor_locations = []
    for row in octopuses:
        for octopus in row:
            if octopus[1] > 9 and octopus[0] not in already_flashed:
                already_flashed.add(octopus[0])
                (x, y) = octopus[0]
                neighbor_locations.append((x - 1, y - 1))
                neighbor_locations.append((x, y - 1)),
                neighbor_locations.append((x + 1, y - 1)),
                neighbor_locations.append((x - 1, y)),
                neighbor_locations.append((x + 1, y)),
                neighbor_locations.append((x - 1, y + 1)),
                neighbor_locations.append((x, y + 1)),
                neighbor_locations.append((x + 1, y + 1)),
                flashes += 1
    neighbor_locations = [
        loc
        for loc in neighbor_locations
        if loc not in already_flashed
        and loc[0] >= 0
        and loc[0] < 10
        and loc[1] >= 0
        and loc[1] < 10
    ]

    if len(neighbor_locations) > 0:
        for (x, y) in neighbor_locations:
            octopuses[y][x][1] += 1
        flashes += octo_flash(octopuses, already_flashed)

    for (x, y) in already_flashed:
        octopuses[y][x][1] = 0

    return flashes


def part1():
    octopuses = input()
    flashes = 0

    for _ in range(0, 100):
        increment_octopuses(octopuses)
        flashes += octo_flash(octopuses, set())

    print("Part 1")
    print("  ", flashes)


def part2():
    octopuses = input()
    flashes = 0

    step = 0
    while flashes < 100:
        increment_octopuses(octopuses)
        flashes = octo_flash(octopuses, set())
        step += 1

    print("Part 2")
    print("  ", step)


part1()
part2()
