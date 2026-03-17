import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">
            欢迎来到 <span className="gradient-text">星辰</span> 博客
          </h1>
          <p className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            在这里，我分享关于前端开发、技术见解和个人思考的文章。
            探索我的博客，了解最新的技术趋势和开发经验。
          </p>
          
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row justify-center">
            <Link
              href="/blog"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 md:w-[158px] card-hover"
            >
              阅读文章
            </Link>
            <Link
              href="/about"
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-blue-500/30 px-8 text-white transition-colors hover:border-blue-500 hover:bg-blue-900/20 md:w-[158px] card-hover"
            >
              了解更多
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="技术分享" 
            description="分享前端开发技术、框架使用经验和最佳实践" 
            icon="💻"
            delay="0.5s"
          />
          <FeatureCard 
            title="学习笔记" 
            description="记录学习过程中的心得体会和重要知识点" 
            icon="📝"
            delay="0.7s"
          />
          <FeatureCard 
            title="个人思考" 
            description="分享对技术和行业的见解与思考" 
            icon="🤔"
            delay="0.9s"
          />
        </div>
        
        <div className="mt-24 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 backdrop-blur-sm fade-in" style={{ animationDelay: '1.1s' }}>
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">最新文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArticleCard 
              title="Next.js 14 新特性解析" 
              excerpt="探索 Next.js 14 的最新特性，包括 React Server Components、Turbopack 等" 
              date="2024-01-15"
              tags={["Next.js", "前端", "React"]}
            />
            <ArticleCard 
              title="TypeScript 最佳实践" 
              excerpt="分享 TypeScript 开发中的最佳实践和常见问题解决方案" 
              date="2024-01-10"
              tags={["TypeScript", "前端", "最佳实践"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon, delay }: { title: string; description: string; icon: string; delay: string }) {
  return (
    <div className="card p-8 card-hover fade-in" style={{ animationDelay: delay }}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-blue-300">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function ArticleCard({ title, excerpt, date, tags }: { title: string; excerpt: string; date: string; tags: string[] }) {
  return (
    <Link href="/blog" className="block card p-6 card-hover">
      <h3 className="text-lg font-semibold mb-2 text-white hover:text-blue-300 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{date}</p>
      <p className="text-gray-300 mb-4 line-clamp-2">{excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
