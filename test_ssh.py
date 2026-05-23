import socket
import paramiko
import os, sys

# Try SSH with password using raw Python
server = "8.163.117.104"
username = "root"
password = "a321982156"

# Test basic connectivity
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(5)
try:
    result = s.connect_ex((server, 22))
    print(f"Port 22 status: {'OPEN' if result == 0 else 'CLOSED'} (code: {result})")
except Exception as e:
    print(f"Connection error: {e}")
finally:
    s.close()

# Test port 3000 too
s2 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s2.settimeout(5)
try:
    result = s2.connect_ex((server, 3000))
    print(f"Port 3000 status: {'OPEN' if result == 0 else 'CLOSED'} (code: {result})")
except Exception as e:
    print(f"Connection error: {e}")
finally:
    s2.close()

# File content to transfer
project_dir = "C:\\Users\\Administrator\\.openclaw\\workspace\\rubii-self"

print(f"\nFiles to transfer:")
print(f"  {project_dir}\\server.js")
print(f"  {project_dir}\\public\\index.html")
