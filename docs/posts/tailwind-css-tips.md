---
title: Tailwind CSS v4 配置技巧与实战
description: 从 Tailwind v4 的变化讲起，分享 Next.js + Tailwind 的最佳实践和常见陷阱。
date: '2025-12-28'
sidebar: false
prev:
  text: 'Next.js App Router 入门实战'
  link: /posts/getting-started-with-nextjs
next:
  text: 'React Server Components 实践笔记'
  link: /posts/react-server-components
---

# Tailwind CSS v4 配置技巧与实战

## Tailwind CSS v4 有哪些变化？

v4 是一次重大的版本更新，主要变化包括：

1. **CSS-first 配置** — 不再需要 `tailwind.config.js`，直接在 CSS 中用 `@theme` 定义变量
2. **JIT 引擎重写** — 性能提升显著，构建速度更快
3. **原生支持色板** — 内置功能丰富的色彩系统

## Next.js + Tailwind v4 配置

在 Next.js 项目中配置非常简单：

```bash
npx @tailwindcss/cli@next -i ./src/app/globals.css -o ./output.css --watch
```

但推荐用 PostCSS 插件，这样开发体验更好。安装后在你的 `globals.css` 里写：

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-bg: #ffffff;
  --color-fg: #171717;
  --color-accent: #2563eb;
}
```

`@theme` 块定义了设计系统的 token，之后就可以在任意地方用 `text-accent`、`bg-bg` 等类名了。

## 暗色模式

v4 的暗色模式和之前不一样，它不再依赖 `class` 策略（虽然也支持），而是默认用 CSS 媒体查询：

```css
@media (prefers-color-scheme: dark) { ... }
```

如果你需要手动切换按钮，配合 `use client` 组件和 localStorage 存储即可。

## 自定义文章排版样式

做博客时最头疼的就是文章内容的排版。Tailwind 自带的 `prose` 类（来自 typography 插件）是个好起点，但往往不够用：

```css
/* globals.css */
.prose-blog h1 { font-size: 2.25rem; font-weight: 800; line-height: 1.2; }
.prose-blog p { line-height: 1.75; margin-bottom: 1.25rem; color: var(--color-fg); }
.prose-blog blockquote { border-left: 4px solid var(--color-border); padding-left: 1rem; font-style: italic; }
.prose-blog code:not(pre code) { background: var(--color-card); padding: 0.125rem 0.375rem; border-radius: 0.25rem; }
```

在 Markdown 渲染后给外层容器加上 `prose-blog` class，文章内容就会自动套用这些样式。这样比直接依赖 Tailwind 的 prose 插件更可控——你可以完全按照自己的审美来调。

## 常见陷阱

1. **不要混用 v3 和 v4 的配置方式** — 如果用了 `@theme`，就别再写 `tailwind.config.js` 了
2. **自定义颜色要用 `--color-*` 变量名** — 这是 v4 的设计系统约定
3. **暗色模式切换要在 body 上加 `.dark` class** — Tailwind 的 `&:where(.dark, .dark *)` 选择器配合这个才能生效

## 小结

Tailwind v4 让配置变得更简洁，同时也更灵活。对于博客这类内容驱动的网站来说，自定义排版样式（比如上面的 `prose-blog`）是最实用的技巧之一——让你的文章看起来不像模板，而是真正属于自己的风格。
