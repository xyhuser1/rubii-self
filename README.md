# Rubii Self

私人 AI 角色扮演聊天 - 自托管版，在安卓手机上运行。

## 安装（Termux 上）

### 第一步：安装 Termux

1. 去 **F-Droid** 下载 Termux
   - 网址：https://f-droid.org/packages/com.termux/
   - ⚠️ **不要用 Google Play 的版本**，太旧了
   - 不会装 F-Droid？直接搜 "Termux apk" 下载最新版也行

2. 打开 Termux，依次运行以下命令（每输一行按回车）：

```bash
# 更新包管理器
pkg update -y && pkg upgrade -y

# 安装 Node.js 和 Git
pkg install nodejs git -y

# 给存储权限（让 Termux 能访问手机文件）
termux-setup-storage
```

### 第二步：下载 Rubii Self

```bash
# 创建工作目录
mkdir -p ~/rubii-self
cd ~/rubii-self

# 下载代码
git clone https://github.com/你的仓库 .   # 或者用下面手动复制的方式
```

**或者手动复制代码：** 我把代码发你，你在手机浏览器打开这个页面，把文件复制粘贴到 Termux 里。

实际使用中最简单的方法：
1. 在电脑上把 `rubii-self` 文件夹打包
2. 传到手机，放到 `~/storage/downloads/`
3. 在 Termux 里运行：

```bash
cp -r ~/storage/downloads/rubii-self ~/
cd ~/rubii-self
```

### 第三步：安装依赖 & 启动

```bash
cd ~/rubii-self
npm install
node server.js
```

看到这个界面就成功了：
```
┌──────────────────────────────────────┐
│  Rubii Self · 私人 AI 角色聊天        │
│                                      │
│  启动地址:                           │
│  http://localhost:3000              │
│  手机同网: http://192.168.x.x:3000  │
│                                      │
│  按 Ctrl+C 停止服务                  │
└──────────────────────────────────────┘
```

### 第四步：使用

1. **在手机本身上使用**：打开 Chrome（或者其他浏览器），访问 `http://localhost:3000`
2. **首次使用**：先点右上角 ⚙️ 设置 → 填入 **DeepSeek API Key**
3. **创建角色**：回首页点"创建角色"
4. **开始聊天**：点击角色卡片进入聊天

### 后台运行（关掉 Termux 后继续跑）

```bash
# 安装 tmux
pkg install tmux -y

# 在 tmux 里启动
tmux new-session -s rubii -d 'cd ~/rubii-self && node server.js'

# 下次想查看日志
tmux attach -t rubii

# 停止服务
tmux kill-session -t rubii
```

或者最简单的：启动后按 `音量键+` 然后按 `K` 开启 Keep Alive，这样 Termux 在后台不会被杀掉。

### 获取 DeepSeek API Key

1. 去 https://platform.deepseek.com/ 注册账号
2. 点左侧 API Keys → 创建 API Key
3. 充点钱（¥10 够用很久）
4. 把生成的 `sk-xxxx` 复制到 Rubii Self 的设置里

## 文件结构

```
~/rubii-self/
├── server.js              # 后端服务器
├── package.json
├── public/                # 前端页面
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
└── data/                  # 你的数据（角色、聊天记录都在这里）
    ├── characters/        # 角色文件 (.json)
    ├── chats/             # 聊天记录 (.json)
    └── config.json        # 设置
```

> 💡 想备份数据？直接把 `data/` 文件夹拷出来就行。
> 想迁移到新手机？装好 Termux 和 Node.js，把 `data/` 拷回去就能接着用。
