'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import type { Locale } from '@shared/i18n';

import { createOrder, fetchOrders } from '../api/orders-api';

/**
 * 주문 서버 상태(TanStack Query) + 주문 생성 mutation. 회원 데이터지만 auth를 모른다
 * (FSD: 동일 레이어 cross-slice 금지) — 회원 게이팅은 상위(widget/app)가 담당.
 */
export function useOrders({ enabled = true }: { enabled?: boolean } = {}) {
    const locale = useLocale() as Locale;
    const queryClient = useQueryClient();

    // enabled=false면 목록 조회를 끈다 (예: 체크아웃은 생성 mutation만 필요 — 비회원 401 회피)
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['orders', locale],
        queryFn: () => fetchOrders(locale),
        enabled,
    });

    const createMutation = useMutation({
        mutationFn: (items: { handle: string; quantity: number }[]) => createOrder(items),
        // 로케일 무관 전체 무효화 → 다음 조회에서 새 주문 반영
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
    });

    return {
        orders,
        isLoading,
        createOrder: createMutation.mutateAsync,
        isCreatingOrder: createMutation.isPending,
    };
}
