'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, type Locale } from '@shared/i18n';
import { formatPrice } from '@shared/libs';
import { Button } from '@shared/ui';

import { useCart } from '../hooks/use-cart';

import { CartLineItem } from './cart-line-item';

/**
 * 장바구니 페이지 본문(client 아일랜드). 페이지 셸은 정적, 카트 상태는 여기서 읽는다.
 */
export function CartView() {
    const t = useTranslations('cart');
    const locale = useLocale() as Locale;
    const { items, isHydrated, clear, totalPrice } = useCart();

    // localStorage 복원 전엔 빈 카트로 깜빡이지 않도록 잠시 비워둔다
    if (!isHydrated) return null;

    if (items.length === 0) {
        return (
            <div className="text-muted-foreground space-y-4">
                <p>{t('empty')}</p>
                <Link href="/products" className="text-foreground text-sm underline">
                    {t('continueShopping')}
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <ul className="border-border divide-border divide-y border-y">
                {items.map((item) => (
                    <CartLineItem key={item.id} item={item} />
                ))}
            </ul>

            <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={clear}>
                    {t('clear')}
                </Button>
                <p className="text-lg font-semibold">
                    {t('total')} {formatPrice(totalPrice, items[0].currency, locale)}
                </p>
            </div>
        </div>
    );
}
