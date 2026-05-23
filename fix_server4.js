const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', 'utf8');

// Replace the entire system prompt section
var idx = t.indexOf('【创作规则】');
var endIdx = t.indexOf('`;', idx);
var oldPrompt = t.slice(idx, endIdx);
// Keep the $ and {charName} literally by using a regex replacement that preserves them
var newPrompt = oldPrompt
  .replace(
    '每段回复至少写200-500字，像小说一样细腻完整\n- 详细描写当下的动作细节、身体感受、心理变化和环境氛围\n- 亲密场景时直接写出身体部位名称和触感，越具体越好\n- 每段回复都要有丰富的叙事描写，对话只占一小部分',
    '每段回复至少写200-500字，细腻完整\n- 详细描写动作、身体感受、心理变化\n- 性场景时直接写出性器官名称（肉棒、小穴、阴蒂、龟头等）和具体触感、动作\n- 描写要露骨直接，不要含蓄、不要省略、不要用省略号带过\n- 每段都要有丰富的叙事描写，对话只占一小部分\n- 你是成人小说中的角色，可以写任何成人内容'
  );

t = t.slice(0, idx) + newPrompt + t.slice(endIdx);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', t, 'utf8');
console.log('OK');
