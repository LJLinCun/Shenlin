<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import giscusConfig from '../giscus.config.js'

const { isDark } = useData()
const route = useRoute()
const containerRef = ref<HTMLElement>()
const initialized = ref(false)

function loadGiscus() {
  if (import.meta.env.SSR || !containerRef.value) return

  // 清除旧的 giscus iframe
  containerRef.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', giscusConfig.repo)
  script.setAttribute('data-repo-id', giscusConfig.repoId)
  script.setAttribute('data-category', giscusConfig.category)
  script.setAttribute('data-category-id', giscusConfig.categoryId)
  script.setAttribute('data-mapping', giscusConfig.mapping)
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', giscusConfig.lang)
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  script.dataset.loaded = ''

  containerRef.value.appendChild(script)
  initialized.value = true
}

// 页面切换时重新加载（每篇文章不同）
watch(() => route.path, () => {
  initialized.value = false
  loadGiscus()
})

// 暗色/亮色模式切换时更新主题
watch(isDark, (dark) => {
  if (!initialized.value) return
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (!iframe) return
  iframe.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? 'dark' : 'light' } } },
    'https://giscus.app'
  )
})

onMounted(() => {
  if (!giscusConfig.repoId) return // 未配置时不加载
  loadGiscus()
})
</script>

<template>
  <div v-if="giscusConfig.repoId" class="giscus-wrapper">
    <h3 class="comments-title">💬 评论</h3>
    <div ref="containerRef" class="giscus-container" />
  </div>
  <div v-else class="giscus-placeholder">
    <p>💬 评论功能待配置</p>
    <p class="giscus-hint">
      请编辑 <code>.vitepress/giscus.config.js</code>，
      填入你的 GitHub 仓库和 Giscus 配置。
    </p>
    <a href="https://giscus.app/" target="_blank" rel="noopener" class="giscus-link">
      前往 giscus.app 生成配置 →
    </a>
  </div>
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.comments-title {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.giscus-placeholder {
  margin-top: 3rem;
  padding: 2rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  text-align: center;
  color: var(--vp-c-text-2);
}

.giscus-placeholder p {
  margin: 0.5rem 0;
}

.giscus-hint {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.giscus-hint code {
  font-size: 0.85em;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
}

.giscus-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

.giscus-link:hover {
  transform: translateY(-2px);
  color: #fff;
}
</style>
