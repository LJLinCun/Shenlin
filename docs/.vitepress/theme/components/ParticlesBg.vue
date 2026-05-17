<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDark } from '@vueuse/core'

const canvas = ref<HTMLCanvasElement>()
const isDark = useDark()

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

let animationId: number
let particles: Particle[] = []
let mouseX = 0
let mouseY = 0
let ctx: CanvasRenderingContext2D | null = null

function resize(cvs: HTMLCanvasElement) {
  cvs.width = window.innerWidth
  cvs.height = window.innerHeight
}

function createParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(Math.random() * 0.4 + 0.1),
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.2,
  }))
}

function animate(cvs: HTMLCanvasElement) {
  if (!ctx) return
  const w = cvs.width
  const h = cvs.height
  const color = isDark.value ? '147, 197, 253' : '37, 99, 235'

  ctx.clearRect(0, 0, w, h)

  for (const p of particles) {
    p.x += p.vx + (mouseX - w / 2) * 0.0001
    p.y += p.vy
    if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
    if (p.x < -10) p.x = w + 10
    if (p.x > w + 10) p.x = -10

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${color}, ${p.opacity})`
    ctx.fill()
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(${color}, ${0.08 * (1 - dist / 120)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }

  animationId = requestAnimationFrame(() => animate(cvs))
}

onMounted(() => {
  if (import.meta.env.SSR || !canvas.value) return
  ctx = canvas.value.getContext('2d')!
  resize(canvas.value)
  particles = createParticles(
    Math.min(60, Math.floor(window.innerWidth * 0.04)),
    canvas.value.width,
    canvas.value.height,
  )
  animate(canvas.value)

  const onResize = () => { if (canvas.value) resize(canvas.value) }
  const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouse)

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    window.removeEventListener('mousemove', onMouse)
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  particles = []
})
</script>

<template>
  <canvas ref="canvas" class="particles-canvas" />
</template>

<style scoped>
.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
