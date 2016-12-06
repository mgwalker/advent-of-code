import re
with open('input') as input:
    lines = input.read().split('\n')

roomInfoRE = re.compile(r"(.*)-(\d+)\[([a-z]{5})\]")
northPoleRE = re.compile(r".*north.*pole.*object.*storage")
realSectorIDs = []
target = { 'sector': 0, 'name': '' }

for line in lines:
    if not line:
        continue
    match = roomInfoRE.match(line)
    roomName, sectorID, checksum = match.group(1, 2, 3)
    nameLetters = {}
    letters = []
    for letter in roomName:
        if letter == '-':
            continue
        if not letter in nameLetters:
            nameLetters[letter] = 0
        nameLetters[letter] += 1
    for letter in nameLetters:
        letters += [{ 'letter': letter, 'count': nameLetters[letter] }]
    letters = sorted(letters, key=lambda k: k['letter'])
    letters = sorted(letters, key=lambda k: k['count'], reverse=True)
    expectChecksum = ''.join([l['letter'] for l in letters[0:5]])
    if checksum == expectChecksum:
        realSectorIDs += [int(sectorID)]

        realRoomName = ''
        for letter in roomName:
            if letter == '-':
                realRoomName += ' '
                continue
            realRoomName += chr((((ord(letter) - 97) + int(sectorID)) % 26) + 97)
        if northPoleRE.match(realRoomName):
            target['sector'] = sectorID
            target['name'] = realRoomName

print('[part 1] sum of sector IDs is {}'.format(sum(realSectorIDs)))
print('[part 2] target room: sector {}, {}'.format(target['sector'], target['name']))
