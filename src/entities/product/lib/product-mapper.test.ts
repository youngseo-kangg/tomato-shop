import { describe, expect, it } from 'vitest';

import type { RawProduct } from '../types/product';

import { toProduct } from './product-mapper';

const raw: RawProduct = {
    handle: 'linen-shirt',
    price: 48000,
    currency: 'KRW',
    tags: ['new'],
    color: '#fff',
    title: { ko: '리넨 셔츠', en: 'Linen Shirt' },
    description: { ko: '리넨', en: 'Linen' },
};

describe('toProduct', () => {
    it('요청 로케일의 문자열로 해석한다', () => {
        expect(toProduct(raw, 'ko').title).toBe('리넨 셔츠');
        expect(toProduct(raw, 'en').title).toBe('Linen Shirt');
    });

    it('로케일 무관 필드는 그대로 통과', () => {
        const p = toProduct(raw, 'en');
        expect(p).toMatchObject({ handle: 'linen-shirt', price: 48000, currency: 'KRW' });
    });
});
