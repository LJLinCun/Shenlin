import DefaultTheme from 'vitepress/theme'
import ReadingTime from './ReadingTime.vue'
import TocSidebar from './TocSidebar.vue'
import PostCard from './PostCard.vue'
import './index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ReadingTime', ReadingTime)
    app.component('TocSidebar', TocSidebar)
    app.component('PostCard', PostCard)
  }
}
