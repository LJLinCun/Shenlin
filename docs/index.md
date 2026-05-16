<script setup>
import { data as posts } from './posts.data.js'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

# 林寸的博客

<div style="text-align:center; padding:3rem 0">
<h1 style="font-size:2.5rem; margin-bottom:0.5rem;">👋 你好，我是林寸</h1>
<p style="font-size:1.2rem; color:var(--vp-c-text-2); max-width:600px; margin:0 auto; line-height:1.8">前端开发 · 游戏技术 · 独立创作<br/>记录思考与实践</p>
<div style="margin-top:1.5rem; display:flex; gap:1rem; justify-content:center; flex-wrap:wrap">
<a href="/posts/" style="padding:0.75rem 2rem; border-radius:8px; background:var(--vp-c-brand-1); color:#fff; text-decoration:none; display:inline-block;">看文章</a>
<a href="/about/" style="padding:0.75rem 2rem; border-radius:8px; border:1px solid var(--vp-c-border); color:var(--vp-c-text-1); text-decoration:none; display:inline-block;">关于我</a>
</div>
<div style="margin-top:1rem; font-size:0.9rem; color:var(--vp-c-text-3)">
  {{ isDark ? '🌙' : '☀️' }} {{ isDark ? '暗色模式' : '亮色模式' }}
</div>
</div>

## 🔥 最近文章

<div class="post-grid">
  <PostCard v-for="post in posts" :key="post.url" :post="post" />
</div>

<div style="text-align:center; margin-top:2rem;">
<a href="/posts/" style="padding:0.75rem 2rem; border-radius:8px; border:1px solid var(--vp-c-border); color:var(--vp-c-text-1); text-decoration:none; display:inline-block;">查看全部文章 →</a>
</div>
