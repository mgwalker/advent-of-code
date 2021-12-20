with open('input') as input:
    directions = input.read()

directions = [piece.strip() for piece in directions.split(',')]
grid = { '0,0': 1 }
position = [ 0, 0 ]

facing = 0
facingChange = { 'R': 1, 'L': -1 }
positionDeltas = [
    {'R': 1, 'L': -1}, # facing north
    {'R': -1, 'L': 1}, # east
    {'R': -1, 'L': 1}, # south
    {'R': 1, 'L': -1}  # west
]
firstRevisit = False

for i,step in enumerate(directions):
    direction = positionDeltas[facing][step[0]]
    magnitude = int(step[1:])
    path = [ position[0], position[1] ]

    if not firstRevisit:
        for x in range(magnitude):
            path[i%2] += direction
            gridIndex = '{},{}'.format(path[0], path[1])
            if not gridIndex in grid:
                grid[gridIndex] = 0
            grid[gridIndex] += 1
            if grid[gridIndex] > 1:
                firstRevisit = [path[0], path[1]]

    position[i%2] += (direction * magnitude)
    facing = (facing + facingChange[step[0]]) % 4

print('[part 1] Easter Bunny HQ is {} blocks away'.format(sum(position)))
print('[part 2] Easter Bunny HQ is {} blocks away'.format(sum(firstRevisit)))
