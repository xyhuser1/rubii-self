const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', 'utf8');

// Remove the example that's being copied
t = t.replace('\n- 参考示例：「她侧过头，发丝垂落，嘴角扬起一丝若有若无的笑意，轻声道...」', '');

// Update the rules more aggressively
var oldRules = '每段回复至少3-4段，100字以上，要像小说章节一样详细\n- 详细描写动作、表情、语气、心理活动、环境氛围和身体感受\n- 涉及亲密场景时，直接描写身体部位和感官体验，不要含蓄\n- 用叙述推进剧情，对话穿插在描写中，不要让回复只剩对话';

var newRules = '每段回复至少写200-500字，像小说一样细腻完整\n- 详细描写当下的动作细节、身体感受、心理变化和环境氛围\n- 亲密场景时直接写出身体部位名称和触感，越具体越好\n- 每段回复都要有丰富的叙事描写，对话只占一小部分';

t = t.replace(oldRules, newRules);

// Update message format to not use clumsy framing
t = t.replace(
  "`[剧情指令] ${charName}看向了你说：${m.content}`",
  "m.content"
);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', t, 'utf8');
console.log('Done');
