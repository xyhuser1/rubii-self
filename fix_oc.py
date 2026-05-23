with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html','r',encoding='utf-8') as f:
    content = f.read()

# Replace the OC function
old_oc = '''function OC(id){CID=id;var ch=null;for(var i=0;i<C.length;i++){if(C[i].id===id){ch=C[i];break}}
  var g='';if(ch)g=ch.greeting||\u2018你好，我是'+ch.name;
  var ss=loadSessions();var curSid=getCurrentSessionId();
  var sel='<select class="sel-session" id="SS" onchange="switchSession()">';
  for(var i=0;i<ss.length;i++){sel+='<option value="'+ss[i].id+'"'+(ss[i].id===curSid?' selected':'')+'>'+E(ss[i].name)+'</option>'}
  sel+='</select>';
  $('app').innerHTML='<div class="hdr"><button class="btn" onclick="BC()">\u2039</button>'+sel+'<span style="font-size:12px;color:#9a8f8a;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(ch?E(ch.name):'Chat')+'</span><button class="btn" onclick="renameSession()">\u270e</button><button class="btn" onclick="NS()">+</button><button class="btn" onclick="deleteSession(getCurrentSessionId())">\u2715</button><button class="btn" onclick="ED(\''+id+'\')">\u270e</button></div><div class="msgs" id="MS"><div class="emp" id="EM"><h3>开始聊天</h3><p>'+E(g)+'</p></div></div><div class="ar"><button class="btn" onclick="CC()">\U0001f5d1 清空</button><button class="btn" onclick="AD()">\u25b6 推进</button><button class="btn" onclick="EX()">\U0001f4e5 导出</button></div><div class="inp"><textarea id="IN" rows="1" placeholder="输入消息..." maxlength="5000"></textarea><button class="sd" id="SB" onclick="SD()">\u2191</button></div>';LC()}'''

new_oc = '''function OC(id){CID=id;var ch=null;for(var i=0;i<C.length;i++){if(C[i].id===id){ch=C[i];break}}
  var g='';if(ch)g=ch.greeting||'\u4f60\u597d\uff0c\u6211\u662f'+ch.name;
  $('app').innerHTML='<div class="hdr"><button class="btn" onclick="BC()">\u2039</button><h1>'+(ch?E(ch.name):'Chat')+'</h1><button class="btn" onclick="NS()">+</button><button class="btn" onclick="SH()">\U0001f4cb</button><button class="btn" onclick="ED(\\''+id+'\\')">\u270e</button></div><div class="msgs" id="MS"><div class="emp" id="EM"><h3>\u5f00\u59cb\u804a\u5929</h3><p>'+E(g)+'</p></div></div><div class="ar"><button class="btn" onclick="CC()">\U0001f5d1 \u6e05\u7a7a</button><button class="btn" onclick="AD()">\u25b6 \u63a8\u8fdb</button><button class="btn" onclick="EX()">\U0001f4e5 \u5bfc\u51fa</button></div><div class="inp"><textarea id="IN" rows="1" placeholder="\u8f93\u5165\u6d88\u606f..." maxlength="5000"></textarea><button class="sd" id="SB" onclick="SD()">\u2191</button></div>';LC()}'''

if old_oc in content:
    content = content.replace(old_oc, new_oc)
    with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html','w',encoding='utf-8') as f:
        f.write(content)
    print('OC function replaced OK')
else:
    print('ERROR: old OC text not found!')
    # Debug: find the actual OC function
    idx = content.find('function OC(id)')
    if idx >= 0:
        end = content.find(';LC()}', idx) + len(';LC()}')
        print('Actual OC function:')
        print(repr(content[idx:end]))
