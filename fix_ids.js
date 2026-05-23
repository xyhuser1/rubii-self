var fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// Fix all bare references to element IDs - need quotes
var fixes = {
  '$(HM)': "$('HM')",
  '$(MS)': "$('MS')", 
  '$(EM)': "$('EM')",
  '$(SK)': "$('SK')",
  '$(SU)': "$('SU')",
  '$(SM)': "$('SM')",
  '$(SBG)': "$('SBG')",
  '$(EA)': "$('EA')",
  '$(EN)': "$('EN')",
  '$(ED2)': "$('ED2')",
  '$(EP)': "$('EP')",
  '$(EG)': "$('EG')",
  '$(EF)': "$('EF')",
  '$(IN)': "$('IN')",
  '$(SD)': "$('SD')",
  '$(SK).value': "$('SK').value",
};

for (var old in fixes) {
  while (t.indexOf(old) >= 0) {
    t = t.replace(old, fixes[old]);
  }
}

// But the SD function has var sd=$(SD) which conflicts with the function name SD
// The send button id is SD, but the function is also called SD
// Fix: rename the element ID from SD to SB
t = t.replace('id="SD"', 'id="SB"');
t = t.replace('$(SD)', "$('SB')");
t = t.replace('$(SB).disabled', "$('SB').disabled");

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');

// Verify
var m = t.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('JS: OK'); }
catch (e) { console.log('Error:', e.message); }
