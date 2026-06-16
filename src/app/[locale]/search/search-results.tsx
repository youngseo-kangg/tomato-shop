'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import type { Locale } from '@shared/i18n';
import { Button } from '@shared/ui';

import { fetchProducts } from '@features/search';

import { ProductCard } from '@widgets/product-card';

/**
 * 검색 결과. useSuspenseQuery라 로딩 중엔 suspend(→ 상위 Suspense 스켈레톤),
 * 에러면 throw(→ 상위 ErrorBoundary). 입력은 상위에 있어 여기 suspend돼도 포커스 유지.
 */
export function SearchResults({ query, locale }: { query: string; locale: Locale }) {
    const t = useTranslations('catalog');
    const tCommon = useTranslations('common');
    const { data: products } = useSuspenseQuery({
        queryKey: ['products', locale, query],
        queryFn: () => fetchProducts(query, locale),
    });

    if (products.length === 0) {
        return (
            <div
                className="text-muted-foreground mt-8 flex min-h-64 flex-col items-center justify-center gap-3 text-center text-sm md:gap-6"
                role="status"
            >
                <p>{t('noResults')}</p>
                <Button href="/">{tCommon('backToHome')}</Button>
            </div>
        );
    }

    return (
        <>
            <p className="text-muted-foreground mt-4 text-sm" aria-live="polite">
                {t('resultCount', { count: products.length })}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.handle} product={product} locale={locale} />
                ))}
            </div>
        </>
    );
}
