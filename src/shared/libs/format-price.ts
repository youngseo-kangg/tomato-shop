import type { Locale } from '@shared/i18n';

const LOCALE_TAG: Record<Locale, string> = {
    ko: 'ko-KR',
    en: 'en-US',
};

/**
 * 통화 포맷 (순수 함수 — 테스트하기 쉬운 곳부터 친다).
 * @example formatPrice(48000, 'KRW', 'ko') // "₩48,000"
 */
export function formatPrice(amount: number, currency: string, locale: Locale): string {
    return new Intl.NumberFormat(LOCALE_TAG[locale], {
        style: 'currency',
        currency,
        maximumFractionDigits: currency === 'KRW' ? 0 : 2,
    }).format(amount);
}
