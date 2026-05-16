<script setup lang="ts">
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.layout !== 'home' && page.headers?.length > 0" class="toc-sidebar">
    <h3>📑 目录</h3>
    <nav class="toc-nav">
      <a v-for="header in page.headers.filter(h => h.level <= 3)"
         :key="header.id"
         :href="'#' + header.id"
         class="toc-link"
         :class="{ 'is-h3': header.level === 3 }">
        {{ header.text }}
      </a>
    </nav>
  </div>
</template>

<style scoped>
.toc-sidebar {
  padding: 2rem 1.5rem;
}

.toc-sidebar h3 {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.toc-link {
  padding: 0.25rem 0.5rem;
  color: var(--vp-c-text-2);
  border-left: 2px solid var(--vp-c-divider);
  transition: all 0.2s;
  display: block;
}

.toc-link:hover {
  color: var(--vp-c-brand-1);
  border-left-color: var(--vp-c-brand-1);
}

.toc-link.is-h3 {
  padding-left: 1rem;
  font-size: 0.825rem;
}

@media (max-width: 768px) {
  .toc-sidebar { display: none !important; }
}
</style>
