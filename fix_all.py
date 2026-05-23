s = open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','r',encoding='utf-8').read()

# CHARS_DIR replacements
s = s.replace("path.join(CHARS_DIR, f));\n        if (c) chars.pus", "path.join(userCharsDir(req.username), f));\n        if (c) chars.pus")
s = s.replace("const charFile = path.join(CHARS_DIR, `${req.params.id}.json`);", "const charFile = path.join(userCharsDir(req.username), `${req.params.id}.json`);")
s = s.replace("const char = readJSON(path.join(CHARS_DIR, `${req.params.id}.json`));", "const char = readJSON(path.join(userCharsDir(req.username), `${req.params.id}.json`));")

# CHATS_DIR replacements
s = s.replace("const files = fs.readdirSync(CHATS_DIR).filter(f => f.endsWith('.json", "// migrated to user system")
s = s.replace("const oldChatFile = path.join(CHATS_DIR, `${req.params.id}.json`);", "const oldChatFile = path.join(userChatsDir(req.username), `${req.params.id}.json`);")
s = s.replace("const f = path.join(CHATS_DIR, req.params.id, 'sessions', s.", "const f = path.join(userChatsDir(req.username), req.params.id, 'sessions', s.")

# Delete old charChatDir reference
s = s.replace("const charChatDir = path.join(CHATS_DIR, req.params.id);\n  if (fs.exis", "// user-specific\n  const charChatDir = path.join(userChatsDir(req.username), req.params.id);\n  if (fs.exis")

open('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js','w',encoding='utf-8').write(s)
print('Fixed')
