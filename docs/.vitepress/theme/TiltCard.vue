<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useDark } from '@vueuse/core'

export interface Post {
  url: string
  title: string
  description: string
  date: string
  tags: string[]
}

const props = defineProps<{ post: Post }>()

const isDark = useDark()
const cardEl = ref<HTMLElement>()
const shineEl = ref<HTMLElement>()

const MAX_TILT = 12
const currentX = ref(0)
const currentY = ref(0)
const targetX = ref(0)
const targetY = ref(0)
const isHovering = ref(false)
let rafId = 0

function onMouseMove(e: MouseEvent) {
  if (!cardEl.value) return
  const rect = cardEl.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = (e.clientX - cx) / (rect.width / 2)
  const dy = (e.clientY - cy) / (rect.height / 2)
  targetY.value = -dx * MAX_TILT
  targetX.value = dy * MAX_TILT
  isHovering.value = true
}

function onMouseLeave() {
  targetX.value = 0
  targetY.value = 0
  isHovering.value = false
}

function animate() {
  currentX.value += (targetX.value - currentX.value) * 0.1
  currentY.value += (targetY.value - currentY.value) * 0.1
  if (cardEl.value) {
    const tilt = isHovering.value ? '' : ''
    cardEl.value.style.transform = `perspective(1200px) rotateX(${currentX.value}deg) rotateY(${currentY.value}deg)`
    // Shadow offset opposite to tilt
    const sx = -(currentY.value / MAX_TILT) * 12
    const sy = (currentX.value / MAX_TILT) * 12
    const shadowBlur = isHovering.value ? 32 : 16
    const shadowAlpha = isHovering.value ? (isDark.value ? 0.35 : 0.18) : (isDark.value ? 0.15 : 0.08)
    const brandShadow = isHovering.value ? (isDark.value ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.20)') : 'transparent'
    cardEl.value.style.boxShadow = `${sx}px ${sy}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha}), ${sx * 2}px ${sy * 2}px ${shadowBlur * 1.5}px ${brandShadow}`
    // Shine position
    if (shineEl.value) {
      const shX = 50 + (currentY.value / MAX_TILT) * 30
      const shY = 50 - (currentX.value / MAX_TILT) * 30
      shineEl.value.style.background = `radial-gradient(circle at ${shX}% ${shY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
    }
  }
  const dx = Math.abs(currentX.value - targetX.value)
  const dy = Math.abs(currentY.value - targetY.value)
  if (dx > 0.01 || dy > 0.01 || isHovering.value) {
    rafId = requestAnimationFrame(animate)
  }
}

function startAnimation() {
  if (!rafId) {
    rafId = requestAnimationFrame(animate)
  }
}

onMounted(() => {
  if (import.meta.env.SSR) return
  if (!cardEl.value) return
  cardEl.value.addEventListener('mousemove', onMouseMove)
  cardEl.value.addEventListener('mouseleave', onMouseLeave)
  // Scroll reveal observer
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )
  observer.observe(cardEl.value)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})

const formattedDate = computed(() => {
  if (!props.post.date) return ''
  const d = new Date(props.post.date)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>

<template>
  <a
    :href="post.url"
    ref="cardEl"
    class="tilt-card"
    @mouseenter="startAnimation"
  >
    <!-- Shine overlay -->
    <div ref="shineEl" class="tilt-shine" />

    <!-- Layered content -->
    <div class="tilt-layer" data-depth="40">
      <h3 class="tilt-title">{{ post.title }}</h3>
    </div>
    <div class="tilt-layer" data-depth="25">
      <time class="tilt-date">{{ formattedDate }}</time>
    </div>
    <div class="tilt-layer" data-depth="20">
      <p class="tilt-desc">{{ post.description }}</p>
    </div>
    <div class="tilt-layer" data-depth="15">
      <span v-if="post.tags.length" class="tilt-tag-group">
        <span v-for="tag in post.tags" :key="tag" class="tilt-tag">#{{ tag }}</span>
      </span>
    </div>
  </a>
</template>

<style scoped>
.tilt-card {
  position: relative;
  display: block;
  padding: 1.5rem 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  transform-style: preserve-3d;
  perspective: 1200px;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s ease;
  /* scroll reveal base */
  opacity: 0;
  transform: perspective(1200px) translateY(24px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out,
              border-color 0.3s ease, box-shadow 0.05s linear;
}

.tilt-card.visible {
  opacity: 1;
  transform: perspective(1200px) translateY(0);
}

.tilt-card:hover {
  border-color: var(--vp-c-brand-1);
}

.dark .tilt-card {
  background: rgba(255, 255, 255, 0.035);
  border-color: rgba(255, 255, 255, 0.08);
}

.dark .tilt-card:hover {
  border-color: rgba(147, 197, 253, 0.4);
}

/* ========== Shine ========== */
.tilt-shine {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  pointer-events: none;
  z-index: 0;
  transform: translateZ(1px);
  background: radial-gradient(circle at 50% 50%, transparent 0%, transparent 60%);
  transition: background 0.05s linear;
}

/* ========== Layers ========== */
.tilt-layer {
  position: relative;
  z-index: 1;
  transform-style: preserve-3d;
}

.tilt-layer[data-depth="40"] {
  transform: translateZ(40px);
}

.tilt-layer[data-depth="25"] {
  transform: translateZ(25px);
}

.tilt-layer[data-depth="20"] {
  transform: translateZ(20px);
}

.tilt-layer[data-depth="15"] {
  transform: translateZ(15px);
}

/* ========== Title ========== */
.tilt-title {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  transition: color 0.3s ease;
}

.tilt-card:hover .tilt-title {
  color: var(--vp-c-brand-1);
}

.dark .tilt-card:hover .tilt-title {
  color: #93c5fd;
}

/* ========== Date ========== */
.tilt-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  display: inline-block;
}

/* ========== Description ========== */
.tilt-desc {
  margin: 0.75rem 0 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* ========== Tags ========== */
.tilt-tag-group {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.tilt-tag {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  background: rgba(37, 99, 235, 0.1);
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  transition: background 0.2s ease, color 0.2s ease;
}

.tilt-card:hover .tilt-tag {
  background: rgba(37, 99, 235, 0.18);
}

.dark .tilt-tag {
  color: #93c5fd;
  background: rgba(147, 197, 253, 0.1);
}

.dark .tilt-card:hover .tilt-tag {
  background: rgba(147, 197, 253, 0.18);
}

/* ========== Backface Gloss ========== */
.tilt-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  pointer-events: none;
  z-index: 0;
  backface-visibility: hidden;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.0) 40%,
    rgba(255, 255, 255, 0.02) 100%
  );
}

.dark .tilt-card::after {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.03) 0%,
    transparent 40%,
    rgba(37, 99, 235, 0.03) 100%
  );
}
</style>
