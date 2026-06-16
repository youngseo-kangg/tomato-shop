'use client';

import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

import { useRouter } from '@shared/i18n';
import { SearchInput } from '@shared/ui';

/**
 * 홈 검색창. 입력/제출 시 검색하지 않고 `/search?q=`로 **이동**(검색은 전용 페이지에서).
 */
export function SearchBar() {
    const t = useTranslations('catalog');
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        const q = query.trim();
        router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
    };

    return (
        <form role="search" onSubmit={handleSearchSubmit}>
            <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
            />
        </form>
    );
}
