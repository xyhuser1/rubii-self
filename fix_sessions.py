with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','r',encoding='utf-8') as f:
    s = f.read()

# Find session list endpoint and add lastMsg
old = '''// 获取角色的所有会话
app.get('/api/characters/:id/sessions', (req, res) => {
  const dir = path.join(CHATS_DIR, req.params.id, 'sessions');
  const idxFile = path.join(CHATS_DIR, req.params.id, 'index.json');
  if (!fs.existsSync(dir)) return res.json([]);
  
  // 读取index.json作为会话列表
  const idx = readJSON(idxFile);
  if (idx && idx.sessions) {
    return res.json(idx.sessions);
  }
  
  // 兼容旧格式：直接读取sessions目录
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    const sessions = files.map(f => {
      const data = readJSON(path.join(dir, f));
      return {
        id: f.replace('.json', ''),
        name: data.name || f.replace('.json', ''),
        msgCount: data.messages ? data.messages.length : 0,
        createdAt: data.createdAt || 0,
        updatedAt: data.updatedAt || 0
      };
    });
    return res.json(sessions);
  } catch(e) {
    return res.json([]);
  }
});'''

new = '''// 获取角色的所有会话
app.get('/api/characters/:id/sessions', (req, res) => {
  const dir = path.join(CHATS_DIR, req.params.id, 'sessions');
  const idxFile = path.join(CHATS_DIR, req.params.id, 'index.json');
  if (!fs.existsSync(dir)) return res.json([]);
  
  const getLastMsg = (data) => {
    if (!data || !data.messages || !data.messages.length) return '';
    const msgs = data.messages;
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].role === 'assistant') {
        const c = msgs[i].content || '';
        return c.length > 80 ? c.slice(0, 80) + '...' : c;
      }
    }
    return '';
  };
  
  // 读取index.json作为会话列表
  const idx = readJSON(idxFile);
  if (idx && idx.sessions) {
    const enriched = idx.sessions.map(s => {
      const f = path.join(dir, s.id + '.json');
      const data = readJSON(f);
      return { ...s, lastMsg: getLastMsg(data) };
    });
    return res.json(enriched);
  }
  
  // 兼容旧格式
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    const sessions = files.map(f => {
      const data = readJSON(path.join(dir, f));
      return {
        id: f.replace('.json', ''),
        name: data.name || f.replace('.json', ''),
        msgCount: data.messages ? data.messages.length : 0,
        lastMsg: getLastMsg(data),
        createdAt: data.createdAt || 0,
        updatedAt: data.updatedAt || 0
      };
    });
    return res.json(sessions);
  } catch(e) {
    return res.json([]);
  }
});'''

if old in s:
    s = s.replace(old, new)
    with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','w',encoding='utf-8') as f:
        f.write(s)
    print('OK - sessions endpoint updated')
else:
    print('FAIL - old sessions endpoint not found')
