'use client';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Suspense, useState, useTransition } from 'react';

import type { Locale } from '@shared/i18n';
import { Button, ErrorBoundary, PulseLoader, SearchInput } from '@shared/ui';

import { SearchResults } from './search-results';

/**
 * 검색 뷰. `?q=`를 useSearchParams로 읽어 초기값. 입력은 Suspense 밖이라 포커스 유지.
 * 타이핑은 useTransition으로 → 결과가 suspend돼도 스켈레톤 깜빡임 없이 이전 결과 유지.
 */
export function SearchView() {
    const t = useTranslations('catalog');
    const tCommon = useTranslations('common');
    const locale = useLocale() as Locale;
    const initialQuery = useSearchParams().get('q') ?? '';

    const [input, setInput] = useState(initialQuery);
    const [query, setQuery] = useState(initialQuery);
    const [isPending, startTransition] = useTransition();
    const { reset: resetQuery } = useQueryErrorResetBoundary();

    const handleSearchChange = (value: string) => {
        setInput(value); // 입력은 즉시 반영
        startTransition(() => setQuery(value)); // 결과는 트랜지션(이전 결과 유지)
    };

    return (
        <div>
            <SearchInput
                value={input}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
                autoFocus
            />

            <ErrorBoundary
                fallback={(reset) => (
                    <div className="mt-6 space-y-3" role="alert">
                        <p className="text-destructive text-sm">{t('loadError')}</p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                resetQuery();
                                reset();
                            }}
                        >
                            {tCommon('retry')}
                        </Button>
                    </div>
                )}
            >
                <div className={isPending ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
                    <Suspense fallback={<PulseLoader label={tCommon('loading')} className="mt-8 min-h-64" />}>
                        <SearchResults query={query} locale={locale} />
                    </Suspense>
                </div>
            </ErrorBoundary>
        </div>
    );
}
