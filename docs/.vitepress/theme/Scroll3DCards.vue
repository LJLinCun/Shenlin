<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let sections: HTMLElement[] = []
let animationId = 0

function getContentBlocks(): HTMLElement[] {
  const doc = document.querySelector('.vp-doc')
  if (!doc) return []

  const blocks = doc.querySelectorAll<HTMLElement>(
    'h1, h2, h3, p, blockquote, div[class*="language-"], ul, ol, hr, .code-demo, .model-viewer-wrapper'
  )
  return Array.from(blocks).filter(el => el.offsetHeight >= 10)
}

function apply3DEffect() {
  const viewCenter = window.innerHeight / 2

  sections.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const elCenter = rect.top + rect.height / 2
    const distFromCenter = elCenter - viewCenter

    // Normalize: -1 (top edge) to +1 (bottom edge)
    const maxDist = window.innerHeight * 0.5
    const normDist = Math.max(-1, Math.min(1, distFromCenter / maxDist))

    // Tilt: 0 at center, up to ±20° at edges
    const tiltAngle = normDist * 20

    // Z offset: elements at edges appear further back
    const zOffset = -Math.abs(normDist) * 80

    // Scale: center elements slightly larger (1.02), edge elements normal
    const scale = 1 + (1 - Math.abs(normDist)) * 0.02

    // Opacity: full at center, slightly faded at edges
    const opacity = 1 - Math.abs(normDist) * 0.12

    // Shadow: stronger at center
    const shadowBlur = 4 + (1 - Math.abs(normDist)) * 12
    const shadowOpacity = 0.03 + (1 - Math.abs(normDist)) * 0.07

    el.style.setProperty('transform',
      `perspective(1200px) rotateX(${tiltAngle}deg) translateZ(${zOffset}px) scale(${scale})`,
      'important'
    )
    el.style.setProperty('opacity', String(opacity), 'important')
    el.style.setProperty('box-shadow',
      `0 ${(1 - Math.abs(normDist)) * 6 + 1}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`,
      'important'
    )
    el.style.setProperty('transition', 'transform 0.15s ease-out, opacity 0.15s ease-out, box-shadow 0.15s ease-out')
    el.style.setProperty('transform-style', 'preserve-3d')
    el.style.setProperty('will-change', 'transform, opacity')
  })
}

function animate() {
  animationId = requestAnimationFrame(animate)
  apply3DEffect()
}

onMounted(() => {
  if (import.meta.env.SSR) return
  // Give VitePress time to render
  setTimeout(() => {
    sections = getContentBlocks()
    if (sections.length > 0) {
      animate()
    }
  }, 500)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  // Reset all styles
  sections.forEach((el) => {
    el.style.removeProperty('transform')
    el.style.removeProperty('opacity')
    el.style.removeProperty('box-shadow')
    el.style.removeProperty('transition')
    el.style.removeProperty('transform-style')
    el.style.removeProperty('will-change')
  })
  sections = []
})
</script>

<template>
  <div />
</template>

