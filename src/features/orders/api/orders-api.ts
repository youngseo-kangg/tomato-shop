import type { Locale } from '@shared/i18n';

import type { Order } from '../types/order';

/** 세션 유저의 주문 내역 조회 (해석됨). 클라이언트 전용 */
export async function fetchOrders(locale: Locale): Promise<Order[]> {
    const res = await fetch(`/api/orders?locale=${locale}`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
}

/** 카트 스냅샷으로 주문 생성 */
export async function createOrder(items: { handle: string; quantity: number }[]): Promise<void> {
    const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error('Failed to create order');
}
