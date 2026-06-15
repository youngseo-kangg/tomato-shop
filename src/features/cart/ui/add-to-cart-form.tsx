'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { usePathname } from '@shared/i18n';
import { cn } from '@shared/libs';
import { Button, useToast } from '@shared/ui';

import type { Product } from '@entities/product';

import { useCart } from '../hooks/use-cart';
import type { SelectedOption } from '../types/cart';

import { QuantityStepper } from './quantity-stepper';

/**
 * 상세 페이지 담기 폼 — 옵션 셀렉터 + 수량 stepper + 담기. 옵션 선택값으로 카트 라인을 만든다.
 * cart 페이지가 아닐 때만 토스트.
 */
export function AddToCartForm({ product, onAdded }: { product: Product; onAdded?: () => void }) {
    const t = useTranslations('common');
    const tCart = useTranslations('cart');
    const { addItem } = useCart();
    const { showToast } = useToast();
    const pathname = usePathname();

    // 옵션 index → 선택된 value id (기본: 첫 값)
    const [selected, setSelected] = useState<Record<number, string>>(() =>
        Object.fromEntries(product.options.map((option, i) => [i, option.values[0].id])),
    );
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const selectedOptions: SelectedOption[] = product.options.map((option, i) => {
            const value = option.values.find((v) => v.id === selected[i]) ?? option.values[0];
            return { name: option.name, valueId: value.id, value: value.label };
        });
        addItem(product, quantity, selectedOptions);
        if (pathname !== '/cart') showToast(tCart('addedToast'));
        onAdded?.();
    };

    return (
        <div className="space-y-5">
            {product.options.map((option, i) => (
                <div key={option.name}>
                    <p className="mb-2 text-sm font-medium">{option.name}</p>
                    <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => (
                            <button
                                key={value.id}
                                type="button"
                                aria-pressed={selected[i] === value.id}
                                onClick={() => setSelected((prev) => ({ ...prev, [i]: value.id }))}
                                className={cn(
                                    'rounded-md border px-3 py-1.5 text-sm',
                                    selected[i] === value.id
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-border hover:bg-muted',
                                )}
                            >
                                {value.label}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{tCart('quantity')}</span>
                <QuantityStepper
                    value={quantity}
                    onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                    onIncrement={() => setQuantity((q) => q + 1)}
                    decreaseLabel={tCart('decrease')}
                    increaseLabel={tCart('increase')}
                />
            </div>

            <Button onClick={handleAddToCart} className="w-full sm:w-auto">
                {t('addToCart')}
            </Button>
        </div>
    );
}
