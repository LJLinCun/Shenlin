# 归档

<div class="archive-list">
  <a href="/posts/getting-started-with-nextjs" class="archive-item">
    <span class="archive-date">2025-12-15</span>
    <span class="archive-title">Next.js App Router 入门实战</span>
  </a>
  <a href="/posts/tailwind-css-tips" class="archive-item">
    <span class="archive-date">2025-12-28</span>
    <span class="archive-title">Tailwind CSS v4 配置技巧与实战</span>
  </a>
  <a href="/posts/react-server-components" class="archive-item">
    <span class="archive-date">2026-01-10</span>
    <span class="archive-title">React Server Components 实践笔记</span>
  </a>
  <a href="/posts/typescript-type-tips" class="archive-item">
    <span class="archive-date">2026-01-25</span>
    <span class="archive-title">TypeScript 类型体操：实用技巧与常见陷阱</span>
  </a>
  <a href="/posts/nextjs-api-routes" class="archive-item">
    <span class="archive-date">2026-02-10</span>
    <span class="archive-title">Next.js API 路由实战：RESTful 设计</span>
  </a>
</div>

<style scoped>
.archive-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.archive-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 1px solid transparent;
}

.archive-item:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  transform: translateX(4px);
}

.archive-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  font-family: 'JetBrains Mono', monospace;
}

.archive-title {
  font-size: 1rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
  transition: color 0.2s;
}

.archive-item:hover .archive-title {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .archive-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
