with open('input') as input:
    directions = input.read()

directions = [piece.strip() for piece in directions.split(',')]
facing = 0
facingChange = { 'R': 1, 'L': -1 }

# north, east, south, west
blocks = [ 0, 0, 0, 0 ]

for step in directions:
    facing = (facing + facingChange[step[0]]) % 4
    blocks[facing] += int(step[1:])

distance = abs(blocks[0] - blocks[2]) + abs(blocks[1] - blocks[3])

print('Easter Bunny HQ is {} blocks away'.format(distance))
