import re
from functools import reduce

with open('input') as input:
    instructions = input.read().splitlines()

bots = { }
instRE = re.compile(r'(\w+) (\d+) (gives|goes)( low)? to (bot|output) (\d+)( and (high) to (bot|output) (\d+))?')

# setup the processing graph (ish)
for instruction in instructions:
    match = instRE.match(instruction)

    if match.group(1) == 'bot':
        actor = match.group(2)
        bot = { 'id': actor, 'values': [], 'low_to': { 'bot': False, 'output': False }, 'high_to': { 'bot': False, 'output': False }}

        if match.group(5) == 'output':
            bot['low_to']['output'] = match.group(6)
        else:
            bot['low_to']['bot'] = match.group(6)
        if match.group(9) == 'output':
            bot['high_to']['output'] = match.group(10)
        else:
            bot['high_to']['bot'] = match.group(10)

        bots[actor] = bot

# Set aside possible output bins
output = [False] * len([x for x in bots])

# Process a single bot
def process_bot(bot):
    # ...but only if it has two values
    if len(bot['values']) == 2:
        values = sorted(bot['values'], key=lambda x: int(x))

        for combo in [
            { 'name': 'low_to', 'index': 0 },
            { 'name': 'high_to', 'index': 1 }]:

            if bot[combo['name']]['bot']:
                to_bot = bots[bot[combo['name']]['bot']]
                to_bot['values'] += [values[combo['index']]]
            else:
                output[int(bot[combo['name']]['output'])] = values[combo['index']]

        if values[0] == '17' and values[1] == '61':
            print('[part 1] bot {} is responsible for comparing 17 and 61'.format(bot['id']))
        bot['values'] = []

for instruction in instructions:
    match = instRE.match(instruction)
    if match.group(1) == 'value':
        value = match.group(2)
        target = match.group(6)
        bots[target]['values'] += [value]

bots_to_process = [x for x in bots if len(bots[x]['values']) == 2]
while len(bots_to_process) > 0:
    for bot_id in bots_to_process:
        process_bot(bots[bot_id])
    bots_to_process = [x for x in bots if len(bots[x]['values']) == 2]

product = reduce(lambda x,y: x*y, [int(x) for x in output[0:3]], 1)
print('[part 2] the product of outputs 0, 1, and 2 is {}'.format(product))
