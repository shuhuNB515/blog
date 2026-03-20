import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateVerificationCode } from '@/app/lib/utils';

// 发送验证码
export async function POST(request: NextRequest) {
  try {
    const { email, phone } = await request.json();

    if (!email && !phone) {
      return NextResponse.json(
        { error: '请提供邮箱或手机号' },
        { status: 400 }
      );
    }

    // 生成6位验证码
    const code = generateVerificationCode();
    // 验证码有效期为5分钟
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 保存验证码到数据库
    await prisma.verificationCode.create({
      data: {
        email,
        phone,
        code,
        expiresAt,
      },
    });

    // 这里应该调用发送邮件或短信的服务
    // 为了演示，我们直接返回验证码
    console.log(`验证码: ${code}`);

    return NextResponse.json({
      message: '验证码发送成功',
      // 在实际应用中，不应该返回验证码
      code: process.env.NODE_ENV === 'development' ? code : undefined,
    });
  } catch (error) {
    console.error('发送验证码失败:', error);
    return NextResponse.json(
      { error: '发送验证码失败' },
      { status: 500 }
    );
  }
}

// 验证验证码
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: '请提供验证码' },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { error: '请提供邮箱或手机号' },
        { status: 400 }
      );
    }

    // 查找验证码
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
        ...(email ? { email } : { phone }),
      },
    });

    if (!verificationCode) {
      return NextResponse.json(
        { error: '验证码无效' },
        { status: 400 }
      );
    }

    // 检查验证码是否过期
    if (new Date() > verificationCode.expiresAt) {
      return NextResponse.json(
        { error: '验证码已过期' },
        { status: 400 }
      );
    }

    // 验证成功后删除验证码
    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.json({
      message: '验证码验证成功',
    });
  } catch (error) {
    console.error('验证验证码失败:', error);
    return NextResponse.json(
      { error: '验证验证码失败' },
      { status: 500 }
    );
  }
}
