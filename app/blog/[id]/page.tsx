import { getPostData, getAllPostIds, getSortedPostsData } from '@/app/lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'
import ShareButtons from '@/app/components/ShareButtons'
import ReadingCounter from '@/app/components/ReadingCounter'

export function generateStaticParams() {
  // 直接返回硬编码的路径，避免使用文件系统
  return [
    { params: { id: 'nextjs-tips' } },
    { params: { id: 'welcome' } }
  ]
}

export default async function PostPage({ params }: { params: { id: string } }) {
  try {
    const { id } = params
    const post = await getPostData(id)
    const allPosts = await getSortedPostsData()
    
    // 找到当前文章在排序列表中的位置
    const currentIndex = allPosts.findIndex(p => p.id === id)
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
    
    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="fade-in">
          <header className="mb-8">
            <Link 
              href="/blog" 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-4 py-2 rounded-lg card-hover transition-all hover:from-blue-600/30 hover:to-indigo-600/30 relative overflow-hidden group mb-4 inline-block"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold transition-transform group-hover:scale-110 shadow-md shadow-blue-500/30">
                <span className="relative">
                  ←
                  <span className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-pulse">✦</span>
                </span>
              </div>
              <span className="relative z-10 text-white font-medium">返回文章列表</span>
              {/* 星球背景效果 */}
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm transition-all group-hover:bg-blue-500/20"></div>
              {/* 星星装饰 */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
            </Link>
            <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-400 mb-4 gap-4">
              <div className="flex items-center gap-4">
                <time>
                  {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
                </time>
                <ReadingCounter postId={post.id} />
              </div>
              <div className="flex items-center gap-4">
                {post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-900/30 px-2 py-1 rounded text-blue-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <ShareButtons 
                  title={post.title} 
                  url={`https://shuhuNB515.github.io/blog/blog/${post.id}`} 
                />
              </div>
            </div>
            {post.description && (
              <p className="text-gray-400 italic">{post.description}</p>
            )}
          </header>
          
          <div
            className="prose prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-pink-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded text-gray-300 fade-in"
            style={{ animationDelay: '0.2s' }}
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
          
          {/* 评论系统 */}
          <div className="mt-16 fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-white">
              <span className="gradient-text">评论</span> 区
            </h2>
            <div className="card p-6">
              <div className="utterances-container">
                <iframe 
                  src={`https://utteranc.es/?repo=shuhuNB515/my-blog&issue-term=pathname&theme=github-dark&crossorigin=anonymous`}
                  width="100%" 
                  height="600" 
                  frameBorder="0"
                  loading="lazy"
                  title="Utterances Comments"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* 前后导航 */}
          <div className="mt-16 flex justify-between items-center fade-in" style={{ animationDelay: '0.6s' }}>
            {prevPost && (
              <Link 
                href={`/blog/${prevPost.id}`} 
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-5 py-3 rounded-lg card-hover transition-all hover:from-blue-600/30 hover:to-indigo-600/30 relative overflow-hidden group"
              >
                <div className="relative z-10 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white text-xl font-bold transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/30">
                  <span className="relative">
                    ←
                    {/* 星型装饰 */}
                    <span className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-pulse">✦</span>
                  </span>
                </div>
                <div className="relative z-10">
                  <div className="text-xs text-gray-400">上一篇</div>
                  <div className="text-white font-medium">{prevPost.title}</div>
                </div>
                {/* 星球背景效果 */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm transition-all group-hover:bg-blue-500/20"></div>
                {/* 星星装饰 */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
              </Link>
            )}
            
            {!prevPost && <div className="w-1/2"></div>}
            
            {nextPost && (
              <Link 
                href={`/blog/${nextPost.id}`} 
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-5 py-3 rounded-lg card-hover transition-all hover:from-blue-600/30 hover:to-indigo-600/30 relative overflow-hidden group"
              >
                <div className="relative z-10 text-right">
                  <div className="text-xs text-gray-400">下一篇</div>
                  <div className="text-white font-medium">{nextPost.title}</div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white text-xl font-bold transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/30">
                  <span className="relative">
                    →
                    {/* 星型装饰 */}
                    <span className="absolute -top-1 -left-1 text-yellow-300 text-xs animate-pulse">✦</span>
                  </span>
                </div>
                {/* 星球背景效果 */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm transition-all group-hover:bg-blue-500/20"></div>
                {/* 星星装饰 */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
              </Link>
            )}
          </div>
        </div>
      </article>
    )
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="fade-in">
          <div className="text-6xl mb-6">🌟</div>
          <h1 className="text-3xl font-bold mb-4 text-white">文章不存在</h1>
          <p className="text-gray-400 mb-8">
            抱歉，您请求的文章不存在或已被删除。
          </p>
          <Link 
            href="/blog" 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-4 py-3 rounded-lg card-hover transition-all hover:from-blue-600/30 hover:to-indigo-600/30 relative overflow-hidden group inline-block"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold transition-transform group-hover:scale-110 shadow-md shadow-blue-500/30">
              <span className="relative">
                ←
                <span className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-pulse">✦</span>
              </span>
            </div>
            <span className="relative z-10 text-white font-medium">返回文章列表</span>
            {/* 星球背景效果 */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm transition-all group-hover:bg-blue-500/20"></div>
            {/* 星星装饰 */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
          </Link>
        </div>
      </div>
    )
  }
}
