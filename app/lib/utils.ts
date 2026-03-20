// 生成6位数字验证码
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 验证验证码是否有效
export function isValidVerificationCode(code: string): boolean {
  return /^\d{6}$/.test(code);
}

// 检查验证码是否过期
export function isVerificationCodeExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

// 生成随机用户名
export function generateRandomUsername(): string {
  const prefix = 'user';
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${suffix}`;
}
