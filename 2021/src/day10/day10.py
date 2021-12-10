import math


def input():
    return open("input.txt", "r").read().splitlines()


pairs = {"(": ")", "[": "]", "{": "}", "<": ">"}
terminators = [")", "]", "}", ">"]
costs1 = {")": 3, "]": 57, "}": 1197, ">": 25137}
costs2 = {")": 1, "]": 2, "}": 3, ">": 4}


def get_is_valid(str):
    looking_for = []
    for symbol in str:
        if symbol in terminators:
            if symbol != looking_for.pop():
                return (False, symbol)
        else:
            looking_for.append(pairs[symbol])
    return (True, looking_for)


def part1():
    lines = input()
    is_valid = [get_is_valid(line) for line in lines]

    print("Part 1")
    print("  ", sum([costs1[x[1]] for x in is_valid if x[0] == False]))


def part2():
    lines = input()
    is_valid = [get_is_valid(line) for line in lines]
    completion_strings = [x[1] for x in is_valid if x[0] == True]

    scores = []
    for completion in completion_strings:
        completion.reverse()
        line_score = 0
        for char in completion:
            line_score *= 5
            line_score += costs2[char]
        scores.append(line_score)

    scores.sort()

    print("Part 2")
    print("  ", scores[math.floor(len(scores) / 2)])


part1()
part2()
