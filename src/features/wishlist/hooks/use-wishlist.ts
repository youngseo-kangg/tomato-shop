'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useCallback, useMemo } from 'react';

import type { Locale } from '@shared/i18n';

import type { Product } from '@entities/product';

import { addToWishlist, fetchWishlist, removeFromWishlist } from '../api/wishlist-api';

const wishlistKey = (locale: Locale) => ['wishlist', locale] as const;

/**
 * 위시리스트 서버 상태(TanStack Query) + 추가/삭제 mutation. 회원 데이터지만 이 훅은 auth를 모른다
 * (FSD: 동일 레이어 cross-slice 금지) — 회원 게이팅은 상위(widget/app)가 조건부 렌더로 담당.
 * 콜러가 Product를 들고 있어 토글/삭제를 낙관적 업데이트로 처리 → 하트가 즉시 반응.
 */
export function useWishlist() {
    const locale = useLocale() as Locale;
    const queryClient = useQueryClient();
    const key = wishlistKey(locale);

    const { data: items = [], isLoading } = useQuery({
        queryKey: key,
        queryFn: () => fetchWishlist(locale),
    });

    const addMutation = useMutation({
        mutationFn: (product: Product) => addToWishlist(product.handle),
        onMutate: async (product) => {
            await queryClient.cancelQueries({ queryKey: key });
            const prev = queryClient.getQueryData<Product[]>(key) ?? [];
            if (!prev.some((p) => p.handle === product.handle)) {
                queryClient.setQueryData<Product[]>(key, [product, ...prev]);
            }
            return { prev };
        },
        onError: (_err, _product, ctx) => ctx && queryClient.setQueryData(key, ctx.prev),
        onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
    });

    const removeMutation = useMutation({
        mutationFn: (handle: string) => removeFromWishlist(handle),
        onMutate: async (handle) => {
            await queryClient.cancelQueries({ queryKey: key });
            const prev = queryClient.getQueryData<Product[]>(key) ?? [];
            queryClient.setQueryData<Product[]>(
                key,
                prev.filter((p) => p.handle !== handle),
            );
            return { prev };
        },
        onError: (_err, _handle, ctx) => ctx && queryClient.setQueryData(key, ctx.prev),
        onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
    });

    const handles = useMemo(() => new Set(items.map((p) => p.handle)), [items]);
    const isWished = useCallback((handle: string) => handles.has(handle), [handles]);
    const toggle = useCallback(
        (product: Product) =>
            handles.has(product.handle) ? removeMutation.mutate(product.handle) : addMutation.mutate(product),
        [handles, addMutation, removeMutation],
    );

    return {
        items,
        isLoading,
        isWished,
        toggle,
        removeItem: removeMutation.mutate,
        totalCount: items.length,
    };
}
