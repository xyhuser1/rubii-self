var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Find the RR function and SD function boundaries
var rrS = t.indexOf('function RR(');
var sdS = t.indexOf('function SD(');

// Read what's currently between them
var current = t.slice(rrS, sdS);

// Find the regex issue - scan for line with "replace" near a newline
var lines = current.split('\n');
var fixedLines = [];
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  // Fix broken regex: if line has "replace(/" and "...',<br>')" on different conceptual lines
  if (line.indexOf("replace(/") >= 0 && line.indexOf("/g,'<br>')") < 0) {
    // This line has the start of replace but not the end - combine with next line
    line = line.trim() + lines[i+1].trim();
    // Replace the broken newline-based regex with the correct one
    var parts = line.split("/g,'<br>')");
    if (parts.length >= 2) {
      line = "    else{h+='<div class=\"msg-row a-row\"><div class=\"aav\">'+avt(a,32)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\\n/g,'<br>')+'</div></div><div class=\"rw\" onclick=\"BW('+i+')\">↩</div><div class=\"rw\" onclick=\"RW('+i+')\">✏</div></div>'}";
    }
    fixedLines.push(line);
    i++; // skip next line
  } else {
    fixedLines.push(line);
  }
}

var fixed = fixedLines.join('\n');
t = t.slice(0, rrS) + fixed + t.slice(sdS);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
