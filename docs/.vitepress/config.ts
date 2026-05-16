import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '林寸',
  description: '前端开发 · 游戏技术 · 独立创作',
  lang: 'zh-CN',

  // Head tags — SEO + performance
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['style', {}, `
      .vp-doc p { line-height: 2; font-size: 0.95rem; margin: 1em 0; }
      .vp-doc h1, .vp-doc h2, .vp-doc h3 { font-weight: 700; letter-spacing: -0.02em; }
      .vp-doc a { transition: color 0.2s; }
      .vp-doc a:hover { text-decoration-thickness: 2px; }
      html { scroll-behavior: smooth; }
    `],
  ],

  themeConfig: {
    logo: '🖥️',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于我', link: '/about/' },
      // { text: '友链', link: '/links/' },  // future
    ],

    sidebar: [
      {
        text: '文章',
        items: [
          { text: 'Next.js App Router 入门实战', link: '/posts/getting-started-with-nextjs' },
          { text: 'Tailwind CSS v4 配置技巧与实战', link: '/posts/tailwind-css-tips' },
          { text: 'React Server Components 实践笔记', link: '/posts/react-server-components' },
          { text: 'TypeScript 类型体操：实用技巧与常见陷阱', link: '/posts/typescript-type-tips' },
          { text: 'Next.js API 路由实战：RESTful 设计', link: '/posts/nextjs-api-routes' },
        ],
      },
    ],

    search: {
      provider: 'local',  // built-in fuzzy search — no API key needed
      options: {
        locales: {
          root: {
            placeholder: '搜索文章...',
            buttonText: '🔍',
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lincun' },
      { icon: 'twitter', link: 'https://x.com/lincun_dev' },
      // Add more as needed
    ],

    outline: {
      level: [2, 3],
      label: '页面导航',
    },
  },
})
