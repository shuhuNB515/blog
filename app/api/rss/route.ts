import { getSortedPostsData } from '@/app/lib/posts';

export const dynamic = "force-static";

export async function GET() {
  const posts = await getSortedPostsData();
  
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>星辰博客</title>
    <link>https://shuhuNB515.github.io/blog</link>
    <description>分享前端开发、技术见解和个人思考的博客</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
    ${posts.map(post => `
      <item>
        <title>${post.title}</title>
        <link>https://shuhuNB515.github.io/blog/blog/${post.id}</link>
        <description>${post.description}</description>
        <pubDate>${new Date(post.date).toISOString()}</pubDate>
        <guid>https://shuhuNB515.github.io/blog/blog/${post.id}</guid>
        ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
      </item>
    `).join('')}
  </channel>
</rss>`;
  
  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
