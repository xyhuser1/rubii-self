$node = "D:\Program Files\nodejs\node.exe"
$dir = "C:\Users\Administrator\.openclaw\workspace\rubii-self"
$server = "$dir\server.js"

# 启动服务器（隐藏窗口）
$ps = Start-Process -FilePath $node -ArgumentList $server -WindowStyle Hidden -PassThru

# 等一会打开浏览器
Start-Sleep 3
Start-Process "http://localhost:3000"

Write-Host "Rubii Self 已启动!" -ForegroundColor Green
Write-Host "浏览器已经打开，如果没有自动打开请手动访问:" -ForegroundColor Yellow
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "按任意键关闭服务器..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# 停止服务器
$ps.Kill()
