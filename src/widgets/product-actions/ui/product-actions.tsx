'use client';

import type { Product } from '@entities/product';

import { useAuth } from '@features/auth';
import { AddToCartForm } from '@features/cart';
import { WishlistButton } from '@features/wishlist';

/**
 * 상세 페이지 액션 영역 — 담기 폼 + (회원만) 좋아요. 여러 슬라이스(cart·wishlist·auth) 조합 → widget.
 * 비회원/로딩 중엔 좋아요 미노출(레이아웃은 담기 버튼만). 위시리스트 쿼리도 회원일 때만 마운트.
 */
export function ProductActions({ product }: { product: Product }) {
    const { isAuthenticated, isLoading } = useAuth();
    const action = !isLoading && isAuthenticated ? <WishlistButton product={product} /> : undefined;

    return <AddToCartForm product={product} action={action} />;
}
