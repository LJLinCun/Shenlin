---
title: Next.js API 路由实战：RESTful 设计
description: 用 Next.js Route Handlers 构建完整的 CRUD API，包含错误处理、参数验证和分页。
date: '2026-02-10'
sidebar: false
prev:
  text: 'TypeScript 类型体操：实用技巧与常见陷阱'
  link: /posts/typescript-type-tips
next: false
---

# Next.js API 路由实战：RESTful 设计

## 为什么在 Next.js 里写 API？

很多人觉得 Next.js 只是前端框架，其实它的 Route Handler（`app/api/`）功能非常成熟，完全可以做后端服务。对于博客、文档站这类中小型项目，用 Next.js 一套搞定前后端是最省事的方案。

## 基本结构

```
app/api/
├── posts/route.ts      # GET /posts, POST /posts
└── posts/[id]/route.ts # GET/PUT/DELETE /posts/:id
```

一个典型的 Route Handler：

```ts
// app/api/posts/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "posts");

export async function GET() {
  const files = await fs.readdir(POSTS_DIR);
  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(path.join(POSTS_DIR, file), "utf-8");
      return { slug: file.replace(".md", ""), raw: content };
    })
  );
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const filePath = path.join(POSTS_DIR, `${body.slug}.md`);
  
  // TODO: validate input
  // TODO: check for file conflicts
  
  await fs.writeFile(filePath, body.content);
  return NextResponse.json({ slug: body.slug }, { status: 201 });
}
```

## 错误处理

别偷懒用 try-catch 就完事，返回有意义的 HTTP 状态码：

```ts
try {
  const post = await getPost(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
} catch (err) {
  console.error("Failed to fetch post:", err);
  return NextResponse.json({ error: "Internal error" }, { status: 500 });
}
```

## 分页实现

API 分页用 query params：

```ts
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 20;
  
  return NextResponse.json({
    posts,
    pagination: { total, page, limit },
  });
}
```

## CORS 和中间件

如果 API 需要跨域调用，可以在 Route Handler 里加 header：

```ts
return NextResponse.json(data, {
  headers: { "Access-Control-Allow-Origin": "*" },
});
```

或者用 middleware 统一处理。

## 小结

Next.js Route Handler 做中小型后端服务完全够用。关键是**保持一致的风格**——错误处理、参数验证、返回格式都走同一个模式，项目大了才不至于乱。

下一篇打算写写游戏开发相关的文章，敬请期待！
