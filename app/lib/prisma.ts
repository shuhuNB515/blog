import { PrismaClient } from '@prisma/client';

// 全局 Prisma 客户端实例
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // 生产环境直接创建新实例
  prisma = new PrismaClient();
} else {
  // 开发环境使用全局实例，避免热重载时创建多个实例
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  
  prisma = globalWithPrisma.prisma;
}

export default prisma;
