var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find all avatar display related code
var positions = [];
var idx = 0;
while ((idx = t.indexOf('<div class="av">', idx)) >= 0) {
  positions.push(idx);
  idx++;
}
console.log('Found', positions.length, 'avatar displays');
for (var i = 0; i < positions.length; i++) {
  console.log('Pos', positions[i], ':', t.slice(positions[i], positions[i] + 250));
}
