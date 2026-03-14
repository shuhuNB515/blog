const fs = require('fs');
const path = require('path');

// 创建目录结构
const dirs = [
  'app/lib',
  'app/blog',
  'app/blog/[id]',
  'app/about',
  'posts'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// 创建文章管理模块
const postsModule = `import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  id: string
  title: string
  date: string
  tags: string[]
  description: string
  content?: string
  readingTime?: string
}

export async function getSortedPostsData(): Promise<Post[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
      const id = fileName.replace(/\\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      
      return {
        id,
        title: matterResult.data.title || '无标题',
        date: matterResult.data.date || new Date().toISOString(),
        tags: matterResult.data.tags || [],
        description: matterResult.data.description || '',
      } as Post
    })
    
    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
  } catch (error) {
    console.log('文章目录不存在，创建示例文章...')
    return []
  }
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, \`\${id}.md\`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  
  return {
    id,
    title: matterResult.data.title || '无标题',
    date: matterResult.data.date || new Date().toISOString(),
    tags: matterResult.data.tags || [],
    description: matterResult.data.description || '',
    content: contentHtml,
  }
}

export function getAllPostIds() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\\.md$/, '')
        }
      }
    })
  } catch (error) {
    return []
  }
}`;

fs.writeFileSync(path.join(__dirname, 'app/lib/posts.ts'), postsModule);
console.log('Created app/lib/posts.ts');

// 创建博客首页
const blogPage = \`import Link from 'next/link'
import { getSortedPostsData } from '@/app/lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default async function BlogPage() {
  const posts = await getSortedPostsData()
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">我的博客</h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">还没有文章，开始写第一篇吧！</p>
          <Link
            href="/blog/create"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            创建第一篇文章
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <article key={post.id} className="border-b border-gray-200 pb-6">
              <Link href={\`/blog/\${post.id}\`} className="block group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-2">{post.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <time>
                    {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
                  </time>
                  {post.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}\`;

fs.writeFileSync(path.join(__dirname, 'app/blog/page.tsx'), blogPage);
console.log('Created app/blog/page.tsx');

// 创建文章详情页
const postPage = \`import { getPostData, getAllPostIds } from '@/app/lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id)
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
          ← 返回博客列表
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <time>
            {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
          </time>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-gray-100 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {post.description && (
          <p className="text-gray-600 italic">{post.description}</p>
        )}
      </header>
      
      <div
        className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />
    </article>
  )
}\`;

fs.writeFileSync(path.join(__dirname, 'app/blog/[id]/page.tsx'), postPage);
console.log('Created app/blog/[id]/page.tsx');

// 创建关于页面
const aboutPage = \`export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">关于我</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">欢迎来到我的博客</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            这里是我在网络世界的小天地，我会在这里分享关于前端开发、技术见解和个人思考的内容。
            我相信通过写作和分享，不仅能够巩固自己的知识，也能够帮助到其他开发者。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">技术栈</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">前端技术</h3>
              <ul className="text-sm space-y-1">
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>JavaScript (ES6+)</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">开发工具</h3>
              <ul className="text-sm space-y-1">
                <li>VS Code</li>
                <li>Git & GitHub</li>
                <li>Chrome DevTools</li>
                <li>npm / yarn</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">博客特色</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-1">
                <span className="text-blue-600 dark:text-blue-400 text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold">技术深度</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  每篇文章都会深入探讨技术细节，提供实际的项目经验和解决方案。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold">实用导向</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  注重实用性，提供可以直接应用到项目中的代码示例和最佳实践。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mt-1">
                <span className="text-purple-600 dark:text-purple-400 text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold">持续更新</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  定期分享新的技术发现和项目经验，保持内容的时效性和前沿性。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">联系方式</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            如果你对我的文章有任何问题、建议，或者想要进行技术交流，欢迎通过以下方式联系我：
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm">
              <span className="font-semibold">邮箱：</span>
              <span className="text-gray-600 dark:text-gray-400">your-email@example.com</span>
            </p>
            <p className="text-sm">
              <span className="font-semibold">GitHub：</span>
              <a href="https://github.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                github.com/yourusername
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">致谢</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            感谢所有阅读我博客的朋友，你们的支持和反馈是我持续写作的动力。
            特别感谢开源社区，让我们能够使用如此优秀的技术栈来构建这个博客。
          </p>
        </section>
      </div>
    </div>
  );
}\`;

fs.writeFileSync(path.join(__dirname, 'app/about/page.tsx'), aboutPage);
console.log('Created app/about/page.tsx');

// 创建示例文章
const welcomePost = \`---
title: "欢迎来到我的博客"
date: "2024-03-14"
description: "这是我的第一篇博客文章，欢迎来到我的个人博客！"
tags: ["欢迎", "介绍", "开始"]
---

# 欢迎来到我的博客

这是我的第一篇博客文章，我很高兴能够在这里分享我的想法和经验。

## 关于这个博客

这个博客是基于 Next.js 和 TypeScript 构建的，支持 Markdown 格式的文章编写。我会在这里分享：

- 技术文章和教程
- 项目经验分享
- 个人学习心得
- 生活感悟

## 技术栈

- **Next.js 16** - React 框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 样式框架
- **Markdown** - 文章格式
- **Gray Matter** - Markdown 前置元数据解析
- **Remark** - Markdown 处理器

## 开始探索

欢迎你浏览我的文章，如果你有任何问题或建议，欢迎与我联系。

希望你喜欢这里的内容！🚀\`;

fs.writeFileSync(path.join(__dirname, 'posts/welcome.md'), welcomePost);
console.log('Created posts/welcome.md');

const nextjsPost = \`---
title: "Next.js 开发技巧分享"
date: "2024-03-13"
description: "分享一些在Next.js开发中的实用技巧和最佳实践"
tags: ["Next.js", "React", "前端开发", "技巧"]
---

# Next.js 开发技巧分享

在使用 Next.js 进行开发的过程中，我积累了一些实用的技巧，今天分享给大家。

## 1. 使用 App Router

Next.js 13+ 引入了新的 App Router，相比传统的 Pages Router，它提供了：

- 更好的性能
- 更简单的数据获取
- 内置的加载状态
- 更灵活的路由结构

\`\`\`typescript
// app/blog/page.tsx
export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogList posts={posts} />
}
\`\`\`

## 2. 数据获取

在 App Router 中，你可以直接在组件中进行数据获取：

\`\`\`typescript
async function getData() {
  const res = await fetch('https://api.example.com/data')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
\`\`\`

## 3. 错误处理

使用 error.tsx 文件来处理路由段中的错误：

\`\`\`typescript
'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
\`\`\`

## 4. 加载状态

使用 loading.tsx 来显示加载状态：

\`\`\`typescript
export default function Loading() {
  return <div>Loading...</div>
}
\`\`\`

## 5. 元数据处理

使用 Metadata API 来管理页面元数据：

\`\`\`typescript
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'My Page Title',
  description: 'My page description',
}
\`\`\`

这些技巧能够帮助你更好地使用 Next.js 构建现代化的 Web 应用。希望对你有帮助！

## 总结

Next.js 是一个功能强大的框架，掌握这些技巧可以让你的开发更加高效。继续学习和实践，你会发现更多有趣的功能！\`;

fs.writeFileSync(path.join(__dirname, 'posts/nextjs-tips.md'), nextjsPost);
console.log('Created posts/nextjs-tips.md');

console.log('✅ 博客功能设置完成！');
console.log('请运行: node setup-blog.js');