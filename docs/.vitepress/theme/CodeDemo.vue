<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  html?: string
  css?: string
  js?: string
  title?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  html: '',
  css: '',
  js: '',
  title: '实时演示',
  height: '300px',
})

const showResult = ref(false)
const sandboxKey = ref(0)

// 可编辑的代码
const editableHtml = ref(props.html)
const editableCss = ref(props.css)
const editableJs = ref(props.js)

const iframeSrcDoc = computed(() => {
  // 安全处理 JS 中的 script 结束标签，防止破坏 HTML 结构
  // HTML5 中反斜杠不能阻止结束标签解析，所以用字符串拼接方式
  const closeTag = '<' + '/script>'
  const safeJs = editableJs.value.split(closeTag).join('<' + '/scr' + 'ipt>')
  return `
<!DOCTYPE html>
<html>
<head>
  <style>${editableCss.value}</style>
</head>
<body>
  ${editableHtml.value}
  <script>${safeJs}<\/script>
</body>
</html>`.trim()
})

function runCode() {
  showResult.value = true
  sandboxKey.value++
}

function resetCode() {
  editableHtml.value = props.html
  editableCss.value = props.css
  editableJs.value = props.js
  showResult.value = false
}
</script>

<template>
  <div class="code-demo">
    <div class="demo-header">
      <span class="demo-title">{{ title }}</span>
      <div class="demo-actions">
        <button class="demo-btn demo-btn-run" @click="runCode">
          ▶ 运行
        </button>
        <button class="demo-btn demo-btn-reset" @click="resetCode">
          ↺ 重置
        </button>
      </div>
    </div>

    <div class="demo-editors">
      <div v-if="html" class="editor-pane">
        <div class="editor-label">HTML</div>
        <textarea
          v-model="editableHtml"
          class="editor-textarea"
          spellcheck="false"
          rows="6"
        />
      </div>
      <div v-if="css" class="editor-pane">
        <div class="editor-label">CSS</div>
        <textarea
          v-model="editableCss"
          class="editor-textarea"
          spellcheck="false"
          rows="6"
        />
      </div>
      <div v-if="js" class="editor-pane">
        <div class="editor-label">JS</div>
        <textarea
          v-model="editableJs"
          class="editor-textarea"
          spellcheck="false"
          rows="6"
        />
      </div>
    </div>

    <div v-if="showResult" class="demo-result" :style="{ height }">
      <iframe
        :key="sandboxKey"
        :srcdoc="iframeSrcDoc"
        class="demo-iframe"
        sandbox="allow-scripts"
        frameborder="0"
      />
    </div>
    <div v-else class="demo-preview-hint">
      点击「▶ 运行」查看效果
    </div>
  </div>
</template>

<style scoped>
.code-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  margin: 1.5rem 0;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.demo-actions {
  display: flex;
  gap: 0.5rem;
}

.demo-btn {
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.demo-btn-run {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  border-color: transparent;
}

.demo-btn-run:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35);
}

.demo-btn-reset:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.demo-editors {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--vp-c-divider);
}

.editor-pane {
  background: var(--vp-c-bg);
}

.editor-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.4rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.editor-textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.75rem 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: none;
  resize: vertical;
  outline: none;
  tab-size: 2;
}

.editor-textarea:focus {
  background: var(--vp-c-bg-soft);
}

.demo-result {
  border-top: 1px solid var(--vp-c-divider);
  background: #fff;
}

.dark .demo-result {
  background: #1a1a2e;
}

.demo-iframe {
  width: 100%;
  height: 100%;
  display: block;
}

.demo-preview-hint {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
