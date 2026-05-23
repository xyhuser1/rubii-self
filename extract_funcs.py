import re
f = open('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html','r',encoding='utf-8').read()

# Find HOME function
idx = f.find('function HOME()')
home_end = f.find('function LH()')
with open('C:/Users/Administrator/AppData/Local/Temp/rubii_home.txt','w',encoding='utf-8') as out:
    out.write(f[idx:home_end])

# Find OC function  
idx2 = f.find('function OC(')
oc_end = f.find('function LC()')
with open('C:/Users/Administrator/AppData/Local/Temp/rubii_oc.txt','w',encoding='utf-8') as out2:
    out2.write(f[idx2:oc_end if oc_end>0 else idx2+500])

# Find loadSessions
if 'function loadSessions' in f:
    idx3 = f.find('function loadSessions')
    end = f.find('function switch', idx3) if 'function switch' in f[idx3:] else idx3+300
    with open('C:/Users/Administrator/AppData/Local/Temp/rubii_sessions.txt','w',encoding='utf-8') as out3:
        out3.write(f[idx3:end+100])

print('Done')
