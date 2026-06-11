import { describe, expect, it } from 'vitest';

import type { CartItem, CartProduct } from '../types/cart';

import { cartReducer, initialCartState, type CartState } from './cart-reducer';

const productA: CartProduct = { handle: 'a', title: 'A', price: 1000, currency: 'KRW', image: '/a.png', color: '#000' };
const productB: CartProduct = { handle: 'b', title: 'B', price: 2000, currency: 'KRW', image: '/b.png', color: '#111' };

/** 항목으로 복원 완료 상태를 만든다 */
const stateOf = (items: CartItem[]): CartState => ({ items, isHydrated: true });

describe('cartReducer', () => {
    it('add: 빈 카트에 수량과 함께 담는다', () => {
        const next = cartReducer(initialCartState, { type: 'add', product: productA, quantity: 2 });
        expect(next.items).toEqual([{ ...productA, quantity: 2 }]);
    });

    it('add: 같은 handle은 새 줄 대신 수량을 합친다', () => {
        const next = cartReducer(stateOf([{ ...productA, quantity: 1 }]), {
            type: 'add',
            product: productA,
            quantity: 3,
        });
        expect(next.items).toEqual([{ ...productA, quantity: 4 }]);
    });

    it('setQuantity: 수량을 갱신한다', () => {
        const next = cartReducer(stateOf([{ ...productA, quantity: 1 }]), {
            type: 'setQuantity',
            handle: 'a',
            quantity: 5,
        });
        expect(next.items[0].quantity).toBe(5);
    });

    it('setQuantity: 0 이하면 항목을 제거한다', () => {
        const state = stateOf([
            { ...productA, quantity: 1 },
            { ...productB, quantity: 2 },
        ]);
        const next = cartReducer(state, { type: 'setQuantity', handle: 'a', quantity: 0 });
        expect(next.items).toEqual([{ ...productB, quantity: 2 }]);
    });

    it('remove: 해당 handle을 제거한다', () => {
        const state = stateOf([
            { ...productA, quantity: 1 },
            { ...productB, quantity: 2 },
        ]);
        expect(cartReducer(state, { type: 'remove', handle: 'a' }).items).toEqual([{ ...productB, quantity: 2 }]);
    });

    it('clear: 카트를 비운다', () => {
        expect(cartReducer(stateOf([{ ...productA, quantity: 1 }]), { type: 'clear' }).items).toEqual([]);
    });

    it('replace: 항목을 교체하고 복원 완료로 표시한다', () => {
        const restored: CartItem[] = [{ ...productB, quantity: 3 }];
        const next = cartReducer(initialCartState, { type: 'replace', items: restored });
        expect(next).toEqual({ items: restored, isHydrated: true });
    });

    it('hydrated: 항목은 그대로 두고 복원 완료만 표시한다', () => {
        expect(cartReducer(initialCartState, { type: 'hydrated' })).toEqual({ items: [], isHydrated: true });
    });
});
