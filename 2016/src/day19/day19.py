import time
import math


def input():
    raw = 3_014_603
    # raw = 5
    return [(i + 1, 1) for i in range(raw)]


def part1():
    seats = input()

    while len(seats) > 1:
        for i in range(len(seats)):
            (elf, presents) = seats[i]
            if presents == 0:
                continue

            nextSeat = (i + 1) % len(seats)
            nextElf = seats[nextSeat]

            presents += nextElf[1]
            seats[i] = (elf, presents)
            seats[nextSeat] = (nextElf[0], 0)

        seats = [(elf, presents) for (elf, presents) in seats if presents > 0]

    return seats[0][0]


def part2():
    class Elf:
        def __init__(self, id, presents):
            self.id = id
            self.presents = presents
            self.next = None
            self.prev = None

        def __str__(self):
            return f"elf {self.id} with {self.presents} presents"

    class SeatedElves:
        def __init__(self):
            self.count = 0
            self.elves = []

        def add(self, elf):
            elfo = Elf(elf[0], elf[1])
            self.elves.append(elfo)
            elfo.next = self.elves[0]
            elfo.prev = self.elves[self.count - 1]

            self.elves[self.count - 1].next = elfo
            self.elves[0].prev = elfo

            self.count += 1

        def head(self):
            return self.elves[0]

        def remove(self, elf):
            elf.prev.next = elf.next
            elf.next.prev = elf.prev
            self.count -= 1

        def get_target(self, elf):
            target = elf
            for _ in range(math.floor(self.count / 2)):
                target = target.next
            return target

    seats = SeatedElves()
    for elf in input():
        seats.add(elf)

    elf = seats.head()
    while seats.count > 1:
        print(seats.count)
        target = seats.get_target(elf)
        elf.presents += target.presents
        seats.remove(target)
        elf = elf.next

    print(elf)


t1 = time.time()
sol = part1()
t2 = time.time()
print(f"Part 1 ({round(1000 * (t2 - t1), 3)} ms)")
print("   ", sol)
print()

t1 = time.time()
sol = part2()
t2 = time.time()
print(f"Part 2 ({round(1000 * (t2 - t1), 3)} ms)")
print("   ", sol)
