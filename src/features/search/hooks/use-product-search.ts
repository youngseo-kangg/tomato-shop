'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { Locale } from '@shared/i18n';

import { fetchProducts } from '../api/fetch-products';

/**
 * 상품 검색 상태 + 결과(TanStack Query). UI 합성은 상위(app)가 하고, 여기선 검색 로직만 제공.
 * 입력(query) → /api/products. isLoading/isError 일관 노출.
 */
export function useProductSearch(locale: Locale) {
    const [query, setQuery] = useState('');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', locale, query],
        queryFn: () => fetchProducts(query, locale),
        placeholderData: keepPreviousData,
    });

    return { query, setQuery, products: data, isLoading, isError };
}
