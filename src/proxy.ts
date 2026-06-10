import createMiddleware from 'next-intl/middleware';

import { routing } from '@shared/i18n';

/**
 * Next.js 16 미들웨어 (구 middleware.ts → proxy.ts).
 * next-intl 라우팅만 담당: '/' → ko, '/en' → en.
 */
export const proxy = createMiddleware(routing);

export const config = {
    // /api, _next, 정적 파일은 로케일 라우팅에서 제외
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
