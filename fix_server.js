const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', 'utf8');
// Match the system prompt block - we know it starts with "【创作规则】"
var idx = t.indexOf('【创作规则】');
if (idx < 0) { console.log('Not found'); process.exit(1); }
var endIdx = t.indexOf('`;', idx);
if (endIdx < 0) { console.log('End not found'); process.exit(1); }
var oldBlock = t.slice(idx, endIdx);
var newBlock = oldBlock.replace(
  '用对话、动作、心理描写推进剧情，语言自然生动',
  '每次回复都像写小说一样：详细描写动作、表情、语气、心理活动和环境氛围\n- 用叙述推进剧情，对话穿插在描写中，不要让回复只剩对话'
);
newBlock = newBlock.replace(
  '不要跳脱角色身份',
  '不要跳脱角色身份\n- 参考示例：「她侧过头，发丝垂落，嘴角扬起一丝若有若无的笑意，轻声道...」'
);
t = t.slice(0, idx) + newBlock + t.slice(endIdx);
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', t, 'utf8');
console.log('OK');
