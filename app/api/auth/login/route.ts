import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateRandomUsername } from '@/app/lib/utils';

interface LoginRequest {
  type: 'password' | 'email' | 'phone' | 'wechat' | 'qq';
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  code?: string;
  wechatId?: string;
  qqId?: string;
  nickname?: string;
  avatar?: string;
}

interface UserResponse {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { type } = body;

    let user;

    switch (type) {
      case 'password': {
        const { username, password } = body;
        if (!username || !password) {
          return NextResponse.json(
            { error: '请提供用户名和密码' },
            { status: 400 }
          );
        }

        // 查找用户
        user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user || user.password !== password) {
          return NextResponse.json(
            { error: '用户名或密码错误' },
            { status: 401 }
          );
        }
        break;
      }

      case 'email': {
        const { email, code } = body;
        if (!email || !code) {
          return NextResponse.json(
            { error: '请提供邮箱和验证码' },
            { status: 400 }
          );
        }

        // 验证验证码
        const verificationCode = await prisma.verificationCode.findFirst({
          where: { email, code },
        });

        if (!verificationCode || new Date() > verificationCode.expiresAt) {
          return NextResponse.json(
            { error: '验证码无效或已过期' },
            { status: 400 }
          );
        }

        // 查找用户
        user = await prisma.user.findUnique({
          where: { email },
        });

        // 如果用户不存在，自动注册
        if (!user) {
          user = await prisma.user.create({
            data: {
              username: generateRandomUsername(),
              email,
              emailVerified: true,
            },
          });
        }

        // 删除验证码
        await prisma.verificationCode.delete({
          where: { id: verificationCode.id },
        });
        break;
      }

      case 'phone': {
        const { phone, code } = body;
        if (!phone || !code) {
          return NextResponse.json(
            { error: '请提供手机号和验证码' },
            { status: 400 }
          );
        }

        // 验证验证码
        const verificationCode = await prisma.verificationCode.findFirst({
          where: { phone, code },
        });

        if (!verificationCode || new Date() > verificationCode.expiresAt) {
          return NextResponse.json(
            { error: '验证码无效或已过期' },
            { status: 400 }
          );
        }

        // 查找用户
        user = await prisma.user.findUnique({
          where: { phone },
        });

        // 如果用户不存在，自动注册
        if (!user) {
          user = await prisma.user.create({
            data: {
              username: generateRandomUsername(),
              phone,
              phoneVerified: true,
            },
          });
        }

        // 删除验证码
        await prisma.verificationCode.delete({
          where: { id: verificationCode.id },
        });
        break;
      }

      case 'wechat': {
        const { wechatId, nickname, avatar } = body;
        if (!wechatId) {
          return NextResponse.json(
            { error: '请提供微信ID' },
            { status: 400 }
          );
        }

        // 查找用户
        user = await prisma.user.findUnique({
          where: { wechatId },
        });

        // 如果用户不存在，自动注册
        if (!user) {
          user = await prisma.user.create({
            data: {
              username: nickname || generateRandomUsername(),
              wechatId,
              avatar,
            },
          });
        }
        break;
      }

      case 'qq': {
        const { qqId, nickname, avatar } = body;
        if (!qqId) {
          return NextResponse.json(
            { error: '请提供QQ ID' },
            { status: 400 }
          );
        }

        // 查找用户
        user = await prisma.user.findUnique({
          where: { qqId },
        });

        // 如果用户不存在，自动注册
        if (!user) {
          user = await prisma.user.create({
            data: {
              username: nickname || generateRandomUsername(),
              qqId,
              avatar,
            },
          });
        }
        break;
      }

      default:
        return NextResponse.json(
          { error: '不支持的登录方式' },
          { status: 400 }
        );
    }

    // 构建用户响应
    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email ?? undefined,
      phone: user.phone ?? undefined,
      avatar: user.avatar ?? undefined,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
    };

    // 在实际应用中，这里应该生成 JWT token
    // 为了演示，我们直接返回用户信息
    return NextResponse.json({
      message: '登录成功',
      user: userResponse,
    });
  } catch (error) {
    console.error('登录失败:', error);
    return NextResponse.json(
      { error: '登录失败' },
      { status: 500 }
    );
  }
}
