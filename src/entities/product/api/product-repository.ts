import type { Locale } from '@shared/i18n';

import rawProducts from '@/data/products.json';

import { toProduct } from '../lib/product-mapper';
import type { Product, RawProduct } from '../types/product';

const DATA = rawProducts as RawProduct[];

/**
 * 데이터 접근 경계. 지금은 로컬 JSON이지만 이 함수 본문만 fetch로 바꾸면
 * 호출부(페이지/피쳐)는 그대로 실제 API로 전환된다.
 */
export async function getAllProducts(locale: Locale): Promise<Product[]> {
    return DATA.map((raw) => toProduct(raw, locale));
}

export async function getProductByHandle(handle: string, locale: Locale): Promise<Product | null> {
    const raw = DATA.find((p) => p.handle === handle);
    return raw ? toProduct(raw, locale) : null;
}

/** generateStaticParams 용 — 전체 핸들 목록 (로케일 무관) */
export function getAllProductHandles(): string[] {
    return DATA.map((p) => p.handle);
}

/** 특정 컬렉션(카테고리)에 속한 상품만 */
export async function getProductsByCollection(collection: string, locale: Locale): Promise<Product[]> {
    return DATA.filter((p) => p.collection === collection).map((raw) => toProduct(raw, locale));
}

export async function searchProducts(query: string, locale: Locale): Promise<Product[]> {
    const q = query.trim().toLowerCase();
    const products = await getAllProducts(locale);
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
}
