import type { Product } from '@entities/product';

/** 카트에 담는 데 필요한 상품 정보(표시용 스냅샷). 담는 시점의 Product에서 추려 보관 → 재조회 의존 X */
export type CartProduct = Pick<Product, 'handle' | 'title' | 'price' | 'currency' | 'image' | 'color'>;

export interface CartItem extends CartProduct {
    quantity: number;
}
