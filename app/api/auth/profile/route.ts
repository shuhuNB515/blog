import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

interface UpdateProfileRequest {
  username?: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

export async function GET(request: NextRequest) {
  try {
    // 在实际应用中，这里应该从 JWT token 中获取用户 ID
    // 为了演示，我们从查询参数中获取用户 ID
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: '请提供用户 ID' },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        avatar: true,
        emailVerified: true,
        phoneVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: '获取个人信息成功',
      user,
    });
  } catch (error) {
    console.error('获取个人信息失败:', error);
    return NextResponse.json(
      { error: '获取个人信息失败' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // 在实际应用中，这里应该从 JWT token 中获取用户 ID
    // 为了演示，我们从查询参数中获取用户 ID
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: '请提供用户 ID' },
        { status: 400 }
      );
    }

    const body: UpdateProfileRequest = await request.json();

    // 更新用户信息
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...body,
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        avatar: true,
        emailVerified: true,
        phoneVerified: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: '更新个人信息成功',
      user: updatedUser,
    });
  } catch (error) {
    console.error('更新个人信息失败:', error);
    return NextResponse.json(
      { error: '更新个人信息失败' },
      { status: 500 }
    );
  }
}
