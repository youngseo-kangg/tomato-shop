'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { type Locale } from '@shared/i18n';
import { formatPrice } from '@shared/libs';

import { useCart } from '../hooks/use-cart';
import type { CartItem } from '../types/cart';

import { QuantityStepper } from './quantity-stepper';

/**
 * 카트 한 줄(썸네일·제목·단가·수량±·제거). 페이지(CartView)와 드로어(CartDrawer)가 공유.
 */
export function CartLineItem({ item }: { item: CartItem }) {
    const t = useTranslations('cart');
    const locale = useLocale() as Locale;
    const { setQuantity, removeItem } = useCart();

    return (
        <li className="flex items-center gap-3 py-3">
            <div
                className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md"
                style={{ backgroundColor: item.color }}
            >
                <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                {item.options.length > 0 && (
                    <p className="text-muted-foreground truncate text-xs">
                        {item.options.map((o) => `${o.name}: ${o.value}`).join(' · ')}
                    </p>
                )}
                <p className="text-muted-foreground text-sm">{formatPrice(item.price, item.currency, locale)}</p>
                <div className="mt-1">
                    <QuantityStepper
                        value={item.quantity}
                        onDecrement={() => setQuantity(item.id, item.quantity - 1)}
                        onIncrement={() => setQuantity(item.id, item.quantity + 1)}
                        decreaseLabel={t('decrease')}
                        increaseLabel={t('increase')}
                    />
                </div>
            </div>
            <button
                type="button"
                aria-label={t('remove')}
                onClick={() => removeItem(item.id)}
                className="text-muted-foreground hover:text-destructive shrink-0 p-1"
            >
                ✕
            </button>
        </li>
    );
}
