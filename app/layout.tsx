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
        <div className="star-canvas" id="starCanvas"></div>
        
        <div className="py-8 fade-in">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center mb-8">
              <Link href="/" className="text-4xl font-bold text-white drop-shadow-lg relative group">
                星辰
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </Link>
            </div>
            <nav className="flex justify-center gap-12">
              <NavLink href="/blog" label="文章" />
              <NavLink href="/search" label="搜索" />
              <NavLink href="/about" label="关于" />
            </nav>
          </div>
        </div>
        <main className="min-h-screen fade-in" style={{ animationDelay: '0.2s' }}>
          {children}
        </main>
        <footer className="border-t border-gray-700 mt-16 fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-400">
            <p>&copy; 2024 星辰博客. 使用 Next.js 构建.</p>
            <div className="mt-4 flex justify-center gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">邮箱</a>
            </div>
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
            
            // 星点背景动画
            function initStarCanvas() {
              const canvas = document.getElementById('starCanvas');
              if (!canvas) return;
              
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
              const ctx = canvas.getContext('2d');
              if (!ctx) return;
              
              const particles = [];
              const particleCount = 100;
              
              for (let i = 0; i < particleCount; i++) {
                particles.push({
                  x: Math.random() * canvas.width,
                  y: Math.random() * canvas.height,
                  size: Math.random() * 2 + 1,
                  speedX: (Math.random() - 0.5) * 0.5,
                  speedY: (Math.random() - 0.5) * 0.5,
                  opacity: Math.random() * 0.8 + 0.2
                });
              }
              
              function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                  particle.x += particle.speedX;
                  particle.y += particle.speedY;
                  
                  if (particle.x < 0 || particle.x > canvas.width) {
                    particle.x = Math.random() * canvas.width;
                  }
                  if (particle.y < 0 || particle.y > canvas.height) {
                    particle.y = Math.random() * canvas.height;
                  }
                  
                  ctx.save();
                  ctx.globalAlpha = particle.opacity;
                  ctx.beginPath();
                  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                  ctx.fillStyle = 'rgba(255, 255, 255, ' + particle.opacity + ')';
                  ctx.fill();
                  ctx.restore();
                });
                
                requestAnimationFrame(animate);
              }
              
              animate();
              
              window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
              });
            }
            
            window.addEventListener('DOMContentLoaded', () => {
              createStars();
              initStarCanvas();
            });
          `
        }} />
      </body>
    </html>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href} 
      className="text-white hover:text-blue-300 transition-colors relative group py-2"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
  );
}
