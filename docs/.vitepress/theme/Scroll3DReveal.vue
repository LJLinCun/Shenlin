<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  distance?: number
  rotate?: number
}>(), {
  direction: 'up',
  delay: 0,
  distance: 40,
  rotate: 5,
})

const el = ref<HTMLElement>()

function computeTransform(): string {
  const d = props.distance
  const r = props.rotate
  switch (props.direction) {
    case 'up': return `translateY(${d}px) rotateX(${r}deg)`
    case 'down': return `translateY(${-d}px) rotateX(${-r}deg)`
    case 'left': return `translateX(${d}px) rotateY(${r}deg)`
    case 'right': return `translateX(${-d}px) rotateY(${-r}deg)`
  }
}

onMounted(() => {
  if (import.meta.env.SSR || !el.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('s3dr-visible')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )
  observer.observe(el.value)
})
</script>

<template>
  <div
    ref="el"
    class="s3dr-reveal"
    :style="{
      transitionDelay: `${props.delay}s`,
      transform: computeTransform(),
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.s3dr-reveal {
  opacity: 0;
  transition: opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1),
              transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform, opacity;
}

.s3dr-reveal.s3dr-visible {
  opacity: 1;
  transform: translateY(0) translateX(0) rotateX(0) rotateY(0) !important;
}
</style>
