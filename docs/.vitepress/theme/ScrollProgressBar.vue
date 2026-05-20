<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()
const progress = ref(0)
const visible = ref(false)
let handler: (() => void) | null = null

function setupScrollHandler() {
  // 清除旧的 handler
  if (handler) {
    window.removeEventListener('scroll', handler)
    handler = null
  }
  progress.value = 0
  visible.value = false

  // 首页不需要进度条
  if (frontmatter.value.layout === 'home') return

  handler = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight <= 0) { progress.value = 0; return }
    progress.value = Math.min(scrollTop / docHeight * 100, 100)
    visible.value = scrollTop > 80
  }
  window.addEventListener('scroll', handler, { passive: true })
}

// SPA 路由切换时重新评估
watch(() => route.path, () => {
  setupScrollHandler()
})

onMounted(() => {
  if (import.meta.env.SSR) return
  setupScrollHandler()
})

onUnmounted(() => {
  if (handler) window.removeEventListener('scroll', handler)
})
</script>

<template>
  <div class="scroll-progress" :class="{ visible }">
    <div class="scroll-progress-bar" :style="{ width: progress + '%' }" />
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 999;
  background: transparent;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.scroll-progress.visible {
  opacity: 1;
}
.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  border-radius: 0 2px 2px 0;
  transition: width 0.1s linear;
}
</style>
