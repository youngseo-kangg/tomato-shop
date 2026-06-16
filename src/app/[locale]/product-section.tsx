import { getTranslations } from 'next-intl/server';

import type { Locale } from '@shared/i18n';

import type { Product } from '@entities/product';

import { ProductCard } from '@widgets/product-card';

/**
 * 큐레이션 섹션(제목 + 카드 그리드). widget ProductCard를 쓰므로 app 레이어에 둔다(서버 렌더, 정적).
 * 빈 경우엔 번역 메시지를, 채워진 그리드와 비슷한 높이(min-h)로 보여줘 레이아웃이 튀지 않게 한다.
 */
export async function ProductSection({
    title,
    products,
    locale,
}: {
    title: string;
    products: Product[];
    locale: Locale;
}) {
    const t = await getTranslations('catalog');

    return (
        <section>
            <h2 className="text-lg font-semibold">{title}</h2>
            {products.length ? (
                <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.handle} product={product} locale={locale} />
                    ))}
                </div>
            ) : (
                <div className="text-muted-foreground mt-4 flex min-h-64 items-center justify-center text-sm">
                    {t('empty')}
                </div>
            )}
        </section>
    );
}
