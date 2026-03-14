export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="fade-in">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">关于我</h1>
        
        <div className="prose prose-lg max-w-none text-gray-300">
          <section className="mb-12 fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">欢迎来到星辰博客</h2>
            <p className="leading-relaxed">
              这里是我在网络世界的小天地，我会在这里分享关于前端开发、技术见解和个人思考的内容。
              我相信通过写作和分享，不仅能够巩固自己的知识，也能够帮助到其他开发者。
            </p>
          </section>

          <section className="mb-12 fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">技术栈</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg card-hover">
                <h3 className="font-semibold mb-2 text-white">前端技术</h3>
                <ul className="text-sm space-y-1">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>JavaScript (ES6+)</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg card-hover">
                <h3 className="font-semibold mb-2 text-white">开发工具</h3>
                <ul className="text-sm space-y-1">
                  <li>VS Code</li>
                  <li>Git & GitHub</li>
                  <li>Chrome DevTools</li>
                  <li>npm / yarn</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12 fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">博客特色</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg card-hover">
                <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center mt-1">
                  <span className="text-blue-400 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">技术深度</h3>
                  <p className="text-sm">
                    每篇文章都会深入探讨技术细节，提供实际的项目经验和解决方案。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg card-hover">
                <div className="w-6 h-6 bg-green-900 rounded-full flex items-center justify-center mt-1">
                  <span className="text-green-400 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">实用导向</h3>
                  <p className="text-sm">
                    注重实用性，提供可以直接应用到项目中的代码示例和最佳实践。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-lg card-hover">
                <div className="w-6 h-6 bg-purple-900 rounded-full flex items-center justify-center mt-1">
                  <span className="text-purple-400 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">持续更新</h3>
                  <p className="text-sm">
                    定期分享新的技术发现和项目经验，保持内容的时效性和前沿性。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">联系方式</h2>
            <p className="leading-relaxed">
              如果你对我的文章有任何问题、建议，或者想要进行技术交流，欢迎通过以下方式联系我：
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-semibold text-white">邮箱：</span>
                <span>your-email@example.com</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-white">GitHub：</span>
                <a href="https://github.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  github.com/yourusername
                </a>
              </p>
            </div>
          </section>

          <section className="fade-in" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">致谢</h2>
            <p className="leading-relaxed">
              感谢所有阅读我博客的朋友，你们的支持和反馈是我持续写作的动力。
              特别感谢开源社区，让我们能够使用如此优秀的技术栈来构建这个博客。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}