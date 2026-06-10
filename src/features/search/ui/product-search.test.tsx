import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Product } from '@entities/product';

import { renderWithProviders, screen } from '@/test/test-utils';

import { ProductSearch } from './product-search';

const MOCK: Product[] = [
    {
        handle: 'a',
        price: 1000,
        currency: 'KRW',
        tags: [],
        color: '#000',
        image: '/products/a.webp',
        title: '리넨 셔츠',
        description: '',
        highlights: [],
    },
    {
        handle: 'b',
        price: 2000,
        currency: 'KRW',
        tags: ['best'],
        color: '#000',
        image: '/products/b.webp',
        title: '울 니트',
        description: '',
        highlights: [],
    },
];

beforeEach(() => {
    vi.stubGlobal(
        'fetch',
        vi.fn(async () => ({ ok: true, json: async () => MOCK }) as Response),
    );
});

afterEach(() => {
    vi.unstubAllGlobals();
});

// TanStack Query + i18n UI 테스트: 서버 상태가 로드되면 결과가 렌더되는가
describe('ProductSearch', () => {
    it('상품을 불러와 카드로 렌더한다', async () => {
        renderWithProviders(<ProductSearch />);

        expect(await screen.findByText('리넨 셔츠')).toBeInTheDocument();
        expect(screen.getByText('울 니트')).toBeInTheDocument();
        expect(screen.getByText('2개의 상품')).toBeInTheDocument();
    });
});
