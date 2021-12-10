input = open("input.txt", "r").read().splitlines()


def most_common(bit_list, up_to_one=False):
    halflen = len(bit_list) / 2

    if up_to_one:
        return [
            "1" if sum([int(s[i]) for s in bit_list]) >= halflen else "0"
            for i in range(0, len(bit_list[0]))
        ]
    else:
        return [
            "1" if sum([int(s[i]) for s in bit_list]) > halflen else "0"
            for i in range(0, len(bit_list[0]))
        ]


def part1():
    common = most_common(input)
    gamma = int("".join([bit for bit in common]), 2)
    epsilon = int("".join(["0" if bit == "1" else "1" for bit in common]), 2)
    print("Part 1")
    print("  ", gamma * epsilon)


def part2():
    o2 = input.copy()
    co2 = input.copy()

    for i in range(0, len(o2[0])):
        bit = most_common(o2, up_to_one=True)[i]
        o2 = [bits for bits in o2 if bits[i] == bit]
        if len(o2) == 1:
            break

    for i in range(0, len(co2[0])):
        bit = most_common(co2, up_to_one=True)[i]
        co2 = [bits for bits in co2 if bits[i] != bit]
        if len(co2) == 1:
            break

    o2 = int(o2[0], 2)
    co2 = int(co2[0], 2)

    4125600

    print("Part 2")
    print("  ", o2 * co2)


part1()
part2()
