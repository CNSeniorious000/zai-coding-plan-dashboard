<div align="center">

  **[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

  <p>

  # Z.AI Usage 仪表板

  一个现代化的 Next.js 仪表板，用于监控 Z.AI API 使用情况，具有实时分析和多语言支持。

</div>

## 功能特性

- **📈 实时使用追踪** - 监控模型调用、token 使用量和工具性能
- **📊 可视化分析** - 美观的图表展示使用趋势
- **🔒 安全** - API 密钥仅存储在浏览器的 localStorage 中
- **🌙 深色模式** - 采用 Material You 设计，支持自动主题切换
- **🌍 多语言支持** - 支持 7 种语言
- **📱 响应式设计** - 完美适配桌面、平板和移动设备
- **⚡ 高性能** - 基于 Next.js 16 和 React 19 构建，性能优化

## 技术栈

| 技术 | 描述 |
|------|------|
| **Next.js 16** | 带 App Router 的 React 框架 |
| **React 19** | 支持服务器组件的最新 React |
| **TypeScript** | 类型安全开发 |
| **Tailwind CSS v4** | 实用优先的 CSS 框架 |
| **next-intl** | 国际化 (i18n) 框架 |
| **Recharts** | 数据可视化库 |
| **Radix UI** | 无障碍组件库 |
| **Fumadocs** | 文档系统 |

## 安装

```bash
# 克隆仓库
git clone https://github.com/CNSeniorious000/zai-coding-plan-dashboard.git

# 进入项目目录
cd zai-coding-plan-dashboard

# 安装依赖
npm install
# 或
yarn install
# 或
pnpm install

# 启动开发服务器
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 使用方法

1. **获取 API 密钥**
   - 访问 [Z.AI 平台](https://z.ai/manage-apikey/apikey-list)
   - 创建或复制您的 API 密钥
   - 格式：`32hexchars.16alphanumchars`

2. **输入 API 密钥**
   - 在仪表板中粘贴您的 API 密钥
   - 点击"获取"加载使用数据

3. **查看统计数据**
   - 带进度条的配额概览
   - 按模型划分的 token 使用情况
   - 带成功/失败率的工具使用情况
   - 趋势的可视化图表

## API 端点

仪表板使用 Z.AI 官方监控 API：

| 端点 | 描述 |
|-------|------|
| `/api/monitor/usage/model-usage` | 模型 token 使用统计 |
| `/api/monitor/usage/tool-usage` | 工具调用性能 |
| `/api/monitor/usage/quota/limit` | 当前配额限制 |

## 项目结构

```
src/
├── app/
│   ├── [locale]/          # 本地化路由 (en, zh-CN, ja, ko, es, fr, de)
│   │   ├── page.tsx       # 主仪表板页面
│   │   └── docs/          # 文档页面
│   └── api/
│       └── usage/          # 后端 API 代理
├── components/
│   ├── Dashboard.tsx      # 主仪表板组件
│   ├── UsageCharts.tsx    # 数据可视化
│   └── ui/              # 可复用 UI 组件
├── i18n/                  # 国际化配置
├── lib/                   # 工具函数
└── messages/               # 翻译文件
```

## 支持的语言

- 🇺🇸 [English](README.md)
- 🇨🇳 [简体中文](README.zh-CN.md)
- 🇯🇵 [日本語](README.ja.md)
- 🇰🇷 [한국어](README.ko.md)
- 🇪🇸 [Español](README.es.md)
- 🇫🇷 [Français](README.fr.md)
- 🇩🇪 [Deutsch](README.de.md)

## 文档

完整文档可在应用程序的 `/docs` 路径下查看。

## 安全性

- **API 密钥存储**：您的 API 密钥仅存储在浏览器的 `localStorage` 中
- **无服务器存储**：应用程序不会将您的密钥存储或传输到任何服务器，除了 Z.AI 的官方 API
- **仅客户端**：所有数据获取直接从您的浏览器到 Z.AI

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

此项目为私有项目。

---

<div align="center">

  用 ❤️ 为 Z.AI 社区打造

  **[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

</div>
