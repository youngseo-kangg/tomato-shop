import type { Locale } from '@shared/i18n';

import type { Product } from '@entities/product';

/** 세션 유저의 위시리스트 조회 (해석된 Product[]). 클라이언트 전용 */
export async function fetchWishlist(locale: Locale): Promise<Product[]> {
    const res = await fetch(`/api/wishlist?locale=${locale}`);
    if (!res.ok) throw new Error('Failed to fetch wishlist');
    return res.json();
}

/** 위시리스트에 handle 추가 */
export async function addToWishlist(handle: string): Promise<void> {
    const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle }),
    });
    if (!res.ok) throw new Error('Failed to add to wishlist');
}

/** 위시리스트에서 handle 제거 */
export async function removeFromWishlist(handle: string): Promise<void> {
    const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle }),
    });
    if (!res.ok) throw new Error('Failed to remove from wishlist');
}
