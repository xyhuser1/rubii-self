var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');
// Find the RW function and replace it
var start = t.indexOf('function RW(');
var end = t.indexOf('function AD(', start);
var oldRw = t.slice(start, end);
var newRw = 'function RW(i){if(i!==undefined)M=M.slice(0,i+1);else if(M[M.length-1].role==="assistant")M.pop();else{T("\u65e0\u6cd5\u91cd\u5199");return}RR();var last=M[M.length-1];if(last&&last.role==="user"){$("IN").value=last.content;SD()}else{T("\u65e0\u6cd5\u91cd\u5199")}}\n';
t = t.slice(0, start) + newRw + t.slice(end);
fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('RW updated');
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
