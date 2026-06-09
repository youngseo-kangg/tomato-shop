import type { Locale } from '@shared/i18n';
import { Link } from '@shared/i18n';
import { formatPrice } from '@shared/libs';
import { Badge } from '@shared/ui';

import type { Product } from '../types/product';

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
                className="mb-3 aspect-square w-full rounded-lg"
                style={{ backgroundColor: product.color }}
                aria-hidden
            />
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium group-hover:underline">{product.title}</h3>
                {product.tags.includes('best') && <Badge>BEST</Badge>}
            </div>
            <p className="text-foreground/60 mt-1 text-sm">{formatPrice(product.price, product.currency, locale)}</p>
        </Link>
    );
}
