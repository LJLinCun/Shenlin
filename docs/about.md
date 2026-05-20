# 关于我

我是林寸，一个对技术充满好奇的创作者。主要活跃在两个领域：

- **前端开发** — Next.js、Vue、React、游戏引擎蓝图开发
- **内容创作** — 历史科普视频、独立游戏开发

这个博客是我记录思考与实践的地方。写技术文章、聊学习心得，也偶尔分享做东西的过程。

## 联系方式

- **Email:** hello@lincun.dev
- **Github:** github.com/LJLinCun
- **B站:** @林寸

---

## 🎮 3D 技术展示

博客现已集成 Three.js WebGPU 3D 渲染引擎。下面是一个实时 3D 演示（拖拽旋转查看）：

<ModelViewer3D :autoRotate="true" height="450px" />

> 这个组件使用 **Three.js** 渲染，支持加载 **GLB/GLTF** 模型。
> 未来会在这里展示 UE 项目的 3D 角色和场景。

---

## 💻 交互式代码演示

文章中的代码块可以直接运行，试试这个 CSS 动画 demo：

<CodeDemo
  title="CSS 3D 翻转卡片"
  :html='`<div class="card">
  <div class="card-inner">
    <div class="card-front">👋 点我翻转</div>
    <div class="card-back">✨ 背面!</div>
  </div>
</div>`'
  :js='`document.querySelector(".card").addEventListener("click", function() { this.classList.toggle("flipped"); })`'
  :css='`.card {
  width: 200px; height: 200px;
  perspective: 800px;
  cursor: pointer;
  margin: 1rem auto;
}
.card-inner {
  width: 100%; height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}
.card.flipped .card-inner {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  position: absolute; inset: 0;
  display: flex; align-items: center;
  justify-content: center;
  border-radius: 16px;
  backface-visibility: hidden;
  font-size: 1.2rem;
  font-weight: 700;
}
.card-front {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: #fff;
}
.card-back {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  transform: rotateY(180deg);
}`'
  height="280px"
/>
