'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@shared/i18n';

import { useWishlist } from '../hooks/use-wishlist';

import { WishlistLineItem } from './wishlist-line-item';

/**
 * 위시리스트 페이지 본문(client 아일랜드). 회원 데이터라 이 컴포넌트는 로그인 상태에서만 마운트돼야 한다
 * (상위 page island가 게이팅) — 여기선 로딩/빈/목록만 다룬다.
 */
export function WishlistView() {
    const t = useTranslations('wishlist');
    const { items, isLoading } = useWishlist();

    if (isLoading) return null;

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
        <ul className="border-border divide-border divide-y border-y">
            {items.map((product) => (
                <WishlistLineItem key={product.handle} product={product} />
            ))}
        </ul>
    );
}
