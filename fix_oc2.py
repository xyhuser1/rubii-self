with open('C:/Users/Administrator/AppData/Local/Temp/oc_raw.txt','r',encoding='utf-8') as f:
    old_oc = f.read()

new_oc = 'function OC(id){CID=id;var ch=null;for(var i=0;i<C.length;i++){if(C[i].id===id){ch=C[i];break}}\n'
new_oc += "  var g='';if(ch)g=ch.greeting||'\u4f60\u597d\uff0c\u6211\u662f'+ch.name;\n"
new_oc += "  $('app').innerHTML='<div class=\"hdr\"><button class=\"btn\" onclick=\"BC()\">"
new_oc += "\u2039"
new_oc += "</button><h1>'+(ch?E(ch.name):'Chat')+'</h1><button class=\"btn\" onclick=\"NS()\">+</button><button class=\"btn\" onclick=\"SH()\">"
new_oc += "\U0001f4cb"
new_oc += "</button><button class=\"btn\" onclick=\"ED(\\''+id+'\\')\">"
new_oc += "\u270e"
new_oc += "</button></div><div class=\"msgs\" id=\"MS\"><div class=\"emp\" id=\"EM\"><h3>\u5f00\u59cb\u804a\u5929</h3><p>'+E(g)+'</p></div></div><div class=\"ar\"><button class=\"btn\" onclick=\"CC()\">"
new_oc += "\U0001f5d1"
new_oc += " \u6e05\u7a7a</button><button class=\"btn\" onclick=\"AD()\">\u25b6 \u63a8\u8fdb</button><button class=\"btn\" onclick=\"EX()\">"
new_oc += "\U0001f4e5"
new_oc += " \u5bfc\u51fa</button></div><div class=\"inp\"><textarea id=\"IN\" rows=\"1\" placeholder=\"\u8f93\u5165\u6d88\u606f...\" maxlength=\"5000\"></textarea><button class=\"sd\" id=\"SB\" onclick=\"SD()\">\u2191</button></div>';LC()}"

with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html','r',encoding='utf-8') as f:
    content = f.read()

if old_oc in content:
    content = content.replace(old_oc, new_oc)
    with open('C:/Users/Administrator/.openclaw/workspace/rubii-self/public/index.html','w',encoding='utf-8') as f:
        f.write(content)
    print('OK - OC replaced')
else:
    print('FAIL - old OC not found')
