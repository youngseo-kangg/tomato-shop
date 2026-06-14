import type { Locale } from '@shared/i18n';

import type { Product, RawProduct } from '../types/product';

/**
 * RawProduct(다국어 JSON) → Product(해석된 도메인 모델).
 * 순수 함수라 단위 테스트 대상 1순위.
 */
export function toProduct(raw: RawProduct, locale: Locale): Product {
    return {
        handle: raw.handle,
        price: raw.price,
        currency: raw.currency,
        tags: raw.tags,
        color: raw.color,
        image: raw.image,
        collection: raw.collection,
        title: raw.title[locale],
        description: raw.description[locale],
        highlights: raw.highlights[locale],
    };
}
