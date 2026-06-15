import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing, type Locale } from '@shared/i18n';

import { getAllCollectionHandles, getCollectionByHandle } from '@entities/collection';
import { getProductsByCollection } from '@entities/product';

import { ProductCard } from '@widgets/product-card';

export const revalidate = 300;

// locale × collection 핸들을 빌드 타임에 prerender (ISR 유지)
export function generateStaticParams() {
    return routing.locales.flatMap((locale) => getAllCollectionHandles().map((handle) => ({ locale, handle })));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; handle: string }>;
}): Promise<Metadata> {
    const { locale, handle } = await params;
    const collection = await getCollectionByHandle(handle, locale as Locale);
    return collection ? { title: collection.title } : {};
}

export default async function CollectionPage({ params }: { params: Promise<{ locale: string; handle: string }> }) {
    const { locale, handle } = await params;
    setRequestLocale(locale);

    const collection = await getCollectionByHandle(handle, locale as Locale);
    if (!collection) notFound();

    const t = await getTranslations('catalog');
    const products = await getProductsByCollection(handle, locale as Locale);

    return (
        <section>
            <h1 className="text-2xl font-semibold">{collection.title}</h1>
            <p className="text-muted-foreground mt-1 text-sm">{t('resultCount', { count: products.length })}</p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.handle} product={product} locale={locale as Locale} />
                ))}
            </div>
        </section>
    );
}
