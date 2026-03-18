'use client';

import React, { useEffect, useState } from 'react';

interface ReadingCounterProps {
  postId: string;
}

export default function ReadingCounter({ postId }: ReadingCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 从LocalStorage中获取阅读次数
    const getReadingCount = () => {
      const storageKey = `reading_count_${postId}`;
      const storedCount = localStorage.getItem(storageKey);
      if (storedCount) {
        return parseInt(storedCount, 10);
      }
      return 0;
    };

    // 初始化阅读次数
    const initialCount = getReadingCount();
    setCount(initialCount);

    // 增加阅读次数
    const newCount = initialCount + 1;
    localStorage.setItem(`reading_count_${postId}`, newCount.toString());
    setCount(newCount);
  }, [postId]);

  return (
    <div className="flex items-center gap-1 text-sm text-gray-400">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span>{count} 次阅读</span>
    </div>
  );
}
