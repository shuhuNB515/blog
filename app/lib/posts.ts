import fs from 'fs'
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
    
    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
  } catch (error) {
    console.log('文章目录不存在，创建示例文章...')
    return []
  }
}

export async function getPostData(id: string): Promise<Post> {
  if (!id) {
    return {
      id: 'unknown',
      title: '文章不存在',
      date: new Date().toISOString(),
      tags: [],
      description: '请求的文章不存在',
      content: '<p>抱歉，您请求的文章不存在或已被删除。</p>',
    }
  }
  
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)
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
  } catch (error) {
    console.error('读取文章失败:', error)
    return {
      id,
      title: '文章不存在',
      date: new Date().toISOString(),
      tags: [],
      description: '请求的文章不存在',
      content: '<p>抱歉，您请求的文章不存在或已被删除。</p>',
    }
  }
}

export function getAllPostIds() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
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