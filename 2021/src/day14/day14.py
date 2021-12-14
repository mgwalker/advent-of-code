from collections import defaultdict
import math


def input():
    [template, rules] = open("input.txt", "r").read().split("\n\n")
    return (
        template,
        {
            key: value
            for [key, value] in [line.split(" -> ") for line in rules.splitlines()]
        },
    )


def run_insertions(pairs, rules):
    newPairs = pairs.copy()
    for key in pairs:
        if pairs[key] > 0 and rules[key]:
            newPairs[f"{key[0]}{rules[key]}"] += pairs[key]
            newPairs[f"{rules[key]}{key[1]}"] += pairs[key]
            newPairs[key] -= pairs[key]
    return newPairs


def do_the_puzzle(times):
    (template, rules) = input()

    pairs = defaultdict(lambda: 0)
    for pair in rules:
        pairs[pair] = 0
    for pair in [
        f"{template[i]}{template[i + 1]}" for i in range(0, len(template) - 1)
    ]:
        pairs[pair] += 1

    for _ in range(0, times):
        pairs = run_insertions(pairs, rules)

    occurances = defaultdict(lambda: 0)
    for pair in pairs:
        occurances[pair[0]] += pairs[pair]
    occurances[template[-1]] += 1

    occurances = [occurances[letter] for letter in occurances]
    return max(occurances) - min(occurances)


def part1():
    solution = do_the_puzzle(10)
    print("Part 1")
    print("   ", solution)
    print("   ", solution == 3143)


def part2():
    solution = do_the_puzzle(40)
    print("Part 2")
    print("   ", solution)


part1()
part2()
