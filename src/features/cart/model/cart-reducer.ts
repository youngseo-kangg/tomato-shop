import type { CartItem, CartProduct } from '../types/cart';

export interface CartState {
    items: CartItem[];
    /** localStorage 복원 완료 여부. effect에서 setState 대신 dispatch로만 다루려고 상태에 포함 */
    isHydrated: boolean;
}

export const initialCartState: CartState = { items: [], isHydrated: false };

export type CartAction =
    | { type: 'add'; product: CartProduct; quantity: number }
    | { type: 'remove'; handle: string }
    | { type: 'setQuantity'; handle: string; quantity: number }
    | { type: 'replace'; items: CartItem[] }
    | { type: 'hydrated' }
    | { type: 'clear' };

/** 순수 reducer — React 무관, 단위 테스트 대상. 같은 handle은 수량 합치고, 수량 0 이하면 제거 */
export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'add': {
            const exists = state.items.some((item) => item.handle === action.product.handle);
            const items = exists
                ? state.items.map((item) =>
                      item.handle === action.product.handle
                          ? { ...item, quantity: item.quantity + action.quantity }
                          : item,
                  )
                : [...state.items, { ...action.product, quantity: action.quantity }];
            return { ...state, items };
        }
        case 'remove':
            return { ...state, items: state.items.filter((item) => item.handle !== action.handle) };
        case 'setQuantity': {
            const items =
                action.quantity <= 0
                    ? state.items.filter((item) => item.handle !== action.handle)
                    : state.items.map((item) =>
                          item.handle === action.handle ? { ...item, quantity: action.quantity } : item,
                      );
            return { ...state, items };
        }
        case 'replace':
            // localStorage 복원: 항목 세팅 + 복원 완료 표시
            return { items: action.items, isHydrated: true };
        case 'hydrated':
            // 저장된 카트가 없을 때 — 복원 완료만 표시
            return { ...state, isHydrated: true };
        case 'clear':
            return { ...state, items: [] };
    }
}
