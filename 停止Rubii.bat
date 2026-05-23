@echo off
taskkill /f /im node.exe >nul 2>&1
echo Node.js (Rubii Self) 已停止
timeout /t 2 /nobreak >nul
