<script setup>
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

# 林寸的博客

<div style="text-align:center; padding:3rem 0">
<h1 style="font-size:2.5rem; margin-bottom:0.5rem;">👋 你好，我是林寸</h1>
<p style="font-size:1.2rem; color:var(--vp-c-text-2); max-width:600px; margin:0 auto; line-height:1.8">前端开发 · 游戏技术 · 独立创作<br/>记录思考与实践</p>
<div style="margin-top:1.5rem; display:flex; gap:1rem; justify-content:center; flex-wrap:wrap">
<a href="/posts/" class="vp-button primary" style="padding:0.75rem 2rem; border-radius:8px;">看文章</a>
<a href="/about/" style="padding:0.75rem 2rem; border-radius:8px; border:1px solid var(--vp-c-border); color:var(--vp-c-text-1); text-decoration:none; display:inline-block;">关于我</a>
</div>
<div style="margin-top:1rem; font-size:0.9rem; color:var(--vp-c-text-3)">
  {{ isDark ? '🌙' : '☀️' }} {{ isDark ? '暗色模式' : '亮色模式' }}
</div>
</div>

## 🔥 最近文章

<div class="post-grid">
<a href="/posts/getting-started-with-nextjs" class="post-card">
<h3>Next.js App Router 入门实战</h3>
<time class="date">2025-11-28 · ⏱️ 约 8 分钟</time>
<p class="desc">从零开始搭建 Next.js 应用，掌握服务端组件、路由和 API 的核心概念。</p>
<span class="tag-group"><span class="tag">#Next.js</span><span class="tag">#React</span></span>
<span class="reading-time">📖 8 分钟阅读</span>
</a>

<a href="/posts/tailwind-css-tips" class="post-card">
<h3>Tailwind CSS v4 配置技巧与实战</h3>
<time class="date">2025-11-25 · ⏱️ 约 6 分钟</time>
<p class="desc">v4 版本的变化、@theme 语法和实用配置模式。</p>
<span class="tag-group"><span class="tag">#CSS</span><span class="tag">#设计系统</span></span>
<span class="reading-time">📖 6 分钟阅读</span>
</a>

<a href="/posts/react-server-components" class="post-card">
<h3>React Server Components 实践笔记</h3>
<time class="date">2025-11-20 · ⏱️ 约 12 分钟</time>
<p class="desc">RSC 的工作原理和在 Next.js 中的最佳实践总结。</p>
<span class="tag-group"><span class="tag">#React</span><span class="tag">#性能</span></span>
<span class="reading-time">📖 12 分钟阅读</span>
</a>

<a href="/posts/typescript-type-tips" class="post-card">
<h3>TypeScript 类型体操：实用技巧与常见陷阱</h3>
<time class="date">2025-11-18 · ⏱️ 约 10 分钟</time>
<p class="desc">高级类型模式、泛型进阶和日常踩坑记录。</p>
<span class="tag-group"><span class="tag">#TypeScript</span><span class="tag">#进阶</span></span>
<span class="reading-time">📖 10 分钟阅读</span>
</a>

<a href="/posts/nextjs-api-routes" class="post-card">
<h3>Next.js API 路由实战：RESTful 设计</h3>
<time class="date">2025-11-15 · ⏱️ 约 7 分钟</time>
<p class="desc">设计规范的 API 接口，包括验证、错误处理和分页。</p>
<span class="tag-group"><span class="tag">#API</span><span class="tag">#后端</span></span>
<span class="reading-time">📖 7 分钟阅读</span>
</a>
</div>

<div style="text-align:center; margin-top:2rem;">
<a href="/posts/" style="padding:0.75rem 2rem; border-radius:8px; border:1px solid var(--vp-c-border); color:var(--vp-c-text-1); text-decoration:none; display:inline-block;">查看全部文章 →</a>
</div>
