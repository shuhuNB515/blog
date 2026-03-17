'use client';
import React, { useState } from 'react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加搜索逻辑，现在只是模拟搜索结果
    if (searchTerm) {
      setSearchResults([`结果 1: ${searchTerm}`, `结果 2: ${searchTerm}`, `结果 3: ${searchTerm}`]);
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
            >
              搜索
            </button>
          </div>
        </form>
        
        {searchResults.length > 0 ? (
          <div className="mt-8 fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-white">搜索结果</h2>
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={index} className="card p-4 card-hover fade-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  {result}
                </div>
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
