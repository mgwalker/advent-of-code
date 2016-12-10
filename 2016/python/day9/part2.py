import re
with open('input') as input:
    data = input.readline().strip()

def get_marker(string, starting_at):
    j = starting_at
    marker = ''
    while True:
        marker += string[j]
        if marker[-1] == ')':
            break
        j += 1
    match = re.match(r'\((\d+)x(\d+)\)', marker)
    return (int(match.group(1)), int(match.group(2)), marker)

def get_expanded_length(string, repeat):
    j = 0
    expanded_length = 0
    while j < len(string):
        if string[j] == '(':
            marker = get_marker(string, j)
            j += len(marker[2])
            expanded_length += get_expanded_length(string[j:j+marker[0]], marker[1])
            j += marker[0]
        else:
            expanded_length += 1
            j += 1
    return expanded_length * repeat

decompressed_length = get_expanded_length(data, 1)
print('[part 2] decompressed message length is {}'.format(decompressed_length))
