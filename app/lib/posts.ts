import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

// 检查是否在服务器端环境
const isServer = typeof window === 'undefined';

let fs: any;
let path: any;
let postsDirectory: string;

if (isServer) {
  fs = require('fs');
  path = require('path');
  postsDirectory = path.join(process.cwd(), 'posts');
}

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
  if (!isServer) {
    // 在客户端，返回空数组或从其他地方获取数据
    // 实际项目中，你可能需要从 API 或其他数据源获取数据
    return [];
  }
  
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName: string) => {
      const id = fileName.replace(/\.md$/, '')
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
    
    return allPostsData.sort((a: Post, b: Post) => a.date < b.date ? 1 : -1)
  } catch (error) {
    console.log('文章目录不存在，创建示例文章...')
    return []
  }
}

export async function getPostData(id: string): Promise<Post> {
  if (!id) {
    throw new Error('文章ID不能为空')
  }
  
  if (!isServer) {
    // 在客户端，返回一个空的 Post 对象或从其他地方获取数据
    // 实际项目中，你可能需要从 API 或其他数据源获取数据
    return {
      id,
      title: '',
      date: new Date().toISOString(),
      tags: [],
      description: '',
    };
  }
  
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    
    const processedContent = await remark()
      .use(html)
      .use(rehypeHighlight)
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
  } catch (error) {
    console.error('读取文章失败:', error)
    throw new Error('文章不存在')
  }
}

export function getAllPostIds() {
  if (!isServer) {
    // 在客户端，返回空数组
    return [];
  }
  
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map((fileName: string) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  } catch (error) {
    return []
  }
}

export async function searchPosts(query: string): Promise<Post[]> {
  try {
    const allPosts = await getSortedPostsData()
    const searchResults = allPosts.filter(post => {
      const searchTerm = query.toLowerCase()
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    })
    return searchResults
  } catch (error) {
    console.error('搜索文章失败:', error)
    return []
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const allPosts = await getSortedPostsData()
    const tagsSet = new Set<string>()
    allPosts.forEach(post => {
      post.tags.forEach(tag => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  } catch (error) {
    console.error('获取标签失败:', error)
    return []
  }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  try {
    const allPosts = await getSortedPostsData()
    return allPosts.filter(post => post.tags.includes(tag))
  } catch (error) {
    console.error('获取标签文章失败:', error)
    return []
  }
}
