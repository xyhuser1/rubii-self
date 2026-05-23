var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find the exact position of the onchange handler
var searchFor = 'EFILE';
var idx = t.indexOf(searchFor);

// Extract the surrounding text and find the onchange content
// The issue: $('EA') and T('图片已加载') inside a single-quoted JS string
// Fix: change to use double quotes or escape

// Strategy: replace inline onchange with a simpler onclick that calls a function
// But simplest: just replace the inner quotes with escaped ones

var problem1 = "$('EA')";
var problem2 = "T('图片已加载')";
var fix1 = "$(\\'EA\\')";  
var fix2 = "T(\\'图片已加载\\')";

// These are ASCII-safe replacements
if (t.indexOf(problem1) >= 0) {
  t = t.split(problem1).join(fix1);
  t = t.split(problem2).join(fix2);
  fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
  console.log('Replaced');
} else {
  console.log('Problem not found');
}

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS OK'); }
catch (e) { console.log('Error:', e.message); }
