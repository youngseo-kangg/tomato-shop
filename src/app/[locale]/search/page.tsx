import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { routing } from '@shared/i18n';

import { SearchView } from './search-view';

// 정적 셸 + SearchView(client). q는 client에서 읽으므로 페이지는 정적 유지(ISR).
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('catalog');

    return (
        <section>
            <h1 className="text-2xl font-semibold">{t('searchTitle')}</h1>
            <div className="mt-8">
                <Suspense>
                    <SearchView />
                </Suspense>
            </div>
        </section>
    );
}
