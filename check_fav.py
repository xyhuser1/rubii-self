import json
d = json.load(open(r'C:\Users\ADMINI~1\AppData\Local\Temp\chars_test.json'))
for c in d:
    print(f'{c["name"]}: fav={c.get("fav",False)}')
