import { NextResponse } from 'next/server';

import { routing, type Locale } from '@shared/i18n';

import { getProductByHandle } from '@entities/product';

import { getSessionUser } from '../auth/_lib/session';

import { addOrder, getOrders, type StoredOrder, type StoredOrderItem } from './_lib/orders-store';

function resolveLocale(request: Request): Locale {
    const param = new URL(request.url).searchParams.get('locale');
    return routing.locales.includes(param as Locale) ? (param as Locale) : routing.defaultLocale;
}

/** 저장된 주문(handle+수량) → 해석된 라인 + 합계 (client 표시용) */
async function toOrder(order: StoredOrder, locale: Locale) {
    const resolved = await Promise.all(
        order.items.map(async ({ handle, quantity }) => {
            const product = await getProductByHandle(handle, locale);
            return product ? { ...product, quantity } : null;
        }),
    );
    const lines = resolved
        .filter((line) => line !== null)
        .map((p) => ({
            handle: p.handle,
            title: p.title,
            price: p.price,
            currency: p.currency,
            image: p.image,
            color: p.color,
            quantity: p.quantity,
        }));
    const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    return { id: order.id, createdAt: order.createdAt, currency: lines[0]?.currency ?? 'KRW', total, lines };
}

/** 세션 유저의 주문 내역 (최신순, 해석됨). 비로그인 401 */
export async function GET(request: Request) {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ message: 'Login required' }, { status: 401 });

    const locale = resolveLocale(request);
    const orders = await Promise.all(getOrders(user.id).map((order) => toOrder(order, locale)));
    return NextResponse.json(orders);
}

/** 주문 생성. body: { items: { handle, quantity }[] } (카트 스냅샷). 생성된 주문 id 반환 */
export async function POST(request: Request) {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ message: 'Login required' }, { status: 401 });

    const { items } = (await request.json().catch(() => ({}))) as { items?: StoredOrderItem[] };
    if (!Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ message: 'items required' }, { status: 400 });
    }

    const sanitized = items
        .filter((i) => i && typeof i.handle === 'string' && i.quantity > 0)
        .map((i) => ({ handle: i.handle, quantity: i.quantity }));
    if (sanitized.length === 0) return NextResponse.json({ message: 'items required' }, { status: 400 });

    const order = addOrder(user.id, sanitized);
    return NextResponse.json({ id: order.id });
}
