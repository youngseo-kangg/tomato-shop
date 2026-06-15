'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@shared/i18n';

import { useAuth } from '../hooks/use-auth';

/**
 * 헤더 인증 아일랜드(client). 세션을 client에서 조회 → 레이아웃/페이지는 정적 유지.
 * 비로그인: 로그인 링크 / 로그인: 이름 + 로그아웃.
 */
export function AuthMenu() {
    const t = useTranslations('auth');
    const { user, isAuthenticated, isLoading, logout } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return (
            <Link href="/login" className="text-muted-foreground hover:text-foreground text-sm">
                {t('login')}
            </Link>
        );
    }

    const handleLogout = () => logout();

    return (
        <div className="flex items-center gap-2 text-sm">
            <span className="hidden sm:inline">{user?.name}</span>
            <button type="button" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                {t('logout')}
            </button>
        </div>
    );
}
