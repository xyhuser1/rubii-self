var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// 1. Update BW to also clear server chat
var oldBw = "function BW(i){i=parseInt(i);M=M.slice(0,i+1);RR();T(\"\\u5df2\\u56de\\u6eaf\\u5230\\u8be5\\u5904\");}";
var newBw = "function BW(i){i=parseInt(i);M=M.slice(0,i+1);RR();API('POST','/api/characters/'+CID+'/chat/clear').catch(function(){});T(\"\\u5df2\\u56de\\u6eaf\");}";
t = t.replace(oldBw, newBw);

// 2. Add rewrite button to each AI message (similar to the ↩ button)
// Find the AI message template and add rewrite button
var aiMsg = "h+='<div class=\\\"msg-row a-row\\\"><div class=\\\"aav\\\">'+avt(a,32)+'</div><div class=\\\"msg a\\\"><div class=\\\"sn\\\">'+E(n)+'</div><div>'+E(m.content).replace(/\\n/g,'<br>')+'</div></div><div class=\\\"rw\\\" onclick=\\\"BW('+i+')\\\">\\u21a9</div></div>'";
var newAiMsg = aiMsg.replace('\\u21a9</div></div>', '\\u21a9</div><div class=\\"rw\\" onclick=\\"RW('+i+')\\">\\u270f</div></div>');

// Find and replace - use the actual character encoding
t = t.replace(
  "h+='<div class=\"msg-row a-row\"><div class=\"aav\">'+avt(a,32)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\n/g,'<br>')+'</div></div><div class=\"rw\" onclick=\"BW('+i+')\">↩</div></div>'",
  "h+='<div class=\"msg-row a-row\"><div class=\"aav\">'+avt(a,32)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\n/g,'<br>')+'</div></div><div class=\"rw\" onclick=\"BW('+i+')\">↩</div><div class=\"rw\" onclick=\"RW('+i+')\">✏</div></div>'"
);

// 3. Update RW function to accept index parameter
var oldRw = t.match(/function RW\(\).*?[^}]*\n\}/);
if (oldRw) {
  var rwCode = oldRw[0];
  var newRwCode = "function RW(i){if(i===undefined){if(!CID||M.length<2||M[M.length-1].role!=='assistant'){T('\\u6ca1\\u6709\\u53ef\\u91cd\\u5199\\u7684\\u56de\\u590d');return}}else{var found=false;for(var j=i;j<M.length;j++){if(M[j].role==='assistant'){M=M.slice(0,j);found=true;break}}if(!found){T('\\u65e0\\u6cd5\\u91cd\\u5199');return}}RR();var last=M[M.length-1];if(last&&last.role==='user'){var inp=$(IN);if(inp)inp.value=last.content;SD()}else{T('\\u65e0\\u6cd5\\u91cd\\u5199')}}";
  t = t.replace(rwCode, newRwCode);
}

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
