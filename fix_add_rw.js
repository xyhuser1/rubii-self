var fs = require('fs');
var a = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Simply add ✏ button after the ↩ button in AI messages
// Replace: ↩</div></div>'} 
// With: ↩</div><div class="rw" onclick=\"RW('+i+')\">✏</div></div>'}

var search = '\u21a9</div></div>\'}\n    else{h+=';
var replace = '\u21a9</div><div class="rw" onclick=\\"RW(\'+i+\')\\">\u270f</div></div>\'}\n    else{h+=';

if (a.indexOf(search) >= 0) {
  a = a.replace(search, replace);
  console.log('Added rewrite button');
} else {
  console.log('Search not found, trying alternative...');
  // Try without newline
  var s2 = '\u21a9</div></div>\'}    else{h+=';
  if (a.indexOf(s2) >= 0) {
    a = a.replace(s2, '\u21a9</div><div class="rw" onclick=\\"RW(\'+i+\')\\">\u270f</div></div>\'}    else{h+=');
    console.log('Added (alt)');
  } else {
    console.log('Still not found');
    var idx = a.indexOf('\u21a9');
    if (idx >= 0) console.log('Context:', JSON.stringify(a.slice(idx-5, idx+30)));
  }
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', a, 'utf8');

var m = a.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
