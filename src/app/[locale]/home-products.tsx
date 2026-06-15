'use client';

import { useLocale, useTranslations } from 'next-intl';

import type { Locale } from '@shared/i18n';
import { SearchInput } from '@shared/ui';

import { useProductSearch } from '@features/search';

import { ProductCard } from '@widgets/product-card';

/**
 * 홈 상품 탐색(검색 + 그리드). widget인 ProductCard를 직접 쓰므로 app 레이어에 둔다
 * (features/search 같은 하위 레이어는 widget을 import 못 함). 검색 로직은 useProductSearch 훅에서.
 */
export function HomeProducts() {
    const t = useTranslations('catalog');
    const locale = useLocale() as Locale;
    const { query, setQuery, products, isLoading, isError } = useProductSearch(locale);

    return (
        <div>
            <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
            />

            {isError && <p className="text-destructive mt-4 text-sm">{t('empty')}</p>}

            {!isError && (
                <p className="text-muted-foreground mt-4 text-sm" aria-live="polite">
                    {isLoading ? '…' : t('resultCount', { count: products?.length ?? 0 })}
                </p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {products?.map((product) => (
                    <ProductCard key={product.handle} product={product} locale={locale} />
                ))}
            </div>
        </div>
    );
}
