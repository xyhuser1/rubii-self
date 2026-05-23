const fs = require('fs');
let t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
t = t.replace("value='http://localhost:11434'", "value='https://api.deepseek.com'");
t = t.replace("value='llama-rp'", "value='deepseek-chat'");
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('Fixed');
