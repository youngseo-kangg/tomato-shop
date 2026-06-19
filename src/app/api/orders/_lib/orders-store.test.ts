import { describe, expect, it } from 'vitest';

import { addOrder, getOrders } from './orders-store';

describe('orders-store', () => {
    it('주문 없는 유저는 빈 목록', () => {
        expect(getOrders('no-orders')).toEqual([]);
    });

    it('주문을 생성하면 맨 앞(최신)에 추가되고 id/생성일이 채워진다', () => {
        const created = addOrder('u-order', [{ handle: 'tomato-mug', quantity: 2 }]);
        expect(created.id).toMatch(/^ORD-/);
        expect(created.createdAt).toBeTruthy();
        expect(created.items).toEqual([{ handle: 'tomato-mug', quantity: 2 }]);

        const second = addOrder('u-order', [{ handle: 'tomato-light', quantity: 1 }]);
        expect(getOrders('u-order')[0].id).toBe(second.id);
        expect(getOrders('u-order')).toHaveLength(2);
    });
});
