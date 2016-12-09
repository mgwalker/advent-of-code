import regex as re
from functools import reduce

with open('input') as input:
    lines = input.read().split('\n')

supportsSSL = []
abaRegex = re.compile(r'((.)(?!\2).\2)')
bracketRegex = re.compile(r'\[([^\]]*)\]')

def check_for_aba_in_non_brackets(aba, non_brackets):
    for bit in non_brackets:
        if aba in bit:
            return True
    return False


def check_for_abas_in_non_brackets(babs, non_brackets):
    has_aba = False
    for bab in babs:
        aba = bab[1] + bab[0] + bab[1]
        has_aba |= check_for_aba_in_non_brackets(aba, non_brackets)
    return has_aba

for line in lines:
    if not line:
        continue

    brackets = bracketRegex.findall(line, overlapped=True)
    non_brackets = line

    babs = []
    for bracket in brackets:
        non_brackets = non_brackets.replace('[{}]'.format(bracket), '|')
        babs_in_bracket = abaRegex.findall(bracket, overlapped=True)
        for bab in babs_in_bracket:
            babs += [bab[0]]

    non_brackets = non_brackets.split('|')

    if check_for_abas_in_non_brackets(babs, non_brackets):
        supportsSSL += [line]

print('[part 2] {} IPs support SSL'.format(len(supportsSSL)))
