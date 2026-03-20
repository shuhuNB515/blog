'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    avatar: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // 从 localStorage 中获取用户信息
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setEditForm({
        username: JSON.parse(userData).username,
        avatar: JSON.parse(userData).avatar || '',
      });
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    // 清除 localStorage 中的用户信息
    localStorage.removeItem('user');
    // 跳转到登录页面
    window.location.href = '/auth/login';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) return;

    try {
      const response = await fetch(`/api/auth/profile?userId=${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();
      if (response.ok) {
        // 更新本地用户信息
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccess('更新成功');
        setIsEditing(false);
      } else {
        setError(data.error || '更新失败');
      }
    } catch (err) {
      setError('更新失败');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🔄</div>
        <p className="text-lg text-gray-400">加载中...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold mb-4 text-white">请先登录</h2>
        <p className="text-gray-400 mb-6">您还没有登录，请先登录后再访问个人中心。</p>
        <Link href="/auth/login" className="btn-primary inline-block">
          去登录
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="fade-in">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          <span className="gradient-text">个人中心</span>
        </h1>
        
        <div className="card p-8 card-hover">
          {error && (
            <div className="bg-red-900/30 text-red-400 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-900/30 text-green-400 p-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl text-white mb-4">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                user.username.charAt(0).toUpperCase()
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{user.username}</h2>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <label htmlFor="username" className="block text-gray-300 mb-2">
                  用户名
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editForm.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="请输入用户名"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="avatar" className="block text-gray-300 mb-2">
                  头像 URL
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  value={editForm.avatar}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="请输入头像 URL"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm({
                      username: user.username,
                      avatar: user.avatar || '',
                    });
                  }}
                  className="flex-1 btn-secondary"
                >
                  取消
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">用户名</span>
                  <span className="text-white">{user.username}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">邮箱</span>
                  <span className="text-white">
                    {user.email ? (
                      <>
                        {user.email} {user.emailVerified && <span className="text-green-400 ml-2">✓</span>}
                      </>
                    ) : (
                      '未设置'
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">手机号</span>
                  <span className="text-white">
                    {user.phone ? (
                      <>
                        {user.phone} {user.phoneVerified && <span className="text-green-400 ml-2">✓</span>}
                      </>
                    ) : (
                      '未设置'
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300">注册时间</span>
                  <span className="text-white">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 btn-primary"
                >
                  编辑资料
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 btn-secondary"
                >
                  退出登录
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
