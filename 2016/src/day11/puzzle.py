import numpy as np
with open('input') as input:
    lines = input.read().splitlines()

# cobalt, curium, plutonium, promethium, ruthenium;
# generator, microchip
floors = [
    [ np.array([0,0]), np.array([0,0]), np.array([0,0]), np.array([1,1]), np.array([0,0]), 1 ],
    [ np.array([1,0]), np.array([1,0]), np.array([1,0]), np.array([0,0]), np.array([1,0]), 0 ],
    [ np.array([0,1]), np.array([0,1]), np.array([0,1]), np.array([0,0]), np.array([0,1]), 0 ],
    [ np.array([0,0]), np.array([0,0]), np.array([0,0]), np.array([0,0]), np.array([0,0]), 0 ]
]
