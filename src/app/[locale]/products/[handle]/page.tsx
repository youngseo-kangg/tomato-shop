import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { routing, type Locale } from '@shared/i18n';
import { formatPrice } from '@shared/libs';

import { getAllProductHandles, getProductByHandle, ProductBadge } from '@entities/product';

import { AddToCartForm } from '@features/cart';

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
            <div
                className="relative aspect-square w-full overflow-hidden rounded-lg shadow-sm"
                style={{ backgroundColor: product.color }}
            >
                <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    priority
                />
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold">{product.title}</h1>
                    <ProductBadge tags={product.tags} />
                </div>
                <p className="mt-2 text-lg">{formatPrice(product.price, product.currency, locale as Locale)}</p>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{product.description}</p>
                {product.highlights.length > 0 && (
                    <ul className="border-border mt-6 space-y-2 border-t pt-6">
                        {product.highlights.map((highlight, i) => (
                            <li
                                key={`${product.handle}-${i}`}
                                className="text-muted-foreground flex items-start gap-2 text-sm"
                            >
                                <span aria-hidden style={{ color: product.color }}>
                                    •
                                </span>
                                {highlight}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-8">
                    <AddToCartForm product={product} />
                </div>
            </div>
        </article>
    );
}
