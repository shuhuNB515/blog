import Link from 'next/link'
import { getSortedPostsData } from '@/app/lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default async function BlogPage() {
  const posts = await getSortedPostsData()
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="fade-in">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">
          <span className="gradient-text">文章</span> 列表
        </h1>
        
        {posts.length === 0 ? (
          <div className="text-center py-16 fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-400 mb-6 text-lg">还没有文章，开始写第一篇吧！</p>
            <Link
              href="/blog/create"
              className="btn-primary inline-block"
            >
              创建第一篇文章
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article key={post.id} className="card p-6 card-hover fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <Link href={`/blog/${post.id}`} className="block group">
                  <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-300 transition-colors text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-2">{post.description}</p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <time className="text-gray-400 text-sm">
                      {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
                    </time>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">
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
