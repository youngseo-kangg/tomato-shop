import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@shared/i18n';

import { getProductsByTag } from '@entities/product';

import { SearchBar } from '@features/search';

import { ProductSection } from './product-section';

// 정적 + 5분 ISR. 큐레이션은 서버 렌더(정적), 검색은 /search로 이동.
export const revalidate = 300;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('home');

    const [best, fresh] = await Promise.all([
        getProductsByTag('best', locale as Locale),
        getProductsByTag('new', locale as Locale),
    ]);

    return (
        <div className="space-y-10">
            <section>
                <h1 className="text-2xl font-semibold">{t('title')}</h1>
                <p className="text-muted-foreground mt-1 text-sm">{t('subtitle')}</p>
                <div className="mt-6">
                    <SearchBar />
                </div>
            </section>

            <ProductSection title={t('bestTitle')} products={best} locale={locale as Locale} />
            <ProductSection title={t('newTitle')} products={fresh} locale={locale as Locale} />
        </div>
    );
}
