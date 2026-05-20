<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const container = ref<HTMLDivElement>()

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let group: THREE.Group
let animationId: number
let mouseX = 0
let mouseY = 0

interface ShapeDef {
  create: () => THREE.BufferGeometry
  color: string
  x: number; y: number; z: number
  rotSpeed: { x: number; y: number; z: number }
  floatAmp: number
  floatSpeed: number
  size: number
}

const shapes: ShapeDef[] = [
  {
    create: () => new THREE.TorusKnotGeometry(0.5, 0.18, 128, 16),
    color: '#3b82f6', x: -2.4, y: 1.0, z: 0,
    rotSpeed: { x: 0.004, y: 0.009, z: 0 },
    floatAmp: 0.35, floatSpeed: 0.4, size: 1,
  },
  {
    create: () => new THREE.IcosahedronGeometry(1, 0),
    color: '#8b5cf6', x: 2.6, y: -0.6, z: -0.5,
    rotSpeed: { x: 0.006, y: 0.006, z: 0.003 },
    floatAmp: 0.25, floatSpeed: 0.3, size: 0.42,
  },
  {
    create: () => new THREE.OctahedronGeometry(1),
    color: '#22c55e', x: 0, y: -1.4, z: 0.4,
    rotSpeed: { x: 0.005, y: 0.007, z: 0.004 },
    floatAmp: 0.3, floatSpeed: 0.5, size: 0.38,
  },
  {
    create: () => new THREE.TorusGeometry(1, 0.3, 20, 40),
    color: '#f59e0b', x: -1.2, y: -2.0, z: -0.3,
    rotSpeed: { x: 0.009, y: 0.004, z: 0.006 },
    floatAmp: 0.25, floatSpeed: 0.35, size: 0.42,
  },
  {
    create: () => new THREE.DodecahedronGeometry(1),
    color: '#ec4899', x: 1.6, y: 1.6, z: 0.3,
    rotSpeed: { x: 0.007, y: 0.005, z: 0.002 },
    floatAmp: 0.2, floatSpeed: 0.45, size: 0.32,
  },
]

function initScene() {
  if (!container.value) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50)
  camera.position.z = 6

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  container.value.appendChild(renderer.domElement)

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambient)

  const light1 = new THREE.DirectionalLight(0x4488ff, 1.2)
  light1.position.set(3, 5, 4)
  scene.add(light1)

  const light2 = new THREE.DirectionalLight(0xff66aa, 0.5)
  light2.position.set(-4, -2, 3)
  scene.add(light2)

  const light3 = new THREE.DirectionalLight(0x44ff88, 0.3)
  light3.position.set(-2, -4, -3)
  scene.add(light3)

  // Group for all shapes
  group = new THREE.Group()

  shapes.forEach(cfg => {
    const geo = cfg.create()
    const mat = new THREE.MeshPhysicalMaterial({
      color: cfg.color,
      metalness: 0.15,
      roughness: 0.08,
      transparent: true,
      opacity: 0.55,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25,
      envMapIntensity: 0.4,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geo, mat)
    const s = cfg.size
    mesh.scale.set(s, s, s)
    mesh.position.set(cfg.x, cfg.y, cfg.z)
    mesh.userData = {
      ...cfg,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
    }
    group.add(mesh)
  })

  scene.add(group)
}

function animate() {
  animationId = requestAnimationFrame(animate)

  const t = Date.now() * 0.001

  group.children.forEach((mesh: THREE.Mesh) => {
    const d = mesh.userData as ShapeDef & { phaseX: number; phaseY: number }
    mesh.rotation.x += d.rotSpeed.x
    mesh.rotation.y += d.rotSpeed.y
    mesh.rotation.z += d.rotSpeed.z
    mesh.position.y = d.y + Math.sin(t * d.floatSpeed + d.phaseX) * d.floatAmp * 0.5
    mesh.position.x = d.x + Math.sin(t * d.floatSpeed * 0.7 + d.phaseY) * d.floatAmp * 0.25
  })

  // Smooth mouse parallax
  const targetRX = mouseY * 0.25
  const targetRY = mouseX * 0.25
  group.rotation.x += (targetRX - group.rotation.x) * 0.035
  group.rotation.y += (targetRY - group.rotation.y) * 0.035

  renderer.render(scene, camera)
}

function onMouseMove(e: MouseEvent) {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  mouseX = (e.clientX - rect.left) / rect.width - 0.5
  mouseY = (e.clientY - rect.top) / rect.height - 0.5
}

function onResize() {
  if (!container.value) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

onMounted(() => {
  if (import.meta.env.SSR || !container.value) return
  initScene()
  animate()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
  renderer?.dispose()
  // Remove canvas from DOM
  if (container.value && renderer) {
    container.value.removeChild(renderer.domElement)
  }
})
</script>

<template>
  <div ref="container" class="hero-3d-bg" />
</template>

<style scoped>
.hero-3d-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
</style>
