with open('input') as input:
    lines = input.read().split('\n')

def isAButton(button, ofButtons):
    return button[0] > -1 and button[0] < len(ofButtons) and button[1] > -1 and button[1] < len(ofButtons) and ofButtons[button[0]][button[1]] != '0'

def findCode(buttons, start):
    button = start

    moves = {
        'U': [-1,0],
        'D': [1,0],
        'L': [0,-1],
        'R': [0,1]
    }
    code = ''
    for line in lines:
        for move in line:
            newButton = [button[0] + moves[move][0], button[1] + moves[move][1]]
            if isAButton(newButton, buttons):
                button = newButton
        code += '{}'.format(buttons[button[0]][button[1]])
    return code

buttons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9']
]
print('[part 1] The bathroom code is {}'.format(findCode(buttons, [1,1])))

buttons = [
    ['0', '0', '1', '0', '0'],
    ['0', '2', '3', '4', '0'],
    ['5', '6', '7', '8', '9'],
    ['0', 'A', 'B', 'C', '0'],
    ['0', '0', 'D', '0', '0']
];
print('[part 2] The bathroom code is {}'.format(findCode(buttons, [2,0])))
