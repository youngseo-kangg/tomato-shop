import type { CartItem, CartProduct, SelectedOption } from '../types/cart';

export interface CartState {
    items: CartItem[];
    /** localStorage 복원 완료 여부. effect에서 setState 대신 dispatch로만 다루려고 상태에 포함 */
    isHydrated: boolean;
}

export const initialCartState: CartState = { items: [], isHydrated: false };

/** 라인 식별자 — handle + 선택 옵션 valueId(로케일 무관). 옵션 없으면 handle 그대로 */
export function buildLineId(handle: string, selected: SelectedOption[]): string {
    if (selected.length === 0) return handle;
    return `${handle}::${selected.map((s) => s.valueId).join('::')}`;
}

export type CartAction =
    | { type: 'add'; product: CartProduct; quantity: number; selected: SelectedOption[] }
    | { type: 'remove'; id: string }
    | { type: 'setQuantity'; id: string; quantity: number }
    | { type: 'replace'; items: CartItem[] }
    | { type: 'hydrated' }
    | { type: 'clear' };

/** 순수 reducer — React 무관, 단위 테스트 대상. 같은 라인(id)은 수량 합치고, 수량 0 이하면 제거 */
export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'add': {
            const id = buildLineId(action.product.handle, action.selected);
            const exists = state.items.some((item) => item.id === id);
            const items = exists
                ? state.items.map((item) =>
                      item.id === id ? { ...item, quantity: item.quantity + action.quantity } : item,
                  )
                : [
                      ...state.items,
                      {
                          id,
                          ...action.product,
                          quantity: action.quantity,
                          options: action.selected.map((s) => ({ name: s.name, value: s.value })),
                      },
                  ];
            return { ...state, items };
        }
        case 'remove':
            return { ...state, items: state.items.filter((item) => item.id !== action.id) };
        case 'setQuantity': {
            const items =
                action.quantity <= 0
                    ? state.items.filter((item) => item.id !== action.id)
                    : state.items.map((item) =>
                          item.id === action.id ? { ...item, quantity: action.quantity } : item,
                      );
            return { ...state, items };
        }
        case 'replace':
            // localStorage 복원: 레거시(옵션 도입 전) 항목엔 id/options가 없을 수 있어 backfill
            return {
                items: action.items.map((item) => ({
                    ...item,
                    id: item.id ?? item.handle,
                    options: item.options ?? [],
                })),
                isHydrated: true,
            };
        case 'hydrated':
            return { ...state, isHydrated: true };
        case 'clear':
            return { ...state, items: [] };
    }
}
