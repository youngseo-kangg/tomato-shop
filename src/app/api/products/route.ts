import { NextResponse } from 'next/server';

import { routing, type Locale } from '@shared/i18n';

import { searchProducts } from '@entities/product';

/**
 * 클라이언트(TanStack Query)에서 호출하는 검색 엔드포인트.
 * /api 는 로케일 라우팅 제외 대상이라 locale 을 쿼리로 받는다.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') ?? '';
    const localeParam = searchParams.get('locale');
    const locale: Locale = routing.locales.includes(localeParam as Locale)
        ? (localeParam as Locale)
        : routing.defaultLocale;

    const products = await searchProducts(query, locale);
    return NextResponse.json(products);
}
