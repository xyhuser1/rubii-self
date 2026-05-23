import urllib.request
r = urllib.request.urlopen('http://127.0.0.1:3000/',timeout=5)
f = r.read().decode('utf-8')
print('renderGrid exists:', 'function renderGrid(' in f)
print('LH exists:', 'function LH()' in f)
print('HOME exists:', 'function HOME()' in f)
print('HM id exists:', 'id="HM"' in f)

# Check LH function
idx = f.find('function LH()')
end = f.find('function getCurrentSessionId', idx)
print('--- LH function ---')
print(f[idx:end])
