import Link from 'next/link'
import { getSortedPostsData } from '@/app/lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default async function BlogPage() {
  const posts = await getSortedPostsData()
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="fade-in">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">文章列表</h1>
        
        {posts.length === 0 ? (
          <div className="text-center py-12 fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-gray-400 mb-4">还没有文章，开始写第一篇吧！</p>
            <Link
              href="/blog/create"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 card-hover"
            >
              创建第一篇文章
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <article key={post.id} className="border-b border-gray-700 pb-6 fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <Link href={`/blog/${post.id}`} className="block group">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-2">{post.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time>
                      {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
                    </time>
                    {post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="bg-blue-900/30 px-2 py-1 rounded text-blue-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}