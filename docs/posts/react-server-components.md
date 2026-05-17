---
title: React Server Components 实践笔记
description: 深入理解 React Server Components（RSC）的工作原理，以及如何判断一个组件该放服务端还是客户端。
date: '2026-01-10'
sidebar: false
prev:
  text: 'Tailwind CSS v4 配置技巧与实战'
  link: /posts/tailwind-css-tips
next:
  text: 'TypeScript 类型体操：实用技巧与常见陷阱'
  link: /posts/typescript-type-tips
---

# React Server Components 实践笔记

## RSC 是什么？

React Server Components 是 Next.js App Router 的核心特性之一。简单来说：**部分组件可以只在服务器端渲染并返回 HTML，不需要发送到浏览器**。

这意味着：
- 不增加 bundle 体积（不需要发送 React 代码）
- 可以直接读取数据库、文件系统
- 支持 `async/await` 做数据请求

## 什么时候用 Server Component？什么时候用 Client Component？

这是学习 RSC 时最重要的问题。一个简单原则：**默认写 Server Component，需要交互时才加 `"use client"`**。

| Server Component | Client Component |
|---|---|
| 数据获取、数据库查询 | `useState` / `useEffect` |
| 读取文件、环境变量 | 事件监听（click, input） |
| Markdown 渲染 | 第三方 UI 库（需要交互） |
| 布局组件 | 动画、图表等交互式元素 |

## 实际例子：博客文章页

```tsx
// app/posts/[slug]/page.tsx (Server Component)
import { getPost } from "@/lib/posts";

export default async function PostPage({ params }) {
  const post = await getPost(params.slug); // ✅ 服务端读取文件
  return <article>{post.content}</article>;
}
```

这里 `getPost` 可以安全地调用 `fs.readFileSync`，因为这段代码只在构建时（或服务器端）运行。如果把它放进 Client Component，就会报错——浏览器没有文件系统 API。

## 组件树：Server → Client 的边界

RSC 允许 Server Components 渲染 Client Components，但反过来不行。这是一个**单向数据流**：

```
PostPage (Server)
├── MarkdownRenderer (Client) ← "use client"
│   └── CodeBlock (Client)    ← "use client"
├── CommentsList (Server)     ← 可以
└── SearchBar (Client)        ← 需要交互，所以是 Client
```

## 性能优化的关键思路

RSC 最大的优势之一是**按需加载**。如果一个页面大部分内容是静态的（比如文章正文），只有侧边栏需要交互，那么：

- 正文用 Server Component → bundle 中不包含 React 代码
- 交互部分用 Client Component → 只传输必要的 JS

这对首屏性能和可访问性都有帮助。

## 小结

RSC 的学习曲线确实存在——你需要理解组件树中的"边界"在哪。但一旦习惯了这种思维，你会发现它让项目的结构变得更清晰：需要数据的放服务端，需要交互的放客户端，各司其职。
