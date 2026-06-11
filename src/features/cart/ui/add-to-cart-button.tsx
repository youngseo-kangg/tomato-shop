'use client';

import { useTranslations } from 'next-intl';

import { usePathname } from '@shared/i18n';
import { Button, useToast } from '@shared/ui';

import { useCart } from '../hooks/use-cart';
import type { CartProduct } from '../types/cart';

/**
 * 상품을 카트에 담는 버튼. Product를 그대로 넘겨도 구조적으로 CartProduct에 할당됨.
 * cart 페이지가 아닐 때만 토스트로 피드백(cart 페이지에선 목록에 바로 보이므로 생략).
 */
export function AddToCartButton({ product }: { product: CartProduct }) {
    const t = useTranslations('common');
    const tCart = useTranslations('cart');
    const pathname = usePathname();
    const { addItem } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = () => {
        addItem(product);
        if (pathname !== '/cart') showToast(tCart('addedToast'));
    };

    return <Button onClick={handleAddToCart}>{t('addToCart')}</Button>;
}
