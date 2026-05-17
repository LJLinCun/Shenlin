<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface Post {
  url: string
  title: string
  description: string
  date: string
  tags: string[]
}

const props = defineProps<{ post: Post }>()

const el = ref<HTMLElement>()

onMounted(() => {
  if (import.meta.env.SSR || !el.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )
  observer.observe(el.value)
})
</script>

<template>
  <a :href="post.url" class="post-card" ref="el">
    <h3>{{ post.title }}</h3>
    <time class="date">{{ post.date }}</time>
    <p class="desc">{{ post.description }}</p>
    <span v-if="post.tags.length" class="tag-group">
      <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
    </span>
  </a>
</template>
