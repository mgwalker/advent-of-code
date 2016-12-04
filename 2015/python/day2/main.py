dimensions = open("dimensions.txt", "r")

totalArea = totalLength = 0
dimension = dimensions.readline()

while dimension:
	dimension = sorted(list(map(lambda x: int(x), dimension.strip().split("x"))))
	totalArea = totalArea + (2 * ((dimension[0] * dimension[1]) + (dimension[0] * dimension[2]) + (dimension[1] * dimension[2]))) + (dimension[0] * dimension[1])
	totalLength = totalLength + ((2 * (dimension[0] + dimension[1])) + (dimension[0] * dimension[1] * dimension[2]))
	dimension = dimensions.readline()

print("[Part 1] Total wrapping paper area: ", totalArea)
print("[Part 2] Total ribbon length: ", totalLength)
