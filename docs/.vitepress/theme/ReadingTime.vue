<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  words?: number
}
const props = withDefaults(defineProps<Props>(), {
  words: () => Math.floor(Math.random() * 2000) + 500,
})

const readingMinutes = computed(() => {
  const perMinute = 300
  return Math.max(1, Math.ceil(props.words / perMinute))
})
</script>

<template>
  <span class="reading-time">{{ readingMinutes }} 分钟阅读</span>
</template>

<style scoped>
.reading-time {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
</style>
