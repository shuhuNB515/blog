'use client';

import React, { useState, useEffect } from 'react';
import PageLoader from './PageLoader';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟页面加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
