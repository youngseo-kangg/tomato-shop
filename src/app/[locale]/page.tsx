import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ProductSearch } from '@features/search';

// 정적 + 5분 ISR
export const revalidate = 300;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('home');

    return (
        <section>
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
            <p className="text-muted-foreground mt-1 text-sm">{t('subtitle')}</p>

            {/* 정적 껍데기(이 페이지) + 동적 조각(검색은 클라이언트 TanStack Query) */}
            <div className="mt-8">
                <ProductSearch />
            </div>
        </section>
    );
}
