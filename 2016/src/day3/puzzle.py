import re
from validator import isValidTriangle
with open('input') as input:
    lines = re.sub(r' +', ' ', input.read()).split('\n')

validCount = 0
for line in lines:
    if not line:
        continue

    sides = [int(x) for x in line.strip().split(' ')]

    if isValidTriangle(sides[0], sides[1], sides[2]):
        validCount += 1

print('[part 1] {} valid triangles'.format(validCount))

validCount = 0
for i,_ in enumerate(lines[0::3]):
    if not _:
        continue
    idx = i * 3

    localLines = [
        [int(x) for x in lines[idx].strip().split(' ')],
        [int(x) for x in lines[idx + 1].strip().split(' ')],
        [int(x) for x in lines[idx + 2].strip().split(' ')]
    ]

    for x in range(3):
        if isValidTriangle(localLines[0][x], localLines[1][x], localLines[2][x]):
            validCount += 1

print('[part 2] {} valid triangles'.format(validCount))
