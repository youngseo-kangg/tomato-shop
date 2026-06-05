import { defineRouting } from 'next-intl/routing';

/**
 * 로케일 라우팅 정책.
 * - '/'      → ko (기본, prefix 없음)
 * - '/en/..' → en
 *
 * localeDetection:false 가 핵심:
 *   Accept-Language/쿠키 자동감지를 끄면 '/'가 정적(ISR)으로 남는다.
 *   (감지를 켜면 요청마다 헤더를 읽어 페이지가 dynamic으로 강등됨)
 */
export const routing = defineRouting({
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    localePrefix: 'as-needed',
    localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
