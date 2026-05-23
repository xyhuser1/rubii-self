var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
var i = t.indexOf('function BW');
var end = t.indexOf('function BC', i);
var oldBw = t.slice(i, end);
var newBw = "function BW(i){if(i===undefined){if(!CID||M.length<2)return;var n=prompt(\"\u56de\u6eaf\u5230\u7b2c\u51e0\u6761\uff1f(1-\"+M.length+\")\");n=parseInt(n);if(!n||n<1||n>M.length)return;i=n-1}M=M.slice(0,i+1);RR();T(\"\u5df2\u56de\u6eaf\u5230\u8be5\u5904\");}\n";
t = t.slice(0, i) + newBw + t.slice(end);
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('BW replaced');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
