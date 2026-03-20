'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface LoginFormData {
  username: string;
  password: string;
  email: string;
  phone: string;
  code: string;
}

type LoginType = 'password' | 'email' | 'phone' | 'wechat' | 'qq';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<LoginType>('password');
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    email: '',
    phone: '',
    code: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCode = async () => {
    if (isSendingCode || countdown > 0) return;

    const target = loginType === 'email' ? formData.email : formData.phone;
    if (!target) {
      setError(loginType === 'email' ? '请输入邮箱' : '请输入手机号');
      return;
    }

    setIsSendingCode(true);
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [loginType === 'email' ? 'email' : 'phone']: target,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // 开始倒计时
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(data.error || '发送验证码失败');
      }
    } catch (err) {
      setError('发送验证码失败');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let loginData: any = { type: loginType };

      switch (loginType) {
        case 'password':
          loginData = {
            ...loginData,
            username: formData.username,
            password: formData.password,
          };
          break;
        case 'email':
          loginData = {
            ...loginData,
            email: formData.email,
            code: formData.code,
          };
          break;
        case 'phone':
          loginData = {
            ...loginData,
            phone: formData.phone,
            code: formData.code,
          };
          break;
        case 'wechat':
        case 'qq':
          // 模拟第三方登录
          loginData = {
            ...loginData,
            [loginType === 'wechat' ? 'wechatId' : 'qqId']: `test_${loginType}_id`,
            nickname: `Test ${loginType} User`,
            avatar: `https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=square`,
          };
          break;
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        // 存储用户信息到 localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // 跳转到个人中心页面
        window.location.href = '/auth/profile';
      } else {
        setError(data.error || '登录失败');
      }
    } catch (err) {
      setError('登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="fade-in">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          <span className="gradient-text">登录</span>
        </h1>
        
        <div className="card p-8 card-hover">
          {error && (
            <div className="bg-red-900/30 text-red-400 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* 登录方式切换 */}
          <div className="flex mb-6 border-b border-gray-700">
            <button
              className={`flex-1 py-2 px-4 text-center ${loginType === 'password' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
              onClick={() => setLoginType('password')}
            >
              密码登录
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${loginType === 'email' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
              onClick={() => setLoginType('email')}
            >
              邮箱登录
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${loginType === 'phone' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
              onClick={() => setLoginType('phone')}
            >
              手机号登录
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* 密码登录表单 */}
            {loginType === 'password' && (
              <>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-300 mb-2">
                    用户名
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="请输入用户名"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-300 mb-2">
                    密码
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="请输入密码"
                    required
                  />
                </div>
              </>
            )}

            {/* 邮箱登录表单 */}
            {loginType === 'email' && (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="请输入邮箱"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="code" className="block text-gray-300 mb-2">
                    验证码
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="请输入验证码"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={isSendingCode || countdown > 0}
                      className="px-4 py-3 rounded-md bg-blue-900/50 hover:bg-blue-800/50 text-white transition-colors"
                    >
                      {countdown > 0 ? `${countdown}s` : '获取验证码'}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* 手机号登录表单 */}
            {loginType === 'phone' && (
              <>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-300 mb-2">
                    手机号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="请输入手机号"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="code" className="block text-gray-300 mb-2">
                    验证码
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="请输入验证码"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={isSendingCode || countdown > 0}
                      className="px-4 py-3 rounded-md bg-blue-900/50 hover:bg-blue-800/50 text-white transition-colors"
                    >
                      {countdown > 0 ? `${countdown}s` : '获取验证码'}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* 密码、邮箱、手机号登录的提交按钮 */}
            {(loginType === 'password' || loginType === 'email' || loginType === 'phone') && (
              <button
                type="submit"
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? '登录中...' : '登录'}
              </button>
            )}
          </form>

          {/* 第三方登录 */}
          <div className="mt-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="px-4 text-gray-400">第三方登录</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>
            <div className="flex justify-center gap-8">
              <button
                onClick={() => setLoginType('wechat')}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 text-2xl">
                  💬
                </div>
                <span className="text-gray-400">微信</span>
              </button>
              <button
                onClick={() => setLoginType('qq')}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 text-2xl">
                  🐧
                </div>
                <span className="text-gray-400">QQ</span>
              </button>
            </div>
          </div>

          {/* 第三方登录的提交按钮 */}
          {(loginType === 'wechat' || loginType === 'qq') && (
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? '登录中...' : `使用${loginType === 'wechat' ? '微信' : 'QQ'}登录`}
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              还没有账号？ <Link href="#" className="text-blue-400 hover:underline">注册</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
