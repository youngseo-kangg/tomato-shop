import type { Product } from '@entities/product';
import type { Locale } from '@shared/i18n';

/** 검색 API 호출 래퍼 (클라이언트 전용) */
export async function fetchProducts(query: string, locale: Locale): Promise<Product[]> {
    const params = new URLSearchParams({ q: query, locale });
    const res = await fetch(`/api/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}
