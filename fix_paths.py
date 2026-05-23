import re

with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', 'r', encoding='utf-8') as f:
    s = f.read()

# 1. Character endpoints: CHARS_DIR -> userCharsDir(req.username)
s = s.replace('const CHARS_DIR = path.join(DATA_DIR, \'characters\');', '')
s = s.replace('const CHATS_DIR = path.join(DATA_DIR, \'chats\');', '')

# 2. Replace CHARS_DIR usage in endpoint handlers with userCharsDir
# In GET /api/characters
s = s.replace(
    "app.get('/api/characters', (req, res) => {\n  const chars = [];\n  try {\n    const files = fs.readdirSync(CHARS_DIR);",
    "app.get('/api/characters', (req, res) => {\n  const chars = [];\n  try {\n    const files = fs.readdirSync(userCharsDir(req.username));"
)

# In GET /api/characters/:id
s = s.replace(
    "const c = readJSON(path.join(CHARS_DIR, `${req.params.id}.json`));",
    "const c = readJSON(path.join(userCharsDir(req.username), `${req.params.id}.json`));"
)

# In POST /api/characters
s = s.replace(
    "writeJSON(path.join(CHARS_DIR, `${char.id}.json`), char);",
    "writeJSON(path.join(userCharsDir(req.username), `${char.id}.json`), char);"
)

# In PUT /api/characters/:id
s = s.replace(
    "const file = path.join(CHARS_DIR, `${req.params.id}.json`);\n  const existing = readJSON(file);",
    "const file = path.join(userCharsDir(req.username), `${req.params.id}.json`);\n  const existing = readJSON(file);"
)

# In DELETE /api/characters/:id
s = s.replace(
    "const file = path.join(CHARS_DIR, `${req.params.id}.json`);\n  if (!fs.existsSync(file))",
    "const file = path.join(userCharsDir(req.username), `${req.params.id}.json`);\n  if (!fs.existsSync(file))"
)

# 3. ChatGPT path helpers - replace session functions
s = s.replace(
    "function sessionDir(charId) {\n  return path.join(CHATS_DIR, charId, 'sessions');\n}",
    "function sessionDir(charId, username) {\n  return path.join(userChatsDir(username), charId, 'sessions');\n}"
)
s = s.replace(
    "function sessionIndex(charId) {\n  return path.join(CHATS_DIR, charId, 'index.json');\n}",
    "function sessionIndex(charId, username) {\n  return path.join(userChatsDir(username), charId, 'index.json');\n}"
)

# 4. Update readSessions and writeSessions
s = s.replace(
    "function readSessions(charId) {\n  const idx = readJSON(sessionIndex(charId));",
    "function readSessions(charId, username) {\n  const idx = readJSON(sessionIndex(charId, username));"
)
s = s.replace(
    "function writeSessions(charId, sessions) {\n  writeJSON(sessionIndex(charId), { sessions });",
    "function writeSessions(charId, username, sessions) {\n  writeJSON(sessionIndex(charId, username), { sessions });"
)

# 5. Update migrateOldChat and ensureDefaultSession
s = s.replace(
    "function migrateOldChat(charId) {\n  const oldFile = path.join(CHATS_DIR, `${charId}.json`);",
    "function migrateOldChat(charId, username) {\n  const oldFile = path.join(userChatsDir(username), `${charId}.json`);"
)
s = s.replace(
    "const existingSessions = readSessions(charId);",
    "const existingSessions = readSessions(charId, username);"
)
s = s.replace(
    "writeSessions(charId, [session]);",
    "writeSessions(charId, username, [session]);"
)
s = s.replace(
    "function ensureDefaultSession(charId) {\n  const sessions = readSessions(charId);",
    "function ensureDefaultSession(charId, username) {\n  const sessions = readSessions(charId, username);"
)
s = s.replace(
    "writeSessions(charId, [session]);",
    "writeSessions(charId, username, [session]);"
)

# 6. Chat endpoints - update migrateOldChat and ensureDefaultSession calls
s = s.replace(
    "migrateOldChat(req.params.id);\n  const sessions = readSessions(req.params.id);",
    "migrateOldChat(req.params.id, req.username);\n  const sessions = readSessions(req.params.id, req.username);"
)
s = s.replace(
    "ensureDefaultSession(req.params.id);",
    "ensureDefaultSession(req.params.id, req.username);"
)
s = s.replace(
    "let sessions = readSessions(req.params.id);",
    "let sessions = readSessions(req.params.id, req.username);"
)
s = s.replace(
    "writeSessions(req.params.id, sessions);",
    "writeSessions(req.params.id, req.username, sessions);"
)

# 7. Config endpoints
s = s.replace(
    "res.json(readJSON(path.join(DATA_DIR, 'config.json')) || {});",
    "res.json(readJSON(userConfigFile(req.username)) || {});"
)
s = s.replace(
    "const existing = readJSON(path.join(DATA_DIR, 'config.json')) || {};",
    "const existing = readJSON(userConfigFile(req.username)) || {};"
)
s = s.replace(
    "writeJSON(path.join(DATA_DIR, 'config.json'), existing);",
    "writeJSON(userConfigDir(req.username), existing);"
)

# Wait, config file doesn't need a separate dir - it's in user dir
s = s.replace(
    "writeJSON(userConfigDir(req.username), existing);",
    "writeJSON(userConfigFile(req.username), existing);"
)

# 8. Upload endpoint - UPLOADS_DIR
s = s.replace(
    "const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');",
    ""
)
s = s.replace(
    "destination: (req, file, cb) => cb(null, UPLOADS_DIR),",
    "destination: (req, file, cb) => {\n    const dir = path.join(USERS_DIR, req.username || 'admin', 'uploads');\n    ensureDir(dir);\n    cb(null, dir);\n  },"
)

# 9. Uploads static serving
s = s.replace(
    "app.use('/uploads', express.static(UPLOADS_DIR));",
    "app.use('/uploads', (req, res, next) => {\n  // 从token解析用户\n  const token = req.headers['x-auth-token'];\n  const username = (token && authTokens[token]) ? authTokens[token].username : 'admin';\n  express.static(userUploadsDir(username))(req, res, next);\n});"
)

# 10. Add user config dir helper (might be needed)
s = s.replace(
    "const USERS_DIR = path.join(__dirname, 'data', 'users');",
    "const USERS_DIR = path.join(__dirname, 'data', 'users');\nconst DATA_DIR = path.join(__dirname, 'data');"
)

# Clean up duplicate DATA_DIR
lines = s.split('\n')
filtered = []
seen_data_dir = False
for line in lines:
    if 'const DATA_DIR' in line and seen_data_dir:
        continue
    if 'const DATA_DIR' in line:
        seen_data_dir = True
    filtered.append(line)
s = '\n'.join(filtered)

with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', 'w', encoding='utf-8') as f:
    f.write(s)

print('Done')
