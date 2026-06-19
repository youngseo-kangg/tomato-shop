'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@shared/libs';
import { TomatoIcon } from '@shared/ui';

import type { Product } from '@entities/product';

import { useWishlist } from '../hooks/use-wishlist';

/**
 * 좋아요(위시리스트) 토글 — 하트 아이콘. 찜하면 토마토색으로 채워진다.
 * auth를 모른다(FSD: 동일 레이어 cross-slice 금지) → 회원 게이팅은 상위(widget)가 담당.
 */
export function WishlistButton({ product }: { product: Product }) {
    const t = useTranslations('wishlist');
    const { isWished, toggle } = useWishlist();
    const wished = isWished(product.handle);

    return (
        <button
            type="button"
            aria-pressed={wished}
            aria-label={wished ? t('remove') : t('add')}
            onClick={() => toggle(product)}
            className={cn(
                'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition',
                'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                wished ? 'border-primary text-primary' : 'border-border text-muted-foreground hover:bg-muted',
            )}
        >
            <TomatoIcon filled={wished} className="h-5 w-5" />
        </button>
    );
}
