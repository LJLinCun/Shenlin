# 林寸的个人技术博客

> 记录前端开发、游戏技术和独立创作的思考与实践。

**地址：** [lincun.linjie.online](https://lincun.linjie.online)  
**作者：** 林寸（[@LJLinCun](https://github.com/LJLinCun)）  
**构建工具：** [VitePress](https://vitepress.dev/) 1.6.4  
**语言：** 中文（zh-CN）

---

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [写作指南](#写作指南)
- [主题定制](#主题定制)
- [组件体系](#组件体系)
- [部署](#部署)
- [项目演变](#项目演变)
- [常见问题](#常见问题)
- [许可证](#许可证)

---

## 项目概述

这是一个个人技术博客，使用 VitePress 静态站点生成器构建。内容涵盖：

- **前端开发** — Next.js、React、TypeScript、Tailwind CSS 等方面的实战经验和踩坑记录
- **游戏技术** — UE5 蓝图开发的学习笔记和项目记录
- **独立创作** — 内容创作、工具链搭建的思考与分享

博客定位为**技术文章为主，偶尔有随笔**，目标是输出高质量的思考内容，同时通过写作倒逼输入。

### 特性

- ✅ 全站中文界面，SEO 友好的静态站点
- ✅ Markdown 写作，Git 版本管理
- ✅ 暗色/亮色主题切换（VitePress 原生支持）
- ✅ 自定义首页卡片式文章列表
- ✅ 自定义阅读时间估算组件
- ✅ 自定义文章侧边目录组件
- ✅ 构建时预渲染，部署无需后端
- ✅ 搜索功能（VitePress 内置全文搜索）

---

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| **框架** | [VitePress](https://vitepress.dev/) 1.6.4 | 基于 Vite + Vue 的静态站点生成器 |
| **UI 库** | [Vue 3](https://vuejs.org/) | VitePress 内置 |
| **工具库** | [@vueuse/core](https://vueuse.org/) 13.9.0 | Vue 组合式 API 工具集 |
| **样式** | CSS 自定义属性 + VitePress 主题系统 | 通过 `index.css` 定制 |
| **图标** | VitePress 内置社交图标 + VP Icons | 导航、社交链接 |
| **语言** | TypeScript | 配置文件 |
| **包管理** | npm | |
| **版本控制** | Git | |

---

## 项目结构

```
shenlin/
├── docs/                           # 文档源文件目录（VitePress 核心目录）
│   ├── .vitepress/                 # VitePress 配置和主题
│   │   ├── config.ts              # 站点配置：导航、侧边栏、社交链接
│   │   ├── theme/                 # 主题自定义
│   │   │   ├── index.ts           # 主题入口：加载默认主题 + 自定义CSS
│   │   │   ├── index.css          # 全局样式覆盖（品牌色、暗色模式等）
│   │   │   ├── ReadingTime.vue    # 阅读时间估算组件
│   │   │   └── TocSidebar.vue     # 文章目录侧边栏组件
│   │   ├── cache/                 # VitePress 构建缓存（已 gitignore）
│   │   └── dist/                  # 构建输出目录（已 gitignore）
│   ├── index.md                   # 首页（支持内联 HTML 和卡片网格）
│   ├── about.md                   # 关于页
│   └── posts/                     # 文章目录
│       ├── index.md               # 文章归档页
│       ├── hello-world.md         # Hello World（开博第一篇）
│       ├── getting-started-with-nextjs.md
│       ├── tailwind-css-tips.md
│       ├── react-server-components.md
│       ├── typescript-type-tips.md
│       └── nextjs-api-routes.md
├── package.json                   # 项目依赖与脚本
├── package-lock.json             # 依赖锁文件
├── .gitignore                    # Git 忽略规则
├── README.md                     # 项目说明文档
└── tsconfig.tsbuildinfo          # TypeScript 构建信息（可忽略）
```

### 关键路径说明

| 路径 | 作用 |
|------|------|
| `docs/.vitepress/config.ts` | **站点配置中枢** — 修改导航、侧边栏、社交链接、SEO 元信息都在这里 |
| `docs/.vitepress/theme/index.css` | **全局样式** — 覆盖 VitePress 默认主题的品牌色、排版、组件样式 |
| `docs/.vitepress/theme/index.ts` | **主题扩展** — 注册自定义 Vue 组件、引入额外样式 |
| `docs/index.md` | **首页** — 站点入口页，可嵌入 HTML 实现复杂布局 |
| `docs/posts/` | **文章存放目录** — 每篇 Markdown 文章一个文件 |

---

## 快速开始

### 环境要求

- **Node.js** >= 18（推荐 20 LTS）
- **npm** >= 9

### 安装

```bash
# 进入项目目录
cd shenlin

# 安装依赖
npm install
```

### 本地开发

```bash
npm run dev
```

启动后访问 `http://localhost:5173`，VitePress 会监听文件变化自动热更新。

> **注意：** 如果从 WSL（Windows Subsystem for Linux）启动，VitePress 默认绑定的 `localhost` 可能导致 Windows 浏览器无法访问。可以将 `config.ts` 中的 `host` 选项设为 `true` 来监听所有网络接口：
> ```ts
> export default defineConfig({
>   host: true,  // 监听 0.0.0.0:5173
> })
> ```

### 构建

```bash
npm run build
```

构建产物输出到 `docs/.vitepress/dist/` 目录，可直接部署到任何静态托管平台。

### 预览构建结果

```bash
npm run preview
```

---

## 写作指南

### 创建新文章

在 `docs/posts/` 目录下新建一个 `.md` 文件，文件名建议使用英文连字符格式（如 `my-new-post.md`）。

### Frontmatter 规范

每篇文章头部必须包含 YAML frontmatter：

```yaml
---
title: 文章标题
description: 文章摘要，会显示在首页卡片和搜索引擎结果中
date: '2025-12-15'
sidebar: false
prev: /posts/previous-article      # 上一篇文章链接（可选）
next: /posts/next-article          # 下一篇文章链接（可选）
tags:                              # 标签（可选，用于首页卡片展示）
  - Next.js
  - React
---
```

**字段说明：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题，显示在浏览器标签栏和文章顶部 |
| `description` | ✅ | 文章摘要，用于 SEO 和首页卡片展示 |
| `date` | ✅ | 发布日期，格式 `'YYYY-MM-DD'` |
| `sidebar` | ❌ | 是否显示侧边栏，文章页建议设为 `false` |
| `prev` / `next` | ❌ | 上下篇文章导航链接 |
| `tags` | ❌ | 标签数组，首页卡片会渲染为彩色标签 |

### 注册到导航和侧边栏

新文章创建后，需要在 `docs/.vitepress/config.ts` 中将其添加到**侧边栏**，才能通过导航访问：

```ts
sidebar: [
  {
    text: '文章',
    items: [
      { text: '文章标题', link: '/posts/my-new-post' },
      // 已有文章列表...
    ]
  }
]
```

同时建议在 `docs/posts/index.md`（归档页）中添加文章入口。

### 写作规范

- 使用 Markdown 标准语法
- 代码块标注语言（如 ` ```tsx `、` ```bash `），以启用语法高亮
- 中英文之间建议加空格（非强制，但视觉上更舒适）
- 标题层级不超过三级（`##` → `###` → `####`）
- 每篇文章建议 1000–3000 字，内容导向而非字数导向

### 首页卡片关联

首页 `docs/index.md` 中的文章卡片需要手动维护。每新增一篇文章，需在首页的 `.post-grid` 中添加对应的卡片 HTML：

```html
<a href="/posts/my-new-post" class="post-card">
  <h3>文章标题</h3>
  <time class="date">2025-12-15</time>
  <p class="desc">文章摘要</p>
  <span class="tag-group">
    <span class="tag">#Next.js</span>
    <span class="tag">#React</span>
  </span>
</a>
```

---

## 主题定制

### 导航栏

修改 `config.ts` 中的 `themeConfig.nav`：

```ts
nav: [
  { text: '首页', link: '/' },
  { text: '归档', link: '/posts/' },
  // 添加更多导航项
]
```

### 侧边栏

修改 `config.ts` 中的 `themeConfig.sidebar`。VitePress 支持多级侧边栏，当前博客使用单层结构：

```ts
sidebar: [
  {
    text: '分类名称',
    items: [
      { text: '文章标题', link: '/posts/article-slug' }
    ]
  }
]
```

### 社交链接

修改 `config.ts` 中的 `themeConfig.socialLinks`：

```ts
socialLinks: [
    { icon: 'github', link: 'https://github.com/LJLinCun' },
  { icon: 'twitter', link: 'https://x.com/lincun_dev' }
]
```

支持的内置图标：`github`、`twitter`、`discord`、`mastodon`、`linkedin`、`facebook`、`instagram`、`youtube`、`bluesky`、`x`、`gitlab` 等。

### 品牌色

当前博客使用蓝色系品牌色，修改 `docs/.vitepress/theme/index.css` 中的 CSS 变量：

```css
:root {
  --vp-c-brand-1: #2563eb;   /* 主品牌色 */
  --vp-c-brand-2: #1d4ed8;   /* 悬停/强调色 */
  --vp-c-brand-3: #1e40af;   /* 更深色（可选） */
}
```

暗色模式下的链接颜色也已单独配置：

```css
.dark .vp-doc a {
  color: #93c5fd !important;
}
```

---

## 组件体系

当前博客包含两个自定义 Vue 组件和一个自定义主题入口。

### ReadingTime.vue

阅读时间估算组件。根据文章字数估算阅读时间，显示在文章头部。基于中文阅读速度（约 300 字/分钟）计算。

**使用方式：** 在 Markdown 文章中通过 Vue 语法嵌入：

```vue
<ReadingTime :words="1500" />
```

### TocSidebar.vue

文章目录侧边栏组件。提取文章中的 `h2`、`h3` 标题生成可点击的目录树。

**使用方式：** 在 Markdown 文章或布局组件中嵌入，通常放在文章内容右侧。

### 注册新组件

如需添加新的 Vue 组件，在 `docs/.vitepress/theme/index.ts` 中注册：

```ts
import DefaultTheme from 'vitepress/theme'
import MyComponent from './MyComponent.vue'
import './index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('MyComponent', MyComponent)
  }
}
```

然后在 Markdown 中直接使用 `<MyComponent />` 即可。

---

## 部署

### 构建命令

```bash
npm run build
```

构建产物位于 `docs/.vitepress/dist/`，是一个纯静态网站，包含：

- `index.html` — 首页
- `about.html` — 关于页
- `posts/*.html` — 所有文章页面
- `assets/` — 编译后的 JS、CSS、字体等资源
- `hashmap.json` — 构建文件的哈希映射
- `vp-icons.css` — VitePress 图标样式

### 部署目标

由于产物是静态文件，可部署到任何静态托管平台：

| 平台 | 说明 |
|------|------|
| **Vercel** | 推荐，零配置，自动从 Git 仓库构建部署 |
| **Netlify** | 配置 `npm run build` 和 `docs/.vitepress/dist` 发布目录 |
| **GitHub Pages** | 配置 GitHub Actions workflow 自动构建推送 |
| **Cloudflare Pages** | 类似 Vercel，连接 Git 仓库即可 |
| **自建服务器** | 直接用 Nginx/Caddy 托管 dist 目录 |

### GitHub Actions 示例

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

---

## 项目演变

### 为什么选择 VitePress 而不是 Next.js？

这个博客最初使用 **Next.js** 搭建，但在 WSL 开发环境下遇到了 **lightningcss 原生模块编译崩溃**的问题。具体表现：

- `next dev` 启动正常，但页面渲染时 lightningcss 的二进制模块（`lightningcss-linux-x64-gnu`）报段错误
- 尝试多种修复方案（重装、清缓存、切换 Node 版本）均未解决
- 根本原因是 WSL 环境下 lightningcss 原生模块的链接问题

迁移到 **VitePress 1.6.4** 后：

- ✅ 原生模块依赖极少，WSL 下无兼容性问题
- ✅ 开箱即用的博客功能（导航、侧边栏、搜索、暗色模式）
- ✅ Markdown 优先的写作体验，与 Next.js 的 `getStaticProps` + `gray-matter` 模式等价
- ✅ 更快的开发启动速度和 HMR
- ❌ 牺牲了动态路由的灵活性（但博客场景下不需要动态）

### 版本历程

| 时间 | 变更 |
|------|------|
| 2025-12 | 项目初始化，使用 Next.js 搭建 |
| 2026-01 | 因 lightningcss 兼容问题，迁移至 VitePress |
| 2026-02 | 完成 6 篇技术文章，配置自定义主题 |
| 2026-05 | 添加 ReadingTime 和 TocSidebar 自定义组件，完善首页卡片布局 |

---

## 常见问题

### 如何添加新的导航分类？

修改 `config.ts` 中的 `nav` 数组：

```ts
nav: [
  { text: '首页', link: '/' },
  { text: '归档', link: '/posts/' },
  { text: 'UE5 笔记', link: '/ue5/' }  // 新分类
]
```

然后在 `docs/` 下创建 `ue5/` 目录和 `index.md`。

### 如何启用全文搜索？

VitePress 1.x 内置了基于 `minisearch` 的全文搜索。默认情况下，当站点页面数超过一定数量时会自动启用。如需手动打开，在 `config.ts` 中添加：

```ts
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

### 如何更换字体？

在 `docs/.vitepress/theme/index.css` 中添加：

```css
:root {
  --vp-font-family-base: 'Your Font', 'Noto Sans SC', sans-serif;
  --vp-font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

建议使用系统字体或自托管字体（避免 Google Fonts 在中国境内加载缓慢的问题）。

### 如何添加 Google Analytics 或其他统计工具？

VitePress 支持通过 `head` 选项注入 HTML：

```ts
export default defineConfig({
  head: [
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX', async: true }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXX');
    `]
  ]
})
```

---

## 许可证

本项目内容（文章）版权归作者所有，代码部分以 MIT 许可证开源。

---

*最后更新：2026 年 5 月*
