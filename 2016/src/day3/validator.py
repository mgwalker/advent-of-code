def isValidTriangle(side1, side2, side3):
    valid = True
    if side1 + side2 <= side3:
        valid = False
    elif side1 + side3 <= side2:
        valid = False
    elif side2 + side3 <= side1:
        valid = False
    return valid
