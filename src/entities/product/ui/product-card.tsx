import Image from 'next/image';

import type { Locale } from '@shared/i18n';
import { Link } from '@shared/i18n';
import { formatPrice } from '@shared/libs';

import type { Product } from '../types/product';

import { ProductBadge } from './product-badge';

interface ProductCardProps {
    product: Product;
    locale: Locale;
}

/**
 * Atomic 관점의 "organism"이지만 도메인(Product)을 알므로 Atomic 폴더가 아니라
 * FSD 슬라이스(entities/product/ui)에 산다. Presentational — 데이터 표시만.
 */
export function ProductCard({ product, locale }: ProductCardProps) {
    return (
        <Link href={`/products/${product.handle}`} className="group block">
            <div
                className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg shadow-sm transition-shadow group-hover:shadow-md"
                style={{ backgroundColor: product.color }}
            >
                <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium group-hover:underline">{product.title}</h3>
                <ProductBadge tags={product.tags} />
            </div>
            <p className="text-muted-foreground mt-1 text-sm">{formatPrice(product.price, product.currency, locale)}</p>
        </Link>
    );
}
