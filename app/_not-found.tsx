import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-9xl font-bold mb-8 fade-in">
          <span className="gradient-text">404</span>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-white fade-in" style={{ animationDelay: '0.2s' }}>
          页面不存在
        </h1>
        <p className="text-xl text-gray-400 mb-12 fade-in" style={{ animationDelay: '0.3s' }}>
          抱歉，您请求的页面不存在或已被删除。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-6 py-3 rounded-lg card-hover transition-all hover:from-blue-600/30 hover:to-indigo-600/30 relative overflow-hidden group fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold transition-transform group-hover:scale-110 shadow-md shadow-blue-500/30">
            <span className="relative">
              ←
              <span className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-pulse">✦</span>
            </span>
          </div>
          <span className="relative z-10 text-white font-medium">返回首页</span>
          {/* 星球背景效果 */}
          <div className="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm transition-all group-hover:bg-blue-500/20"></div>
          {/* 星星装饰 */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
        </Link>
      </div>
    </div>
  );
}
