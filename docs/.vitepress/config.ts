import { defineConfig } from 'vitepress'
import { createContentLoader } from 'vitepress'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = 'https://lincun.dev'

export default defineConfig({
  title: '林寸',
  description: '前端开发 · 游戏技术 · 独立创作',
  lang: 'zh-CN',

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  outDir: '../dist',

  sitemap: {
    hostname: SITE_URL,
    lastUpdated: true,
  },

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: '林寸的博客', href: '/feed.xml' }],
  ],

  themeConfig: {
    logo: '🖥️',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '标签', link: '/tags/' },
      { text: '关于我', link: '/about/' },
    ],

    sidebar: [
      {
        text: '文章',
        items: [
          { text: 'Three.js + WebGPU 2026：网页3D新纪元', link: '/posts/threejs-webgpu-2026' },
          { text: 'Next.js App Router 入门实战', link: '/posts/getting-started-with-nextjs' },
          { text: 'Tailwind CSS v4 配置技巧与实战', link: '/posts/tailwind-css-tips' },
          { text: 'React Server Components 实践笔记', link: '/posts/react-server-components' },
          { text: 'TypeScript 类型体操：实用技巧与常见陷阱', link: '/posts/typescript-type-tips' },
          { text: 'Next.js API 路由实战：RESTful 设计', link: '/posts/nextjs-api-routes' },
        ],
      },
      {
        text: '更多',
        items: [
          { text: '🏷️ 标签', link: '/tags/' },
        ],
      },
    ],

    search: {
      provider: 'local',
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
      { icon: 'github', link: 'https://github.com/LJLinCun' },
      { icon: 'twitter', link: 'https://x.com/lincun_dev' },
    ],

    outline: {
      level: [2, 3],
      label: '页面导航',
    },
  },

  transformPageData(pageData) {
    pageData.frontmatter.head ??= []
    const title = pageData.frontmatter.layout === 'home'
      ? '林寸的博客'
      : `${pageData.title} | 林寸的博客`
    const desc = pageData.frontmatter.description || '前端开发 · 游戏技术 · 独立创作'
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: desc }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: '林寸的博客' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_description' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: desc }],
    )
  },

  async buildEnd(siteConfig) {
    const posts = await createContentLoader('posts/*.md', {
      includeSrc: false,
      render: false,
      excerpt: false,
    }).load()

    const sorted = posts
      .filter(p => p.url !== '/posts/')
      .sort((a, b) =>
        +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      )

    const items = sorted.map(p => `
    <item>
      <title><![CDATA[${p.frontmatter.title}]]></title>
      <link>${SITE_URL}${p.url}</link>
      <guid isPermaLink="true">${SITE_URL}${p.url}</guid>
      <description><![CDATA[${p.frontmatter.description || ''}]]></description>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      ${(p.frontmatter.tags || []).map(t => `<category>${t}</category>`).join('\n      ')}
    </item>`).join('\n')

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>林寸的博客</title>
    <link>${SITE_URL}</link>
    <description>前端开发 · 游戏技术 · 独立创作</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

    writeFileSync(resolve(siteConfig.outDir, 'feed.xml'), feed, 'utf-8')
  },
})
