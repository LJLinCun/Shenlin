<script setup>
import { data as posts } from './posts.data.js'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<div class="hero-section">
  <Scroll3DReveal direction="up" :distance="30">
    <div class="hero-content">
      <div class="hero-badge">{{ isDark ? '🌙' : '☀️' }} {{ isDark ? '暗色模式' : '亮色模式' }}</div>
      <h1 class="hero-title">你好，我是林寸</h1>
      <p class="hero-subtitle">
        前端开发 · 游戏技术 · 独立创作<br/>
        记录思考与实践
      </p>
      <div class="hero-actions">
        <a href="/posts/" class="hero-btn hero-btn-primary">看文章</a>
        <a href="/about/" class="hero-btn hero-btn-secondary">关于我</a>
      </div>
    </div>
  </Scroll3DReveal>
</div>

<Scroll3DReveal direction="up" :delay="0.1">
  <div class="home-section">
    <h2 class="section-title">最近文章</h2>
    <div class="post-grid">
      <PostCard v-for="post in posts" :key="post.url" :post="post" />
    </div>
    <div style="text-align:center; margin-top:2rem;">
      <a href="/posts/" class="hero-btn hero-btn-secondary">查看全部文章 →</a>
    </div>
  </div>
</Scroll3DReveal>
