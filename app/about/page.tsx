export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="fade-in">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">
          <span className="gradient-text">关于</span> 我
        </h1>
        
        <div className="space-y-12">
          <section className="card p-8 fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-blue-300">欢迎来到星辰博客</h2>
            <p className="leading-relaxed text-gray-300">
              这里是我在网络世界的小天地，我会在这里分享关于前端开发、技术见解和个人思考的内容。
              我相信通过写作和分享，不仅能够巩固自己的知识，也能够帮助到其他开发者。
            </p>
          </section>

          <section className="fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-blue-300">技术栈</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6 card-hover">
                <h3 className="font-semibold mb-4 text-white">前端技术</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    React / Next.js
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Tailwind CSS
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    JavaScript (ES6+)
                  </li>
                </ul>
              </div>
              <div className="card p-6 card-hover">
                <h3 className="font-semibold mb-4 text-white">开发工具</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    VS Code
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Git & GitHub
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Chrome DevTools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    npm / yarn
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold mb-6 text-blue-300">博客特色</h2>
            <div className="space-y-4">
              <div className="card p-6 card-hover flex gap-4">
                <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-xl">💡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">技术深度</h3>
                  <p className="text-gray-400">
                    每篇文章都会深入探讨技术细节，提供实际的项目经验和解决方案。
                  </p>
                </div>
              </div>
              <div className="card p-6 card-hover flex gap-4">
                <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xl">🛠️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">实用导向</h3>
                  <p className="text-gray-400">
                    注重实用性，提供可以直接应用到项目中的代码示例和最佳实践。
                  </p>
                </div>
              </div>
              <div className="card p-6 card-hover flex gap-4">
                <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 text-xl">📈</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">持续更新</h3>
                  <p className="text-gray-400">
                    定期分享新的技术发现和项目经验，保持内容的时效性和前沿性。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="card p-8 fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">联系方式</h2>
            <p className="leading-relaxed text-gray-300 mb-6">
              如果你对我的文章有任何问题、建议，或者想要进行技术交流，欢迎通过以下方式联系我：
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-900/50 rounded-full flex items-center justify-center">
                  <span className="text-blue-400">📧</span>
                </div>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">邮箱：</span>
                  <a href="mailto:shuhuNB560@stu.mtc.edu.cn" className="text-blue-400 hover:underline">
                    shuhuNB560@stu.mtc.edu.cn
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-900/50 rounded-full flex items-center justify-center">
                  <span className="text-blue-400">🔗</span>
                </div>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">GitHub：</span>
                  <a href="https://github.com/shuhuNB515" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    github.com/shuhuNB515
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section className="card p-8 fade-in" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">致谢</h2>
            <p className="leading-relaxed text-gray-300">
              感谢所有阅读我博客的朋友，你们的支持和反馈是我持续写作的动力。
              特别感谢开源社区，让我们能够使用如此优秀的技术栈来构建这个博客。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
