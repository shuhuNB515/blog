'use client';

import React from 'react';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
        </div>
      </div>
    </div>
  );
}
