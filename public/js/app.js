
var K='',C=[],CID=null,M=[],S=false;
var AV='🤖😺🦊🐰🐻🐲🦋🌸👾🎭🧙🧝🦸🧛👻🤠💃🎸🕵️🧚🧜🦄🐉🦅🐺🦁🐯🌙☀️⭐🌺🌻🔥⚡💎🔮⚔️🏹👑🎩🥷🗻🏯⛩️🌊�?.split('');
function $(i){return document.getElementById(i)}
function T(m){var e=document.querySelector('.toast');if(e)e.remove();e=document.createElement('div');e.className='toast';e.textContent=m;document.body.appendChild(e);setTimeout(function(){e.remove()},3000)}
function E(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
/* ── 登录 ── */
function getToken(){return localStorage.getItem('rubii_token')||''}
function API(m,u,b){var o={method:m,headers:{'Content-Type':'application/json','x-auth-token':getToken()}};if(b)o.body=JSON.stringify(b);return fetch(u,o).then(function(r){return r.json().then(function(d){if(r.status==401){showLogin();throw new Error('请先登录')}if(!r.ok)throw new Error(d.error);return d})})}
function showLogin(){
  $('app').innerHTML='<div style="height:100%;display:flex;align-items:center;justify-content:center;padding:20px"><div style="background:#1e1e26;border-radius:16px;padding:30px;width:280px;text-align:center"><h1 style="font-size:24px;margin-bottom:4px">Rubii Self</h1><p style="color:#9a8f8a;font-size:13px;margin-bottom:20px" id="login-hint">登录</p><input id="login-user" type="text" placeholder="用户�? style="width:100%;padding:10px 14px;border-radius:12px;background:rgba(255,255,255,.05);color:#e8e0dd;border:1px solid rgba(255,255,255,.06);font-size:14px;outline:none;margin-bottom:8px"><input id="login-pw" type="password" placeholder="密码" style="width:100%;padding:10px 14px;border-radius:12px;background:rgba(255,255,255,.05);color:#e8e0dd;border:1px solid rgba(255,255,255,.06);font-size:14px;outline:none;margin-bottom:12px"><button onclick="doLogin()" style="width:100%;padding:12px;background:#d4c5c0;color:#2a1f1c;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;margin-bottom:8px">登录</button><button onclick="doReg()" style="width:100%;padding:10px;background:transparent;color:#9a8f8a;border:1px solid rgba(255,255,255,.06);border-radius:12px;font-size:13px;cursor:pointer">注册新账�?/button></div></div>';$('login-user').focus();$('login-pw').addEventListener('keydown',function(e){if(e.key=='Enter')doLogin()})
}
function doLogin(){
  var user=$('login-user').value.trim();var pw=$('login-pw').value.trim();if(!user||!pw)return;
  fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:user,password:pw})}).then(function(r){return r.json()}).then(function(d){if(d.token){localStorage.setItem('rubii_token',d.token);localStorage.setItem('rubii_user',d.username);initApp()}else{T(d.error||'登录失败')}}).catch(function(e){T('连接失败')})
}
function doReg(){
  var user=$('login-user').value.trim();var pw=$('login-pw').value.trim();if(!user||!pw){T('请输入用户名和密�?);return}
  fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:user,password:pw})}).then(function(r){return r.json()}).then(function(d){if(d.token){localStorage.setItem('rubii_token',d.token);localStorage.setItem('rubii_user',d.username);T('注册成功�?);initApp()}else{T(d.error||'注册失败')}}).catch(function(e){T('连接失败')})
}
function initApp(){API('GET','/api/config').then(function(c){if(c.apiKey)K=c.apiKey;DU=c.baseUrl||DU;DM=c.model||DM;HOME()}).catch(function(){HOME()})}
var DU='https://api.deepseek.com';var DM='deepseek-chat';
function ga(){var u=$('SU');return u&&u.value?u.value:DU}
function gm(){var m=$('SM');return m&&m.value?m.value:DM}

/* ── 本机图片上传 ── */
function UP(id){
  if(!id)id='SBG';
  var inp=document.createElement('input');inp.type='file';inp.accept='image/*';
  inp.onchange=function(){
    var f=inp.files[0];if(!f)return;
    var fd=new FormData();fd.append('image',f);
    fetch('/api/upload',{method:'POST',headers:{'x-auth-token':getToken()},body:fd}).then(function(r){return r.json().then(function(d){return{ok:r.ok,data:d}})}).then(function(resp){
      if(resp.ok&&resp.data.url){
        var url=location.origin+resp.data.url;
        if(id=='SBG'){localStorage.setItem('cbg',url);T('�?背景已更�?);}
        else{var el=$(id);if(el)el.value=url;T('�?上传成功');}
      }else{T('�?'+(resp.data.error||'上传失败'))}
    }).catch(function(e){T('�?'+e.message)});
  };inp.click()
}

/* ── 启动 ── */
if(getToken())initApp();else showLogin();

function HOME(){
  $('app').innerHTML='<div class="hdr"><h1>Rubii Self</h1><button class="btn" onclick="SH()" id="btn-hist">📋</button><button class="btn" onclick="TF()" id="btn-fav">�?/button><button class="btn" onclick="SET()">�?/button></div><div class="main" id="HM"></div>';LH()
}
var _showFav=false;
function TF(){
  // 像历史一样打开收藏页面
  var fav=C.filter(function(c){return c.fav});
  if(!fav.length){T('还没有收藏的角色');return}
  var h='<div class="hdr"><button class="btn" onclick="HOME()">�?/button><h1>�?收藏角色</h1><button class="btn" style="visibility:hidden"> </button></div><div class="main">';
  for(var i=0;i<fav.length;i++){
    var ch=fav[i];
    var av=ch.avatar||'🤖';if(av.indexOf('http')===0)av='<img src="/api/proxy-image?url='+encodeURIComponent(av)+'" style="width:48px;height:48px;border-radius:12px;object-fit:cover">';
    h+='<div class="card" onclick="OC(\''+ch.id+'\')" style="flex-direction:row;padding:12px 16px;align-items:center;gap:14px"><div style="flex-shrink:0;width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:#ebe3df;font-size:24px">'+av+'</div><div style="flex:1"><div class="nm" style="font-size:16px;margin-bottom:2px">'+E(ch.name)+'</div><div class="ds">'+E(ch.description||'')+'</div></div></div>';
  }
  $('app').innerHTML=h;
}
function SH(){
  API('GET','/api/characters').then(function(chars){
    var ps=[];
    chars.forEach(function(ch){ps.push(API('GET','/api/characters/'+ch.id+'/sessions').then(function(ss){return{ch:ch,sessions:ss}}))});
    Promise.all(ps).then(function(data){
      var h='<div class="hdr"><button class="btn" onclick="HOME()">�?/button><h1>历史对话</h1><button class="btn" style="visibility:hidden"> </button></div><div class="main">';
      var hasAny=false;
      data.forEach(function(d){
        if(!d.sessions.length)return;
        hasAny=true;
        d.sessions.forEach(function(s){
          var av=d.ch.avatar||'🤖';if(av.indexOf('http')===0)av='<img src="/api/proxy-image?url='+encodeURIComponent(av)+'" style="width:40px;height:40px;border-radius:10px;object-fit:cover">';
          var lm=s.lastMsg||'';
          var cid2=d.ch.id;var sid2=s.id;var cnm2=E(d.ch.name);var snm2=E(s.name);
          h+='<div class="card" style="flex-direction:row;padding:10px 12px;align-items:center;gap:10px"><div style="flex-shrink:0;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#ebe3df;font-size:20px" onclick="selectSession(\''+cid2+'\',\''+sid2+'\')">'+av+'</div><div style="flex:1;min-width:0;cursor:pointer" onclick="selectSession(\''+cid2+'\',\''+sid2+'\')"><div style="font-size:14px;font-weight:600;color:#2a1f1c;margin-bottom:2px">'+cnm2+' · '+snm2+'</div><div style="font-size:12px;color:#8a7a75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+E(lm)+'</div></div><div style="flex-shrink:0;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#cc8888;font-size:16px" onclick="event.stopPropagation();delSession(\''+cid2+'\',\''+sid2+'\')">�?/div></div>'});
      });
      if(!hasAny)h+='<div class="emp"><h3>暂无历史</h3><p>开始聊天后这里会显�?/p></div>';
      $('app').innerHTML=h;
    })
  }).catch(function(e){T('删除失败')})
}
function toggleFav(id){
  T('切换收藏...');
  for(var i=0;i<C.length;i++){if(C[i].id===id){C[i].fav=!C[i].fav;break}}
  if(i>=C.length){T('角色未找�?);return}
  T(C[i].fav?'�?已收�?:'取消收藏');
  var l=C.slice();if(_showFav)l=l.filter(function(c){return c.fav});l.sort(function(a,b){return(b.fav?1:0)-(a.fav?1:0)});renderGrid(l);
  fetch('/api/characters/'+id,{method:'PUT',headers:{'Content-Type':'application/json','x-auth-token':getToken()},body:JSON.stringify({fav:C[i].fav})}).then(function(r){if(r.status==401)showLogin()})
}
function renderGrid(l){
  var c=$('HM');if(!c)return;
  if(!l.length){c.innerHTML=_showFav?'<div class="emp"><h3>还没有收�?/h3><p>点卡片上的星标收藏角�?/p></div>':'<div class="emp"><h3>还没有角�?/h3><p>创建角色开始聊�?/p><button class="btn-p" onclick="ED()">+ 创建角色</button></div>';return}
  var h='<div class="grid">';
  for(var i=0;i<l.length;i++){var ch=l[i];
    var av=ch.avatar||'🤖';if(av.indexOf('http')===0)av='<img src="/api/proxy-image?url='+encodeURIComponent(av)+'">';
    var star=ch.fav?'�?:'�?;
    h+='<div class="card"><button class="fav-btn" onclick="event.stopPropagation();toggleFav(\''+ch.id+'\')" style="position:absolute;top:6px;right:8px;background:none;border:none;font-size:20px;cursor:pointer;color:'+(ch.fav?'#e8b84b':'#c0b6b2')+';z-index:2;line-height:1">'+star+'</button><div onclick="OC(\''+ch.id+'\')"><div class="av">'+av+'</div><div class="nm" style="padding:6px 12px 0">'+E(ch.name)+'</div><div class="ds">'+E(ch.description||'')+'</div></div><div class="ac"><button class="btn" onclick="event.stopPropagation();ED(\''+ch.id+'\')">�?/button><button class="btn" onclick="event.stopPropagation();DL(\''+ch.id+'\')">�?/button></div></div>';}
  h+='</div><div style="padding:0 16px 24px;display:flex;flex-direction:column;gap:8px"><button class="btn-p" onclick="ED()">+ 创建角色</button><div style="display:flex;gap:8px"><button class="btn" onclick="QC()" style="flex:1;padding:12px;background:rgba(255,255,255,.06);border:none;color:#c0b6b2;border-radius:14px;font-size:13px;cursor:pointer">�?快速创�?/button><button class="btn" onclick="IMP()" style="flex:1;padding:12px;background:rgba(255,255,255,.06);border:none;color:#c0b6b2;border-radius:14px;font-size:13px;cursor:pointer">📥 导入角色�?/button></div></div>';c.innerHTML=h
}
function LH(){API('GET','/api/characters').then(function(l){C=l;if(_showFav)l=l.filter(function(c){return c.fav});l.sort(function(a,b){return(b.fav?1:0)-(a.fav?1:0)});renderGrid(l)}).catch(function(){})}

function selectSession(cid,sid){OC(cid);setTimeout(function(){setCurrentSessionId(sid);LC()},100)}
function delSession(cid,sid){if(!confirm('确定删除�?))return;API('DELETE','/api/characters/'+cid+'/sessions/'+sid).then(function(){SH()}).catch(function(e){T('删除失败')})}function getCurrentSessionId(){var k='cs_'+CID;var v=localStorage.getItem(k);return v||'default'}
function setCurrentSessionId(sid){localStorage.setItem('cs_'+CID,sid)}
function loadSessions(){var ss=[];try{var x=new XMLHttpRequest();x.open('GET','/api/characters/'+CID+'/sessions',false);x.setRequestHeader('x-auth-token',getToken());x.send();if(x.status===200)ss=JSON.parse(x.responseText)}catch(e){}return ss}
function switchSession(){var sel=$('SS');if(!sel)return;setCurrentSessionId(sel.value);LC()}
function NS(){if(!confirm('新建一个空白新会话？之前的会话还在，可以随时切换回来�?))return;API('POST','/api/characters/'+CID+'/sessions',{name:'新会�?+(Math.random()*100|0)}).then(function(s){setCurrentSessionId(s.id);OC(CID)}).catch(function(){T('创建失败')})}
function deleteSession(sid){if(!confirm('删除该会话？'))return;API('DELETE','/api/characters/'+CID+'/sessions/'+sid).then(function(){if(sid===getCurrentSessionId())setCurrentSessionId('default');OC(CID)}).catch(function(){})}
function renameSession(){var sid=$('SS')?$('SS').value:null;if(!sid)return;var nn=prompt('会话�?');if(!nn||!nn.trim())return;API('PUT','/api/characters/'+CID+'/sessions/'+sid,{name:nn.trim()}).then(function(){OC(CID)}).catch(function(){T('重命名失�?)})}

function OC(id){CID=id;var ch=null;for(var i=0;i<C.length;i++){if(C[i].id===id){ch=C[i];break}}
  var g='';if(ch)g=ch.greeting||'你好，我�?+ch.name;
  $('app').innerHTML='<div class="hdr"><button class="btn" onclick="BC()">�?/button><h1>'+(ch?E(ch.name):'Chat')+'</h1><button class="btn" onclick="NS()">+</button><button class="btn" onclick="SH()">📋</button><button class="btn" onclick="ED(\''+id+'\')">�?/button></div><div class="msgs" id="MS"><div class="emp" id="EM"><h3>开始聊�?/h3><p>'+E(g)+'</p></div></div><div class="ar"><button class="btn" onclick="CC()">🗑 清空</button><button class="btn" onclick="AD()">�?推进</button><button class="btn" onclick="EX()">📥 导出</button></div><div class="inp"><textarea id="IN" rows="1" placeholder="输入消息..." maxlength="5000"></textarea><button class="sd" id="SB" onclick="SD()">�?/button></div>';LC()}
function LC(){var sid=getCurrentSessionId();API('GET','/api/characters/'+CID+'/chat?sessionId='+sid).then(function(msgs){M=msgs;RR()}).catch(function(){})}

function avt(a,s){if(a&&(a.indexOf('http')===0||a.indexOf('/uploads/')===0)){if(a.indexOf('http')===0)return'<img src="/api/proxy-image?url='+encodeURIComponent(a)+'" style="width:'+s+'px;height:'+s+'px;border-radius:50%;object-fit:cover">';return'<img src="'+a+'" style="width:'+s+'px;height:'+s+'px;border-radius:50%;object-fit:cover">'}return a||'🤖'}

/* 台词高亮：给AI回复中的对话加颜色区�?*/
function H(t){
  var s = E(t);
  s = s.replace(/\u300c([^\u300d]+)\u300d/g,"<span class='dlg-talk'>\u300c$1\u300d</span>");
  s = s.replace(/\u201c([^\u201d]+)\u201d/g,"<span class='dlg-talk'>\u201c$1\u201d</span>");
  s = s.replace(/\x22([^\x22]*)\x22/g,"<span class='dlg-talk'>\x22$1\x22</span>");
  s = s.replace(/\u300e([^\u300f]+)\u300f/g,"<span class='dlg-think'>\u300e$1\u300f</span>");
  s = s.replace(/\uff08([^\uff09]+)\uff09/g,"<span class='dlg-narr'>\uff08$1\uff09</span>");
  return s.replace(/\n/g,'<br>');
}

function RR(){var c=$('MS'),e=$('EM');if(!c)return;
  if(!M.length){if(e){c.innerHTML='';c.appendChild(e);e.style.display='block'}return}
  if(e)e.style.display='none';var n='AI',a='',cb='',_s=[];for(var i=0;i<C.length;i++){if(C[i].id===CID){var ch=C[i];n=ch.name;a=ch.avatar||'';cb=ch.chatBg||'';_s=ch.subChars||[];break}}
  var bg=cb||localStorage.getItem('cbg')||'';
  if(bg){if(bg.startsWith('linear-gradient')){c.style.background=bg}else{c.style.backgroundImage='url('+bg+')';c.style.backgroundSize='contain';c.style.backgroundRepeat='no-repeat';c.style.backgroundPosition='center';c.style.backgroundAttachment='fixed'}}else{c.style.backgroundImage='';c.style.backgroundRepeat=''}
  var h='';for(var i=0;i<M.length;i++){var m=M[i],rw='<span class="rw" onclick="BW('+i+')">�?/span>',rw2= m.role!=='user'?'<span class="rw" onclick="RW('+i+')">�?/span>':'';
    if(m.role==='user'){h+='<div class="msg-row u-row"><div class="msg u"><div>'+E(m.content)+'</div></div><div class="uav">👤</div>'+rw+'</div>'}
    else{var _sn=n,_sa=a,_tx=m.content;var _mt=_tx.match(/�?[^】]+)�?);if(_mt&&_s.length){var _mn=_mt[1];for(var _mi=0;_mi<_s.length;_mi++){if(_s[_mi].name===_mn){_sn=_mn;_sa=_s[_mi].avatar||a;break}}}h+='<div class="msg-row a-row"><div class="aav">'+(avt(_sa,30))+'</div><div class="msg a"><div class="sn">'+E(_sn)+'</div><div>'+H(_tx).replace(/�?[^】]+)�?g,'<span style="color:#ffd700;font-weight:700">[$1]</span>')+'</div></div>'+rw+rw2+'</div>'}}c.innerHTML=h;c.scrollTop=c.scrollHeight}

function SD(){var inp=$('IN');if(!inp)return;var msg=inp.value.trim();if(!msg||S||!CID)return;
  inp.value='';S=true;$('SB').disabled=true;M.push({role:'user',content:msg});RR();
  var te=document.createElement('div');te.className='typing';te.innerHTML='<span></span><span></span><span></span>';$('MS').appendChild(te);
  var sid=getCurrentSessionId();
  API('POST','/api/characters/'+CID+'/chat',{message:msg,sessionId:sid,config:{apiKey:K||'local',baseUrl:ga(),model:gm(),temperature:1.0,maxHistory:100}}).then(function(r){
    var t2=$('MS').querySelector('.typing');if(t2)t2.remove();
    M.push({role:'assistant',content:r.reply||''});RR();S=false;$('SB').disabled=false
  }).catch(function(e){var t2=$('MS').querySelector('.typing');if(t2)t2.remove();
    M.push({role:'assistant',content:'�?'+e.message});RR();S=false;$('SB').disabled=false})}
function BC(){CID=null;M=[];HOME()}
function CC(){if(!CID||!confirm('清空对话�?))return;var sid=getCurrentSessionId();API('POST','/api/characters/'+CID+'/chat/clear?sessionId='+sid).then(function(){M=[];RR();T('已清�?)}).catch(function(){})}
function EX(){if(CID){var sid=getCurrentSessionId();window.open('/api/characters/'+CID+'/chat/export?sessionId='+sid,'_blank')}}
function BW(i){M=M.slice(0,i+1);RR();var sid=getCurrentSessionId();API('POST','/api/characters/'+CID+'/chat/rewind?sessionId='+sid+'&index='+i).catch(function(){});T('已回�?)}
function RW(i){if(i!==undefined)M=M.slice(0,i+1);else if(M[M.length-1].role==="assistant")M.pop();else{T("无法重写");return}RR();var last=M[M.length-1];if(last&&last.role==="user"){$("IN").value=last.content;SD()}else{T("无法重写")}}
function AD(){if(!CID||M.length<2)return;$('IN').value='[继续] 接着现在的情节继续往后写�?;SD()}

var _SC=[];
function addSC(){var n,el=document.getElementById('SCN');n=el?el.value.trim():'';var a,el2=document.getElementById('SCA');a=el2?el2.value.trim():'';if(!n){T('请输入角色名');return}_SC.push({name:n,avatar:a||'\uD83E\uDD16'});if(el)el.value='';if(el2)el2.value='';var e3=document.getElementById('SCL');if(e3){var h='';_SC.forEach(function(s,i){var av=s.avatar||'\uD83E\uDD16';if(av.indexOf('http')===0)av='<img src="'+av+'" style="width:20px;height:20px;border-radius:50%;object-fit:cover">';h+='<div style="display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,.08);border-radius:6px;padding:2px 6px;font-size:11px">'+av+'<span>'+E(s.name)+'</span><span onclick="rmSC('+i+')" style="cursor:pointer;color:#ef4444">x</span></div>'});e3.innerHTML=h}}
function rmSC(i){_SC.splice(i,1);addSC()}
function upSC(){var i=document.createElement('input');i.type='file';i.accept='image/*';i.onchange=function(){var f=i.files[0];if(!f)return;var d=new FormData();d.append('image',f);fetch('/api/upload',{method:'POST',headers:{'x-auth-token':getToken()},body:d}).then(function(r){return r.json()}).then(function(j){if(j.url){document.getElementById('SCA').value=location.origin+j.url;T('已上�?)}else{T('上传失败')}}).catch(function(){T('上传失败')})};i.click()}
function ED(id){var ch=null;if(id)for(var i=0;i<C.length;i++){if(C[i].id===id){ch=C[i];break}}_SC=(ch&&ch.subChars)?JSON.parse(JSON.stringify(ch.subChars)):[];setTimeout(function(){var e3=document.getElementById('SCL');if(e3){var h='';_SC.forEach(function(s,i){var av=s.avatar||'\uD83E\uDD16';if(av.indexOf('http')===0)av='<img src="'+av+'" style="width:20px;height:20px;border-radius:50%;object-fit:cover">';h+='<div style="display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,.08);border-radius:6px;padding:2px 6px;font-size:11px">'+av+'<span>'+E(s.name)+'</span><span onclick="rmSC('+i+')" style="cursor:pointer;color:#ef4444">x</span></div>'});e3.innerHTML=h}},100)
  var sel=ch?ch.avatar:'🤖';var ap='<div class="ap">';
  for(var i=0;i<AV.length;i++){ap+='<div class="'+(AV[i]===sel?'s':'')+'" onclick="var p=this.parentNode;p.querySelectorAll(\'div\').forEach(function(d){d.classList.remove(\'s\')});this.classList.add(\'s\')">'+AV[i]+'</div>'}
  $('app').innerHTML='<div class="hdr"><button class="btn" onclick="'+(id&&CID===id?'OC(\''+CID+'\')':'HOME()')+'">�?/button><h1>'+(id?'编辑角色':'创建角色')+'</h1><button class="btn" style="visibility:hidden"> </button></div><div class="main"><form id="EF">'+
    '<div class="fg"><label>头像</label>'+ap+'</div>'+
    '<div class="fg"><label>头像图片</label><div style="display:flex;gap:8px"><input id="EA" value="'+(ch&&ch.avatar&&ch.avatar.indexOf('http')===0?E(ch.avatar):'')+'" placeholder="URL或上�? style="flex:1"><button type="button" class="btn" onclick="UP(\'EA\')" style="flex-shrink:0">📁</button></div></div>'+
    '<div class="fg"><label>角色�?*</label><input id="EN" value="'+(ch?E(ch.name):'')+'" required></div>'+
    '<div class="fg"><label>简�?/label><input id="ED2" value="'+(ch?E(ch.description||''):'')+'"></div>'+
    '<div class="fg"><label>你的身份（让AI知道你是谁）</label><input id="EUP" value="'+(ch?E(ch.userPersona||''):'')+'" placeholder="例如：你是我的贴身秘�?></div>'+
    '<div class="fg"><label>系统提示�?/label><textarea id="EP" rows="4">'+(ch?E(ch.systemPrompt||''):'')+'</textarea></div>'+
    '<div class="fg"><label>开场白</label><textarea id="EG" rows="2">'+(ch?E(ch.greeting||''):'')+'</textarea></div>'+'<div class="fg"><label>多角�?/label><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px"><input id="SCN" placeholder="角色�? style="flex:1;min-width:60px;padding:8px;border-radius:8px;background:rgba(255,255,255,.05);color:#e8e0dd;border:1px solid rgba(255,255,255,.06);font-size:12px;outline:none"><input id="SCA" placeholder="头像URL" style="flex:1;min-width:60px;padding:8px;border-radius:8px;background:rgba(255,255,255,.05);color:#e8e0dd;border:1px solid rgba(255,255,255,.06);font-size:12px;outline:none"><button type="button" class="btn" onclick="addSC()" style="padding:6px 10px;font-size:11px">+</button><button type="button" class="btn" onclick="upSC()" style="padding:6px 10px;font-size:11px">📁</button></div><div id="SCL" style="display:flex;flex-wrap:wrap;gap:4px;margin:6px 0"></div></div>+<div class="fg"><label>角色聊天背景</label><div style="display:flex;gap:8px"><input id="ECH" value="'+(ch&&ch.chatBg?E(ch.chatBg):'')+'" placeholder="URL或上�? style="flex:1"><button type="button" class="btn" onclick="UP(\'ECH\')" style="flex-shrink:0">📁</button></div></div>'+
    '<button class="btn-p" type="submit">保存</button>'+(id?'<button type="button" class="btn" style="width:100%;margin-top:8px;padding:12px;border:1px solid #ef4444;color:#ef4444;border-radius:10px;background:transparent" onclick="DL(\''+id+'\')">删除角色</button>':'')+'</form></div>';
  $('EF').onsubmit=function(e){e.preventDefault();
    var av=$('EA').value.trim();
    if(!av){var s=document.querySelector('.ap .s');if(s)av=s.textContent}
    var data={name:$('EN').value.trim(),avatar:av||'🤖',chatBg:$('ECH').value.trim()||'',description:$('ED2').value.trim(),userPersona:$('EUP').value.trim(),systemPrompt:$('EP').value.trim(),greeting:$('EG').value.trim(),subChars:window._SC||[]};
    if(!data.name){T('请输入角色名');return}
    (id?API('PUT','/api/characters/'+id,data):API('POST','/api/characters',data)).then(function(){T('已保�?);HOME()}).catch(function(e){T('保存失败')})}}

function DL(id){if(!confirm('确认删除�?))return;API('DELETE','/api/characters/'+id).then(function(){if(CID===id)CID=null;HOME()}).catch(function(){})}

function SET(){$('app').innerHTML='<div class="hdr"><button class="btn" onclick="HOME()">�?/button><h1>设置</h1><button class="btn" style="visibility:hidden"> </button></div><div class="main"><div style="padding:14px">'+
  '<div class="fg"><label>API Key</label><input id="SK" type="password" placeholder="sk-..."></div>'+
  '<div class="fg"><label>API 地址</label><input id="SU" value="'+DU+'"></div>'+
  '<div class="fg"><label>模型</label><input id="SM" value="'+DM+'"></div>'+
  '<div class="fg"><label>聊天背景�?/label><div style="display:flex;gap:8px"><input id="SBG" value="'+(localStorage.getItem('cbg')||'')+'" placeholder="URL或上�? style="flex:1"><button type="button" class="btn" onclick="UP()" style="flex-shrink:0">📁</button></div></div>'+
  '<button class="btn-p" onclick="SV()">保存</button><button class="btn" style="width:100%;margin-top:8px;padding:12px;border:1px solid #ef4444;color:#ef4444;border-radius:10px;background:transparent" onclick="LO()">退出登�?/button></div></div>';$('SK').value=''}
function SV(){var k=$('SK').value.trim();if(k)K=k;var u=$('SU').value.trim();if(u)DU=u;var m=$('SM').value.trim();if(m)DM=m;var bg=$('SBG').value.trim();if(bg)localStorage.setItem('cbg',bg);else localStorage.removeItem('cbg');
  if(K)API('PUT','/api/config',{apiKey:K,baseUrl:DU,model:DM}).then(function(){T('已保存到服务�?)}).catch(function(){T('保存失败')});else T('保存完成')}

document.addEventListener('keydown',function(e){if(e.target&&e.target.id=='IN'&&e.key=='Enter'&&!e.shiftKey){e.preventDefault();SD()}});
function LO(){localStorage.removeItem('rubii_token');localStorage.removeItem('rubii_user');showLogin()}

/* ── 导入角色�?── */
function IMP(){var o=document.createElement('div');o.className='dialog-overlay';o.style.alignItems='flex-start';o.style.paddingTop='40px';
o.innerHTML='<div class="dialog-box" style="width:350px;max-width:92%;"><h3>📥 导入角色�?/h3><p style="font-size:13px;margin-bottom:12px;color:#9a8f8a">支持 SillyTavern V2 / Chub.ai 格式</p><div class="fg"><label>选择 .json 文件</label><input type="file" id="IMP-FILE" accept=".json" style="font-size:13px;padding:8px;background:rgba(255,255,255,.05);color:#e8e0dd;border:1px solid rgba(255,255,255,.06);border-radius:8px;width:100%;"></div><div class="fg"><label>或粘�?JSON</label><textarea id="IMP-JSON" rows="6" placeholder="{&quot;spec&quot;:&quot;chara_card_v2&quot;,&quot;data&quot;:{&quot;name&quot;:&quot;...&quot;}}" style="width:100%;font-size:12px;font-family:monospace;background:rgba(255,255,255,.05);color:#e8e0dd;border:1px solid rgba(255,255,255,.06);border-radius:8px;padding:8px"></textarea></div><div class="dialog-actions" style="display:flex;gap:8px;margin-top:12px"><button class="btn" onclick="this.closest(\'.dialog-overlay\').remove()" style="flex:1;padding:10px">取消</button><button class="btn-p" onclick="doImport()" style="flex:2;padding:10px">导入</button></div></div>';
document.body.appendChild(o)}
function doImport(){var f=document.getElementById('IMP-FILE'),t=document.getElementById('IMP-JSON');var json=t.value.trim();if(f.files.length>0){var r=new FileReader();r.onload=function(e){try{parseAndImport(e.target.result)}catch(e){T('导入失败: '+e.message)}};r.readAsText(f.files[0]);return}if(!json){T('请选择文件或粘贴JSON');return}try{parseAndImport(json)}catch(e){T('导入失败: '+e.message)}}
function parseAndImport(str){var card=JSON.parse(str);var data;if(card.spec==='chara_card_v2'&&card.data){data=card.data}else if(card.name){data=card}else{throw new Error('无法识别的格�?)}if(!data.name)throw new Error('缺少角色�?);var sp=data.system_prompt||data.personality||'';if(data.description)sp=(sp?data.description+'\n'+sp:data.description);if(data.scenario)sp+='\n场景: '+data.scenario;if(data.mes_example)sp+='\n对话示例:\n'+data.mes_example;if(data.post_history_instructions)sp+='\n'+data.post_history_instructions;var av='🤖';if(data.avatar)av=data.avatar;var gr=data.first_mes||data.greeting||'你好，我�?+data.name;API('POST','/api/characters',{name:data.name,avatar:av,description:data.description||'',systemPrompt:sp.trim(),greeting:gr}).then(function(ch){T('�?已导�? '+ch.name);document.querySelector('.dialog-overlay')?.remove();HOME()}).catch(function(e){T('导入失败: '+e.message)})}

/* ── AI辅助创建 ── */
function QC(){var o=document.createElement('div');o.className='dialog-overlay';o.style.alignItems='flex-start';o.style.paddingTop='60px';
o.innerHTML='<div class="dialog-box" style="width:350px;max-width:92%;"><h3>�?快速创建角�?/h3><p style="font-size:13px;margin-bottom:12px;color:#9a8f8a">简单描述你想要的角�?/p><div class="fg"><label>角色�?/label><input id="QC-NAME" placeholder="如：苏晚�? style="width:100%;padding:10px 13px;border-radius:12px;background:rgba(255,255,255,.05);color:#e8e0dd;border:1px solid rgba(255,255,255,.06);font-size:14px;outline:none"></div><div class="fg"><label>一句话描述</label><textarea id="QC-DESC" rows="3" placeholder="如：高冷的女律师，表面强势内心柔软，喜欢�? style="width:100%;padding:10px 13px;border-radius:12px;background:rgba(255,255,255,.05);color:#e8e0dd;border:1px solid rgba(255,255,255,.06);font-size:14px;outline:none;font-family:inherit"></textarea></div><div class="dialog-actions" style="display:flex;gap:8px;margin-top:12px"><button class="btn" onclick="this.closest(\'.dialog-overlay\').remove()" style="flex:1;padding:10px">取消</button><button class="btn-p" onclick="doQC()" style="flex:2;padding:10px">创建角色</button></div></div>';
document.body.appendChild(o);setTimeout(function(){document.getElementById('QC-NAME')?.focus()},100)}
function doQC(){var n=document.getElementById('QC-NAME')?.value.trim();var d=document.getElementById('QC-DESC')?.value.trim();if(!n||!d){T('请填写角色名和描�?);return}
  T('🤖 AI正在为你创作角色...',5000);
  var apiKey=$('SK')?.value||K||'';
  API('POST','/api/characters/generate',{name:n,description:d,config:{apiKey:apiKey,baseUrl:DU,model:DM}}).then(function(ch){T('�?已创�? '+ch.name);document.querySelector('.dialog-overlay')?.remove();HOME()}).catch(function(e){T('创建失败: '+e.message)})}

