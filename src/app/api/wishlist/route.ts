import { NextResponse } from 'next/server';

import { routing, type Locale } from '@shared/i18n';

import { getProductByHandle } from '@entities/product';

import { getSessionUser } from '../auth/_lib/session';

import { addToWishlist, getWishlist, removeFromWishlist } from './_lib/wishlist-store';

function resolveLocale(request: Request): Locale {
    const param = new URL(request.url).searchParams.get('locale');
    return routing.locales.includes(param as Locale) ? (param as Locale) : routing.defaultLocale;
}

/** 세션 유저의 위시리스트 → 해석된 Product[] (없는 handle은 제외). 비로그인 401 */
export async function GET(request: Request) {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ message: 'Login required' }, { status: 401 });

    const locale = resolveLocale(request);
    const handles = getWishlist(user.id);
    const products = await Promise.all(handles.map((handle) => getProductByHandle(handle, locale)));
    return NextResponse.json(products.filter((p) => p !== null));
}

/** handle 추가. body: { handle }. 변경 후 handle 목록 반환 */
export async function POST(request: Request) {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ message: 'Login required' }, { status: 401 });

    const { handle } = (await request.json().catch(() => ({}))) as { handle?: string };
    if (!handle) return NextResponse.json({ message: 'handle required' }, { status: 400 });

    return NextResponse.json({ handles: addToWishlist(user.id, handle) });
}

/** handle 제거. body: { handle }. 변경 후 handle 목록 반환 */
export async function DELETE(request: Request) {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ message: 'Login required' }, { status: 401 });

    const { handle } = (await request.json().catch(() => ({}))) as { handle?: string };
    if (!handle) return NextResponse.json({ message: 'handle required' }, { status: 400 });

    return NextResponse.json({ handles: removeFromWishlist(user.id, handle) });
}
