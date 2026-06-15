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
    collection: 'apparel',
    title: { ko: '리넨 셔츠', en: 'Linen Shirt' },
    description: { ko: '리넨', en: 'Linen' },
    highlights: { ko: ['리넨 100%', '여름용'], en: ['100% linen', 'For summer'] },
    options: [
        {
            name: { ko: '색상', en: 'Color' },
            values: [{ id: 'red', label: { ko: '빨강', en: 'Red' } }],
        },
    ],
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

    it('옵션 이름/값 라벨을 로케일로 해석하되 value id는 유지한다', () => {
        const ko = toProduct(raw, 'ko').options[0];
        expect(ko.name).toBe('색상');
        expect(ko.values[0]).toEqual({ id: 'red', label: '빨강' });
        expect(toProduct(raw, 'en').options[0].values[0]).toEqual({ id: 'red', label: 'Red' });
    });

    it('options 없으면 빈 배열', () => {
        expect(toProduct({ ...raw, options: undefined }, 'ko').options).toEqual([]);
    });

    it('로케일 무관 필드는 그대로 통과', () => {
        const p = toProduct(raw, 'en');
        expect(p).toMatchObject({
            handle: 'linen-shirt',
            price: 48000,
            currency: 'KRW',
            image: '/products/linen-shirt.webp',
            collection: 'apparel',
        });
    });
});
