'use client';

import { useTranslations } from 'next-intl';

import { useRouter } from '@shared/i18n';
import { Button, useToast } from '@shared/ui';

import { useAuth } from '@features/auth';
import { useCart } from '@features/cart';
import { useOrders } from '@features/orders';

/**
 * 체크아웃 — 카트를 mock 주문으로 만든다. 여러 슬라이스(cart·orders·auth) 조합 → widget.
 * 비회원은 로그인으로 유도, 회원은 주문 생성 → 카트 비우고 /account로 이동(주문내역 확인).
 * useOrders 목록 조회는 끈다(enabled:false) — 여기선 생성 mutation만 필요(비회원 401 회피).
 */
export function CheckoutButton() {
    const t = useTranslations('cart');
    const router = useRouter();
    const { showToast } = useToast();
    const { isAuthenticated } = useAuth();
    const { items, clear } = useCart();
    const { createOrder, isCreatingOrder } = useOrders({ enabled: false });

    if (items.length === 0) return null;

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        try {
            await createOrder(items.map((item) => ({ handle: item.handle, quantity: item.quantity })));
            clear();
            showToast(t('orderedToast'));
            router.push('/account');
        } catch {
            // 실패 시 카트 유지 (재시도 가능)
        }
    };

    return (
        <Button onClick={handleCheckout} disabled={isCreatingOrder}>
            {t('checkout')}
        </Button>
    );
}
