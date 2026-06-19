'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { Button } from '@shared/ui';

import { useAuth } from '../hooks/use-auth';

/**
 * 회원 전용 게이트 — 로그인 상태에서만 children을 렌더, 아니면 로그인 유도.
 * 세션은 client에서 조회(useAuth)하므로 페이지 셸은 정적(ISR) 유지. /wishlist·/account 등이 감싼다.
 * children은 인증 후에만 마운트 → 그 안의 회원 데이터 쿼리도 회원일 때만 발동.
 */
export function AuthGate({ children, message }: { children: ReactNode; message?: string }) {
    const t = useTranslations('auth');
    const { isAuthenticated, isLoading } = useAuth();

    // 세션 조회 전엔 비워둔다(비로그인 안내가 깜빡였다 사라지는 걸 막음)
    if (isLoading) return null;

    if (!isAuthenticated) {
        return (
            <div className="text-muted-foreground space-y-4">
                <p>{message ?? t('loginRequired')}</p>
                <Button href="/login" size="sm">
                    {t('login')}
                </Button>
            </div>
        );
    }

    return <>{children}</>;
}
