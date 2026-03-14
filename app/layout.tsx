import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 星星背景 */}
        <div className="stars" id="stars"></div>
        
        <div className="py-8 fade-in">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center mb-8">
              <Link href="/" className="text-3xl font-bold text-white drop-shadow-lg">
                星辰
              </Link>
            </div>
            <nav className="flex justify-center gap-8">
              <Link href="/blog" className="text-white hover:text-blue-200 transition-colors">
                文章
              </Link>
              <Link href="/search" className="text-white hover:text-blue-200 transition-colors">
                搜索
              </Link>
              <Link href="/about" className="text-white hover:text-blue-200 transition-colors">
                关于
              </Link>
            </nav>
          </div>
        </div>
        <main className="min-h-screen fade-in" style={{ animationDelay: '0.2s' }}>
          {children}
        </main>
        <footer className="border-t border-gray-700 mt-16 fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-400">
            <p>&copy; 2024 星辰博客. 使用 Next.js 构建.</p>
          </div>
        </footer>
        
        {/* 生成星星的脚本 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            function createStars() {
              const starsContainer = document.getElementById('stars');
              if (!starsContainer) return;
              
              const starCount = 500;
              const starSizes = ['small', 'medium', 'large'];
              
              for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                const size = starSizes[Math.floor(Math.random() * starSizes.length)];
                star.className = 'star ' + size;
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.opacity = Math.random() * 0.8 + 0.2;
                star.style.setProperty('--duration', Math.random() * 3 + 2 + 's');
                star.style.animationDelay = Math.random() * 5 + 's';
                starsContainer.appendChild(star);
              }
            }
            
            window.addEventListener('DOMContentLoaded', createStars);
          `
        }} />
      </body>
    </html>
  );
}