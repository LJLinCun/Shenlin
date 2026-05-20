import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
import Layout from './Layout.vue'
import ReadingTime from './ReadingTime.vue'
import TocSidebar from './TocSidebar.vue'
import PostCard from './PostCard.vue'
import ParticlesBg from './components/ParticlesBg.vue'
import Hero3D from './Hero3D.vue'
import ModelViewer3D from './ModelViewer3D.vue'
import CodeDemo from './CodeDemo.vue'
import './index.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ReadingTime', ReadingTime)
    app.component('TocSidebar', TocSidebar)
    app.component('PostCard', PostCard)
    app.component('ParticlesBg', ParticlesBg)
    app.component('Hero3D', Hero3D)
    app.component('ModelViewer3D', ModelViewer3D)
    app.component('CodeDemo', CodeDemo)
  },
  setup() {
    const router = useRouter()
    onMounted(() => {
      router.onAfterRouteChange = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }
}
