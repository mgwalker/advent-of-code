directions = open("directions.txt", "r");
floor, step, hasCrossed = 0, 1, False

direction = directions.read(1)
while direction != "":
	if direction == "(":
		floor = floor + 1
	elif direction == ")":
		floor = floor - 1
	if floor < 0 and hasCrossed == False:
		print("Part 2: Crossed over on step {0}".format(step))
		hasCrossed = True
	step = step + 1
	direction = directions.read(1)

print("Part 1: Ended up on floor {0}".format(floor))
