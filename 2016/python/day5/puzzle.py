from hashlib import md5

def getPassword(roomID):
    password1 = ''
    password2 = '--------'
    i = 0
    while len(password1) < 8 or password2.find('-') > -1:
        m = md5()
        m.update('{}{}'.format(roomID, i).encode('utf-8'))
        hashtext = m.hexdigest()
        if hashtext[0:5] == '00000':
            if len(password1) < 8:
                password1 += hashtext[5]
            if password2.find('-') > -1:
                if hashtext[5].isdigit() and int(hashtext[5]) < 8:
                    index = int(hashtext[5])
                    if password2[index] == '-':
                        password2 = password2[:index] + hashtext[6] + password2[index+1:]
        i += 1
        if i % 100000 == 0:
            print('{:,}: {} | {}'.format(i, password1, password2), end='\r')
    print('{:,}: {} | {}'.format(i, password1, password2))
    return password1, password2

password1,password2 = getPassword('uqwqemis')
print('[part 1] password is {}'.format(password1))
print('[part 2] password is {}'.format(password2))
