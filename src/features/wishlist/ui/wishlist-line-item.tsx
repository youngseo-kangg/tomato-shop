'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Link, type Locale } from '@shared/i18n';
import { formatPrice } from '@shared/libs';

import type { Product } from '@entities/product';

import { useWishlist } from '../hooks/use-wishlist';

/**
 * 위시리스트 한 줄(썸네일·제목 링크·가격·제거). 카트 라인과 같은 레이아웃이되 수량 없이 제거만.
 */
export function WishlistLineItem({ product }: { product: Product }) {
    const t = useTranslations('wishlist');
    const locale = useLocale() as Locale;
    const { removeItem } = useWishlist();

    return (
        <li className="flex items-center gap-3 py-3">
            <Link
                href={`/products/${product.handle}`}
                className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md"
                style={{ backgroundColor: product.color }}
            >
                <Image src={product.image} alt="" fill sizes="56px" className="object-cover" />
            </Link>
            <div className="min-w-0 flex-1">
                <Link
                    href={`/products/${product.handle}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {product.title}
                </Link>
                <p className="text-muted-foreground text-sm">{formatPrice(product.price, product.currency, locale)}</p>
            </div>
            <button
                type="button"
                aria-label={t('remove')}
                onClick={() => removeItem(product.handle)}
                className="text-muted-foreground hover:text-destructive shrink-0 p-1"
            >
                ✕
            </button>
        </li>
    );
}
