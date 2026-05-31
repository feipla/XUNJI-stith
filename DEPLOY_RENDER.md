# 循迹应用 - Render 部署指南

## 快速部署到 Render

### 1. 初始化 Git 仓库（如果还没有）
```bash
git init
git add .
git commit -m "Initial commit: 循迹运动健康管理应用 + OCR代理"
```

### 2. 推送到 GitHub
在 [github.com/new](https://github.com/new) 创建仓库，然后：
```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

### 3. 到 Render 部署
1. 访问 [render.com](https://render.com)，用 GitHub 账号登录
2. 点击 **"New +" → "Web Service"**
3. 选择刚才推送到 GitHub 的仓库
4. 配置部署选项：
   - **Name**: xunji（任意）
   - **Region**: 选离你近的（例如 Singapore）
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. 点击 **"Create Web Service"**

### 4. 等待部署完成（约2-3分钟）
部署成功后会给你一个 URL，类似 `https://xunji.onrender.com`

## 说明

- 应用同时托管：
  - `/` → 前端 index.html
  - `/api/ocr` → 百度OCR代理
- 免费 Plan 自动休眠（15分钟无请求），下次访问会稍慢（正常）
