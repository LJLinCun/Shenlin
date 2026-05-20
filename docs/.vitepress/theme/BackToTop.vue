<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)
let handler: (() => void) | null = null

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  if (import.meta.env.SSR) return
  handler = () => { show.value = window.scrollY > 300 }
  window.addEventListener('scroll', handler, { passive: true })
})

onUnmounted(() => {
  if (handler) window.removeEventListener('scroll', handler)
})
</script>

<template>
  <button v-show="show" class="back-to-top" @click="scrollToTop" aria-label="回到顶部">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  </button>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 100;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease;
}
.back-to-top:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.2);
}
@media (max-width: 768px) {
  .back-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 40px;
    height: 40px;
  }
}
</style>
