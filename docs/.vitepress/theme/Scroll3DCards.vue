<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let sections: HTMLElement[] = []
let animationId = 0
let lastScrollY = 0

function getContentBlocks(): HTMLElement[] {
  const doc = document.querySelector('.vp-doc')
  if (!doc) return []
  return Array.from(doc.querySelectorAll<HTMLElement>(
    'h2, p, blockquote, div[class*="language-"], .code-demo'
  )).filter(el => el.offsetHeight >= 20)
}

function applyEffect() {
  const viewCenter = window.innerHeight / 2
  let changed = false

  sections.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const elCenter = rect.top + rect.height / 2
    const distFromCenter = elCenter - viewCenter
    const maxDist = window.innerHeight * 0.6
    const normDist = Math.max(-1, Math.min(1, distFromCenter / maxDist))

    // Very subtle: max ±3° tilt at edges
    const tilt = normDist * 3
    // Subtle Z offset: max 15px
    const zOff = -Math.abs(normDist) * 15
    // Shadow slightly stronger at center
    const shadowB = 4 + (1 - Math.abs(normDist)) * 6
    const shadowA = 0.03 + (1 - Math.abs(normDist)) * 0.04

    const transform = `perspective(2000px) rotateX(${tilt}deg) translateZ(${zOff}px)`
    if (el.style.transform !== transform) {
      el.style.transform = transform
      changed = true
    }
    
    const shadow = `0 ${(1 - Math.abs(normDist)) * 3 + 1}px ${shadowB}px rgba(0,0,0,${shadowA})`
    if (el.style.boxShadow !== shadow) {
      el.style.boxShadow = shadow
    }
  })
  
  return changed
}

function animate() {
  const scrollY = window.scrollY
  if (Math.abs(scrollY - lastScrollY) > 1) {
    applyEffect()
    lastScrollY = scrollY
  }
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (import.meta.env.SSR) return
  setTimeout(() => {
    sections = getContentBlocks()
    if (sections.length > 0) animate()
  }, 500)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  sections.forEach((el) => {
    el.style.transform = ''
    el.style.boxShadow = ''
  })
  sections = []
})
</script>

<template>
  <div />
</template>
