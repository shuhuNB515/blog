import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="fade-in" style={{ animationDelay: '0.3s' }}>
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          欢迎来到星辰博客
        </h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          在这里，我分享关于前端开发、技术见解和个人思考的文章。
          探索我的博客，了解最新的技术趋势和开发经验。
        </p>
        
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row justify-center">
          <Link
            href="/blog"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-white transition-colors hover:bg-blue-700 md:w-[158px] card-hover"
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
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg card-hover fade-in" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-xl font-semibold mb-3 text-blue-300">技术分享</h3>
            <p className="text-gray-300">分享前端开发技术、框架使用经验和最佳实践</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg card-hover fade-in" style={{ animationDelay: '0.7s' }}>
            <h3 className="text-xl font-semibold mb-3 text-blue-300">学习笔记</h3>
            <p className="text-gray-300">记录学习过程中的心得体会和重要知识点</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg card-hover fade-in" style={{ animationDelay: '0.9s' }}>
            <h3 className="text-xl font-semibold mb-3 text-blue-300">个人思考</h3>
            <p className="text-gray-300">分享对技术和行业的见解与思考</p>
          </div>
        </div>
      </div>
    </div>
  );
}