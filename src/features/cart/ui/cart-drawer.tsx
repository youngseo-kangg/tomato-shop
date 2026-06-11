'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Link, usePathname, type Locale } from '@shared/i18n';
import { cn, formatPrice } from '@shared/libs';

import { useCart } from '../hooks/use-cart';

import { CartLineItem } from './cart-line-item';

/**
 * 헤더 카트 트리거(아이콘+개수 뱃지) + 우측 슬라이드 드로어. open 상태는 내부 useState로 관리.
 * 뱃지/개수는 isHydrated 후에만 노출 → SSR(0)과 mismatch 없음.
 */
export function CartDrawer() {
    const t = useTranslations('cart');
    const locale = useLocale() as Locale;
    const { items, isHydrated, totalCount, totalPrice, clear } = useCart();
    const [open, setOpen] = useState(false);

    // 이미 장바구니 페이지면 드로어를 열 이유가 없으므로 트리거 비활성화
    const isCartPage = usePathname() === '/cart';

    // 열려 있을 때 Esc로 닫기
    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open]);

    const showBadge = isHydrated && totalCount > 0;

    return (
        <>
            <button
                type="button"
                aria-label={t('openCart')}
                onClick={() => setOpen(true)}
                disabled={isCartPage}
                className="hover:bg-muted focus-visible:ring-ring relative inline-flex h-8 w-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                    aria-hidden
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                </svg>
                {showBadge && (
                    <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums">
                        {totalCount}
                    </span>
                )}
            </button>

            {/* 백드롭 */}
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black/40 transition-opacity duration-200',
                    open ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
                onClick={() => setOpen(false)}
                aria-hidden
            />

            {/* 패널 */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label={t('title')}
                className={cn(
                    'bg-background fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col shadow-xl transition-transform duration-200',
                    open ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                <div className="border-border flex items-center justify-between border-b px-4 py-4">
                    <h2 className="text-lg font-semibold">{t('title')}</h2>
                    <button
                        type="button"
                        aria-label={t('close')}
                        onClick={() => setOpen(false)}
                        className="hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded"
                    >
                        ✕
                    </button>
                </div>

                {items.length === 0 ? (
                    <p className="text-muted-foreground px-4 py-6 text-sm">{t('empty')}</p>
                ) : (
                    <>
                        <ul className="divide-border min-h-0 flex-1 divide-y overflow-y-auto px-4">
                            {items.map((item) => (
                                <CartLineItem key={item.handle} item={item} />
                            ))}
                        </ul>
                        <div className="border-border space-y-3 border-t px-4 py-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-sm">{t('total')}</span>
                                <span className="font-semibold">
                                    {formatPrice(totalPrice, items[0].currency, locale)}
                                </span>
                            </div>
                            <Link
                                href="/cart"
                                onClick={() => setOpen(false)}
                                className="bg-primary text-primary-foreground hover:bg-tomato-600 block rounded-md py-2 text-center text-sm font-medium"
                            >
                                {t('viewCart')}
                            </Link>
                            <button
                                type="button"
                                onClick={clear}
                                className="text-muted-foreground hover:text-destructive w-full text-center text-sm"
                            >
                                {t('clear')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
