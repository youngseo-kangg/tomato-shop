import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ToastProvider } from '@shared/ui';

import { renderWithProviders, screen } from '@/test/test-utils';

import { useCart } from '../hooks/use-cart';
import { CartProvider } from '../model/cart-context';
import type { CartProduct } from '../types/cart';

import { AddToCartButton } from './add-to-cart-button';

// usePathname은 Next 라우터 컨텍스트가 필요 → 비-cart 경로로 고정해 토스트 분기를 검증
vi.mock('@shared/i18n', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@shared/i18n')>();
    return { ...actual, usePathname: () => '/products/tomato-mug' };
});

const product: CartProduct = {
    handle: 'tomato-mug',
    title: '토마토 머그',
    price: 16000,
    currency: 'KRW',
    image: '/products/tomato-mug.png',
    color: '#d6342a',
};

/** 담김 여부를 화면에서 확인하기 위한 프로브 */
function CartCount() {
    const { totalCount } = useCart();
    return <span data-testid="count">{totalCount}</span>;
}

beforeEach(() => localStorage.clear());
afterEach(() => localStorage.clear());

describe('AddToCartButton', () => {
    it('클릭하면 카트에 담기고 토스트가 뜬다', async () => {
        renderWithProviders(
            <CartProvider>
                <ToastProvider>
                    <AddToCartButton product={product} />
                    <CartCount />
                </ToastProvider>
            </CartProvider>,
        );

        expect(screen.getByTestId('count')).toHaveTextContent('0');

        await userEvent.click(screen.getByRole('button', { name: '장바구니에 담기' }));

        expect(screen.getByTestId('count')).toHaveTextContent('1');
        expect(screen.getByText('장바구니에 담았습니다')).toBeInTheDocument();
    });
});
