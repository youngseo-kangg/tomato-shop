import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { CartProvider } from '../model/cart-context';
import type { CartProduct } from '../types/cart';

import { useCart } from './use-cart';

const productA: CartProduct = { handle: 'a', title: 'A', price: 1000, currency: 'KRW', image: '/a.png', color: '#000' };
const productB: CartProduct = { handle: 'b', title: 'B', price: 2000, currency: 'KRW', image: '/b.png', color: '#111' };

// CartProvider가 마운트 시 localStorage에서 복원하므로 테스트 간 격리
beforeEach(() => localStorage.clear());
afterEach(() => localStorage.clear());

describe('useCart', () => {
    it('초기엔 빈 카트(합계 0)', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        expect(result.current.items).toEqual([]);
        expect(result.current.totalCount).toBe(0);
        expect(result.current.totalPrice).toBe(0);
    });

    it('addItem: 담으면 항목과 합계가 갱신된다', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        act(() => result.current.addItem(productA, 2));
        expect(result.current.items).toHaveLength(1);
        expect(result.current.totalCount).toBe(2);
        expect(result.current.totalPrice).toBe(2000);
    });

    it('addItem: 같은 상품은 수량을 합산한다', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        act(() => result.current.addItem(productA));
        act(() => result.current.addItem(productA));
        expect(result.current.items).toHaveLength(1);
        expect(result.current.totalCount).toBe(2);
    });

    it('여러 상품의 합계를 계산한다', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        act(() => result.current.addItem(productA)); // 1000 × 1
        act(() => result.current.addItem(productB, 2)); // 2000 × 2
        expect(result.current.totalCount).toBe(3);
        expect(result.current.totalPrice).toBe(5000);
    });

    it('setQuantity·removeItem·clear가 상태에 반영된다', () => {
        const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
        act(() => result.current.addItem(productA));
        act(() => result.current.setQuantity('a', 5));
        expect(result.current.totalCount).toBe(5);

        act(() => result.current.removeItem('a'));
        expect(result.current.items).toEqual([]);

        act(() => result.current.addItem(productB));
        act(() => result.current.clear());
        expect(result.current.items).toEqual([]);
    });
});
