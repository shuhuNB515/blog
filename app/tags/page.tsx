import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/app/lib/posts';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default async function TagsPage({ searchParams }: { searchParams: { tag?: string } }) {
  const selectedTag = searchParams.tag;
  const tags = await getAllTags();
  const posts = selectedTag ? await getPostsByTag(selectedTag) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="fade-in">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">
          <span className="gradient-text">文章</span> 标签
        </h1>
        
        {/* 标签云 */}
        <div className="flex flex-wrap gap-3 justify-center mb-12 fade-in" style={{ animationDelay: '0.2s' }}>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags?tag=${tag}`}
              className={`px-4 py-2 rounded-full transition-all ${selectedTag === tag 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/40'}
              `}
            >
              {tag}
            </Link>
          ))}
        </div>
        
        {/* 标签文章 */}
        {selectedTag && (
          <div className="fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-white">
              标签: <span className="text-blue-300">{selectedTag}</span>
            </h2>
            
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="card p-6 card-hover block fade-in"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
                    <p className="text-gray-400 mb-4">{post.description}</p>
                    <div className="flex justify-between items-center">
                      <time className="text-sm text-gray-500">
                        {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
                      </time>
                      <div className="flex gap-2">
                        {post.tags.map((tag: string, tagIndex: number) => (
                          <span key={tagIndex} className="bg-blue-900/30 px-2 py-1 rounded text-blue-300 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 mt-12 fade-in">
                <div className="text-6xl mb-4">🏷️</div>
                <p className="text-lg">该标签下暂无文章</p>
              </div>
            )}
          </div>
        )}
        
        {/* 未选择标签时的提示 */}
        {!selectedTag && (
          <div className="text-center text-gray-400 mt-16 fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-6xl mb-4">🏷️</div>
            <p className="text-lg">请选择一个标签查看相关文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
