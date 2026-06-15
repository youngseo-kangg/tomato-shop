import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Product } from '@entities/product';

import { useProductSearch } from './use-product-search';

const product = (handle: string, title: string): Product => ({
    handle,
    price: 1000,
    currency: 'KRW',
    tags: [],
    color: '#000',
    image: `/products/${handle}.png`,
    collection: 'x',
    title,
    description: '',
    highlights: [],
    options: [],
});

const MOCK: Product[] = [product('a', '리넨 셔츠'), product('b', '울 니트')];

function Wrapper({ children }: { children: ReactNode }) {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

beforeEach(() => {
    vi.stubGlobal(
        'fetch',
        vi.fn(async () => ({ ok: true, json: async () => MOCK }) as Response),
    );
});

afterEach(() => vi.unstubAllGlobals());

describe('useProductSearch', () => {
    it('상품을 불러온다', async () => {
        const { result } = renderHook(() => useProductSearch('ko'), { wrapper: Wrapper });
        await waitFor(() => expect(result.current.products).toHaveLength(2));
        expect(result.current.products?.[0].title).toBe('리넨 셔츠');
    });

    it('setQuery로 검색어 상태를 갱신한다', async () => {
        const { result } = renderHook(() => useProductSearch('ko'), { wrapper: Wrapper });
        await waitFor(() => expect(result.current.products).toBeDefined());
        act(() => result.current.setQuery('토마토'));
        expect(result.current.query).toBe('토마토');
    });
});
