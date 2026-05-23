import json, os, shutil

base = r'C:\Users\Administrator\.openclaw\workspace\rubii-self\data\chats'
cid = '2d7313ad-470e-41fd-b1fc-47278ca62591'

# Read backup
bak_file = os.path.join(base, cid + '.json.bak')
with open(bak_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Restore session file
sdir = os.path.join(base, cid, 'sessions')
os.makedirs(sdir, exist_ok=True)
with open(os.path.join(sdir, 'default.json'), 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Update index
idx_path = os.path.join(base, cid, 'index.json')
with open(idx_path, 'w', encoding='utf-8') as f:
    json.dump({'sessions': [{'id': 'default', 'name': '默认会话', 'msgCount': len(data.get('messages', []))}]}, f, ensure_ascii=False, indent=2)

# Restore other backups to old format
for bak in os.listdir(base):
    if bak.endswith('.json.bak') and bak != cid + '.json.bak':
        src = os.path.join(base, bak)
        dst = os.path.join(base, bak.replace('.bak', ''))
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
            print('Restored:', bak.replace('.bak', ''))

print('Done - restored', len(data.get('messages', [])), 'messages')
