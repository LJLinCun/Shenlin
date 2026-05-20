<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { useDark } from '@vueuse/core'

const props = withDefaults(defineProps<{
  modelPath?: string
  autoRotate?: boolean
  height?: string
}>(), {
  autoRotate: true,
  height: '400px',
})

const isDark = useDark()
const containerRef = ref<HTMLElement>()
let renderer: THREE.WebGLRenderer | null = null
let animationId = 0
let resizeHandler: (() => void) | null = null

function cleanup() {
  cancelAnimationFrame(animationId)
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  if (renderer) {
    renderer.dispose()
    const el = renderer.domElement
    el.parentElement?.removeChild(el)
    renderer = null
  }
}

onMounted(() => {
  if (import.meta.env.SSR || !containerRef.value) return

  const container = containerRef.value
  const width = container.clientWidth
  const heightVal = parseInt(props.height)

  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(isDark.value ? '#1a1a2e' : '#f0f4ff')

  // Camera
  const camera = new THREE.PerspectiveCamera(45, width / heightVal, 0.1, 100)
  camera.position.set(3, 2, 5)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, heightVal)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambient)

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
  dirLight.position.set(5, 5, 5)
  dirLight.castShadow = true
  scene.add(dirLight)

  const fillLight = new THREE.DirectionalLight(
    isDark.value ? 0x4488ff : 0xff8844, 0.3
  )
  fillLight.position.set(-3, 3, -3)
  scene.add(fillLight)

  // Default scene: torus knot
  if (!props.modelPath) {
    const geo = new THREE.TorusKnotGeometry(1, 0.3, 128, 16)
    const mat = new THREE.MeshPhysicalMaterial({
      color: isDark.value ? 0x60a5fa : 0x2563eb,
      metalness: 0.6,
      roughness: 0.2,
      clearcoat: 0.3,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.y = 0.8
    mesh.castShadow = true
    scene.add(mesh)

    // Ground
    const groundGeo = new THREE.CircleGeometry(2.5, 32)
    const groundMat = new THREE.MeshStandardMaterial({
      color: isDark.value ? 0x16162a : 0xe8edf8,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    })
    const ground = new THREE.Mesh(groundGeo, groundMat)
    ground.rotation.x = -Math.PI / 2
    scene.add(ground)

    // Grid
    const grid = new THREE.GridHelper(6, 12, 0x888888, 0x444444)
    grid.position.y = 0.01
    scene.add(grid)
  }

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 2
  controls.maxDistance = 12
  controls.autoRotate = props.autoRotate
  controls.autoRotateSpeed = 2

  // Animation loop
  function animate() {
    controls.update()
    renderer!.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate()

  // Resize handler (stored at module level for cleanup)
  resizeHandler = () => {
    const w = container.clientWidth
    const h = parseInt(props.height)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    if (renderer) renderer.setSize(w, h)
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(cleanup)
</script>

<template>
  <div ref="containerRef" class="model-viewer-wrapper" :style="{ height }" />
</template>

<style scoped>
.model-viewer-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  margin: 1.5rem 0;
  position: relative;
}
</style>
