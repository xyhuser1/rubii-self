Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\Administrator\.openclaw\workspace\rubii-self"

' 启动服务器
WshShell.Run """D:\Program Files\nodejs\node.exe"" server.js", 7, False

' 等3秒
WScript.Sleep 3000

' 打开浏览器
WshShell.Run "http://localhost:3000", 1, False
