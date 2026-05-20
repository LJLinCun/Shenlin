import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    /** @type {Map<string, Array<{url: string, title: string, date: string, description: string}>>} */
    const tagMap = new Map()

    for (const post of rawData) {
      if (post.url === '/posts/') continue
      const tags = post.frontmatter.tags || []
      for (const tag of tags) {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, [])
        }
        tagMap.get(tag).push({
          url: post.url,
          title: post.frontmatter.title,
          date: post.frontmatter.date,
          description: post.frontmatter.description,
        })
      }
    }

    // Sort by popularity (most posts first)
    const sorted = [...tagMap.entries()]
      .sort((a, b) => b[1].length - a[1].length)

    const allTags = sorted.map(([tag]) => tag)
    const postsByTag = Object.fromEntries(sorted)

    return { allTags, postsByTag }
  },
})
