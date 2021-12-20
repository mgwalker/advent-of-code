import re

pixels = [
    [ ' ' ]*50, # 0
    [ ' ' ]*50, # 1
    [ ' ' ]*50, # 2
    [ ' ' ]*50, # 3
    [ ' ' ]*50, # 4
    [ ' ' ]*50  # 5
]

def print_pixels():
    for row in pixels:
        for column in row:
            print(column, end='')
        print()

def rect(width, height):
    for i in range(0, height):
        pixels[i][0:width] = [ '▊' ] * width

def rotate_row(row, amount):
    for _ in range(0, amount):
        last = pixels[row][-1]
        for i in range(len(pixels[row]) - 1, 0, -1):
            pixels[row][i] = pixels[row][i - 1]
        pixels[row][0] = last

def rotate_column(column, amount):
    for _ in range(0, amount):
        last = pixels[-1][column]
        for i in range(len(pixels) - 1, 0, -1):
            pixels[i][column] = pixels[i - 1][column]
        pixels[0][column] = last

with open('input') as input:
    lines = input.read().split('\n')

rect_regex = re.compile('rect (\d+)x(\d+)')
row_regex = re.compile('rotate row y=(\d+) by (\d+)')
column_regex = re.compile('rotate column x=(\d+) by (\d+)')

for instruction in lines:
    match = rect_regex.match(instruction)
    if match:
        width = int(match.group(1))
        height = int(match.group(2))
        rect(width, height)
        continue

    match = row_regex.match(instruction)
    if match:
        row = int(match.group(1))
        amount = int(match.group(2))
        rotate_row(row, amount)
        continue

    match = column_regex.match(instruction)
    if match:
        column = int(match.group(1))
        amount = int(match.group(2))
        rotate_column(column, amount)
        continue

on = 0
for row in pixels:
    on += len(list(filter(lambda x: x == '▊', row)))
print('[part 1] {} pixels are on'.format(on))
print('[part 2] :')
print_pixels()
