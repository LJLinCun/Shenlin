<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import ScrollProgressBar from './ScrollProgressBar.vue'
import BackToTop from './BackToTop.vue'
import GiscusComment from './GiscusComment.vue'

const route = useRoute()
const Layout = DefaultTheme.Layout
</script>

<template>
  <Layout>
    <template #layout-top>
      <ScrollProgressBar />
      <BackToTop />
    </template>
    <template #doc-after>
      <GiscusComment v-if="route.path.startsWith('/posts/')" />
    </template>
  </Layout>
</template>
