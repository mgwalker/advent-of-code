import copy
with open('input') as input:
    lines = input.read().split('\n')

frequency = []

for _ in lines[0]:
    freq = {}
    for i in range(97,123):
        freq[chr(i)] = 0
    frequency += [freq]

for line in lines:
    if not line:
        continue;

    for i,letter in enumerate(line):
        frequency[i][letter] += 1

word1 = ''
word2 = ''
for position in frequency:
    sorted_by_frequency = sorted(position, key=position.get)
    word1 += sorted_by_frequency[-1]
    word2 += sorted_by_frequency[0]

print('[part 1] The message is {}'.format(word1))
print('[part 2] The message is {}'.format(word2))
