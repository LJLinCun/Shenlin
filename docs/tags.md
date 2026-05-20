---
title: 标签
description: 按标签浏览文章
---

<script setup>
import { ref, computed } from 'vue'
import { data } from './tags.data.js'

const { allTags, postsByTag } = data
const activeTag = ref('')

const filteredPosts = computed(() => {
  if (!activeTag.value) return []
  return postsByTag[activeTag.value] || []
})
</script>

# 🏷️ 标签

<div class="tag-cloud">
  <button
    v-for="tag in allTags"
    :key="tag"
    class="tag-btn"
    :class="{ active: activeTag === tag }"
    @click="activeTag = activeTag === tag ? '' : tag"
  >
    #{{ tag }}
    <span class="tag-count">{{ postsByTag[tag].length }}</span>
  </button>
</div>

<div v-if="filteredPosts.length" class="tag-posts">
  <h2 class="tag-heading"># {{ activeTag }}</h2>
  <div class="post-list">
    <a v-for="post in filteredPosts" :key="post.url" :href="post.url" class="post-item">
      <span class="post-title">{{ post.title }}</span>
      <span class="post-meta">
        <time class="post-date">{{ post.date }}</time>
        <span class="post-desc">{{ post.description }}</span>
      </span>
    </a>
  </div>
</div>

<p v-else-if="!activeTag" class="tag-hint">点击上方标签浏览相关文章</p>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1.5rem 0;
}

.tag-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.tag-btn.active {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.tag-count {
  font-size: 0.75rem;
  background: rgba(128, 128, 128, 0.15);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  min-width: 1.2rem;
  text-align: center;
}

.tag-btn.active .tag-count {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.tag-heading {
  margin-top: 2rem;
  font-size: 1.3rem;
}

.tag-posts {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.post-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.post-item:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  transform: translateX(4px);
}

.post-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.post-item:hover .post-title {
  color: var(--vp-c-brand-1);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.post-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag-hint {
  text-align: center;
  color: var(--vp-c-text-3);
  margin-top: 3rem;
}

@media (max-width: 640px) {
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
}
</style>
