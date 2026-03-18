'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { getSortedPostsData, Post } from '@/app/lib/posts';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // 在客户端获取所有文章数据
    const fetchPosts = async () => {
      try {
        const posts = await getSortedPostsData();
        setAllPosts(posts);
      } catch (error) {
        console.error('获取文章失败:', error);
      }
    };
    
    fetchPosts();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      setIsLoading(true);
      // 在客户端进行搜索
      const searchTermLower = searchTerm.toLowerCase();
      const results = allPosts.filter(post => {
        return (
          post.title.toLowerCase().includes(searchTermLower) ||
          post.description.toLowerCase().includes(searchTermLower) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTermLower))
        );
      });
      setSearchResults(results);
      setIsLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="fade-in">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">
          <span className="gradient-text">搜索</span> 文章
        </h1>
        
        <form onSubmit={handleSearch} className="mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="输入搜索关键词..."
              className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3"
              disabled={isLoading}
            >
              {isLoading ? '搜索中...' : '搜索'}
            </button>
          </div>
        </form>
        
        {isLoading ? (
          <div className="mt-16 text-center text-gray-400 fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg">正在搜索...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="mt-8 fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-white">搜索结果</h2>
            <div className="space-y-4">
              {searchResults.map((post, index) => (
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
                    {post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.map((tag: string, tagIndex: number) => (
                          <span key={tagIndex} className="bg-blue-900/30 px-2 py-1 rounded text-blue-300 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-16 text-center text-gray-400 fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg">{searchTerm ? '未找到相关结果' : '请输入关键词进行搜索'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
