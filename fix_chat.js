const fs = require('fs');
var t = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', 'utf8');

// 1. Fix fallback emoji from '??' to '🤖'
t = t.replace("sel2?sel2.textContent:'??'", "sel2?sel2.textContent:'🤖'");

// 2. Add avatar helper function and update RENDER for chat avatars + background
var renderFunc = t.indexOf('function RENDER()');
var renderEnd = t.indexOf('function SEND()');
var renderCode = t.slice(renderFunc, renderEnd);

var newRenderCode = `function avt(a){return a&&a.indexOf('http')===0?'<img src=\"'+a+'\" style=\"width:36px;height:36px;border-radius:50%;object-fit:cover\">':(a||'🤖')}
function RENDER(){
  var c=$('MS'),e=$('EM');if(!c)return;
  if(M.length===0){if(e){c.innerHTML='';c.appendChild(e);e.style.display='block'}return}
  if(e)e.style.display='none';
  var ch=null;for(var i=0;i<C.length;i++){if(C[i].id===CID){ch=C[i];break}}
  var n=ch?ch.name:'AI';var a=ch?ch.avatar:'';
  var bg=localStorage.getItem('chatBg')||'';
  var bgStyle=bg?' style=\"background-image:url('+bg+');background-size:cover;background-position:center\"':'';
  var h='';
  for(var i=0;i<M.length;i++){var m=M[i];
    if(m.role==='user'||m.role==='u'){
      h+='<div class=\"msg-row u-row\"><div class=\"msg u\"><div>'+E(m.content)+'</div></div><div class=\"uav\">&#128100;</div></div>';
    }else{
      h+='<div class=\"msg-row a-row\"><div class=\"aav\">'+avt(a)+'</div><div class=\"msg a\"><div class=\"sn\">'+E(n)+'</div><div>'+E(m.content).replace(/\\n/g,'<br>')+'</div></div></div>';
    }
  }
  if(bg){c.innerHTML='<div'+bgStyle+'>'+h+'</div>'}else{c.innerHTML=h}
  c.scrollTop=c.scrollHeight;
}`;

t = t.slice(0, renderFunc) + newRenderCode + t.slice(renderEnd);

// 3. Add background setting to SET function
t = t.replace(
  " '<div class=\"fg\"><label>记忆增强(条数)</label><input id=\"SH\" type=\"number\" value=\"100\" min=\"10\" max=\"200\"></div>'+",
  " '<div class=\"fg\"><label>记忆增强(条数)</label><input id=\"SH\" type=\"number\" value=\"100\" min=\"10\" max=\"200\"></div>'+'<div class=\"fg\"><label>聊天背景图URL</label><input id=\"SBG\" value=\"'+(localStorage.getItem('chatBg')||'')+'\" placeholder=\"留空=默认\"></div>'+"
);

// 4. Update SAVES to save background
t = t.replace(
  "if(m){DEF_MODEL=m;}\n  // Save to server",
  "if(m){DEF_MODEL=m;}\n  var bg=$('SBG').value.trim();if(bg!==undefined){localStorage.setItem('chatBg',bg||'')}\n  // Save to server"
);

// 5. Add CSS for message rows and avatars
var cssInsert = '.msg-row{display:flex;align-items:flex-end;gap:8px;margin-bottom:8px}.u-row{justify-content:flex-end}.a-row{justify-content:flex-start}.uav{width:32px;height:32px;border-radius:50%;background:#2a2a36;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}.aav{width:32px;height:32px;border-radius:50%;background:rgba(124,111,239,.12);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}.aav img{width:32px;height:32px;border-radius:50%;object-fit:cover}';
t = t.replace('.inp .sd:disabled{opacity:.4}', '.inp .sd:disabled{opacity:.4}' + cssInsert);

fs.writeFileSync('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html', t, 'utf8');
console.log('OK');
