import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

/**
 * next-intl 서버 설정 (next.config 의 plugin 이 이 파일을 참조).
 * requestLocale 은 [locale] 세그먼트에서 옴 → 쿠키/헤더를 읽지 않으므로 정적화 가능.
 */
export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
