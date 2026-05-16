import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  includeSrc: false,
  render: false,
  excerpt: true,
  transform(rawData) {
    return rawData
      .filter(post => post.url !== '/posts/')
      .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
      .map(post => ({
        url: post.url,
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        date: post.frontmatter.date,
        tags: post.frontmatter.tags || [],
        words: (post.frontmatter.description || '').length,
      }))
  },
})
