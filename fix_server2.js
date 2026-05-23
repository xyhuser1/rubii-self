const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', 'utf8');

// Fix 1: Update the creative rules section
var oldRule = '每次回复都像写小说一样：详细描写动作、表情、语气、心理活动和环境氛围\n- 用叙述推进剧情，对话穿插在描写中，不要让回复只剩对话';
var newRule = '每段回复至少3-4段，100字以上，要像小说章节一样详细\n- 详细描写动作、表情、语气、心理活动、环境氛围和身体感受\n- 涉及亲密场景时，直接描写身体部位和感官体验，不要含蓄\n- 用叙述推进剧情，对话穿插在描写中，不要让回复只剩对话';

if (t.indexOf(oldRule) >= 0) {
  t = t.replace(oldRule, newRule);
  console.log('Rule updated');
}

// Fix 2: Add max_tokens parameter
var oldBody = 'temperature,\n        stream: false\n      }),\n      signal: controller.signal\n    });';
var newBody = 'temperature,\n        max_tokens: 1024,\n        stream: false\n      }),\n      signal: controller.signal\n    });';

if (t.indexOf(oldBody) >= 0) {
  t = t.replace(oldBody, newBody);
  console.log('max_tokens added');
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/server.js', t, 'utf8');
console.log('Done');
