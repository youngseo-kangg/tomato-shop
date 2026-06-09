'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import type { Locale } from '@shared/i18n';
import { SearchInput } from '@shared/ui';

import { ProductCard } from '@entities/product';

import { fetchProducts } from '../api/fetch-products';

/**
 * 클라이언트 검색 (TanStack Query). 서버 상태는 Context가 아니라 Query가 관리.
 * 입력 → useQuery → /api/products. isLoading/isError 가 일관되게 노출된다.
 */
export function ProductSearch() {
    const t = useTranslations('catalog');
    const locale = useLocale() as Locale;
    const [query, setQuery] = useState('');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', locale, query],
        queryFn: () => fetchProducts(query, locale),
        placeholderData: keepPreviousData,
    });

    return (
        <div>
            <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
            />

            {isError && <p className="mt-4 text-sm text-red-500">{t('empty')}</p>}

            {!isError && (
                <p className="text-foreground/60 mt-4 text-sm" aria-live="polite">
                    {isLoading ? '…' : t('resultCount', { count: data?.length ?? 0 })}
                </p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {data?.map((product) => (
                    <ProductCard key={product.handle} product={product} locale={locale} />
                ))}
            </div>
        </div>
    );
}
