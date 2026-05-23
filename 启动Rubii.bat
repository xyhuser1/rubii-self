@echo off
cd /d "C:\Users\Administrator\.openclaw\workspace\rubii-self"
start /B "" "D:\Program Files\nodejs\node.exe" server.js
timeout /t 3 /nobreak >nul
start "" "http://localhost:3000"
exit
