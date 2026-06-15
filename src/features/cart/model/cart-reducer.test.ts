import { describe, expect, it } from 'vitest';

import type { CartItem, CartProduct, SelectedOption } from '../types/cart';

import { buildLineId, cartReducer, initialCartState, type CartState } from './cart-reducer';

const productA: CartProduct = { handle: 'a', title: 'A', price: 1000, currency: 'KRW', image: '/a.png', color: '#000' };
const productB: CartProduct = { handle: 'b', title: 'B', price: 2000, currency: 'KRW', image: '/b.png', color: '#111' };

const red: SelectedOption[] = [{ name: '색상', valueId: 'red', value: '빨강' }];
const blue: SelectedOption[] = [{ name: '색상', valueId: 'blue', value: '파랑' }];

const stateOf = (items: CartItem[]): CartState => ({ items, isHydrated: true });
const line = (product: CartProduct, quantity: number): CartItem => ({
    id: product.handle,
    ...product,
    quantity,
    options: [],
});

describe('cartReducer', () => {
    it('add: 옵션 없으면 id=handle으로 담는다', () => {
        const next = cartReducer(initialCartState, { type: 'add', product: productA, quantity: 2, selected: [] });
        expect(next.items).toHaveLength(1);
        expect(next.items[0]).toMatchObject({ id: 'a', handle: 'a', quantity: 2, options: [] });
    });

    it('add: 같은 라인은 수량을 합산', () => {
        const next = cartReducer(stateOf([line(productA, 1)]), {
            type: 'add',
            product: productA,
            quantity: 3,
            selected: [],
        });
        expect(next.items).toHaveLength(1);
        expect(next.items[0].quantity).toBe(4);
    });

    it('add: 같은 상품 다른 옵션은 별도 라인', () => {
        let s = cartReducer(initialCartState, { type: 'add', product: productA, quantity: 1, selected: red });
        s = cartReducer(s, { type: 'add', product: productA, quantity: 1, selected: blue });
        expect(s.items.map((i) => i.id)).toEqual(['a::red', 'a::blue']);
        expect(s.items[0].options).toEqual([{ name: '색상', value: '빨강' }]);
    });

    it('add: 같은 상품 같은 옵션은 합산', () => {
        let s = cartReducer(initialCartState, { type: 'add', product: productA, quantity: 1, selected: red });
        s = cartReducer(s, { type: 'add', product: productA, quantity: 2, selected: red });
        expect(s.items).toHaveLength(1);
        expect(s.items[0].quantity).toBe(3);
    });

    it('setQuantity: id로 갱신, 0 이하면 제거', () => {
        const s = stateOf([line(productA, 1), line(productB, 2)]);
        expect(cartReducer(s, { type: 'setQuantity', id: 'a', quantity: 5 }).items[0].quantity).toBe(5);
        expect(cartReducer(s, { type: 'setQuantity', id: 'a', quantity: 0 }).items).toEqual([line(productB, 2)]);
    });

    it('remove: id로 제거', () => {
        const s = stateOf([line(productA, 1), line(productB, 2)]);
        expect(cartReducer(s, { type: 'remove', id: 'a' }).items).toEqual([line(productB, 2)]);
    });

    it('clear: 카트를 비운다', () => {
        expect(cartReducer(stateOf([line(productA, 1)]), { type: 'clear' }).items).toEqual([]);
    });

    it('replace: 교체+복원완료, 레거시 항목(id/options 없음) backfill', () => {
        const legacy = [{ handle: 'a', ...productA, quantity: 1 } as unknown as CartItem];
        const next = cartReducer(initialCartState, { type: 'replace', items: legacy });
        expect(next.isHydrated).toBe(true);
        expect(next.items[0].id).toBe('a');
        expect(next.items[0].options).toEqual([]);
    });

    it('hydrated: 복원 완료만 표시', () => {
        expect(cartReducer(initialCartState, { type: 'hydrated' })).toEqual({ items: [], isHydrated: true });
    });

    it('buildLineId: 옵션 없으면 handle, 있으면 handle::valueId', () => {
        expect(buildLineId('a', [])).toBe('a');
        expect(buildLineId('a', red)).toBe('a::red');
    });
});
