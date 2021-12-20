with open('input') as input:
    lines = input.read().split('\n')

supportsTLS = []

for line in lines:
    if not line:
        continue

    in_brackets = False
    is_good = -1
    for i in range(0,len(line)-3):
        if in_brackets and line[i] == ']':
            in_brackets = False
            continue
        elif line[i] == '[':
            in_brackets = True
        elif line[i] != line[i+1]:
            one = line[i:i+2]
            two = line[i+2:i+4][::-1]
            if one == two:
                if in_brackets:
                    is_good = 0
                    break

                if is_good != 0:
                    is_good = 1

    if is_good == 1:
        supportsTLS += [line]

print('[part 1] {} IPs support TLS'.format(len(supportsTLS)))
