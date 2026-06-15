import type { Product } from '@entities/product';

/** 카트에 담는 데 필요한 상품 정보(표시용 스냅샷). 담는 시점의 Product에서 추려 보관 → 재조회 의존 X */
export type CartProduct = Pick<Product, 'handle' | 'title' | 'price' | 'currency' | 'image' | 'color'>;

/** 담을 때 선택한 옵션. name/value는 표시용(해석된 라벨), valueId는 키용(로케일 무관) */
export interface SelectedOption {
    name: string;
    valueId: string;
    value: string;
}

export interface CartItem extends CartProduct {
    /** 라인 식별자 = handle + 선택 옵션 valueId. 같은 상품 다른 옵션 = 다른 라인 */
    id: string;
    quantity: number;
    /** 표시용 선택 옵션 (name: value) */
    options: { name: string; value: string }[];
}
