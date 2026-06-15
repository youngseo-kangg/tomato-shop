import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@shared/i18n';

import { getAllProducts } from '@entities/product';

import { ProductCard } from '@widgets/product-card';

export const revalidate = 300;

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('catalog');
    const products = await getAllProducts(locale as Locale);

    return (
        <section>
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.handle} product={product} locale={locale as Locale} />
                ))}
            </div>
        </section>
    );
}
