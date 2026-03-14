import { getPostData, getAllPostIds } from '@/app/lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id)
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="fade-in">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-400 hover:underline mb-4 inline-block card-hover">
            ← 返回文章列表
          </Link>
          <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
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
          {post.description && (
            <p className="text-gray-400 italic">{post.description}</p>
          )}
        </header>
        
        <div
          className="prose prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-pink-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded text-gray-300 fade-in"
          style={{ animationDelay: '0.2s' }}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </div>
    </article>
  )
}