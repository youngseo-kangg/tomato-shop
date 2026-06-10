import { describe, expect, it } from 'vitest';

import type { RawProduct } from '../types/product';

import { toProduct } from './product-mapper';

const raw: RawProduct = {
    handle: 'linen-shirt',
    price: 48000,
    currency: 'KRW',
    tags: ['new'],
    color: '#fff',
    image: '/products/linen-shirt.webp',
    title: { ko: '리넨 셔츠', en: 'Linen Shirt' },
    description: { ko: '리넨', en: 'Linen' },
    highlights: { ko: ['리넨 100%', '여름용'], en: ['100% linen', 'For summer'] },
};

describe('toProduct', () => {
    it('요청 로케일의 문자열로 해석한다', () => {
        expect(toProduct(raw, 'ko').title).toBe('리넨 셔츠');
        expect(toProduct(raw, 'en').title).toBe('Linen Shirt');
    });

    it('로케일별 highlights 배열을 해석한다', () => {
        expect(toProduct(raw, 'ko').highlights).toEqual(['리넨 100%', '여름용']);
        expect(toProduct(raw, 'en').highlights).toEqual(['100% linen', 'For summer']);
    });

    it('로케일 무관 필드는 그대로 통과', () => {
        const p = toProduct(raw, 'en');
        expect(p).toMatchObject({
            handle: 'linen-shirt',
            price: 48000,
            currency: 'KRW',
            image: '/products/linen-shirt.webp',
        });
    });
});
