# 循迹应用 - GitHub Pages 部署指南

## 项目概述
这是一个运动健康管理 Web 应用的静态版本，包含所有 UI 界面和交互效果。

## 快速开始

### 1. 初始化 Git 仓库
```bash
git init
git add .
git commit -m "Initial commit: 循迹运动健康管理应用"
```

### 2. 创建 GitHub 仓库
1. 访问 https://github.com/new
2. 创建一个新的仓库（名称可以是 `xunji` 或其他你喜欢的名字）
3. 按照 GitHub 页面上的说明将本地仓库推送到 GitHub

### 3. 启用 GitHub Pages
1. 进入你的 GitHub 仓库
2. 点击 "Settings"（设置）
3. 在左侧菜单中找到 "Pages"
4. 在 "Build and deployment" 部分：
   - Source（源）选择：`Deploy from a branch`
   - Branch（分支）选择：`main` 或 `master`
   - 文件夹选择：`/ (root)`
5. 点击 "Save"（保存）

### 4. 访问你的应用
等待几分钟后，你的应用将可以通过以下地址访问：
```
https://[你的用户名].github.io/[仓库名]/
```

## 文件说明

### 主要文件
- `index.html` - 应用主文件（GitHub Pages 会自动加载这个文件）
- `demo.html` - 相同的应用副本，保留用于参考
- `.gitignore` - Git 忽略文件配置

### 其他文件
- `src/` - React 源代码（如果需要开发）
- `package.json` - 项目依赖配置
- `vite.config.ts` - Vite 构建配置

## 功能特性

### 页面导航
1. **首页** - 恢复度仪表盘、AI 洞察、上传按钮、近期活动
2. **AI 报告详情** - 手表截图预览、数据卡片、AI 点评、心率区间
3. **生命树** - 成长轨迹可视化、等级系统、勋章、成长日志
4. **分析** - 长期趋势图表、健康预测、能力雷达
5. **痕迹** - 跑步历史记录、时间线视图
6. **我的** - 个人信息、设置

### 交互效果
- 平滑的页面切换动画
- 恢复度仪表盘动画
- 心率区间进度动画
- 生命树光束生长动画
- 响应式设计，支持移动端

## 本地预览

### 方法 1：直接打开 HTML 文件
直接在浏览器中打开 `index.html` 文件即可预览。

### 方法 2：使用本地服务器（推荐）
如果你安装了 Python：
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
然后在浏览器中访问：`http://localhost:8000`

或者使用 Node.js 的 http-server：
```bash
npm install -g http-server
http-server
```

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **原生 JavaScript** - 交互逻辑
- **Tailwind CSS CDN** - 样式框架
- **SVG** - 图标和动画元素

## 注意事项

1. 这是一个静态版本，数据都是模拟的
2. 上传功能当前仅用于演示，不会真正上传文件
3. 所有页面切换和动画都是纯前端实现

## 后续开发

如果你想继续开发这个应用：

1. 安装 Node.js 和 npm
2. 运行 `npm install` 安装依赖
3. 运行 `npm run dev` 启动开发服务器
4. 修改 `src/` 目录下的文件
5. 运行 `npm run build` 构建生产版本

## 常见问题

### GitHub Pages 无法加载
- 确保你的仓库是公开的（免费账户）
- 检查 Pages 设置中的分支和文件夹配置是否正确
- 等待 2-5 分钟让部署生效

### 样式或图片无法加载
- 检查文件路径是否正确
- 确保所有资源都在仓库中

### 如何更新应用
1. 修改代码
2. 提交更改：`git add . && git commit -m "Update"`
3. 推送到 GitHub：`git push`
4. GitHub Pages 会自动重新部署

## 许可证
本项目仅供学习和演示使用。
