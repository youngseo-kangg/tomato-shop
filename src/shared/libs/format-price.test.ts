import { describe, expect, it } from 'vitest';

import { formatPrice } from './format-price';

// 순수 함수 → 가장 싸고 회귀를 가장 많이 막는 테스트
describe('formatPrice', () => {
    it('KRW은 소수점 없이 ko 포맷', () => {
        expect(formatPrice(48000, 'KRW', 'ko')).toBe('₩48,000');
    });

    it('로케일에 따라 표기가 달라진다', () => {
        expect(formatPrice(48000, 'KRW', 'en')).toBe('₩48,000');
        expect(formatPrice(1234.5, 'USD', 'en')).toBe('$1,234.50');
    });
});
