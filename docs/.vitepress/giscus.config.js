/**
 * Giscus 评论配置
 *
 * 使用步骤：
 * 1. 创建一个 GitHub 仓库（公开），启用 Discussions
 * 2. 安装 Giscus GitHub App：https://github.com/apps/giscus
 * 3. 访问 https://giscus.app/ 生成配置
 * 4. 把下面占位符替换成你的配置
 */
export default {
  // GitHub 仓库配置（替换成你自己的）
  repo: 'lincun/lincun-blog',
  repoId: '', // 在 giscus.app 获取
  category: 'Announcements',
  categoryId: '', // 在 giscus.app 获取

  // 映射方式：pathname | url | title | og:title
  mapping: 'pathname',
  // 主题
  theme: 'preferred_color_scheme',
  // 语言
  lang: 'zh-CN',
}
