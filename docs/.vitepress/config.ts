import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '林寸',
  description: '前端开发、游戏技术、独立创作的个人博客。记录思考与实践。',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/posts/' }
    ],
    sidebar: [
      {
        text: '文章',
        items: [
          { text: 'Next.js App Router 入门实战', link: '/posts/getting-started-with-nextjs' },
          { text: 'Tailwind CSS v4 配置技巧与实战', link: '/posts/tailwind-css-tips' },
          { text: 'React Server Components 实践笔记', link: '/posts/react-server-components' },
          { text: 'TypeScript 类型体操：实用技巧与常见陷阱', link: '/posts/typescript-type-tips' },
          { text: 'Next.js API 路由实战：RESTful 设计', link: '/posts/nextjs-api-routes' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lincun' },
      { icon: 'twitter', link: 'https://x.com/lincun_dev' }
    ],
    footer: {
      message: `© ${new Date().getFullYear()} 林寸`,
      copyright: ''
    }
  }
})
