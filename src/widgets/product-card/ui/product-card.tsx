import Image from 'next/image';

import { Link, type Locale } from '@shared/i18n';
import { formatPrice } from '@shared/libs';

import { ProductBadge, type Product } from '@entities/product';

import { QuickAdd } from '@features/cart';

interface ProductCardProps {
    product: Product;
    locale: Locale;
}

/**
 * 상품 카드 — Product(entity) 표시 + 바로 담기(cart feature, QuickAdd)를 **합성**한다.
 *
 * 왜 entities/product가 아니라 widgets인가:
 * - entities는 features를 import할 수 없다(의존 방향: app→widgets→features→entities→shared).
 * - 카드가 QuickAdd(features/cart)를 self-contained로 품으려면 features에 의존해야 하므로,
 *   "여러 슬라이스 조합" 책임을 갖는 widgets에 둔다. 호출부는 product만 넘기면 QuickAdd가 알아서 붙는다.
 * - 순수 표시 부분(뱃지)은 entities(ProductBadge)에 남아 있고, 카드는 그걸 가져다 쓴다.
 *
 * QuickAdd 버튼은 <Link> 밖(우상단 오버레이)이라 카드 클릭(네비)과 겹치지 않는다.
 */
export function ProductCard({ product, locale }: ProductCardProps) {
    return (
        <div className="group relative">
            <Link href={`/products/${product.handle}`} className="block">
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
                <p className="text-muted-foreground mt-1 text-sm">
                    {formatPrice(product.price, product.currency, locale)}
                </p>
            </Link>
            <div className="absolute top-2 right-2">
                <QuickAdd product={product} />
            </div>
        </div>
    );
}
