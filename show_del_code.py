import re
s = open('C:/Users/Administrator/AppData/Local/Temp/del_code_latest.txt','r',encoding='utf-8').read()
s = re.sub(r'[^\x20-\x7e\"\'\\]', '.', s)
print(s[:600])
