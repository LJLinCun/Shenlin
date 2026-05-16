<script setup lang="ts">
export interface Post {
  url: string
  title: string
  description: string
  date: string
  tags: string[]
}

defineProps<{ post: Post }>()
</script>

<template>
  <a :href="post.url" class="post-card">
    <h3>{{ post.title }}</h3>
    <time class="date">{{ post.date }}</time>
    <p class="desc">{{ post.description }}</p>
    <span v-if="post.tags.length" class="tag-group">
      <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
    </span>
  </a>
</template>
