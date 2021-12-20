import re
with open('input') as input:
    data = input.readline().strip()

decompressed = ''
i = 0
while i < len(data):
    if data[i] == '(':
        marker = '('
        i += 1
        while True:
            marker += data[i]
            i += 1
            if marker[-1] == ')':
                break
        match = re.match(r'\((\d+)x(\d+)\)', marker)
        run = int(match.group(1))
        repeat = int(match.group(2))
        decompressed += (data[i:i+run] * repeat)
        i += run
    else:
        decompressed += data[i]
        i += 1
        #break

print('[part 1] decompressed message length is {}'.format(len(decompressed)))
