'use client';

import { useCallback, useContext, useMemo } from 'react';

import { CartContext } from '../model/cart-context';
import type { CartProduct } from '../types/cart';

/**
 * 카트 상태 + 액션 노출. 상태(Context)는 Provider가, 액션은 여기서(룰: action은 훅으로 분리).
 * 파생값(totalCount/totalPrice)도 여기서 계산.
 */
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart는 <CartProvider> 안에서만 쓸 수 있다');
    const { items, isHydrated, dispatch } = ctx;

    const addItem = useCallback(
        (product: CartProduct, quantity = 1) => dispatch({ type: 'add', product, quantity }),
        [dispatch],
    );
    const removeItem = useCallback((handle: string) => dispatch({ type: 'remove', handle }), [dispatch]);
    const setQuantity = useCallback(
        (handle: string, quantity: number) => dispatch({ type: 'setQuantity', handle, quantity }),
        [dispatch],
    );
    const clear = useCallback(() => dispatch({ type: 'clear' }), [dispatch]);

    const totalCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
    const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

    return { items, isHydrated, addItem, removeItem, setQuantity, clear, totalCount, totalPrice };
}
