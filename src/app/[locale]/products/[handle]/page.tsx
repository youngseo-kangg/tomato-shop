import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { routing, type Locale } from '@shared/i18n';
import { formatPrice } from '@shared/libs';
import { Badge } from '@shared/ui';

import { getAllProductHandles, getProductByHandle } from '@entities/product';

export const revalidate = 300;

// 핵심 핸들을 빌드 타임에 prerender (locale × handle 조합)
export function generateStaticParams() {
    return routing.locales.flatMap((locale) => getAllProductHandles().map((handle) => ({ locale, handle })));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; handle: string }>;
}): Promise<Metadata> {
    const { locale, handle } = await params;
    const product = await getProductByHandle(handle, locale as Locale);
    if (!product) return {};
    return { title: product.title, description: product.description };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; handle: string }> }) {
    const { locale, handle } = await params;
    setRequestLocale(locale);
    const product = await getProductByHandle(handle, locale as Locale);
    if (!product) notFound();

    return (
        <article className="grid gap-8 sm:grid-cols-2">
            <div className="aspect-square w-full rounded-lg" style={{ backgroundColor: product.color }} aria-hidden />
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold">{product.title}</h1>
                    {product.tags.includes('best') && <Badge>BEST</Badge>}
                </div>
                <p className="mt-2 text-lg">{formatPrice(product.price, product.currency, locale as Locale)}</p>
                <p className="text-foreground/70 mt-4 text-sm">{product.description}</p>
            </div>
        </article>
    );
}
