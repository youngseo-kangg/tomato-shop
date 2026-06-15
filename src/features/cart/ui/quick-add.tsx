'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { usePathname, type Locale } from '@shared/i18n';
import { formatPrice } from '@shared/libs';
import { Modal, useToast } from '@shared/ui';

import type { Product } from '@entities/product';

import { useCart } from '../hooks/use-cart';

import { AddToCartForm } from './add-to-cart-form';

/**
 * 카드 바로 담기. 옵션 없으면 즉시 담고 토스트, 옵션 있으면 모달(제품 미리보기 + 옵션 폼).
 * ProductCard의 action 슬롯에 주입되어 카드 위에 오버레이된다.
 */
export function QuickAdd({ product }: { product: Product }) {
    const t = useTranslations('common');
    const tCart = useTranslations('cart');
    const locale = useLocale() as Locale;
    const pathname = usePathname();
    const { addItem } = useCart();
    const { showToast } = useToast();
    const [open, setOpen] = useState(false);

    const hasOptions = product.options.length > 0;

    const handleQuickAdd = () => {
        if (hasOptions) {
            setOpen(true);
            return;
        }
        addItem(product, 1);
        if (pathname !== '/cart') showToast(tCart('addedToast'));
    };

    return (
        <>
            <button
                type="button"
                aria-label={t('addToCart')}
                onClick={handleQuickAdd}
                className="bg-background/90 hover:bg-background border-border focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-full border shadow-sm backdrop-blur focus-visible:ring-2 focus-visible:outline-none"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className="h-4 w-4"
                    aria-hidden
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>

            {hasOptions && (
                <Modal open={open} onClose={() => setOpen(false)} title={product.title} closeLabel={tCart('close')}>
                    <div className="flex items-center gap-4">
                        <div
                            className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md"
                            style={{ backgroundColor: product.color }}
                        >
                            <Image src={product.image} alt="" fill sizes="80px" className="object-cover" />
                        </div>
                        <p className="text-sm font-medium">{formatPrice(product.price, product.currency, locale)}</p>
                    </div>
                    <div className="mt-4">
                        <AddToCartForm product={product} onAdded={() => setOpen(false)} />
                    </div>
                </Modal>
            )}
        </>
    );
}
