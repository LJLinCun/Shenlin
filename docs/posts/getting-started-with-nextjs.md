---
title: Next.js App Router 入门实战
description: 从路由到数据获取，完整掌握 Next.js App Router 的核心概念与最佳实践。
date: '2025-12-15'
sidebar: false
prev: /posts/hello-world
next: /posts/tailwind-css-tips
---

# Next.js App Router 入门实战

## 为什么选 Next.js？

Next.js 是目前 React 生态中最成熟的全栈框架之一。它提供了文件即路由、服务端渲染、API 路由等开箱即用的能力，让开发者可以专注业务逻辑而不是配置各种工具链。

如果你刚接触 Next.js，建议从 **App Router**（`app/` 目录）开始，这是官方推荐的方向，支持 React Server Components。

## 项目结构概览

```
├── app/
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 首页
│   └── posts/[slug]/
│       └── page.tsx    # 动态路由：文章页
├── components/         # React 组件
└── lib/posts.ts        # 数据逻辑
```

## 路由系统

App Router 用文件系统组织路由，非常直观：

- `app/page.tsx` → `/`（首页）
- `app/about/page.tsx` → `/about`
- `app/posts/[slug]/page.tsx` → `/posts/any-slug-here`

方括号 `[slug]` 表示动态参数。在页面组件中可以通过 `params` prop 获取：

```tsx
export default async function PostPage({ params }) {
  const { slug } = await params; // Next.js 15+ 用 Promise
}
```

## 数据获取

App Router 支持在服务端直接 `await` 异步操作：

```tsx
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts(); // 构建时执行
}
```

如果需要实时数据，可以用 `fetch` + `revalidate`：

```tsx
const res = await fetch("https://api.example.com/data", { next: { revalidate: 60 } });
```

## Markdown 文章渲染

对于博客这类内容驱动的网站，用 Markdown 是最灵活的选择。核心思路是：

1. 把 `.md` 文件存在 `posts/` 目录
2. 用 `gray-matter` 解析 frontmatter（标题、日期、标签）
3. 用 `remark` + `remark-html` 将 Markdown 转为 HTML
4. 在页面中渲染

```tsx
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const raw = fs.readFileSync("posts/hello-world.md", "utf-8");
const { data, content } = matter(raw);

// 渲染 Markdown → HTML
const result = await remark().use(remarkHtml).process(content);
```

## 小结

Next.js App Router 的核心优势在于**把路由、数据获取、组件渲染统一在一个模型里**。开始可能觉得新概念不少，但一旦理解了 Server Components 和 Client Components 的边界，整个项目会变得非常清晰。

下一篇会聊聊 Tailwind CSS v4 在 Next.js 中的配置技巧。
