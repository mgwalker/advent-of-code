import time
from functools import reduce


class BitReader:
    def __init__(self, data):
        self.raw = data
        self.pointer = 0

    def bitCounter(self):
        p = self.pointer
        return lambda: self.pointer - p

    def clearPadding(self):
        self.pointer += 4 - (self.pointer % 4)

    def empty(self):
        return self.pointer >= len(self.raw) - 1

    def getBits(self, bits):
        data = self.raw[self.pointer : self.pointer + bits]
        self.pointer += bits
        if data == "":
            return "0"
        return data

    def getInt(self, bits):
        return int(self.getBits(bits), 2)


class BITSPacket:
    def __init__(self, reader, trim=True):
        counter = reader.bitCounter()

        self.literal = False
        self.packets = []
        self.version = reader.getInt(3)
        self.type = reader.getInt(3)
        self.versionSum = self.version

        if self.type == 4:
            literal = []
            bits = reader.getBits(5)
            while bits[0] == "1":
                literal.append(bits[1:])
                bits = reader.getBits(5)
            literal.append(bits[1:])
            if trim:
                reader.clearPadding()
            self.literal = int("".join(literal), 2)
        else:
            if reader.getBits(1) == "0":
                size = reader.getInt(15)
                while size > 0:
                    packet = BITSPacket(reader, False)
                    self.versionSum += packet.versionSum
                    size -= packet.bits
                    self.packets.append(packet)
            else:
                count = reader.getInt(11)
                while count > 0:
                    packet = BITSPacket(reader, False)
                    self.versionSum += packet.versionSum
                    count -= 1
                    self.packets.append(packet)

            if trim:
                reader.clearPadding()

            if self.type == 0:
                self.literal = sum([packet.literal for packet in self.packets])
            elif self.type == 1:
                self.literal = reduce(
                    lambda x, y: x * y, [packet.literal for packet in self.packets]
                )
            elif self.type == 2:
                self.literal = min([packet.literal for packet in self.packets])
            elif self.type == 3:
                self.literal = max([packet.literal for packet in self.packets])
            elif self.type == 5:
                self.literal = (
                    1 if self.packets[0].literal > self.packets[1].literal else 0
                )
            elif self.type == 6:
                self.literal = (
                    1 if self.packets[0].literal < self.packets[1].literal else 0
                )
            elif self.type == 7:
                self.literal = (
                    1 if self.packets[0].literal == self.packets[1].literal else 0
                )

        self.bits = counter()


raw = open("input.txt", "r").read()


def hex2bin(hex):
    return bin(int(hex, 16))[2:].zfill(4)


def input():
    return BitReader("".join([hex2bin(c) for c in raw]))


def part1():
    reader = input()
    packet = BITSPacket(reader)

    return packet.versionSum


def part2():
    reader = input()
    packet = BITSPacket(reader)

    return packet.literal


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
