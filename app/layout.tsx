import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import StarBackground from "./components/StarBackground";
import MeteorEffect from "./components/MeteorEffect";
import ThemeToggle from "./components/ThemeToggle";
import ClientLayout from "./components/ClientLayout";

export const metadata: Metadata = {
  title: "星辰博客",
  description: "分享前端开发、技术见解和个人思考的博客",
  keywords: ["前端开发", "Next.js", "React", "TypeScript", "博客", "星辰"],
  authors: [{ name: "博主" }],
  openGraph: {
    title: "星辰博客",
    description: "分享前端开发、技术见解和个人思考的博客",
    type: "website",
  },
  alternates: {
    types: {
      'application/rss+xml': '/api/rss',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <ClientLayout>
          {/* 星星背景 */}
          <StarBackground />
          {/* 流星效果 */}
          <MeteorEffect />
          
          <div className="py-8 fade-in">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-center mb-8">
                <Link href="/" className="flex items-center justify-center relative group">
                  <img 
                    src="/blog/images/logo.svg" 
                    alt="星辰科技" 
                    className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>
              </div>
              <div className="flex flex-col items-center gap-4 w-full">
                <nav className="flex justify-center gap-12">
                  <NavLink href="/blog" label="文章" />
                  <NavLink href="/tags" label="标签" />
                  <NavLink href="/search" label="搜索" />
                  <NavLink href="/about" label="关于" />
                </nav>
                <ThemeToggle />
              </div>
            </div>
          </div>
          <main className="min-h-screen fade-in" style={{ animationDelay: '0.2s' }}>
            {children}
          </main>
          <footer className="border-t border-gray-700 mt-16 fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-400">
              <p>&copy; 2026 星辰科技. 使用 Next.js 构建.</p>
              <div className="mt-4 flex justify-center gap-4">
                <a href="https://github.com/shuhuNB515" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">GitHub</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Twitter</a>
                <a href="mailto:shuhuNB560@stu.mtc.edu.cn" className="text-gray-400 hover:text-blue-400 transition-colors">邮箱</a>
              </div>
            </div>
          </footer>
        </ClientLayout>
      </body>
    </html>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href} 
      className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-900/40 to-indigo-900/40 hover:from-blue-800/50 hover:to-indigo-800/50 text-white hover:text-blue-300 transition-all duration-300 relative group border border-blue-800/50 hover:border-blue-600/70 shadow-lg shadow-blue-900/20 hover:shadow-blue-800/30 hover:translate-y-[-2px] overflow-hidden"
    >
      {/* 星星装饰 */}
      <span className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300/20 rounded-full blur-md animate-pulse group-hover:bg-yellow-300/30 transition-all duration-300"></span>
      <span className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-300/20 rounded-full blur-md animate-pulse group-hover:bg-blue-300/30 transition-all duration-300"></span>
      
      {/* 文字 */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {label}
        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
      </span>
      
      {/* 底部渐变线 */}
      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      
      {/* 背景光晕效果 */}
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 transform scale-95 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
    </Link>
  );
}
