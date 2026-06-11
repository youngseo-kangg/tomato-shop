'use client';

import { createContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';

import type { CartItem } from '../types/cart';

import { cartReducer, initialCartState, type CartAction } from './cart-reducer';

const STORAGE_KEY = 'cart';

interface CartContextValue {
    items: CartItem[];
    /** localStorage 복원 완료 여부. 복원 전 빈 카트로 깜빡이는 걸 막는 데 쓴다 */
    isHydrated: boolean;
    dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextValue | null>(null);

/**
 * 카트 client 로컬 상태(Context + useReducer) + localStorage 영속화.
 * 초기 isHydrated=false라 SSR/CSR 동일 → hydration 안전. 복원/저장은 effect에서 dispatch로만.
 */
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    // 마운트 후 localStorage에서 복원 (effect는 dispatch만 — setState 직접 호출 안 함)
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                dispatch({ type: 'replace', items: JSON.parse(raw) });
                return;
            }
        } catch {
            // 파싱 실패/접근 불가 — 빈 카트로 시작
        }
        dispatch({ type: 'hydrated' });
    }, []);

    // 변경 시 저장. 복원 전(isHydrated=false)에는 저장하지 않아, 초기 []가 저장값을 덮어쓰지 않게 한다
    useEffect(() => {
        if (!state.isHydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        } catch {
            // 저장 불가(시크릿 모드 등) — 무시
        }
    }, [state.items, state.isHydrated]);

    const value = useMemo(
        () => ({ items: state.items, isHydrated: state.isHydrated, dispatch }),
        [state.items, state.isHydrated],
    );
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
